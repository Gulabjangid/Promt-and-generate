import os
import random
from typing import Literal, Optional, List

import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI

# =========================================================
# Load environment variables
# =========================================================
load_dotenv(find_dotenv())

# =========================================================
# Parse multiple A4F API keys (comma-separated)
# =========================================================
raw_keys = os.getenv("A4F_API_KEYS") or os.getenv("api_key") or ""
A4F_API_KEYS: List[str] = [k.strip() for k in raw_keys.split(",") if k.strip()]

if not A4F_API_KEYS:
    raise RuntimeError("No A4F API key(s) found. Set A4F_API_KEYS or api_key in .env")

# One OpenAI client per key so we can rotate between them.
a4f_clients: List[OpenAI] = [
    OpenAI(base_url="https://api.a4f.co/v1", api_key=key) for key in A4F_API_KEYS
]

def pick_a4f_client() -> OpenAI:
    """Randomly select an A4F client to spread load across keys."""
    return random.choice(a4f_clients)

# =========================================================
# Init Google Gemini (Prompt Enhancer)
# =========================================================
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("GOOGLE_API_KEY not found")

genai.configure(api_key=GOOGLE_API_KEY)
gemini_model = genai.GenerativeModel("gemini-2.5-flash")

# =========================================================
# FastAPI app + CORS
# =========================================================
app = FastAPI(title="Unified AI Image Generator (A4F only)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# Schemas
# =========================================================

StyleId = Literal["none", "cinematic", "photorealistic", "anime", "fantasy"]

class GenerateRequest(BaseModel):
    prompt: str
    aspect_ratio: str              # "16:9" | "9:16" | "1:1" | "4:3" | "21:9"
    style_preset: StyleId
    enhance: bool = False

class GenerateResponse(BaseModel):
    image_url: str
    used_prompt: str
    used_provider: str
    used_model: str

class EnhanceRequest(BaseModel):
    prompt: str
    style_preset: StyleId

class EnhanceResponse(BaseModel):
    enhanced_prompt: str

# =========================================================
# Style → model routing
# =========================================================
# For each style, we define a list of candidate A4F models.
STYLE_MODEL_MAP: dict[StyleId, list[str]] = {
    # Balanced / general use, fast and strong
    "none": [
        "provider-8/z-image",
        "provider-4/imagen-3.5",
    ],
    # Movie-like, dramatic, high detail
    "cinematic": [
        "provider-4/imagen-4",
        "provider-4/imagen-3.5",
    ],
    # Real-world photos, products, people
    "photorealistic": [
        "provider-8/z-image",
        "provider-4/imagen-3.5",
    ],
    # Stylized art / anime
    "anime": [
        "provider-4/flux-schnell",
        "provider-4/phoenix",
    ],
    # Epic fantasy / 4k style
    "fantasy": [
        "provider-4/imagen-4",
        "provider-4/imagen-3.5",
    ],
}

def pick_model_for_style(style: StyleId) -> str:
    """Choose one suitable model for the given style."""
    candidates = STYLE_MODEL_MAP.get(style) or STYLE_MODEL_MAP["none"]
    return random.choice(candidates)

# =========================================================
# Helper: map style to style-specific Gemini instructions
# =========================================================
def build_style_system_prompt(style: StyleId) -> str:
    if style == "cinematic":
        return (
            "Generate a cinematic, film-like composition with dramatic lighting, "
            "shallow depth of field, expressive atmosphere, and 4k-level detail."
        )
    if style == "photorealistic":
        return (
            "Generate an ultra-photorealistic image with real camera optics, natural "
            "lighting, accurate materials and skin, and believable photographic detail."
        )
    if style == "anime":
        return (
            "Generate a high-quality anime-style illustration with clean line art, "
            "vibrant colors, expressive characters, and studio-grade shading."
        )
    if style == "fantasy":
        return (
            "Generate an epic fantasy illustration with rich worldbuilding, magical "
            "elements, dramatic lighting, and highly detailed 4k-quality rendering."
        )
    # neutral default
    return (
        "Generate a clear, high-quality image that closely follows the user's intent, "
        "without forcing a specific art style."
    )

# =========================================================
# Prompt Enhancer (Gemini)
# =========================================================
BASE_SYSTEM_PROMPT = """
You are a senior prompt engineer specializing in AI image generation.

Goals:
- Expand short or vague prompts into rich, visual descriptions.
- Preserve the user's core idea.
- Add environment, lighting, mood, camera angle, and key visual details.
- Use natural language sentences (no bullet points or lists).
- Avoid unsafe or copyrighted content.
- Output only the enhanced prompt text, nothing else.
- Keep the result around 30 words: concise, vivid, and specific.
""".strip()

def enhance_prompt(user_prompt: str, style: StyleId) -> str:
    style_instructions = build_style_system_prompt(style)

    full_prompt = (
        BASE_SYSTEM_PROMPT
        + "\n\nStyle instructions:\n"
        + style_instructions
        + "\n\nUser prompt:\n"
        + user_prompt
    )

    try:
        resp = gemini_model.generate_content(full_prompt)
        text = (resp.text or "").strip()
        return text if text else user_prompt
    except Exception:
        return user_prompt

# =========================================================
# Aspect ratio → size for A4F
# =========================================================
def aspect_ratio_to_size(ratio: str) -> str:
    if ratio == "16:9":
        return "1280x720"
    if ratio == "9:16":
        return "1024x1792"
    if ratio == "1:1":
        return "1024x1024"
    if ratio == "4:3":
        return "1024x768"
    if ratio == "21:9":
        return "1920x820"
    return "1024x1024"

# =========================================================
# Unified Image Generation Endpoint
# =========================================================
@app.post("/generate-image", response_model=GenerateResponse)
def generate_image(data: GenerateRequest):
    """
    1. Optionally enhance the prompt with Gemini (style-aware).
    2. Choose an A4F model based on style.
    3. Use a random A4F API key to spread load.
    """
    # Step 1: enhancement
    final_prompt = enhance_prompt(data.prompt, data.style_preset) if data.enhance else data.prompt

    # Step 2: choose model based on style
    model_id = pick_model_for_style(data.style_preset)

    # Step 3: choose client (rotating keys)
    client = pick_a4f_client()

    try:
        size = aspect_ratio_to_size(data.aspect_ratio)

        response = client.images.generate(
            model=model_id,
            prompt=final_prompt,
            n=1,
            response_format="url",
            size=size,
        )

        image_url = response.data[0].url

        return GenerateResponse(
            image_url=image_url,
            used_prompt=final_prompt,
            used_provider="a4f",
            used_model=model_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"A4F error: {e}")

# =========================================================
# Enhance Prompt Endpoint
# =========================================================
@app.post("/enhance-prompt", response_model=EnhanceResponse)
def enhance_prompt_endpoint(data: EnhanceRequest):
    """Enhance the user's prompt using Gemini with style guidance."""
    enhanced = enhance_prompt(data.prompt, data.style_preset)
    return EnhanceResponse(enhanced_prompt=enhanced)  
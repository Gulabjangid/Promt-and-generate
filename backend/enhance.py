import os
import replicate
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, find_dotenv
from openai import OpenAI
from typing import Optional

# =========================================================
# Load environment variables
# =========================================================
load_dotenv(find_dotenv())

# =========================================================
# Init A4F client
# =========================================================
A4F_API_KEY = os.getenv("api_key")
if not A4F_API_KEY:
    raise RuntimeError("A4F api_key not found")

a4f_client = OpenAI(
    base_url="https://api.a4f.co/v1",
    api_key=A4F_API_KEY,
)

# =========================================================
# Init Replicate client (same as test.py)
# =========================================================
REPLICATE_API_TOKEN = (
    os.getenv("REPLICATE_API_TOKEN")
    or os.getenv("rep_api_key")
    or os.getenv("REP_API_KEY")
)

if not REPLICATE_API_TOKEN:
    raise RuntimeError("REPLICATE_API_TOKEN not found")

replicate_client = replicate.Client(api_token=REPLICATE_API_TOKEN)

# =========================================================
# FastAPI app + CORS
# =========================================================
app = FastAPI(title="Image Generation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# Schemas
# =========================================================
class GenerateRequest(BaseModel):
    prompt: str
    provider: str  # "replicate" | "a4f"
    aspect_ratio: Optional[str] = "16:9"

class GenerateResponse(BaseModel):
    image_url: str

# =========================================================
# Unified Image Generation Endpoint
# =========================================================
@app.post("/generate-image", response_model=GenerateResponse)
def generate_image(data: GenerateRequest):

    provider = data.provider.lower()

    # =======================
    # REPLICATE
    # =======================
    if provider == "replicate":
        try:
            output = replicate_client.run(
                "google/imagen-4",
                input={
                    "prompt": data.prompt,
                    "aspect_ratio": data.aspect_ratio,
                    "safety_filter_level": "block_medium_and_above",
                },
            )

            # Handle all Replicate formats
            if isinstance(output, list):
                image_url = output[0]
            elif isinstance(output, str):
                image_url = output
            elif hasattr(output, "url"):
                image_url = output.url
            else:
                raise HTTPException(
                    status_code=500,
                    detail=f"Unexpected Replicate output: {output}",
                )

            return {"image_url": image_url}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    # =======================
    # A4F
    # =======================
    elif provider == "a4f":
        try:
            size = "1280x720" if data.aspect_ratio == "16:9" else "1024x1024"

            response = a4f_client.images.generate(
                model="provider-8/z-image",
                prompt=data.prompt,
                n=1,
                response_format="url",
                size=size,
            )

            return {"image_url": response.data[0].url}

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid provider. Use 'replicate' or 'a4f'",
        )


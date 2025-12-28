import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from google import genai
from google.genai import types
from dotenv import load_dotenv
app = FastAPI()

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise Exception("Set GOOGLE_API_KEY in your environment")

client = genai.Client(api_key=GOOGLE_API_KEY)

@app.post("/generate-video")
async def generate_video(
    prompt: str = Form(...),
    file: UploadFile | None = File(None)
):
    # Build typed Image if file provided
    img_obj = None
    if file:
        img_bytes = await file.read()
        img_obj = types.Image.from_bytes(
            file_bytes=img_bytes,
            mime_type=file.content_type  # e.g., "image/jpeg"
        )

    try:
        # Call Veo video generation with typed image
        video_op = client.models.generate_videos(
            model="veo-3.1-generate-preview",
            prompt=prompt,
            image=img_obj
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Video generation failed: {str(e)}")

    return {"operation_id": video_op.name}

@app.get("/video-status/{operation_id}")
async def video_status(operation_id: str):
    op = client.operations.get(name=operation_id)
    return {"done": op.done, "response": op.response if op.done else None}

@app.get("/video-download/{operation_id}")
async def video_download(operation_id: str):
    op = client.operations.get(name=operation_id)
    if not op.done:
        raise HTTPException(status_code=400, detail="Video not ready")
    if not op.response.generated_videos:
        raise HTTPException(status_code=500, detail="No video found")

    video_item = op.response.generated_videos[0]
    client.files.download(file=video_item.video)
    video_item.video.save(f"{operation_id}.mp4")
    return {"message": f"Saved {operation_id}.mp4"}

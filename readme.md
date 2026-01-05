https://p2i-frontend.vercel.app/

# AI Image Generator (Next.js + FastAPI)

A simple full-stack AI image generation web app built using **Next.js (frontend)** and **FastAPI (backend)**.  
Users can enter a text prompt and generate images directly inside the web UI using models provided via **A4F API**.

---





## Features

- Text-to-image generation
- Clean single-page frontend (Next.js)
- FastAPI backend for image generation
- No API key exposure on frontend
- Image rendered directly in UI (no new tabs)
- Easy model switching
- Free-tier friendly setup

---




## Architecture Overview



Next.js Frontend → FastAPI Backend → A4F Image Models


- Frontend handles UI only
- Backend securely handles API key and model calls
- Communication via REST API

---




## Project Structure



ai-image-generator/
│
├── backend/ # FastAPI backend
├── frontend/ # Next.js frontend
├── .gitignore
└── README.md


---




## Getting an API Key (Required)

This project uses the **A4F API** for image generation.

1. Visit:  
    https://www.a4f.co/api-keys
2. Create a free account
3. Generate an API key

---




##  Backend Setup (FastAPI)

### 1. Navigate to backend
```bash
cd backend

2. Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

3. Install dependencies
pip install -r requirements.txt

4. Configure environment variables

Create a .env file inside backend/:

api_key=YOUR_A4F_API_KEY


 Never commit .env to GitHub

5. Run backend server
uvicorn main:app --reload


Backend will run at:

http://127.0.0.1:8000





Swagger Docs:

http://127.0.0.1:8000/docs

Frontend Setup (Next.js)
1. Navigate to frontend
cd frontend

2. Install dependencies
npm install

3. Run frontend
npm run dev


Frontend will run at:

http://localhost:3000

Model Usage & Free Tier Notes
Default Model Used
provider-4/imagen-3.5





This works well with the free tier, but free-tier usage is limited.

If You Hit API Limits

If you hit rate limits or quota issues:

Open backend/main.py

Change the model name inside:

model="provider-4/imagen-3.5"


Replace with another supported free-tier or paid model from A4F.

The backend is intentionally designed so model switching requires only one line change.

 Security Notes

API key is stored only in backend .env

Frontend never sees or accesses the API key

CORS enabled for development (restrict in production)

 Deployment (Optional)

Typical deployment setup:

Frontend: Vercel

Backend: Railway / Render / VPS

Remember to:

Set environment variables in production

Restrict CORS origins

Use production-ready server config

License

This project is for educational and experimental purposes.
You are free to modify and extend it as needed.

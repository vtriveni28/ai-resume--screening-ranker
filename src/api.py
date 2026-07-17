"""FastAPI REST server.

Run:
    uvicorn src.api:app --reload --port 8000
"""
from typing import List
import shutil
import tempfile
from dataclasses import asdict
from pathlib import Path

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.features import extract_features
from src.parser import parse_resume
from src.ranking import score_candidate


# -----------------------------
# Create FastAPI App
# -----------------------------
app = FastAPI(
    title="Resume Ranker API",
    description="Parse resumes, extract features, score against job descriptions.",
    version="0.1.0",
)

# -----------------------------
# Enable CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScoreResponse(BaseModel):
    profile: dict
    score: dict


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/parse", summary="Parse a single resume into structured features")
async def parse_endpoint(file: UploadFile = File(...)):
    suffix = Path(file.filename).suffix

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    text = parse_resume(tmp_path)
    profile = extract_features(text)

    return asdict(profile)

@app.post("/score")
async def score_endpoint(
    files: List[UploadFile] = File(...),
    jd_text: str = Form(...)
):
    results = []

    for file in files:

        suffix = Path(file.filename or "").suffix

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name

        profile = extract_features(parse_resume(tmp_path))
        score = score_candidate(profile, jd_text)

        results.append({
            "filename": file.filename,
            "profile": asdict(profile),
            "score": asdict(score),
        })

    # Sort by total score (highest first)
    results.sort(
        key=lambda x: x["score"]["total"],
        reverse=True,
    )

    return results

   

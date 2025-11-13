from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

app = FastAPI()

# CORS: allow your frontend origin (e.g. http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # add your frontend origin(s) here
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Safe base dir for files
BASE_DIR = Path(__file__).resolve().parent.parent / "data"
BASE_DIR.mkdir(parents=True, exist_ok=True)  # create if missing

def safe_path(filename: str) -> Path:
    """
    Resolve filename under BASE_DIR and ensure it's inside BASE_DIR
    (prevents '../' path traversal).
    """
    candidate = (BASE_DIR / filename).resolve()
    if not str(candidate).startswith(str(BASE_DIR.resolve())):
        raise ValueError("Invalid filename")
    return candidate

@app.get("/api/files/text/{filename}")
async def read_file_text(filename: str):
    try:
        p = safe_path(filename)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid filename")

    if not p.exists() or not p.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    # Option A: synchronous small file -> return text
    text = p.read_text(encoding="utf-8")
    return PlainTextResponse(content=text, media_type="text/plain")

    # Option B: JSON file -> return JSON
    # content = json.loads(p.read_text(encoding="utf-8"))
    # return JSONResponse(content=content)

    # Option C: streaming file (for large files / binaries)
    # return StreamingResponse(p.open("rb"), media_type="application/octet-stream")

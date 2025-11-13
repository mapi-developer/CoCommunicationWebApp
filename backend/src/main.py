# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .anny_client import anny_client
from .routers import bookings, resources

app = FastAPI(title="CoCommunication Backend", version="0.1.0")

# CORS so your Next.js frontend can call this API
origins = [
    "http://localhost:3000",  # local Next.js
    # later: "https://your-domain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event() -> None:
    # Could do healthcheck here if needed
    pass


@app.on_event("shutdown")
async def shutdown_event() -> None:
    await anny_client.aclose()


app.include_router(resources.router)
app.include_router(bookings.router)

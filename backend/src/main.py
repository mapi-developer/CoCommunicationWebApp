from __future__ import annotations


from fastapi.responses import JSONResponse, PlainTextResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
from .api.routes import admin_bookings
from .api.routes import anny_integration
from .api.routes import anny_settings


from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel

app = FastAPI(
    title="CoCommunicationWebApp Backend",
    version="0.1.0",
)

app.include_router(admin_bookings.router)
app.include_router(anny_integration.router)
app.include_router(anny_settings.router)

# ---------- SCHEMAS (used by frontend) ----------

class BookingCreate(BaseModel):
    resource_id: str
    starts_at: datetime
    ends_at: datetime
    title: Optional[str] = None
    notes: Optional[str] = None


class BookingUpdate(BaseModel):
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None
    title: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None


class BookingRead(BaseModel):
    # We only have anny's ID, no local DB ID
    anny_booking_id: str
    resource_id: str
    starts_at: datetime
    ends_at: datetime
    title: Optional[str]
    notes: Optional[str]
    status: str


# ---------- anny "login" / token check ----------

class AnnyConnectBody(BaseModel):
    api_token: str


@app.post("/admin/anny/connect")
async def connect_anny(body: AnnyConnectBody):
    """
    Optional endpoint if you want to verify a token from the admin UI.
    It does NOT persist the token (we use .env for now),
    just checks that anny accepts it.
    """
    client = AnnyClient(api_token=body.api_token)
    try:
        await client.test_token()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Token invalid or API error: {exc}")

    return {"status": "ok"}


# ---------- BOOKINGS: read / create / update via anny only ----------

@app.get("/admin/bookings", response_model=List[BookingRead])
async def list_bookings():
    client = AnnyClient()
    try:
        bookings = await client.list_bookings()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"anny error: {exc}")

    # map AnnyBooking -> BookingRead
    return [
        BookingRead(
            anny_booking_id=b.id,
            resource_id=b.resource_id,
            starts_at=b.starts_at,
            ends_at=b.ends_at,
            title=b.title,
            notes=b.notes,
            status=b.status,
        )
        for b in bookings
    ]


@app.post("/admin/bookings", response_model=BookingRead)
async def create_booking(body: BookingCreate):
    client = AnnyClient()

    # Map to anny's payload. Adjust keys to the docs!
    payload = {
        "resourceId": body.resource_id,
        "start": body.starts_at.isoformat(),
        "end": body.ends_at.isoformat(),
        "title": body.title,
        "notes": body.notes,
        # add customer/contact info if required by anny
    }

    try:
        created = await client.create_booking(payload)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"anny error: {exc}")

    return BookingRead(
        anny_booking_id=created.id,
        resource_id=created.resource_id,
        starts_at=created.starts_at,
        ends_at=created.ends_at,
        title=created.title,
        notes=created.notes,
        status=created.status,
    )


@app.put("/admin/bookings/{anny_id}", response_model=BookingRead)
async def update_booking(
    anny_id: str = Path(...),
    body: BookingUpdate = ...,
):
    client = AnnyClient()

    payload = {}
    if body.starts_at:
        payload["start"] = body.starts_at.isoformat()
    if body.ends_at:
        payload["end"] = body.ends_at.isoformat()
    if body.title is not None:
        payload["title"] = body.title
    if body.notes is not None:
        payload["notes"] = body.notes
    if body.status is not None:
        payload["status"] = body.status

    try:
        updated = await client.update_booking(anny_id, payload)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"anny error: {exc}")

    return BookingRead(
        anny_booking_id=updated.id,
        resource_id=updated.resource_id,
        starts_at=updated.starts_at,
        ends_at=updated.ends_at,
        title=updated.title,
        notes=updated.notes,
        status=updated.status,
    )

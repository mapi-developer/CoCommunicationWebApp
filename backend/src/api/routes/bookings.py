from __future__ import annotations

from datetime import datetime
from typing import Optional
from fastapi import Path

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from ..integrations.anny_client import AnnyClient
from ...db.session import get_session
from ...db import models  # your SQLAlchemy models

router = APIRouter(prefix="/api/admin/bookings", tags=["admin-bookings"])


class BookingCreate(BaseModel):
    resource_id: str
    user_id: Optional[int] = None
    starts_at: datetime
    ends_at: datetime
    title: Optional[str] = None
    notes: Optional[str] = None


class BookingRead(BaseModel):
    id: int
    anny_booking_id: Optional[str]
    resource_id: str
    starts_at: datetime
    ends_at: datetime
    title: Optional[str]
    notes: Optional[str]
    status: str


@router.post("", response_model=BookingRead)
async def create_booking(
    body: BookingCreate,
    db: AsyncSession = Depends(get_session),
):
    anny_client = AnnyClient()

    # 1) build payload in anny format
    anny_payload = {
        "resource_id": body.resource_id,
        "start": body.starts_at.isoformat(),
        "end": body.ends_at.isoformat(),
        "title": body.title,
        "notes": body.notes,
        # add customer/contact info as required by anny
    }

    try:
        anny_booking = await anny_client.create_booking(anny_payload)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Anny booking failed: {exc}") from exc

    # 2) save locally with anny_booking_id
    db_booking = models.Booking(
        anny_booking_id=anny_booking.id,
        resource_id=body.resource_id,
        user_id=body.user_id,
        starts_at=body.starts_at,
        ends_at=body.ends_at,
        title=body.title,
        notes=body.notes,
        status=anny_booking.status,
        source="local",
    )
    db.add(db_booking)
    await db.commit()
    await db.refresh(db_booking)

    return BookingRead(
        id=db_booking.id,
        anny_booking_id=db_booking.anny_booking_id,
        resource_id=db_booking.resource_id,
        starts_at=db_booking.starts_at,
        ends_at=db_booking.ends_at,
        title=db_booking.title,
        notes=db_booking.notes,
        status=db_booking.status,
    )

class BookingUpdate(BaseModel):
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None
    title: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None


@router.put("/{booking_id}", response_model=BookingRead)
async def update_booking(
    booking_id: int = Path(...),
    body: BookingUpdate = ...,
    db: AsyncSession = Depends(get_session),
):
    result = await db.execute(
        models.Booking.__table__.select().where(models.Booking.id == booking_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")
    db_booking = models.Booking(**row)

    anny_client = AnnyClient()

    # Build minimal payload for anny
    anny_payload = {}
    if body.starts_at:
        anny_payload["start"] = body.starts_at.isoformat()
    if body.ends_at:
        anny_payload["end"] = body.ends_at.isoformat()
    if body.title is not None:
        anny_payload["title"] = body.title
    if body.notes is not None:
        anny_payload["notes"] = body.notes
    if body.status is not None:
        anny_payload["status"] = body.status

    if db_booking.anny_booking_id:
        await anny_client.update_booking(db_booking.anny_booking_id, anny_payload)

    # Update local copy
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(db_booking, field, value)

    await db.commit()
    await db.refresh(db_booking)

    return BookingRead(
        id=db_booking.id,
        anny_booking_id=db_booking.anny_booking_id,
        resource_id=db_booking.resource_id,
        starts_at=db_booking.starts_at,
        ends_at=db_booking.ends_at,
        title=db_booking.title,
        notes=db_booking.notes,
        status=db_booking.status,
    )

@router.post("/sync-from-anny", response_model=dict)
async def sync_from_anny(
    db: AsyncSession = Depends(get_session),
):
    anny_client = AnnyClient()

    # You’d store this timestamp in a settings/config table
    last_sync = await get_last_anny_sync_timestamp(db)

    anny_bookings = await anny_client.list_bookings(updated_since=last_sync)

    for ab in anny_bookings:
        # upsert into local DB
        existing = await db.execute(
            models.Booking.__table__.select().where(
                models.Booking.anny_booking_id == ab.id
            )
        )
        row = existing.first()

        if row:
            db_booking = models.Booking(**row)
            db_booking.starts_at = ab.starts_at
            db_booking.ends_at = ab.ends_at
            db_booking.status = ab.status
            db_booking.title = ab.title
            db_booking.notes = ab.notes
        else:
            db_booking = models.Booking(
                anny_booking_id=ab.id,
                resource_id=ab.resource_id,
                starts_at=ab.starts_at,
                ends_at=ab.ends_at,
                title=ab.title,
                notes=ab.notes,
                status=ab.status,
                source="anny",
            )
            db.add(db_booking)

    await set_last_anny_sync_timestamp(db, datetime.utcnow())
    await db.commit()

    return {"synced": len(anny_bookings)}

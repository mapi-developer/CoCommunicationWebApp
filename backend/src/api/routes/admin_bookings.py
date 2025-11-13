from __future__ import annotations

from datetime import datetime
from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, Path
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from ...db.session import get_session
from ...db.models.booking import Booking  # adjust import
from ...integrations.anny_client import AnnyClient, AnnyBooking

router = APIRouter(prefix="/admin/bookings", tags=["admin-bookings"])


class BookingCreate(BaseModel):
    resource_id: str
    user_id: Optional[int] = None
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
    id: int
    anny_booking_id: Optional[str]
    resource_id: str
    starts_at: datetime
    ends_at: datetime
    title: Optional[str]
    notes: Optional[str]
    status: str


@router.get("", response_model=List[BookingRead])
async def list_bookings(db: AsyncSession = Depends(get_session)):
    result = await db.execute(Booking.__table__.select())
    rows = result.fetchall()
    return [
        BookingRead(
            id=row.id,
            anny_booking_id=row.anny_booking_id,
            resource_id=row.resource_id,
            starts_at=row.starts_at,
            ends_at=row.ends_at,
            title=row.title,
            notes=row.notes,
            status=row.status,
        )
        for row in rows
    ]


@router.post("", response_model=BookingRead)
async def create_booking(
    body: BookingCreate,
    db: AsyncSession = Depends(get_session),
):
    anny = AnnyClient()

    # map to Anny payload fields exactly as docs say
    payload = {
        "resourceId": body.resource_id,
        "start": body.starts_at.isoformat(),
        "end": body.ends_at.isoformat(),
        "title": body.title,
        "notes": body.notes,
        # contact/customer info if required
    }

    try:
        anny_booking = await anny.create_booking(payload)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Anny error: {exc}")

    booking = Booking(
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
    db.add(booking)
    await db.commit()
    await db.refresh(booking)

    return BookingRead(**booking.__dict__)


@router.put("/{booking_id}", response_model=BookingRead)
async def update_booking(
    booking_id: int = Path(...),
    body: BookingUpdate = ...,
    db: AsyncSession = Depends(get_session),
):
    result = await db.execute(
        Booking.__table__.select().where(Booking.id == booking_id)
    )
    booking_row = result.first()
    if not booking_row:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking = booking_row

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

    anny = AnnyClient()
    if booking.anny_booking_id:
        await anny.update_booking(booking.anny_booking_id, anny_payload)

    # Update local record
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(booking, key, value)

    await db.commit()
    await db.refresh(booking)

    return BookingRead(**booking.__dict__)


@router.post("/sync-from-anny")
async def sync_from_anny(db: AsyncSession = Depends(get_session)):
    anny = AnnyClient()

    # store this in some settings table; here assume function
    last_sync = await get_last_anny_sync_timestamp(db)

    anny_bookings = await anny.list_bookings(updated_since=last_sync)

    for ab in anny_bookings:
        result = await db.execute(
            Booking.__table__.select().where(Booking.anny_booking_id == ab.id)
        )
        row = result.first()
        if row:
            b = row
            b.starts_at = ab.starts_at
            b.ends_at = ab.ends_at
            b.title = ab.title
            b.notes = ab.notes
            b.status = ab.status
        else:
            b = Booking(
                anny_booking_id=ab.id,
                resource_id=ab.resource_id,
                starts_at=ab.starts_at,
                ends_at=ab.ends_at,
                title=ab.title,
                notes=ab.notes,
                status=ab.status,
                source="anny",
            )
            db.add(b)

    await set_last_anny_sync_timestamp(db, datetime.utcnow())
    await db.commit()

    return {"synced": len(anny_bookings)}

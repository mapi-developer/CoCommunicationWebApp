# backend/app/routers/bookings.py
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..anny_client import anny_client
from ..config import settings

router = APIRouter(prefix="/api/bookings", tags=["bookings"])


class CreateBookingPayload(BaseModel):
    # ⚠️ Adjust fields to match anny's booking schema!
    resource_id: str
    start: str  # ISO datetime string
    end: str    # ISO datetime string
    customer_name: str
    customer_email: str
    # add more fields as required by anny


@router.post("")
async def create_booking(payload: CreateBookingPayload) -> Any:
    """
    Create a booking via anny.
    """
    # ⚠️ Replace with correct bookings create endpoint path
    path = "/bookings"

    data = payload.dict()

    # If anny wants tenant/customer ID as part of body:
    if settings.ANNY_TENANT_ID:
        data.setdefault("tenantId", settings.ANNY_TENANT_ID)

    resp = await anny_client.post(path, json=data)

    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    return resp.json()


@router.delete("/{booking_id}")
async def cancel_booking(booking_id: str) -> Any:
    """
    Cancel a booking via anny.
    """
    # ⚠️ Replace with actual booking cancel/ delete endpoint
    path = f"/bookings/{booking_id}"

    params = {}
    if settings.ANNY_TENANT_ID:
        params["tenantId"] = settings.ANNY_TENANT_ID

    resp = await anny_client.delete(path, params=params)

    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    return {"status": "cancelled", "booking_id": booking_id}

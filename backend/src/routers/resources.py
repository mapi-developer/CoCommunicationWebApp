# backend/app/routers/resources.py
from datetime import datetime
from typing import Any, Dict, Optional

from fastapi import APIRouter, HTTPException, Query

from ..anny_client import anny_client
from ..config import settings

router = APIRouter(prefix="/api/resources", tags=["resources"])


@router.get("")
async def list_resources() -> Any:
    """
    Return list of bookable resources (rooms/desks) from anny.
    """

    path = "/resources"

    params: Dict[str, Any] = {}

    # If anny needs tenant/customer in query:
    if settings.ANNY_TENANT_ID:
        params["tenantId"] = settings.ANNY_TENANT_ID

    resp = await anny_client.get(path, params=params)

    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    return resp.json()


@router.get("/{resource_id}/slots")
async def get_resource_slots(
    resource_id: str,
    start: datetime = Query(..., description="Start datetime (ISO8601)"),
    end: datetime = Query(..., description="End datetime (ISO8601)"),
) -> Any:
    """
    Return available time slots for the given resource between start/end.
    """

    # ⚠️ Replace with the actual availability endpoint path.
    path = f"/resources/{resource_id}/slots"

    params: Dict[str, Any] = {
        "start": start.isoformat(),
        "end": end.isoformat(),
    }

    if settings.ANNY_TENANT_ID:
        params["tenantId"] = settings.ANNY_TENANT_ID

    resp = await anny_client.get(path, params=params)

    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    return resp.json()

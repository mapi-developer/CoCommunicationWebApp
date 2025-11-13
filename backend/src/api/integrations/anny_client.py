# backend/src/integrations/anny_client.py
from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional

import httpx
from pydantic import BaseModel
from ...core.config import settings  # adjust to your config module


class AnnyBooking(BaseModel):
    id: str
    resource_id: str
    starts_at: datetime
    ends_at: datetime
    title: Optional[str] = None
    notes: Optional[str] = None
    status: str


class AnnyClient:
    def __init__(self, api_token: str | None = None):
        self.api_token = api_token or settings.ANNY_API_TOKEN
        self.base_url = settings.ANNY_BASE_URL.rstrip("/")
        self._client = httpx.AsyncClient(
            base_url=self.base_url,
            headers={
                "Authorization": f"Bearer {self.api_token}",
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            timeout=15.0,
        )

    async def close(self) -> None:
        await self._client.aclose()

    async def list_bookings(
        self,
        updated_since: Optional[datetime] = None,
    ) -> List[AnnyBooking]:
        params: Dict[str, Any] = {}
        if updated_since is not None:
            # adjust param name based on real docs (e.g. updatedAt[gt] or changed_since)
            params["updated_since"] = updated_since.isoformat()

        resp = await self._client.get("/bookings", params=params)
        resp.raise_for_status()
        data = resp.json()

        # adjust data["items"] or similar based on real response shape
        return [AnnyBooking(**item) for item in data["items"]]

    async def create_booking(self, payload: Dict[str, Any]) -> AnnyBooking:
        # payload must match anny's booking creation schema (resource, time, user, etc.)
        resp = await self._client.post("/bookings", json=payload)
        resp.raise_for_status()
        return AnnyBooking(**resp.json())

    async def update_booking(self, anny_booking_id: str, payload: Dict[str, Any]) -> AnnyBooking:
        resp = await self._client.patch(f"/bookings/{anny_booking_id}", json=payload)
        resp.raise_for_status()
        return AnnyBooking(**resp.json())

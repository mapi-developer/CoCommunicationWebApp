# backend/anny_client.py
from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Optional

import httpx
import os
from pydantic import BaseModel


ANNY_BASE_URL = os.getenv("ANNY_BASE_URL", "https://api.anny.co").rstrip("/")
ANNY_API_TOKEN = os.getenv("ANNY_API_TOKEN")


class AnnyBooking(BaseModel):
    id: str
    resource_id: str
    starts_at: datetime
    ends_at: datetime
    title: Optional[str] = None
    notes: Optional[str] = None
    status: str


class AnnyClient:
    def __init__(self, api_token: Optional[str] = None):
        self.api_token = api_token or ANNY_API_TOKEN
        if not self.api_token:
            raise RuntimeError("ANNY_API_TOKEN is not set")
        self._client = httpx.AsyncClient(
            base_url=ANNY_BASE_URL,
            headers={
                "Authorization": f"Bearer {self.api_token}",
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            timeout=15.0,
        )

    async def list_bookings(
        self,
        updated_since: Optional[datetime] = None,
    ) -> List[AnnyBooking]:
        params: Dict[str, Any] = {}
        if updated_since is not None:
            # adapt param key to what docs say, e.g. "changedSince"
            params["updated_since"] = updated_since.isoformat()

        resp = await self._client.get("/bookings", params=params)
        resp.raise_for_status()
        data = resp.json()

        # adapt "items" to actual response key
        return [AnnyBooking(**item) for item in data["items"]]

    async def create_booking(self, payload: Dict[str, Any]) -> AnnyBooking:
        resp = await self._client.post("/bookings", json=payload)
        resp.raise_for_status()
        return AnnyBooking(**resp.json())

    async def update_booking(self, booking_id: str, payload: Dict[str, Any]) -> AnnyBooking:
        resp = await self._client.patch(f"/bookings/{booking_id}", json=payload)
        resp.raise_for_status()
        return AnnyBooking(**resp.json())

    async def test_token(self) -> None:
        # cheap ping: just try list_bookings with limit 1 or similar
        await self.list_bookings()

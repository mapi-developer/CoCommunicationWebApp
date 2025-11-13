# backend/src/api/routes/anny_integration.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..integrations.anny_client import AnnyClient
from ...db.session import get_session
from ...db.models import IntegrationSettings

router = APIRouter(prefix="/admin/anny", tags=["anny"])


class AnnyConnectBody(BaseModel):
    api_token: str


@router.post("/connect")
async def connect_anny(body: AnnyConnectBody):
    # Test token by calling a simple endpoint
    client = AnnyClient(api_token=body.api_token)
    try:
        # Pick the cheapest endpoint from docs, eg. /me or /ping
        # Here we'll just try list_bookings with no params.
        await client.list_bookings()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Invalid token or API error: {exc}")

    # Save encrypted token in DB or secrets store
    # (simplified – you’d probably want a settings/service table)
    # ...

    return {"status": "connected"}

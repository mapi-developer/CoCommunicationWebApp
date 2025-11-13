from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..integrations.anny_client import AnnyClient

router = APIRouter(prefix="/admin/anny", tags=["anny"])

class AnnyConnectBody(BaseModel):
    api_token: str

@router.post("/connect")
async def connect_anny(body: AnnyConnectBody):
    client = AnnyClient(api_token=body.api_token)
    try:
        # cheapest test call, e.g. list_bookings with small limit
        await client.list_bookings()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Token invalid or API error: {exc}")

    # TODO save encrypted token in DB or config (not just memory)
    # For now you might still use .env during development.

    return {"status": "connected"}

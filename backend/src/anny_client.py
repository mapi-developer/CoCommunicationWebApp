# backend/app/anny_client.py
from typing import Any, Dict, Optional

import httpx

from .config import settings


class AnnyClient:
    def __init__(self) -> None:
        self.base_url = settings.ANNY_BASE_URL
        self.token = settings.ANNY_API_TOKEN
        self.verify_ssl = settings.ANNY_VERIFY_SSL

        self.auth_header_name = "Authorization"
        self.auth_header_prefix = "Bearer"

        self._client = httpx.AsyncClient(
            base_url=self.base_url,
            timeout=15.0,
            verify=self.verify_ssl, 
        )

    @property
    def _headers(self) -> Dict[str, str]:
        return {
            self.auth_header_name: f"{self.auth_header_prefix} {self.token}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

    async def get(
        self,
        path: str,
        params: Optional[Dict[str, Any]] = None,
    ) -> httpx.Response:
        return await self._client.get(path, headers=self._headers, params=params)

    async def post(
        self,
        path: str,
        json: Optional[Dict[str, Any]] = None,
    ) -> httpx.Response:
        return await self._client.post(path, headers=self._headers, json=json)

    async def delete(
        self,
        path: str,
        params: Optional[Dict[str, Any]] = None,
    ) -> httpx.Response:
        return await self._client.delete(path, headers=self._headers, params=params)

    async def aclose(self) -> None:
        await self._client.aclose()


anny_client = AnnyClient()

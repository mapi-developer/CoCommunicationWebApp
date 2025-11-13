# backend/app/config.py
from typing import Optional
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Base URL for anny’s API (from their docs for your account)
    ANNY_BASE_URL: str = "https://b.api.anny.co/api/v1"

    # Token or API key for anny
    ANNY_API_TOKEN: str
    ANNY_VERIFY_SSL: bool = False 
    # Optional: tenant or customer IDs if anny uses them in paths/queries
    ANNY_TENANT_ID: Optional[str] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

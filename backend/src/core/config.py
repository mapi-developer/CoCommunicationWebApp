from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # existing fields...
    ANNY_BASE_URL: str = "https://api.anny.co"
    ANNY_API_TOKEN: str

    class Config:
        env_file = ".env"

settings = Settings()

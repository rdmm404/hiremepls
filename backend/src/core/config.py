from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_HOST: str
    DATABASE_PORT: int
    DATABASE_DB: str = ""
    ENVIRONMENT: Literal["dev", "prd"] = "dev"


settings = Settings()  # type: ignore

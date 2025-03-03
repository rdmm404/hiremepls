from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    API_V1_STR: str = "/api/v1"
    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_HOST: str
    DATABASE_PORT: int
    DATABASE_DB: str = ""
    ENVIRONMENT: Literal["dev", "prd"] = "dev"
    SECRET_KEY: str


settings = Settings()  # type: ignore

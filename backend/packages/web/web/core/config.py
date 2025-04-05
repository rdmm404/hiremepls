from pydantic_settings import BaseSettings, SettingsConfigDict

from lib.settings import DatabaseSettings, EnvironmentSettings


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    FRONTEND_URL: str = "http://localhost:8766"


settings = Settings()  # type: ignore
db_settings = DatabaseSettings()  # type: ignore
env_settings = EnvironmentSettings()  # type:ignore

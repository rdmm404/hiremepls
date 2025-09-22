from lib.settings import DatabaseSettings, EnvironmentSettings


def get_connection_string(settings: DatabaseSettings, env_settings: EnvironmentSettings) -> str:
    conn = (
        f"postgresql+psycopg://"
        f"{settings.DATABASE_USER}:{settings.DATABASE_PASSWORD}@"
        f"{settings.DATABASE_HOST}:{settings.DATABASE_PORT}"
        f"/{settings.DATABASE_DB}"
    )
    if env_settings.ENVIRONMENT == "prd":
        conn += "?sslmode=require&channel_binding=require"
    return conn

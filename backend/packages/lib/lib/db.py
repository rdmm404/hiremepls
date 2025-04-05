from lib.settings import DatabaseSettings


def get_connection_string(settings: DatabaseSettings) -> str:
    return (
        f"postgresql+psycopg://"
        f"{settings.DATABASE_USER}:{settings.DATABASE_PASSWORD}@"
        f"{settings.DATABASE_HOST}:{settings.DATABASE_PORT}"
        f"/{settings.DATABASE_DB}"
    )

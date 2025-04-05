from sqlmodel import create_engine

from web.core.config import settings, db_settings
from lib.db import get_connection_string


engine = create_engine(
    get_connection_string(db_settings),
    echo=settings.ENVIRONMENT == "dev",
)

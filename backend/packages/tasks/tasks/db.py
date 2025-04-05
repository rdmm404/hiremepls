from sqlmodel import create_engine

from tasks.settings import env_settings, db_settings
from lib.db import get_connection_string


engine = create_engine(
    get_connection_string(db_settings),
    echo=env_settings.ENVIRONMENT == "dev",
)

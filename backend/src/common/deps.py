import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated, Generator
from sqlmodel import Session

from src.core.db import engine
from src.core.config import settings
from src.users.models import User
from src.auth import crypto

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

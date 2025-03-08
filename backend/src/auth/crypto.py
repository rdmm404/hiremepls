import jwt
from jwt.exceptions import InvalidTokenError
from datetime import datetime, timedelta, timezone
from typing import Any, cast
from passlib.context import CryptContext
from passlib.exc import UnknownHashError
from pydantic import BaseModel, ValidationError
from loguru import logger

from src.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ALGORITHM = "HS256"


class TokenPayload(BaseModel):
    sub: str
    exp: datetime | None = None


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = TokenPayload(exp=expire, sub=str(subject))
    encoded_jwt = jwt.encode(to_encode.model_dump(), settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_subject_from_token(token: str) -> str | None:
    try:
        data = jwt.decode(token, settings.SECRET_KEY, algorithms=ALGORITHM)
        payload = TokenPayload(**data)
    except (InvalidTokenError, ValidationError):
        return None

    return payload.sub


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        result: bool = pwd_context.verify(plain_password, hashed_password)
    except UnknownHashError:
        result = False
        logger.warning(f"Unknown hash found {hashed_password}")

    return result


def get_password_hash(password: str) -> str:
    return cast(str, pwd_context.hash(password))

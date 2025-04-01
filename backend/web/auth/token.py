import jwt
from jwt.exceptions import InvalidTokenError
from datetime import datetime, timedelta, timezone
from typing import Any
from pydantic import BaseModel, ValidationError

from web.core.config import settings

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

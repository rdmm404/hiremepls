from typing import cast
from passlib.context import CryptContext
from passlib.exc import UnknownHashError
from loguru import logger


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        result: bool = pwd_context.verify(plain_password, hashed_password)
    except UnknownHashError:
        result = False
        logger.warning(f"Unknown hash found {hashed_password}")

    return result


def get_password_hash(password: str) -> str:
    return cast(str, pwd_context.hash(password))

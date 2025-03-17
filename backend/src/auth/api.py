from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from src.auth import crypto
from src.core.config import settings
from src.users.deps import UserRepositoryDep

router = APIRouter(prefix="/auth", tags=["login"])


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/token")
def login_access_token(
    user_repo: UserRepositoryDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = user_repo.get_user_by_email(form_data.username)

    authenticated = crypto.verify_password(form_data.password, user.password) if user else False

    if not authenticated or not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    # TODO
    # elif not user.is_active:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=crypto.create_access_token(user.id, expires_delta=access_token_expires)
    )

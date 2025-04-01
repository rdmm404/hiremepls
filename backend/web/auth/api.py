from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from lib import crypto
from web.auth.token import create_access_token
from web.core.config import settings
from web.users.deps import UserRepositoryDep

router = APIRouter(prefix="/auth", tags=["auth"])


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/login")
def login_access_token(
    response: Response,
    user_repo: UserRepositoryDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = user_repo.get_user_by_email(form_data.username)

    authenticated = crypto.verify_password(form_data.password, user.password) if user else False

    if not authenticated or not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    # TODO
    # elif not user.is_active:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    token = create_access_token(user.id, expires_delta=access_token_expires)

    response.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        secure=settings.ENVIRONMENT != "dev",
        samesite="lax" if settings.ENVIRONMENT == "dev" else "none",
    )
    return Token(access_token=token)


@router.post("/logout")
def logout(response: Response) -> Response:
    response.status_code = status.HTTP_204_NO_CONTENT
    response.delete_cookie(key="jwt")
    return response

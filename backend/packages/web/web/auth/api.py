from datetime import timedelta
from typing import Annotated, Any, cast

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, Field, model_validator, AfterValidator

from lib import crypto
from lib.model import UserCreate
from web.auth.token import create_access_token
from web.core.config import env_settings, settings
from web.users.deps import UserRepositoryDep
from web.auth.validators import validate_password, validate_no_numbers

router = APIRouter(prefix="/auth", tags=["auth"])


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserRegistration(BaseModel):
    email: EmailStr
    password: Annotated[str, AfterValidator(validate_password)]
    password_confirm: str
    name: Annotated[
        str,
        Field(min_length=1, description="User's first name"),
        AfterValidator(validate_no_numbers),
    ]
    last_name: Annotated[
        str,
        Field(min_length=1, description="User's last name"),
        AfterValidator(validate_no_numbers),
    ]

    @model_validator(mode="after")
    def passwords_match(cls, model: Any) -> Any:
        if model.password != model.password_confirm:
            raise ValueError("Passwords do not match")
        return model


class RegistrationResponse(BaseModel):
    user_id: int


@router.post("/signup", response_model=RegistrationResponse)
def register(
    response: Response,
    user_repo: UserRepositoryDep,
    registration: UserRegistration,
) -> RegistrationResponse:
    # Check if user already exists
    if user_repo.get_user_by_email(registration.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    # Create the user
    user = user_repo.create_user(
        UserCreate(
            email=registration.email,
            password=registration.password,
            name=registration.name,
            last_name=registration.last_name,
        )
    )

    # Generate access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(cast(int, user.id), expires_delta=access_token_expires)

    # Set cookie
    response.set_cookie(
        key="jwt",
        value=token,
        httponly=True,
        secure=env_settings.ENVIRONMENT != "dev",
        samesite="lax" if env_settings.ENVIRONMENT == "dev" else "none",
    )

    return RegistrationResponse(user_id=cast(int, user.id))


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
        secure=env_settings.ENVIRONMENT != "dev",
        samesite="lax" if env_settings.ENVIRONMENT == "dev" else "none",
    )
    return Token(access_token=token)


@router.post("/logout")
def logout(response: Response) -> Response:
    response.status_code = status.HTTP_204_NO_CONTENT
    response.delete_cookie(key="jwt")
    return response

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status, Request

from typing import Annotated

from lib.model import User
from web.auth.token import get_subject_from_token
from web.common.deps import SessionDep


class Oauth2PasswordBearerFromCookies(OAuth2PasswordBearer):
    async def __call__(self, request: Request) -> str | None:
        token_from_cookie = request.cookies.get("jwt")
        if token_from_cookie:
            return token_from_cookie
        return await super().__call__(request)


reusable_oauth2 = Oauth2PasswordBearerFromCookies(tokenUrl="/auth/login")


TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    id = get_subject_from_token(token)

    if not id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    user = session.get(User, id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    # TODO:
    # if not user.is_active:
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return user


DependsCurrentUser = Depends(get_current_user)
CurrentUserDep = Annotated[User, DependsCurrentUser]


def get_current_active_superuser(current_user: CurrentUserDep) -> User:
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user


DependsCurrentSuperUser = Depends(get_current_active_superuser)
CurrentSuperUserDep = Annotated[User, DependsCurrentSuperUser]

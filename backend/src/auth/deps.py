from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status

from typing import Annotated

from src.users.models import User
from src.auth import crypto
from src.common.deps import SessionDep


reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/token")


TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(session: SessionDep, token: TokenDep) -> User:
    id = crypto.get_subject_from_token(token)

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


CurrentUserDep = Annotated[User, Depends(get_current_user)]


def get_current_active_superuser(current_user: CurrentUserDep) -> User:
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user

CurrentSuperUserDep = Annotated[User, Depends(get_current_active_superuser)]
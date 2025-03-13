from fastapi import Depends
from typing import Annotated

from src.common.deps import SessionDep
from src.users.repository import UserRepository


def get_user_repository(session: SessionDep) -> UserRepository:
    return UserRepository(session)


UserRepositoryDep = Annotated[UserRepository, Depends(get_user_repository)]

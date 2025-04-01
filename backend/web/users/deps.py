from fastapi import Depends
from typing import Annotated

from web.common.deps import SessionDep
from lib.users.repository import UserRepository


def get_user_repository(session: SessionDep) -> UserRepository:
    return UserRepository(session)


UserRepositoryDep = Annotated[UserRepository, Depends(get_user_repository)]

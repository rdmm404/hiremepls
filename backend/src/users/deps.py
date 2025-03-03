from fastapi import Depends
from typing import Annotated, Generator

from src.users.user_repository import UserRepository


def get_user_repository() -> Generator[UserRepository, None, None]:
    with UserRepository() as user_repo:
        yield user_repo


UserRepositoryDep = Annotated[UserRepository, Depends(get_user_repository)]

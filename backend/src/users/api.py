from fastapi import APIRouter, HTTPException, status, Response
from sqlalchemy.exc import IntegrityError
from typing import cast

from src.users.models import UserCreate
from src.users.api_schema import User
from src.users.deps import UserRepositoryDep
from src.auth.deps import DependsCurrentSuperUser, CurrentUserDep

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me")
async def get_my_user(user: CurrentUserDep) -> User:
    return User(**user.model_dump())


@router.get("/", dependencies=[DependsCurrentSuperUser])
async def list_users(user_repo: UserRepositoryDep, limit: int = 10, offset: int = 0) -> list[User]:
    users_db = user_repo.get_all_users(limit, offset)
    return [User(**u.model_dump()) for u in users_db]


@router.get("/{user_id}/", dependencies=[DependsCurrentSuperUser], response_model=User)
async def get_user(user_id: int, user_repo: UserRepositoryDep) -> User:
    user = user_repo.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return cast(User, user)


@router.post("/", dependencies=[DependsCurrentSuperUser], response_model=User)
async def create_user(user: UserCreate, user_repo: UserRepositoryDep) -> User:
    user_already_exists = HTTPException(
        status_code=400,
        detail="User already exists.",
    )

    existing_user = user_repo.get_user_by_email(user.email)
    if existing_user:
        raise user_already_exists

    try:
        user_db = user_repo.create_user(user)
    except IntegrityError:
        raise user_already_exists

    return cast(User, user_db)


@router.delete(
    "/{user_id}/",
    dependencies=[DependsCurrentSuperUser],
)
def delete_user(user_id: int, user_repo: UserRepositoryDep) -> Response:
    if not user_repo.delete_user(user_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return Response(status_code=status.HTTP_204_NO_CONTENT)

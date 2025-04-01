from fastapi import APIRouter, HTTPException, status, Response
from sqlalchemy.exc import IntegrityError

from web.users.models import UserCreate, User as UserDB
from web.users.api_schema import User
from web.users.deps import UserRepositoryDep
from web.auth.deps import DependsCurrentSuperUser, CurrentUserDep
from web.common.deps import PaginationDep
from web.common.pagination import PaginatedResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/me", description="Get the information of the current logged in user.", response_model=User
)
async def get_my_user(user: CurrentUserDep) -> UserDB:
    return user


@router.get("/", dependencies=[DependsCurrentSuperUser], response_model=PaginatedResponse[User])
async def list_users(
    user_repo: UserRepositoryDep, pagination: PaginationDep
) -> PaginatedResponse[UserDB]:
    count_users = user_repo.count_all_users()
    return pagination.handle_pagination(count_users, user_repo.get_all_users)


@router.get("/{user_id}/", dependencies=[DependsCurrentSuperUser], response_model=User)
async def get_user(user_id: int, user_repo: UserRepositoryDep) -> UserDB:
    user = user_repo.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.post("/", dependencies=[DependsCurrentSuperUser], response_model=User)
async def create_user(user: UserCreate, user_repo: UserRepositoryDep) -> UserDB:
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

    return user_db


@router.delete(
    "/{user_id}/",
    dependencies=[DependsCurrentSuperUser],
)
def delete_user(user_id: int, user_repo: UserRepositoryDep) -> Response:
    if not user_repo.delete_user(user_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return Response(status_code=status.HTTP_204_NO_CONTENT)

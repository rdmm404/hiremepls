from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

from src.users.models import UserCreate
from src.users.schema import User
from src.users.deps import UserRepositoryDep

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
async def list_users(user_repo: UserRepositoryDep, limit: int = 10, offset: int = 0) -> list[User]:
    users_db = user_repo.get_all_users(limit, offset)
    return [User(**u.model_dump()) for u in users_db]


@router.get("/{user_id}")
async def get_user(user_id: int, user_repo: UserRepositoryDep) -> User:
    user = user_repo.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return User(**user.model_dump())


@router.post("/")
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

    return User(**user_db.model_dump())

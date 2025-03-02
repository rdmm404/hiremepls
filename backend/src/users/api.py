from fastapi import APIRouter, HTTPException
from sqlmodel import select
from typing import cast

from src.users.models import User, UserCreate
from src.common.deps import SessionDep

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
def list_users(session: SessionDep) -> list[User]:
    query = select(User).limit(50)
    users = cast(list, session.exec(query).all())
    return users


@router.get("/{user_id}")
def get_user(user_id: int, session: SessionDep) -> User:
    query = select(User).where(User.id == user_id)
    user = session.exec(query).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.post("/")
def create_user(user: UserCreate, session: SessionDep) -> User:
    user_db = User.model_validate(user)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db

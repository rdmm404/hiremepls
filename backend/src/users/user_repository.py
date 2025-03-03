from typing import cast
from sqlmodel import select

from src.common.base_repository import BaseRepository
from src.users.models import UserCreate, User


class UserRepository(BaseRepository):
    def get_all_users(self, limit: int = 10, offset: int = 0) -> list[User]:
        query = select(User).limit(limit).offset(offset)
        return cast(list, self.session.exec(query).all())

    def get_user_by_id(self, user_id: int) -> User | None:
        query = select(User).where(User.id == user_id)
        return self.session.exec(query).first()

    def get_user_by_email(self, email: str) -> User | None:
        query = select(User).where(User.email == email)
        return self.session.exec(query).first()

    def create_user(self, user: UserCreate) -> User:
        user_db = User.model_validate(user)
        self.session.add(user_db)
        self.session.commit()
        self.session.refresh(user_db)
        return user_db

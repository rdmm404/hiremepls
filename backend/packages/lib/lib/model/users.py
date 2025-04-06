from pydantic import EmailStr
from sqlmodel import Field, String, Relationship
from typing import TYPE_CHECKING

from lib.model.base import BaseSQLModel

if TYPE_CHECKING:
    from lib.model.applications import Application
    from lib.model.tasks import Task

SCHEMA_NAME = "users"


class UsersModel(BaseSQLModel):
    __table_args__ = {"schema": SCHEMA_NAME}


class UserBase(UsersModel):
    name: str
    last_name: str
    email: EmailStr = Field(index=True, unique=True, sa_type=String())  # type: ignore
    is_superuser: bool = False


class UserCreate(UserBase):
    password: str


class User(UserBase, table=True):
    password: str
    applications: list["Application"] = Relationship(back_populates="user")
    tasks: list["Task"] = Relationship(back_populates="user")

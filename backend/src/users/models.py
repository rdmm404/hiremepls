from pydantic import EmailStr
from sqlmodel import SQLModel, Field, String

SCHEMA_NAME = "users"


class UsersModel(SQLModel):
    __table_args__ = {"schema": SCHEMA_NAME}


class UserBase(UsersModel):
    name: str
    last_name: str
    email: EmailStr = Field(index=True, unique=True, sa_type=String())  # type: ignore
    is_superuser: bool = False


class UserCreate(UserBase):
    password: str


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str

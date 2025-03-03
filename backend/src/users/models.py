from pydantic import EmailStr
from sqlmodel import SQLModel, Field, String


class UserBase(SQLModel):
    name: str
    last_name: str
    email: EmailStr = Field(index=True, unique=True, sa_type=String())  # type: ignore
    is_superuser: bool = False


class UserCreate(UserBase):
    password: str


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str

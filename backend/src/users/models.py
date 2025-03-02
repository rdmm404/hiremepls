from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    name: str
    last_name: str
    email: str = Field(index=True, unique=True)
    is_superuser: bool = False


class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    id: int


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str
    is_superuser: bool = False

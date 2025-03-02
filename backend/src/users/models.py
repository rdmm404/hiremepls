from sqlmodel import SQLModel, Field


class BaseUser(SQLModel):
    name: str
    last_name: str
    email: str = Field(index=True, unique=True)


class UserCreate(BaseUser): ...


class User(BaseUser, table=True):
    id: int | None = Field(default=None, primary_key=True)

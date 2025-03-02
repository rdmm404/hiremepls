from sqlmodel import SQLModel, Field

class BaseUser(SQLModel):
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)

class UserCreate(BaseUser):
    ...

class User(BaseUser, table=True):
    id: int | None = Field(default=None, primary_key=True)

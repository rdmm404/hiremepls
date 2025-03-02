from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager
from sqlmodel import select, SQLModel

from src.models import User, UserCreate
from src.deps import SessionDep
from src.core.db import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing database")
    SQLModel.metadata.create_all(engine)
    yield


app = FastAPI(lifespan=lifespan)


class HelloResponse(BaseModel):
    message: str


@app.get("/")
async def hello(name: str) -> HelloResponse:
    return HelloResponse(message=f"Hello, {name}!")


@app.post("/users")
def create_user(user: UserCreate, session: SessionDep) -> User:
    user_db = User.model_validate(user)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db


@app.get("/users/{user_id}")
def get_user(user_id: int, session: SessionDep) -> User:
    query = select(User).where(User.id == user_id)
    user = session.exec(query).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
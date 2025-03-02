from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlmodel import SQLModel
from loguru import logger

from src.core.db import engine
from src.users.api import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.debug("Initializing database")
    SQLModel.metadata.create_all(engine)
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(users_router)

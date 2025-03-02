from fastapi import Depends
from typing import Annotated, Generator
from sqlmodel import Session
from src.core.db import engine


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

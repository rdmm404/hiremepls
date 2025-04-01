from fastapi import Depends
from sqlmodel import Session
from typing import Annotated, Generator

from web.core.db import engine
from web.common.pagination import Pagination


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


PaginationDep = Annotated[Pagination, Depends(Pagination())]

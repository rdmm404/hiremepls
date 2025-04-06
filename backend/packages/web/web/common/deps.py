from fastapi import Depends
from sqlmodel import Session
from typing import Annotated, Generator

from web.core.db import engine
from web.common.pagination import Pagination
from web.common.tasks_client import TasksClient


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


PaginationDep = Annotated[Pagination, Depends(Pagination())]


def get_tasks_client(session: SessionDep):
    return TasksClient(session)


TasksClientDep = Annotated[TasksClient, Depends(get_tasks_client)]

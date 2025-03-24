import math
from fastapi import Depends, Query
from typing import Annotated, Generator, Callable, Sequence
from sqlmodel import Session

from src.core.db import engine
from src.common.api_schema import RequestPagination, PaginatedResponse


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


class Pagination:
    def __init__(self, request_pagination: Annotated[RequestPagination, Query()]):
        self.pagination = request_pagination

    def handle_pagination[T](
        self, count: int, data_func: Callable[[int, int], Sequence[T]]
    ) -> PaginatedResponse[T]:
        limit = self.pagination.page_size
        offset = (self.pagination.page - 1) * self.pagination.page_size
        pages = math.ceil(count / self.pagination.page_size)

        next_page = self.pagination.page + 1 if self.pagination.page < pages else None

        data: Sequence[T] = data_func(limit, offset) if self.pagination.page <= pages else []

        return PaginatedResponse(
            page=self.pagination.page,
            next_page=next_page,
            total_pages=pages,
            item_count=count,
            data=data,
        )


PaginationDep = Annotated[Pagination, Depends(Pagination)]

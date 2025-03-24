from collections.abc import Sequence
from pydantic import BaseModel


class RequestPagination(BaseModel):
    page: int = 1
    page_size: int = 10


class PaginatedResponse[DataType](BaseModel):
    page: int
    next_page: int | None
    total_pages: int
    item_count: int
    data: Sequence[DataType]

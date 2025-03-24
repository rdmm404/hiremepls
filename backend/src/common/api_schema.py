from collections.abc import Sequence
from pydantic import BaseModel


class RequestPagination(BaseModel):
    page: int
    page_size: int


class PaginatedResponse[DataType](BaseModel):
    page: int
    next_page: int | None
    total_pages: int
    item_count: int
    data: Sequence[DataType]

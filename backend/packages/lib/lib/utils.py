from typing import Any
from sqlalchemy.types import String, TypeDecorator
from pydantic import HttpUrl


class HttpUrlType(TypeDecorator[HttpUrl]):
    impl = String(2083)
    cache_ok = True
    python_type = HttpUrl

    def process_bind_param(self, value: HttpUrl | None, dialect: Any) -> str | None:
        return str(value) if value else None

    def process_result_value(self, value: str | None, dialect: Any) -> HttpUrl | None:
        return HttpUrl(url=value) if value else None

    def process_literal_param(self, value: HttpUrl | None, dialect: Any) -> str:
        return str(value) if value else ""

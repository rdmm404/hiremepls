from typing import Any
from pydantic import HttpUrl
from sqlalchemy.types import String, TypeDecorator


class HttpUrlType(TypeDecorator[HttpUrl]):
    impl = String(2083)
    cache_ok = True
    python_type = HttpUrl

    def process_bind_param(self, value: HttpUrl | None, dialect: Any) -> str:
        return str(value)

    def process_result_value(self, value: str | None, dialect: Any) -> HttpUrl:
        return HttpUrl(url=value if value is not None else "")

    def process_literal_param(self, value: HttpUrl | None, dialect: Any) -> str:
        return str(value)

from typing import Any, Type
from sqlalchemy.types import String, TypeDecorator
from pydantic import HttpUrl
from slugify import slugify


class HttpUrlType(TypeDecorator[HttpUrl]):
    impl = String(2083)
    cache_ok = True

    @property
    def python_type(self) -> Type[HttpUrl]:
        return HttpUrl

    def process_bind_param(self, value: HttpUrl | None, dialect: Any) -> str | None:
        return str(value) if value else None

    def process_result_value(self, value: str | None, dialect: Any) -> HttpUrl | None:
        return HttpUrl(url=value) if value else None

    def process_literal_param(self, value: HttpUrl | None, dialect: Any) -> str:
        return str(value) if value else ""


def generate_slug(text: str) -> str:
    return slugify(text)

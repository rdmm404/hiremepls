from typing import Annotated
from pydantic import BaseModel, HttpUrl, AfterValidator


def is_https(value: HttpUrl) -> HttpUrl:
    if value.scheme != "https":
        raise ValueError(f"{value} non HTTPS urls are not supported")
    return value


class CreateJobByUrl(BaseModel):
    url: Annotated[HttpUrl, AfterValidator(is_https)]

from typing import Annotated
from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints

from src.jobs.models import JobBase, CompanyBase, CompensationBase


def is_https(value: HttpUrl) -> HttpUrl:
    if value.scheme != "https":
        raise ValueError(f"{value} non HTTPS urls are not supported")
    return value


def clean_url(value: HttpUrl) -> HttpUrl:
    port = ""
    if value.port:
        port = f":{value.port}"
    url = f"{value.scheme}://{value.host}{port}{value.path}"
    return HttpUrl(url)


class CreateJobByUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"]), AfterValidator(clean_url)]


class Company(CompanyBase): ...


class Compensation(CompensationBase): ...


class Job(JobBase):
    compensation: Compensation
    company: Company

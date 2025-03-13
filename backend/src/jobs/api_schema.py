from typing import Annotated
from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints

from src.jobs.models import JobBase, CompanyBase, CompensationBase
from src.common.utils import clean_url


class CreateJobByUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"]), AfterValidator(clean_url)]


class Company(CompanyBase): ...


class Compensation(CompensationBase): ...


class Job(JobBase):
    compensation: Compensation
    company: Company

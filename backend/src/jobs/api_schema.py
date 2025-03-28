from typing import Annotated
from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints

from src.jobs.models import JobBase, CompanyBase, CompensationBase, Modality
from src.common.utils import clean_url


class CreateJobByUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"]), AfterValidator(clean_url)]


class Company(CompanyBase):
    id: int


class CompanySummary(BaseModel):
    id: int
    name: str
    url: HttpUrl | None
    logo_url: str | None = None


class Compensation(CompensationBase):
    id: int


class Job(JobBase):
    id: int
    compensation: Compensation
    company: Company


class CompensationSummary(BaseModel):
    id: int
    currency: str | None = None
    minimum: float | None = None
    maximum: float | None = None


class JobSummary(BaseModel):
    id: int
    job_title: str
    job_url: HttpUrl
    llm_summary: str
    modality: list[Modality]
    location: str
    compensation: CompensationSummary
    company: Company

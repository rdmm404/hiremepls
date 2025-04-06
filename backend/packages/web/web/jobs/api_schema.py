from typing import Annotated
from pydantic import BaseModel, HttpUrl, UrlConstraints

from lib.model import JobBase, CompanyBase, CompensationBase, Modality


class CreateJobByUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"])]


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

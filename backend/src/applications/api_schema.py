from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints
from typing import Annotated

from src.applications.models import ApplicationBase, ApplicationStatus
from src.common.utils import clean_url
from src.jobs.api_schema import Job, JobSummary


class CreateApplicationByJobUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"]), AfterValidator(clean_url)]


class Application(ApplicationBase):
    id: int
    job: Job


class ApplicationSummary(BaseModel):
    status: ApplicationStatus
    fit: float | None = None
    job: JobSummary

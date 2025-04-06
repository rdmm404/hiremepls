from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints
from typing import Annotated

from lib.models import ApplicationBase, ApplicationStatus
from web.common.utils import clean_url
from web.jobs.api_schema import Job, JobSummary


class CreateApplicationByJobUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"]), AfterValidator(clean_url)]


class Application(ApplicationBase):
    id: int
    job: Job


class ApplicationSummary(BaseModel):
    id: int
    status: ApplicationStatus
    fit: float | None = None
    job: JobSummary


class UpdateApplicationPartial(ApplicationBase):
    status: ApplicationStatus | None = None  # type: ignore

from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints
from typing import Annotated

from lib.model import ApplicationBase, ApplicationStatus
from lib.repository.application import ApplicationAverages
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


class ApplicationStats(BaseModel):
    """Statistics about a user's applications."""

    total_applications: int
    status_counts: dict[ApplicationStatus, int]
    recent_applications_count: int  # Applications from last 7 days
    active_applications_count: int  # Applications not in terminal states
    averages: ApplicationAverages

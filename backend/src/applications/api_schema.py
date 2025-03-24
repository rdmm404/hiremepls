from pydantic import BaseModel, HttpUrl, AfterValidator, UrlConstraints
from typing import Annotated

from src.applications.models import ApplicationBase
from src.common.utils import clean_url
from src.jobs.api_schema import Job


class CreateApplicationByJobUrl(BaseModel):
    url: Annotated[HttpUrl, UrlConstraints(allowed_schemes=["https"]), AfterValidator(clean_url)]


class Application(ApplicationBase):
    id: int
    job: Job

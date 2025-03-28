from src.jobs.service import JobsService
from src.applications.models import Application
from src.applications.repository import ApplicationRepository
from src.users.models import User


class ApplicationsService:
    def __init__(self, jobs_service: JobsService, application_repo: ApplicationRepository):
        self.jobs_service = jobs_service
        self.application_repo = application_repo

    async def create_from_job_url(self, url: str, user: User) -> Application:
        job = await self.jobs_service.create_job_from_url(url)
        application = Application(user=user, job=job)
        return self.application_repo.create_application(application)

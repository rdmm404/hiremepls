from typing import cast

from web.jobs.service import JobsService
from lib.model import Application, User
from lib.repository.application import ApplicationRepository
from lib.tasks import CreateApplicationFromUrlParams, CreateApplicationFromUrlResponse
from web.common.tasks_client import TasksClient


class ApplicationsService:
    def __init__(
        self,
        jobs_service: JobsService,
        application_repo: ApplicationRepository,
        tasks_client: TasksClient,
    ):
        self.jobs_service = jobs_service
        self.application_repo = application_repo
        self.tasks_client = tasks_client

    async def create_from_job_url(self, url: str, user: User) -> Application:
        assert user.id  # To make pyright happy
        job = self.jobs_service.get_job_by_url(url)
        if job:
            application = Application(user=user, job=job)
            return self.application_repo.create_application(application)
        else:
            task_id = await self.tasks_client.create_task(
                "create_application_from_url",
                task_params=CreateApplicationFromUrlParams(url=url),
                user_id=user.id,
            )
            result = await self.tasks_client.wait_for_task(
                task_id, result_model=CreateApplicationFromUrlResponse
            )
            assert result, f"Application creation result is null for task {task_id}"

            assert result.success, f"Application creation unsuccessful {result.data}"
            data = cast(CreateApplicationFromUrlResponse, result.data)
            application = self.application_repo.get_application_by_id_and_user(
                application_id=data.application_id, user_id=user.id
            )
            assert application, "Application not found"
            return application

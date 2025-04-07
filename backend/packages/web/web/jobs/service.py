from loguru import logger
from typing import cast

from lib.repository.job import JobsRepository
from lib.model import Job
from lib.tasks import CreateJobFromUrlParams, CreateJobFromUrlResponse
from web.common.tasks_client import TasksClient


class JobsService:
    def __init__(self, jobs_repo: JobsRepository, tasks_client: TasksClient):
        self.jobs_repo = jobs_repo
        self.tasks_client = tasks_client

    async def create_job_from_url(self, url: str) -> Job:
        existing_job = self.jobs_repo.get_job_by_url(url)
        if existing_job:
            logger.info(f"Job with url {url} already exists, returning")
            return existing_job

        job_task_params = CreateJobFromUrlParams(url=url)
        task_id = await self.tasks_client.create_task(
            "create_job_from_url", job_task_params, user_id=None
        )
        result = await self.tasks_client.wait_for_task(
            task_id, result_model=CreateJobFromUrlResponse
        )

        assert result, f"Result is none for task {task_id}"
        assert result.success, f"Job creation unsuccessful {result.data}"

        data = cast(CreateJobFromUrlResponse, result)
        return self.jobs_repo.get_job(data.job_id)

    def get_job_by_url(self, url: str) -> Job | None:
        return self.jobs_repo.get_job_by_url(url)

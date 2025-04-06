from fastapi import Depends
from typing import Annotated

from web.common.deps import SessionDep, TasksClientDep
from web.jobs.service import JobsService
from lib.repository.job import JobsRepository


def get_jobs_repository(session: SessionDep) -> JobsRepository:
    return JobsRepository(session)


JobsRepositoryDep = Annotated[JobsRepository, Depends(get_jobs_repository)]


def get_job_service(jobs_repo: JobsRepositoryDep, tasks_client: TasksClientDep) -> JobsService:
    return JobsService(jobs_repo, tasks_client)


JobsServiceDep = Annotated[JobsService, Depends(get_job_service)]

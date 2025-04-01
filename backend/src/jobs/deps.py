from fastapi import Depends
from typing import Annotated

from src.common.deps import SessionDep
from src.jobs.service import JobsService
from src.jobs.repository import JobsRepository


def get_jobs_repository(session: SessionDep) -> JobsRepository:
    return JobsRepository(session)


JobsRepositoryDep = Annotated[JobsRepository, Depends(get_jobs_repository)]


def get_job_service(
    jobs_repo: JobsRepositoryDep,
) -> JobsService:
    return JobsService(jobs_repo)


JobsServiceDep = Annotated[JobsService, Depends(get_job_service)]

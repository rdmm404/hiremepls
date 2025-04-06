from typing import Annotated
from fastapi import Depends

from web.common.deps import SessionDep, TasksClientDep
from web.jobs.deps import JobsServiceDep
from web.applications.service import ApplicationsService
from lib.repository.application import ApplicationRepository


def get_applications_repository(session: SessionDep) -> ApplicationRepository:
    return ApplicationRepository(session)


ApplicationRepositoryDep = Annotated[ApplicationRepository, Depends(get_applications_repository)]


def get_application_service(
    jobs_service: JobsServiceDep,
    application_repo: ApplicationRepositoryDep,
    tasks_client: TasksClientDep,
) -> ApplicationsService:
    return ApplicationsService(jobs_service, application_repo, tasks_client)


ApplicationsServiceDep = Annotated[ApplicationsService, Depends(get_application_service)]

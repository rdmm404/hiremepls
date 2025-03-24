from fastapi import APIRouter, HTTPException, status

from typing import cast

from src.auth.deps import CurrentUserDep
from src.applications.deps import ApplicationsServiceDep, ApplicationRepositoryDep
from src.applications.api_schema import Application, CreateApplicationByJobUrl, ApplicationSummary
from src.applications.models import Application as ApplicationDB
from src.common.pagination import PaginatedResponse
from src.common.deps import PaginationDep

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/url", response_model=Application)
async def create_from_job_url(
    user: CurrentUserDep,
    applications_service: ApplicationsServiceDep,
    body: CreateApplicationByJobUrl,
) -> ApplicationDB:
    try:
        app = await applications_service.create_from_job_url(str(body.url), user)
    except Exception:  # TODO: Improve exception handling
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Application couldn't be parsed")
    return app


@router.get("/{application_id}", response_model=Application)
async def get_application(
    application_id: int, application_repo: ApplicationRepositoryDep, user: CurrentUserDep
) -> ApplicationDB:
    application = application_repo.get_application_by_id_and_user(
        application_id, cast(int, user.id)
    )
    if not application:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return application


@router.get("/", response_model=PaginatedResponse[ApplicationSummary])
async def list_applications(
    pagination: PaginationDep,
    application_repo: ApplicationRepositoryDep,
    user: CurrentUserDep,
) -> PaginatedResponse[ApplicationDB]:
    count = application_repo.count_all_user_applications(cast(int, user.id))

    return pagination.handle_pagination(
        count,
        lambda limit, offset: application_repo.get_all_user_applications(
            cast(int, user.id), limit, offset
        ),
    )

import traceback

from fastapi import APIRouter, HTTPException, status
from typing import cast
from loguru import logger

from web.auth.deps import CurrentUserDep, DependsCurrentUser
from web.applications.deps import ApplicationsServiceDep, ApplicationRepositoryDep
from web.applications.api_schema import (
    Application,
    CreateApplicationByJobUrl,
    ApplicationSummary,
    UpdateApplicationPartial,
    ApplicationStats,
)
from lib.model import Application as ApplicationDB, ApplicationStatus
from web.common.pagination import PaginatedResponse
from web.common.deps import PaginationDep
from web.applications.status_flow import validate_status_change, get_available_statuses

router = APIRouter(prefix="/applications", tags=["applications"], dependencies=[DependsCurrentUser])


@router.post("/url", response_model=Application)
async def create_from_job_url(
    user: CurrentUserDep,
    applications_service: ApplicationsServiceDep,
    body: CreateApplicationByJobUrl,
) -> ApplicationDB:
    try:
        app = await applications_service.create_from_job_url(str(body.url), user)
    except Exception as e:  # TODO: Improve exception handling
        logger.error(f"Error while creating application from url: {str(e)}")
        logger.debug(traceback.format_exc())
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Application couldn't be parsed")
    return app


@router.get("/status_flow")
def get_allowed_statuses_for_update(status: ApplicationStatus) -> list[ApplicationStatus]:
    return get_available_statuses(status)


@router.get("/stats", response_model=ApplicationStats)
async def get_application_stats(
    application_repo: ApplicationRepositoryDep,
    user: CurrentUserDep,
) -> ApplicationStats:
    """
    Get overview statistics of user's applications for the dashboard.
    Includes total count, status breakdowns, and other relevant metrics.
    """
    user_id = cast(int, user.id)
    total = application_repo.count_all_user_applications(user_id, include_pending=False)
    averages = application_repo.get_application_averages(user_id, total)

    return ApplicationStats(
        total_applications=total,
        status_counts=application_repo.get_application_count_per_status(
            user_id, include_pending=False
        ),
        recent_applications_count=application_repo.get_application_count_in_days(user_id, days=7),
        active_applications_count=application_repo.get_active_applications_count(user_id),
        averages=averages,
    )


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


@router.patch("/{application_id}")
def application_partial_update(
    application_id: int,
    app_updates: UpdateApplicationPartial,
    application_repo: ApplicationRepositoryDep,
    user: CurrentUserDep,
) -> ApplicationDB:
    existing_app = application_repo.get_application_by_id_and_user(
        application_id, cast(int, user.id)
    )
    if not existing_app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    result, msg = True, ""

    if app_updates.status:
        result, msg = validate_status_change(existing_app.status, app_updates.status)

    if not result:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, msg)

    app = existing_app.sqlmodel_update(app_updates.model_dump(exclude_unset=True))

    return application_repo.update_application(app)


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    application_repo: ApplicationRepositoryDep,
    user: CurrentUserDep,
) -> None:
    existing_app = application_repo.get_application_by_id_and_user(
        application_id, cast(int, user.id)
    )
    if not existing_app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    application_repo.delete_application(existing_app)

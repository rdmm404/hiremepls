from fastapi import APIRouter, HTTPException, status

from src.auth.deps import CurrentUserDep
from src.applications.deps import ApplicationsServiceDep
from src.applications.api_schema import Application, CreateApplicationByJobUrl
from src.applications.models import Application as ApplicationDB

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

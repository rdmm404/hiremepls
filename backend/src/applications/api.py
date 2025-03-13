from fastapi import APIRouter

from src.auth.deps import CurrentUserDep
from src.applications.deps import ApplicationsServiceDep
from src.applications.api_schema import Application, CreateApplicationByJobUrl

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("/url", response_model=Application)
async def create_from_job_url(
    user: CurrentUserDep,
    applications_service: ApplicationsServiceDep,
    body: CreateApplicationByJobUrl,
) -> Application:
    app = await applications_service.create_from_job_url(str(body.url), user)
    return app  # type: ignore

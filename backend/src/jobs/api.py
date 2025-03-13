from fastapi import APIRouter

from src.auth.deps import CurrentUserDep
from src.jobs.api_schema import CreateJobByUrl
from src.jobs.models import Job
from src.jobs.deps import JobsServiceDep

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/url")
async def create_from_url(
    current_user: CurrentUserDep,
    body: CreateJobByUrl,
    jobs_service: JobsServiceDep,
) -> Job:  # TODO: create a proper type for this return
    # TODO: actually create the job
    job = await jobs_service.create_job_from_url(str(body.url))
    return job

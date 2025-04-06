from fastapi import APIRouter, HTTPException
from typing import cast
from loguru import logger

from web.auth.deps import DependsCurrentSuperUser
from web.jobs.api_schema import CreateJobByUrl, Job
from web.jobs.deps import JobsServiceDep

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/url", dependencies=[DependsCurrentSuperUser], response_model=Job)
async def create_from_url(
    body: CreateJobByUrl,
    jobs_service: JobsServiceDep,
) -> Job:
    try:
        job = await jobs_service.create_job_from_url(str(body.url))
    except Exception as e:  # TODO: Improve exception handling
        logger.error(f"Exception while creating job from url {e}")
        raise HTTPException(status_code=400, detail="Job couldn't be parsed")

    return cast(Job, job)

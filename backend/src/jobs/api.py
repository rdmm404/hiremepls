from fastapi import APIRouter, HTTPException
from typing import cast
from loguru import logger

from src.auth.deps import DependsCurrentSuperUser
from src.jobs.api_schema import CreateJobByUrl, Job
from src.jobs.deps import JobsServiceDep

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/url", dependencies=[DependsCurrentSuperUser], response_model=Job)
async def create_from_url(
    body: CreateJobByUrl,
    jobs_service: JobsServiceDep,
) -> Job:
    try:
        job = await jobs_service.create_job_from_url(str(body.url))
    except Exception as e:
        logger.error(f"Exception while creating job from url {e}")
        raise HTTPException(status_code=400, detail="Job couldn't be parsed")

    return cast(Job, job)

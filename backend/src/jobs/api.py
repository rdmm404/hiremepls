from fastapi import APIRouter

from src.auth.deps import CurrentUserDep
from src.jobs.schema import CreateJobByUrl
from src.jobs.llm_schema import JobDescription
from src.jobs.deps import JobsLLMFlowDep, JobsFetcherDep

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/url")
async def create_from_url(
    current_user: CurrentUserDep,
    body: CreateJobByUrl,
    jobs_llm_flow: JobsLLMFlowDep,
    jobs_fetcher: JobsFetcherDep,
) -> JobDescription:  # TODO: create a proper type for this return
    job_contents = await jobs_fetcher.get_page_contents(str(body.url))
    job_description = await jobs_llm_flow.get_job_from_raw_content(job_contents)
    # TODO: actually create the job
    return job_description

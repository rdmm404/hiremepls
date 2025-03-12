from fastapi import APIRouter

from src.auth.deps import CurrentUserDep
from src.jobs.api_schema import CreateJobByUrl
from src.jobs.llm_schema import Job
from src.jobs.deps import JobsLLMFlowDep, JobsFetcherDep, HTMLParserDep

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/url")
async def create_from_url(
    current_user: CurrentUserDep,
    body: CreateJobByUrl,
    jobs_llm_flow: JobsLLMFlowDep,
    jobs_fetcher: JobsFetcherDep,
    html_parser: HTMLParserDep,
) -> Job:  # TODO: create a proper type for this return
    job_html = await jobs_fetcher.get_page_contents(str(body.url))
    parsed_html = html_parser.parse(job_html)
    result = await jobs_llm_flow.get_job_from_raw_content(parsed_html)

    # TODO: actually create the job
    return result.job_description

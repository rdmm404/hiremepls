from fastapi import Depends
from typing import Annotated

from src.jobs.llm import JobsLLMFlow
from src.jobs.fetcher import JobsFetcher
from src.jobs.parser import HTMLParser
from src.jobs.service import JobsService
from src.jobs.repository import JobsRepository

JobsLLMFlowDep = Annotated[JobsLLMFlow, Depends(JobsLLMFlow)]
JobsFetcherDep = Annotated[JobsFetcher, Depends(JobsFetcher)]
HTMLParserDep = Annotated[HTMLParser, Depends(HTMLParser)]
JobsRepositoryDep = Annotated[JobsRepository, Depends(JobsRepository)]


def get_job_service(
    llm: JobsLLMFlowDep,
    fetcher: JobsFetcherDep,
    parser: HTMLParserDep,
    jobs_repo: JobsRepositoryDep,
) -> JobsService:
    return JobsService(llm, fetcher, parser, jobs_repo)


JobsServiceDep = Annotated[JobsService, Depends(get_job_service)]

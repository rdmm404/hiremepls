from loguru import logger

from src.jobs.llm import JobsLLMFlow
from src.jobs.fetcher import JobsFetcher
from src.jobs.parser import HTMLParser
from src.jobs.jobs_repository import JobsRepository
from src.jobs.models import Job, Company, Compensation


class JobsService:
    def __init__(
        self, llm: JobsLLMFlow, fetcher: JobsFetcher, parser: HTMLParser, jobs_repo: JobsRepository
    ):
        self.llm = llm
        self.fetcher = fetcher
        self.parser = parser
        self.jobs_repo = jobs_repo

    async def create_job_from_url(self, url: str) -> Job:
        existing_job = self.jobs_repo.get_job_by_url(url)
        if existing_job:
            logger.info(f"Job with url {url} already exists, returning")
            return existing_job
        # TODO: Validate http response before calling the LLM flow
        job_html = await self.fetcher.get_page_contents(url)
        parsed_html = self.parser.parse(job_html)

        logger.info("HTML parsed, sending to LLM")
        result = await self.llm.get_job_from_raw_content(parsed_html)

        logger.debug(f"LLM schema {result}")

        assert result.parsed, "Job couldn't be parsed"

        company = Company.model_validate(result.job_description.company)
        logger.debug(f"validated company {company}")
        compensation = Compensation.model_validate(result.job_description.compensation)
        job = Job.model_validate(
            result.job_description,
            update={
                "job_url": url,
                "company_id": None,
                "company": company,
                "compensation_id": None,
                "compensation": compensation,
            },
        )
        return self.jobs_repo.create_job(job)

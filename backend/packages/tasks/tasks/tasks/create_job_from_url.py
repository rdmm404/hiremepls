from typing import ClassVar, Type
from sqlmodel import Session
from lib.jobs.repository import JobsRepository

from lib.tasks import CreateJobFromUrlParams
from tasks.tasks.base import Task, Result
from tasks.core.fetcher import JobsFetcher


class CreateJobFromUrlTask(Task[CreateJobFromUrlParams]):
    name: ClassVar[str] = "create_job_from_url"
    param_type: ClassVar[Type[CreateJobFromUrlParams]] = CreateJobFromUrlParams

    def init(self, db_session: Session) -> None:
        self.jobs_repo = JobsRepository(db_session)
        self.fetcher = JobsFetcher()

    def _run(self, params: CreateJobFromUrlParams) -> Result:
        # existing_job = self.jobs_repo.get_job_by_url(url)
        # if existing_job:
        #     logger.info(f"Job with url {url} already exists, returning")
        #     return existing_job
        # # TODO: Validate http response before calling the LLM flow
        # job_html = await self.fetcher.get_page_contents(url)
        # parsed_html = self.parser.parse(job_html)

        # logger.info("HTML parsed, sending to LLM")
        # # TODO: pass existing companies to LLM for better context
        # result = await self.llm.get_job_from_raw_content(parsed_html)

        # logger.debug(f"LLM schema {result}")

        # assert result.parsed, "Job couldn't be parsed"

        # company_slug = generate_slug(result.job_description.company.name)
        # company = self.jobs_repo.get_company_by_slug(company_slug)

        # if not company:
        #     company = Company.model_validate(
        #         result.job_description.company,
        #         update={"slug": company_slug},
        #     )
        # logger.debug(f"validated company {company}")

        # compensation = Compensation.model_validate(result.job_description.compensation)
        # job = Job.model_validate(
        #     result.job_description,
        #     update={
        #         "job_url": url,
        #         "company_id": None,
        #         "company": company,
        #         "compensation_id": None,
        #         "compensation": compensation,
        #     },
        # )
        # return self.jobs_repo.create_job(job)
        return Result(True)

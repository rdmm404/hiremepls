from typing import ClassVar
from sqlmodel import Session
from loguru import logger

from lib.repository.job import JobsRepository
from lib.utils import generate_slug
from lib.tasks import CreateJobFromUrlParams, CreateJobFromUrlResponse
from lib.model import Company, Compensation, Job, Task as TaskModel
from tasks.tasks.base import Task, TaskResult
from tasks.core.fetcher import JobsFetcher
from tasks.core.llm import JobsLLMFlow
from tasks.core.parser import HTMLParser


class CreateJobFromUrlTask(Task[CreateJobFromUrlParams, CreateJobFromUrlResponse]):
    name: ClassVar[str] = "create_job_from_url"
    # param_type: ClassVar[type[CreateJobFromUrlParams]] = CreateJobFromUrlParams

    @classmethod
    def get_param_type(cls) -> type[CreateJobFromUrlParams]:
        return CreateJobFromUrlParams

    def init(self, db_session: Session) -> None:
        self.jobs_repo = JobsRepository(db_session)
        self.fetcher = JobsFetcher()
        self.llm = JobsLLMFlow()
        self.parser = HTMLParser()

    async def _run(
        self, params: CreateJobFromUrlParams, task: TaskModel
    ) -> TaskResult[CreateJobFromUrlResponse]:
        url = str(params.url)
        existing_job = self.jobs_repo.get_job_by_url(url)
        if existing_job:
            return TaskResult(
                success=False, data=f"Job with url {url} already exists", should_retry=False
            )

        # TODO: Validate http response before calling the LLM flow
        job_html = await self.fetcher.get_page_contents(url)
        parsed_html = self.parser.parse(job_html)

        logger.info(f"task_name={task.name} task_id={task.task_id} - HTML parsed, sending to LLM")
        # TODO: pass existing companies to LLM for better context
        result = await self.llm.get_job_from_raw_content(parsed_html)

        logger.debug(f"task_name={task.name} task_id={task.task_id} - LLM schema {result}")
        if not result.parsed:
            return TaskResult(success=False, data="Job couldn't be parsed", should_retry=False)

        company_slug = generate_slug(result.job_description.company.name)
        company = self.jobs_repo.get_company_by_slug(company_slug)

        if not company:
            company = Company.model_validate(
                result.job_description.company,
                update={"slug": company_slug},
            )
        logger.debug(f"task_name={task.name} task_id={task.task_id} - validated company {company}")

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
        job = self.jobs_repo.create_job(job)
        assert job.id
        resp = CreateJobFromUrlResponse(job_id=job.id)
        return TaskResult(success=True, data=resp)

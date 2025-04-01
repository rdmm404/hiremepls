from loguru import logger

from src.jobs.repository import JobsRepository
from src.jobs.models import Job, Company, Compensation
from src.common.utils import generate_slug


class JobsService:
    def __init__(self, jobs_repo: JobsRepository):
        self.jobs_repo = jobs_repo

    async def create_job_from_url(self, url: str) -> Job:
        company = Company(
            name="Acme Corp",
            slug="acme-corp",
            url="https://www.acmecorp.com",
            logo_url="https://www.acmecorp.com/logo.png",
        )

        compensation = Compensation(
            currency="USD",
            hiring_bonus=5000.00,
            equity=True,
            minimum=100000.00,
            maximum=150000.00,
            details="Performance-based bonuses",
            benefits=["Health insurance", "Paid time off"],
        )

        job = Job(
            job_title="Software Engineer",
            job_url="https://www.acmecorp.com/jobs/123",
            job_type="full_time",
            llm_summary="Exciting software engineering role",
            job_description="Develop and maintain software applications",
            requirements=["Bachelor's degree in CS", "3+ years experience"],
            skills=["Python", "SQL", "Docker"],
            modality=["remote", "hybrid"],
            location="Anywhere, USA",
            other_details="Flexible work hours",
            company=company,
            compensation=compensation,
        )

        return job
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
        return Job(id=1, company=Company(id=1, logo_url="https://foo.bar"))

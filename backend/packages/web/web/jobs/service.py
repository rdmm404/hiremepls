from pydantic import HttpUrl
from lib.jobs.repository import JobsRepository
from lib.jobs.models import Job, Company, Compensation


class JobsService:
    def __init__(self, jobs_repo: JobsRepository):
        self.jobs_repo = jobs_repo

    async def create_job_from_url(self, url: str) -> Job:
        company = Company(
            name="Acme Corp",
            slug="acme-corp",
            url=HttpUrl("https://www.acmecorp.com"),
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
            job_url=HttpUrl("https://www.acmecorp.com/jobs/123"),
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

        return Job(id=1, company=Company(id=1, logo_url="https://foo.bar"))

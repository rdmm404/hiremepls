from sqlmodel import select

from src.common.base_repository import BaseRepository
from src.jobs.models import Job, Company


class JobsRepository(BaseRepository):
    def get_job_by_url(self, url: str) -> Job | None:
        query = select(Job).where(Job.job_url == url)
        return self.session.exec(query).first()

    def create_job(self, job: Job) -> Job:
        self.session.add(job)
        self.session.commit()
        self.session.refresh(job)
        return job

    def get_company_by_slug(self, slug: str) -> Company | None:
        query = select(Company).where(Company.slug == slug)
        return self.session.exec(query).first()

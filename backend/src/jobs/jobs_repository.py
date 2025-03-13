from sqlmodel import select

from src.common.base_repository import BaseRepository
from src.jobs.models import Job


class JobsRepository(BaseRepository):
    def create_job_if_not_exists(self, job: Job) -> Job:
        query = select(Job).where(Job.job_url == job.job_url)
        existing_job = self.session.exec(query).first()

        if existing_job:
            return existing_job

        self.session.add(job)
        self.session.commit()
        self.session.refresh(job)
        return job

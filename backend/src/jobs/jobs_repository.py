from src.common.base_repository import BaseRepository
from src.jobs.models import Job


class JobsRepository(BaseRepository):
    def create_job(self, job: Job) -> Job:
        self.session.add(job)
        self.session.commit()
        self.session.refresh(job)
        return job

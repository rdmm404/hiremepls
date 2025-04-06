# from loguru import logger

from lib.jobs.repository import JobsRepository
# from lib.models import Job


class JobsService:
    def __init__(self, jobs_repo: JobsRepository):
        self.jobs_repo = jobs_repo

    # async def create_job_from_url(self, url: str) -> Job:
    #     existing_job = self.jobs_repo.get_job_by_url(url)
    #     if existing_job:
    #         logger.info(f"Job with url {url} already exists, returning")
    #         return existing_job
    # return job

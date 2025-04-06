from typing import ClassVar, cast
from sqlmodel import Session

from tasks.tasks.base import Task, Result
from tasks.tasks.create_job_from_url import CreateJobFromUrlTask
from lib.tasks import (
    CreateApplicationFromUrlParams,
    CreateApplicationFromUrlResponse,
    CreateJobFromUrlParams,
    CreateJobFromUrlResponse,
)
from lib.model import Task as TaskModel, Application
from lib.repository.application import ApplicationRepository


class CreateApplicationFromUrlTask(
    Task[CreateApplicationFromUrlParams, CreateApplicationFromUrlResponse]
):
    name: ClassVar[str] = "create_application_from_url"

    @classmethod
    def get_param_type(cls) -> type[CreateApplicationFromUrlParams]:
        return CreateApplicationFromUrlParams

    def init(self, db_session: Session) -> None:
        self.job_task = CreateJobFromUrlTask(db_session)
        self.application_repo = ApplicationRepository(db_session)

    async def _run(
        self, params: CreateApplicationFromUrlParams, task: TaskModel
    ) -> Result[CreateApplicationFromUrlResponse]:
        if not task.user_id:
            return Result(
                success=False,
                data="User id is required for application creation",
                should_retry=False,
            )

        job_params = CreateJobFromUrlParams(url=params.url)
        job_result = await self.job_task.run(
            job_params, f"{task.task_id}__create_job", task.user_id
        )

        if not job_result.success:
            return Result(
                success=False,
                data=f"Something went wrong during job creation: {job_result.data}",
                should_retry=job_result.should_retry,
            )

        data = cast(CreateJobFromUrlResponse, job_result.data)

        application = Application(user_id=task.user_id, job_id=data.job_id)

        application = self.application_repo.create_application(application)
        assert application.id
        resp = CreateApplicationFromUrlResponse(application_id=application.id)
        return Result(success=True, data=resp)

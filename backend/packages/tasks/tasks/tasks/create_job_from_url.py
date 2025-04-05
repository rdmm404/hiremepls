from lib.tasks import CreateJobFromUrlParams
from tasks.manager import TaskManager
from tasks.tasks.base import Task, Result


class CreateJobFromUrlTask(Task[CreateJobFromUrlParams]):
    name = "create_job_from_url"
    param_type = CreateJobFromUrlParams

    def _run(self, params: CreateJobFromUrlParams) -> Result:
        return Result(True)


TaskManager.register_task(CreateJobFromUrlTask)

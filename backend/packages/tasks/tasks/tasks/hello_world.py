from loguru import logger

from lib.tasks import HelloWorldParams, HelloWorldResponse
from lib.model import Task as TaskModel
from tasks.tasks.base import Task, Result


class HelloWorldTask(Task[HelloWorldParams, HelloWorldResponse]):
    name = "hello_world"

    @classmethod
    def get_param_type(cls) -> type[HelloWorldParams]:
        return HelloWorldParams

    async def _run(self, params: HelloWorldParams, task: TaskModel) -> Result[HelloWorldResponse]:
        resp = HelloWorldResponse(hello=f"Hello {params.name if params.name else 'World'}")
        logger.info(f"task_name={task.name} task_id={task.task_id} - {resp.hello}")
        return Result(success=True, data=resp)

from loguru import logger

from lib.tasks import HelloWorldParams
from tasks.tasks.base import Task, Result


class HelloWorldTask(Task[HelloWorldParams]):
    name = "hello_world"
    param_type = HelloWorldParams

    def _run(self, params: HelloWorldParams) -> Result:
        logger.info(f"Hello {params.name if params.name else 'World'}")
        return Result(True)

from loguru import logger

from lib.tasks import HelloWorldParams, HelloWorldResponse
from tasks.tasks.base import Task, Result


class HelloWorldTask(Task[HelloWorldParams, HelloWorldResponse]):
    name = "hello_world"
    param_type = HelloWorldParams

    async def _run(self, params: HelloWorldParams) -> Result[HelloWorldResponse]:
        resp = HelloWorldResponse(hello=f"Hello {params.name if params.name else 'World'}")
        logger.info(resp.hello)
        return Result(success=True, data=resp)

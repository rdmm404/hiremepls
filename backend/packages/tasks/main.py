import traceback
import sys

from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel
from loguru import logger

from lib.tasks import (
    HelloWorldParams,
    CreateJobFromUrlParams,
    CreateJobFromUrlResponse,
    HelloWorldResponse,
)
from tasks.manager import TaskManager
from tasks.tasks import hello_world, create_job_from_url, base
from tasks.settings import env_settings


TaskManager.register_task(hello_world.HelloWorldTask)
TaskManager.register_task(create_job_from_url.CreateJobFromUrlTask)

if env_settings.ENVIRONMENT == "prd":
    openapi_url: str | None = None
    logger.remove()
    logger.add(sys.stderr, level="INFO")
else:
    openapi_url = "/openapi.json"


app = FastAPI(openapi_url=openapi_url)


class RunTaskBody(BaseModel):
    name: str
    task_id: str
    user_id: int | None = None
    params: CreateJobFromUrlParams | HelloWorldParams


STATUS_ERROR_NO_RETRY = 299


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


@app.post("/")
async def handle_task(body: RunTaskBody) -> CreateJobFromUrlResponse | HelloWorldResponse | None:
    try:
        task = TaskManager.get_task(body.name)
    except Exception as e:
        raise HTTPException(status_code=STATUS_ERROR_NO_RETRY, detail=str(e))

    try:
        result = await task.run(params=body.params, task_id=body.task_id, user_id=body.user_id)
    except (base.InvalidParamsError, base.TaskAlreadyExists) as e:
        raise HTTPException(status_code=STATUS_ERROR_NO_RETRY, detail=str(e))
    except Exception as e:
        logger.debug(traceback.format_exc())
        logger.error(f"Error while executing task {body.name} with params {body.params} - {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
            if result.should_retry
            else STATUS_ERROR_NO_RETRY,
            detail=result.data,
        )

    return result.data  # type: ignore

from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel
from loguru import logger

from lib.tasks import HelloWorldParams, CreateJobFromUrlParams
from tasks.manager import TaskManager
from tasks.tasks import hello_world, create_job_from_url

app = FastAPI()

TaskManager.register_task(hello_world.HelloWorldTask)
TaskManager.register_task(create_job_from_url.CreateJobFromUrlTask)


class RunTaskBody(BaseModel):
    name: str
    params: CreateJobFromUrlParams | HelloWorldParams
    task_id: str


@app.post("/run", status_code=status.HTTP_204_NO_CONTENT)
def handle_task(body: RunTaskBody) -> None:
    try:
        task = TaskManager.get_task(body.name)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

    try:
        task.run(params=body.params)
    except AssertionError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))
    except Exception as e:
        logger.error(f"Error while executing task {body.name} with params {body.params} - {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

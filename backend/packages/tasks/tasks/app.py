from fastapi import FastAPI, Response, status, HTTPException
from pydantic import BaseModel

from lib.tasks import HelloWorldParams, CreateJobFromUrlParams
from tasks.manager import TaskManager

app = FastAPI()


class RunTaskBody(BaseModel):
    name: str
    params: HelloWorldParams | CreateJobFromUrlParams
    task_id: str


@app.post("/run")
def handle_task(body: RunTaskBody, response: Response) -> Response:
    response.status_code = status.HTTP_204_NO_CONTENT

    try:
        task = TaskManager.get_task(body.name)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

    try:
        task.run(params=CreateJobFromUrlParams)
    except Exception:
        pass
    return response

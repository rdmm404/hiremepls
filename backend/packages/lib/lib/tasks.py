from pydantic import BaseModel, Field
from typing import Annotated


class CreateJobFromUrlParams(BaseModel):
    url: str


class CreateJobFromUrlResponse(BaseModel):
    job_id: int


class HelloWorldParams(BaseModel):
    name: str | None


class HelloWorldResponse(BaseModel):
    hello: str


class CreateApplicationFromUrlParams(BaseModel):
    url: str


class CreateApplicationFromUrlResponse(BaseModel):
    application_id: int


type TaskParams = CreateJobFromUrlParams | CreateApplicationFromUrlParams | HelloWorldParams | None
type TaskResponse = (
    CreateApplicationFromUrlResponse | CreateJobFromUrlResponse | HelloWorldResponse | None
)


class RunTaskBody(BaseModel):
    name: str
    task_id: str
    user_id: Annotated[int, Field(gt=0)] | None = None
    params: TaskParams


class TaskResult[D](BaseModel):
    success: bool
    data: D | str | None = None
    should_retry: bool | None = None

from pydantic import BaseModel


class CreateJobFromUrlParams(BaseModel):
    url: str


class CreateJobFromUrlResponse(BaseModel):
    job_id: int


class HelloWorldParams(BaseModel):
    name: str | None


class HelloWorldResponse(BaseModel):
    hello: str

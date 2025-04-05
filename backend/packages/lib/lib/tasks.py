from pydantic import BaseModel


class CreateJobFromUrlParams(BaseModel):
    url: str


class HelloWorldParams(BaseModel):
    name: str | None

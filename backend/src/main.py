from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class HelloResponse(BaseModel):
    message: str


@app.get("/")
def hello(name: str) -> HelloResponse:
    return HelloResponse(message=f"Hello, {name}!")

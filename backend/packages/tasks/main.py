import traceback
import sys
import time

from fastapi import FastAPI, status, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from loguru import logger
from starlette.concurrency import iterate_in_threadpool

from lib.tasks import RunTaskBody, TaskResponse
from tasks.manager import TaskManager
from tasks.tasks import hello_world, create_job_from_url, base, create_application_from_url
from tasks.settings import env_settings


if env_settings.ENVIRONMENT == "prd":
    openapi_url: str | None = None
    logger.remove()
    logger.add(sys.stderr, level="INFO")
else:
    openapi_url = "/openapi.json"


STATUS_ERROR_NO_RETRY = 299


app = FastAPI(openapi_url=openapi_url)


# To avoid retries on validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=STATUS_ERROR_NO_RETRY,
        content=jsonable_encoder({"detail": exc.errors()}),
    )


@app.middleware("http")
async def middleware(request: Request, call_next):
    try:
        req_body = await request.json()
    except Exception:
        req_body = None

    logger.info(
        f"REQUEST {request.method} {request.url} BODY {req_body} PARAMS {request.query_params}"
    )
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time

    res_body = [section async for section in response.body_iterator]
    response.body_iterator = iterate_in_threadpool(iter(res_body))

    # Stringified response body object
    res_body = res_body[0].decode()

    logger.info(f"RESPONSE {response.status_code} BODY {res_body} TIME {process_time * 1000} ms")

    return response


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


TaskManager.register_task(hello_world.HelloWorldTask)
TaskManager.register_task(create_job_from_url.CreateJobFromUrlTask)
TaskManager.register_task(create_application_from_url.CreateApplicationFromUrlTask)


@app.post("/")
async def handle_task(
    body: RunTaskBody,
) -> TaskResponse:
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

import sys

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from loguru import logger

from src.users.api import router as users_router
from src.auth.api import router as auth_router
from src.jobs.api import router as jobs_router
from src.applications.api import router as applications_router
from src.core.config import settings


if settings.ENVIRONMENT == "prd":
    openapi_url: str | None = None
    logger.remove()
    logger.add(sys.stderr, level="INFO")
else:
    openapi_url = "/api/v1/openapi.json"

app = FastAPI(openapi_url=openapi_url)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(jobs_router)
app.include_router(applications_router)


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )

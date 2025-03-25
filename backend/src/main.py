import sys

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from src.users.api import router as users_router
from src.auth.api import router as auth_router
from src.jobs.api import router as jobs_router
from src.applications.api import router as applications_router
from src.core.config import settings


def custom_generate_unique_id(route: APIRoute) -> str:
    try:
        return f"{route.tags[0]}-{route.name}"
    except IndexError:
        return route.name


def generate_schema(app: FastAPI) -> None:
    import json
    from pathlib import Path

    export_path = Path("../shared/openapi.json")
    export_path.parent.mkdir(exist_ok=True)
    with export_path.open("w") as f:
        f.write(json.dumps(app.openapi(), indent=2))


if settings.ENVIRONMENT == "prd":
    openapi_url: str | None = None
    logger.remove()
    logger.add(sys.stderr, level="INFO")
else:
    openapi_url = "/api/v1/openapi.json"

app = FastAPI(openapi_url=openapi_url, generate_unique_id_function=custom_generate_unique_id)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}


if settings.ENVIRONMENT == "dev":
    logger.debug("Generating OpenAPI schema")
    generate_schema(app)

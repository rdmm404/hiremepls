import google.auth
import google.auth.transport.requests
import httpx
import uuid
import asyncio
from typing import cast
import traceback

from loguru import logger
from sqlmodel import Session, select
from pydantic import BaseModel
from google.oauth2.credentials import Credentials

from web.core.config import settings, env_settings
from lib.tasks import TaskParams, RunTaskBody, TaskResult
from lib.model import Task, TaskStatus


class TaskDoesNotExist(Exception): ...


class TasksClient:
    def __init__(self, session: Session):
        self.BUFFER_URL = (
            f"{settings.GOOGLE_TASKS_URL}/projects/{settings.GOOGLE_PROJECT_ID}"
            f"/locations/{settings.GOOGLE_LOCATION}/queues"
            f"/{settings.GOOGLE_TASKS_QUEUE_ID}/tasks:buffer"
        )
        self.TASKS_SERVICE_URL = "http://tasks:8000"  # Local tasks service URL
        self.session = session

    async def create_task(
        self, task_name: str, task_params: TaskParams, user_id: int | None
    ) -> str:
        task_id = str(uuid.uuid4())
        run_task = RunTaskBody(name=task_name, params=task_params, user_id=user_id, task_id=task_id)

        try:
            if env_settings.ENVIRONMENT == "dev":
                # Don't await the task, just start it running in the background
                asyncio.create_task(self._create_direct_task(run_task))
            else:
                await self._create_buffered_task(run_task)
        except Exception as e:
            logger.error(f"Error when creating task: {e}")
            raise

        return task_id

    async def wait_for_task[R: BaseModel](
        self,
        task_id: str,
        result_model: type[R] | None = None,
        max_attempts: int = 10,
        timeout_seconds: int = 3,
    ) -> TaskResult[R] | None:
        for i in range(max_attempts):
            query = select(Task).where(Task.task_id == task_id)
            task = self.session.exec(query).first()

            if task:
                self.session.refresh(task)
                logger.debug(f"task in db: {task}")

                if task.status in (TaskStatus.DONE, TaskStatus.ERROR):
                    if not task.result:
                        return None
                    task_result = TaskResult.model_validate(task.result)

                    if isinstance(task_result.data, dict) and result_model:
                        task_result.data = result_model.model_validate(task_result.data)

                    return task_result

            await asyncio.sleep(timeout_seconds)

        raise TimeoutError(f"Task {task_id} not done within timeout")

    async def _create_direct_task(self, body: RunTaskBody) -> None:
        try:
            data = body.model_dump()
            logger.debug(f"Creating direct task with body {data}")

            async with httpx.AsyncClient() as client:
                resp = await client.post(f"{self.TASKS_SERVICE_URL}/", json=data, timeout=60)

            resp.raise_for_status()
            logger.info(
                f"Successfully processed direct task task_name={body.name} task_id={body.task_id}"
            )
        except Exception as e:
            traceback.print_exc()
            logger.error(f"Error processing direct task: {e}")
            # We don't re-raise the exception since this is running in a background task

    async def _create_buffered_task(self, body: RunTaskBody) -> None:
        credentials, _ = google.auth.default()
        auth_req = google.auth.transport.requests.Request()

        creds = cast(Credentials, credentials)
        creds.refresh(auth_req)
        access_token = creds.token

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        data = body.model_dump()
        logger.debug(f"Creating buffered task with body {data}")
        async with httpx.AsyncClient() as client:
            resp = await client.post(self.BUFFER_URL, headers=headers, json=data)

        resp.raise_for_status()
        logger.info(
            f"Successfully buffered task task_name={body.name} task_id={body.task_id}. Response: {resp.json()}"
        )

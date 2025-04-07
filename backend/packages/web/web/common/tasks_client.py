import google.auth
import google.auth.transport.requests
import httpx
import uuid
import asyncio

from loguru import logger
from sqlmodel import Session, select
from typing import Any

from web.core.config import settings
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
        self.session = session

    async def create_task(
        self, task_name: str, task_params: TaskParams, user_id: int | None
    ) -> str:
        task_id = str(uuid.uuid4())
        run_task = RunTaskBody(name=task_name, params=task_params, user_id=user_id, task_id=task_id)
        try:
            await self._create_buffered_task(run_task)
        except httpx.HTTPStatusError as e:
            logger.error(
                f"Invalid status {e.response.status_code} received from cloud tasks, response = {e.response.text}"
            )
            raise

        return task_id

    async def wait_for_task[R](
        self,
        task_id: str,
        result_type: type[R] = type[Any],
        max_attempts: int = 10,
        timeout_seconds: int = 3,
    ) -> TaskResult[R]:
        for i in range(max_attempts):
            query = select(Task).where(Task.task_id == task_id)
            task = self.session.exec(query).first()

            logger.debug(f"task in db: {task}")
            if task and task.status in (TaskStatus.DONE, TaskStatus.ERROR):
                return TaskResult[R].model_validate(task.result)

            await asyncio.sleep(timeout_seconds)

        raise TimeoutError(f"Task {task_id} not done within timeout")

    async def _create_buffered_task(self, body: RunTaskBody) -> None:
        credentials, _ = google.auth.default()

        auth_req = google.auth.transport.requests.Request()
        credentials.refresh(auth_req)
        access_token = credentials.token

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        data = body.model_dump()
        logger.debug(f"Creating task with body {data}")
        async with httpx.AsyncClient() as client:
            resp = await client.post(self.BUFFER_URL, headers=headers, json=data)

        resp.raise_for_status()
        logger.info(
            f"Successfully buffered task task_name={body.name} task_id={body.task_id}. Response: {resp.json()}"
        )

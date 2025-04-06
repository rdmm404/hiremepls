from typing import Protocol, ClassVar, cast, Any
from abc import abstractmethod
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel

from lib.model import Task as TaskModel, TaskStatus


class Result[D](BaseModel):
    success: bool
    data: D | str | None = None
    should_retry: bool | None = None


class InvalidParamsError(Exception): ...


class TaskAlreadyExists(Exception): ...


class Task[P: BaseModel | None, R: BaseModel](Protocol):
    name: ClassVar[str]
    param_type: ClassVar[type[Any]]
    session: Session

    def __init__(self, session: Session) -> None:
        self.session = session
        self.init(session)

    @classmethod
    def get_name(cls) -> str:
        return cls.name

    async def run(self, params: P, task_id: str, user_id: int | None) -> Result[R]:
        if not isinstance(params, self.param_type):
            raise InvalidParamsError(
                f"Invalid parameters received for task {self.get_name()} - {params}"
            )

        task_obj = self._get_task_for_retry(task_id)
        if task_obj:
            task_obj.status = TaskStatus.IN_PROGRESS
            self.session.add(task_obj)
            self.session.commit()
            self.session.refresh(task_obj)
        else:
            task_obj = self._create_task(params, task_id, user_id)

        try:
            result = await self._run(cast(P, params))
        except Exception as e:
            result = Result(success=False, data=str(e), should_retry=True)

        self._handle_task_result(task_obj, result)
        return result

    def _get_task_for_retry(self, task_id: str) -> TaskModel | None:
        query = select(TaskModel).where(
            TaskModel.task_id == task_id, TaskModel.status == TaskStatus.AWAITING_RETRY
        )
        return self.session.exec(query).first()

    def _create_task(self, params: P, task_id: str | None, user_id: int | None) -> TaskModel:
        task = TaskModel(
            task_id=task_id,
            name=self.get_name(),
            params=params.model_dump() if params is not None else None,
            status=TaskStatus.IN_PROGRESS,
            user_id=user_id,
        )
        try:
            self.session.add(task)
            self.session.commit()
            self.session.refresh(task)
        except IntegrityError:
            raise TaskAlreadyExists(f"Task with id {task_id} already exists")

        return task

    def _handle_task_result(self, task: TaskModel, result: Result) -> None:
        if result.success:
            task.status = TaskStatus.DONE
        elif result.should_retry:
            task.status = TaskStatus.AWAITING_RETRY
        else:
            task.status = TaskStatus.ERROR

        task.result = result.model_dump()
        self.session.add(task)
        self.session.commit()

    @abstractmethod
    async def _run(self, params: P) -> Result[R]: ...

    def init(self, db_session: Session) -> None:
        pass

from typing import Protocol, ClassVar, cast
from abc import abstractmethod
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel, ValidationError
from loguru import logger

from lib.model import Task as TaskModel, TaskStatus


class Result[D](BaseModel):
    success: bool
    data: D | str | None = None
    should_retry: bool | None = None


class InvalidParamsError(Exception): ...


class TaskAlreadyExists(Exception): ...


class Task[P: BaseModel | None, R: BaseModel](Protocol):
    name: ClassVar[str]
    # param_type: ClassVar[type[Any]]
    session: Session

    def __init__(self, session: Session) -> None:
        self.session = session
        self.init(session)

    @classmethod
    def get_name(cls) -> str:
        return cls.name

    @classmethod
    @abstractmethod
    def get_param_type(cls) -> type[P] | None: ...

    async def run(self, params: P | None, task_id: str, user_id: int | None) -> Result[R]:
        params = self._validate_params(params)

        task_obj = self._get_task_for_retry(task_id)
        if task_obj:
            task_obj.status = TaskStatus.IN_PROGRESS
            self.session.add(task_obj)
            self.session.commit()
            self.session.refresh(task_obj)
        else:
            task_obj = self._create_task(params, task_id, user_id)

        try:
            result = await self._run(cast(P, params), task_obj)
        except Exception as e:
            result = Result(success=False, data=str(e), should_retry=True)

        self._handle_task_result(task_obj, result)
        return result

    def _validate_params(self, params: P | None) -> P | None:
        param_type = self.get_param_type()
        error = InvalidParamsError(
            f"Invalid parameters received for task {self.get_name()} - {params}"
        )
        if param_type is None:
            if params is not None:
                raise error
            return

        if not isinstance(params, BaseModel):
            raise error

        param_type = cast(type[BaseModel], param_type)
        try:
            return cast(P, param_type(**params.model_dump()))
        except ValidationError:
            raise error

    def _get_task_for_retry(self, task_id: str) -> TaskModel | None:
        query = select(TaskModel).where(
            TaskModel.task_id == task_id, TaskModel.status == TaskStatus.AWAITING_RETRY
        )
        return self.session.exec(query).first()

    def _create_task(self, params: P | None, task_id: str, user_id: int | None) -> TaskModel:
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
        except IntegrityError as e:
            logger.debug(e)
            raise TaskAlreadyExists(f"Task with id {task_id} already exists")

        return task

    def _handle_task_result(self, task: TaskModel, result: Result[R]) -> None:
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
    async def _run(self, params: P, task: TaskModel) -> Result[R]: ...

    def init(self, db_session: Session) -> None:
        pass

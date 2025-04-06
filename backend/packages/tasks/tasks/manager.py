from typing import Any, ClassVar
from sqlmodel import Session

from tasks.tasks.base import Task
from tasks.db import engine


class TaskNotFoundError(Exception): ...


class TaskManager:
    tasks: ClassVar[dict[str, type[Task[Any, Any]]]] = {}

    @classmethod
    def register_task(cls, task_cls: type[Task[Any, Any]]) -> None:
        name = task_cls.get_name()
        assert name not in cls.tasks, f"Task {name} already registered"
        cls.tasks[name] = task_cls

    @classmethod
    def get_task(cls, name: str) -> Task[Any, Any]:
        task_cls = cls.tasks.get(name)
        if not task_cls:
            raise TaskNotFoundError(f"Task with name {name} is not found")

        with Session(engine) as session:
            return task_cls(session)

from typing import Protocol, ClassVar, Type, cast, Any
from dataclasses import dataclass
from abc import abstractmethod
from sqlmodel import Session

from tasks.db import engine


@dataclass
class Result:
    success: bool
    msg: str | None = None


class Task[T](Protocol):
    name: ClassVar[str]
    param_type: ClassVar[Type[Any]]

    def __init__(self) -> None:
        with Session(engine) as session:
            self.init(session)

    @classmethod
    def get_name(cls) -> str:
        return cls.name

    def run(self, params: T) -> Result:
        assert isinstance(params, self.param_type), "Invalid params"
        return self._run(cast(T, params))

    @abstractmethod
    def _run(self, params: T) -> Result: ...

    @abstractmethod
    def init(self, db_session: Session) -> None: ...

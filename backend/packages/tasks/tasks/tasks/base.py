from typing import Protocol, ClassVar, Type, cast, Any
from dataclasses import dataclass
from abc import abstractmethod
from sqlmodel import Session
from pydantic import BaseModel

from tasks.db import engine


@dataclass
class Result[D]:
    success: bool
    data: D | str | None = None
    should_retry: bool | None = None


class InvalidParamsError(Exception): ...


class Task[P: BaseModel, R: BaseModel](Protocol):
    name: ClassVar[str]
    param_type: ClassVar[Type[Any]]

    def __init__(self) -> None:
        with Session(engine) as session:
            self.init(session)

    @classmethod
    def get_name(cls) -> str:
        return cls.name

    async def run(self, params: P) -> Result[R]:
        if not isinstance(params, self.param_type):
            raise InvalidParamsError(
                f"Invalid parameters received for task {self.get_name()} - {params}"
            )
        return await self._run(cast(P, params))

    @abstractmethod
    async def _run(self, params: P) -> Result[R]: ...

    def init(self, db_session: Session) -> None:
        pass

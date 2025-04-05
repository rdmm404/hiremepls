from typing import Protocol, ClassVar, Type, cast, Any
from dataclasses import dataclass


@dataclass
class Result:
    success: bool
    msg: str | None = None


class Task[T](Protocol):
    name: ClassVar[str]
    param_type: ClassVar[Type[Any]]

    @classmethod
    def get_name(cls) -> str:
        return cls.name

    def run(self, params: T) -> Result:
        assert isinstance(params, self.param_type), "Invalid params"
        return self._run(cast(T, params))

    def _run(self, params: T) -> Result: ...

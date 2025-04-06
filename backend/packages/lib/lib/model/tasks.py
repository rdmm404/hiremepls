from sqlmodel import Field, AutoString, Relationship
from enum import StrEnum
from typing import Any, TYPE_CHECKING
from sqlalchemy.dialects.postgresql import JSONB

from lib.model.base import BaseSQLModel

if TYPE_CHECKING:
    from lib.model.users import User


class TaskStatus(StrEnum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    ERROR = "ERROR"
    AWAITING_RETRY = "AWAITING_RETRY"
    DONE = "DONE"


class Task(BaseSQLModel, table=True):
    __table_args__ = {"schema": "tasks"}
    name: str
    task_id: str = Field(index=True, unique=True)
    status: TaskStatus = Field(
        sa_type=AutoString,
        default=TaskStatus.PENDING,
        sa_column_kwargs={"server_default": TaskStatus.PENDING.name},
    )
    params: dict[str, Any] | None = Field(default=None, sa_type=JSONB, nullable=True)
    result: dict[str, Any] | None = Field(default=None, sa_type=JSONB, nullable=True)
    user_id: int | None = Field(
        default=None, foreign_key="users.user.id", ondelete="CASCADE", nullable=True
    )
    user: "User" = Relationship(back_populates="tasks")

from sqlmodel import SQLModel, Field, Relationship, AutoString, UniqueConstraint
from typing import TYPE_CHECKING, Annotated
from enum import StrEnum

from src.common.base_model import BaseSQLModel

if TYPE_CHECKING:
    from src.users.models import User
    from src.jobs.models import Job


SCHEMA_NAME = "applications"


class ApplicationStatus(StrEnum):
    PENDING = "Pending"
    APPLIED = "Applied"
    RECEIVED = "Received by Employer"
    ASSESSMENT = "In Assessment"
    SCREENING = "In Screening"
    INTERVIEWING = "Interviewing"
    OFFER_RECEIVED = "Offer Received"
    NEGOTIATING = "Negotiating"
    OFFER_DECLINED = "Offer Declined"
    HIRED = "Hired"
    REJECTED = "Rejected"
    GHOSTED = "Ghosted"


class ApplicationBase(SQLModel):
    status: ApplicationStatus = Field(
        default=ApplicationStatus.PENDING,
        sa_type=AutoString,
        sa_column_kwargs={"server_default": ApplicationStatus.PENDING.name},
        nullable=False,
    )
    interview_rounds: Annotated[int, Field(ge=1)] | None = None
    current_round: Annotated[int, Field(ge=1)] | None = None
    notes: str | None = None
    fit: float | None = None
    resume_used: str | None = None


class Application(ApplicationBase, BaseSQLModel, table=True):
    __table_args__ = (
        UniqueConstraint("user_id", "job_id", name="user_job_unique_constraint"),
        {"schema": SCHEMA_NAME},
    )
    user_id: int | None = Field(
        default=None, foreign_key="users.user.id", ondelete="CASCADE", nullable=False
    )
    user: "User" = Relationship(back_populates="applications")
    job_id: int | None = Field(
        default=None, foreign_key="jobs.job.id", ondelete="CASCADE", nullable=False
    )
    job: "Job" = Relationship(back_populates="applications")

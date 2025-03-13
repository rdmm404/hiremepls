from sqlmodel import SQLModel, Field, Relationship, AutoString
from typing import TYPE_CHECKING
from enum import StrEnum

from src.common.base_model import BaseSQLModel

if TYPE_CHECKING:
    from src.users.models import User
    from src.jobs.models import Job


SCHEMA_NAME = "applications"


class ApplicationStatus(StrEnum):
    PENDING = "Pending"
    APPLIED = "Applied"
    RECEIVED = "Received"
    ASSESMENT = "In Assesment"
    SCREENING = "In Screening"
    INTERVIEWING = "Interviewing"
    OFFER_RECEIVED = "Offer Received"
    HIRED = "Hired"
    REJECTED = "Rejected"
    GHOSTED = "Ghosted"


class ApplicationsModel(SQLModel):
    __table_args__ = {"schema": SCHEMA_NAME}


class ApplicationBase(ApplicationsModel):
    status: ApplicationStatus = Field(
        default=ApplicationStatus.PENDING,
        sa_type=AutoString,
        sa_column_kwargs={"server_default": ApplicationStatus.PENDING.name},
        nullable=False,
    )
    interview_rounds: int | None = None
    current_round: int | None = None
    notes: str | None = None
    fit: float | None = None
    resume_used: str | None = None


class Application(ApplicationBase, BaseSQLModel, table=True):
    user_id: int | None = Field(
        default=None, foreign_key="users.user.id", ondelete="CASCADE", nullable=False
    )
    user: "User" = Relationship(back_populates="applications")
    job_id: int | None = Field(
        default=None, foreign_key="jobs.job.id", ondelete="CASCADE", nullable=False
    )
    job: "Job" = Relationship(back_populates="applications")

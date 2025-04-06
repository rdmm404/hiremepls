from typing import Literal, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship, ARRAY, Column, AutoString
from pydantic import HttpUrl

from lib.model.base import BaseSQLModel
from lib.utils import HttpUrlType


if TYPE_CHECKING:
    from lib.model import Application


Modality = Literal["remote", "in_office", "hybrid"]

SCHEMA_NAME = "jobs"


class JobsModel(SQLModel):
    __table_args__ = {"schema": SCHEMA_NAME}


class CompanyBase(JobsModel):
    name: str
    slug: str = Field(unique=True, index=True)
    url: HttpUrl | None = Field(default=None, sa_type=HttpUrlType, unique=True, index=True)
    logo_url: str | None = None


class Company(CompanyBase, BaseSQLModel, table=True):
    jobs: list["Job"] = Relationship(back_populates="company")


class CompensationBase(JobsModel):
    currency: str | None = None
    hiring_bonus: float | None = None
    equity: bool | None = None
    minimum: float | None = None
    maximum: float | None = None
    details: str | None = None
    benefits: list[str] = Field(default=[], sa_column=Column(ARRAY(AutoString)))


class Compensation(CompensationBase, BaseSQLModel, table=True):
    job: "Job" = Relationship(back_populates="compensation")


class JobBase(JobsModel):
    job_title: str
    job_url: HttpUrl = Field(sa_type=HttpUrlType, unique=True, index=True)
    job_type: Literal["full_time", "part_time", "contract"] = Field(sa_type=AutoString)
    llm_summary: str
    job_description: str
    requirements: list[str] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    skills: list[str] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    modality: list[Modality] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    location: str
    other_details: str | None = Field(default=None)


class Job(JobBase, BaseSQLModel, table=True):
    company_id: int | None = Field(
        default=None, foreign_key=f"{SCHEMA_NAME}.company.id", ondelete="SET NULL", nullable=True
    )
    company: Company = Relationship(back_populates="jobs")
    compensation_id: int | None = Field(
        default=None,
        foreign_key=f"{SCHEMA_NAME}.compensation.id",
        ondelete="SET NULL",
        unique=True,
        nullable=True,
    )
    compensation: Compensation | None = Relationship(back_populates="job")
    applications: list["Application"] = Relationship(back_populates="job")

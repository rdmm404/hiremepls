from typing import Literal
from sqlmodel import Field, Relationship, ARRAY, Column, AutoString
from pydantic import HttpUrl

from src.common.base_model import BaseSQLModel
from src.common.utils import HttpUrlType

Modality = Literal["remote", "in_office", "hybrid"]

SCHEMA_NAME = "jobs"


class JobsModel(BaseSQLModel):
    __table_args__ = {"schema": SCHEMA_NAME}


class Company(JobsModel, table=True):
    name: str
    url: HttpUrl | None = Field(default=None, sa_type=HttpUrlType, unique=True, index=True)
    logo_url: str | None = None
    jobs: list["Job"] = Relationship(back_populates="company")


class Compensation(JobsModel, table=True):
    currency: str | None = None
    hiring_bonus: float | None = None
    equity: bool | None = None
    minimum: float | None = None
    maximum: float | None = None
    details: str | None = None
    benefits: list[str] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    job: "Job" = Relationship(back_populates="compensation")


class Job(JobsModel, table=True):
    job_title: str
    job_url: HttpUrl = Field(sa_type=HttpUrlType, unique=True, index=True)
    company_id: int | None = Field(
        foreign_key=f"{SCHEMA_NAME}.company.id", ondelete="SET NULL", nullable=True
    )
    company: Company = Relationship(back_populates="jobs")
    compensation_id: int | None = Field(
        foreign_key=f"{SCHEMA_NAME}.compensation.id",
        ondelete="SET NULL",
        unique=True,
        nullable=True,
    )
    compensation: Compensation | None = Relationship(back_populates="job")
    job_type: Literal["full_time", "part_time", "contract"] = Field(sa_type=AutoString)
    llm_summary: str
    job_description: str
    requirements: list[str] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    skills: list[str] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    modality: list[Modality] = Field(default=[], sa_column=Column(ARRAY(AutoString)))
    location: str
    other_details: str | None = Field(default=None)

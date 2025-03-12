from typing import Literal
from sqlmodel import SQLModel, Field, Relationship, ARRAY, Column, String
from pydantic import HttpUrl

Modality = Literal["remote", "in_office", "hybrid"]

SCHEMA_NAME = "jobs"


class JobsModel(SQLModel):
    __table_args__ = {"schema": SCHEMA_NAME}


class Company(JobsModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    url: str | None = None
    logo_url: str | None = None
    jobs: list["Job"] = Relationship(back_populates="company")


class Compensation(JobsModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    currency: str | None = None
    hiring_bonus: float | None = None
    equity: bool | None = None
    minimum: float | None = None
    maximum: float | None = None
    details: str | None = None
    benefits: list[str] = Field(default=[], sa_column=Column(ARRAY(String)))
    job: "Job" = Relationship(back_populates="compensation")


class Job(JobsModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    job_title: str
    job_url: HttpUrl = Field(sa_type=String)
    company_id: int = Field(
        foreign_key=f"{SCHEMA_NAME}.company.id", ondelete="SET NULL", nullable=True
    )
    company: Company = Relationship(back_populates="jobs")
    compensation_id: int = Field(
        foreign_key=f"{SCHEMA_NAME}.compensation.id",
        ondelete="SET NULL",
        unique=True,
        nullable=True,
    )
    compensation: Compensation | None = Relationship(back_populates="job")
    job_type: Literal["full_time", "part_time", "contract"] = Field(sa_type=String)
    llm_summary: str
    job_description: str
    requirements: list[str] = Field(default=[], sa_column=Column(ARRAY(String)))
    skills: list[str] = Field(default=[], sa_column=Column(ARRAY(String)))
    modality: list[Modality] = Field(default=[], sa_column=Column(ARRAY(String)))
    location: str
    other_details: str | None = Field(default=None)

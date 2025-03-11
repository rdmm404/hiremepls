import json

from typing import Literal, List, Annotated
from rich import print

from pydantic import BaseModel, Field


class Company(BaseModel):
    name: Annotated[str, Field(description="Name of the company.")]
    url: Annotated[str | None, Field(description="Url of the homepage of the company, if present.")]
    logo_url: Annotated[
        str | None, Field(description="Url of the logo of the company, if present.")
    ]


class Compensation(BaseModel):
    currency: Annotated[str | None, Field(description="Currency of the salary.")]
    hiring_bonus: Annotated[float | None, Field(description="Hiring bonus amount.")]
    equity: Annotated[
        bool | None,
        Field(
            description=(
                "Indicates if the company offers equity with the job."
                "Do not include this if equity is not mentioned."
            )
        ),
    ]
    minimum: Annotated[float | None, Field(description="Minimum base salary amount.")]
    maximum: Annotated[float | None, Field(description="Maximum base salary amount.")]
    details: Annotated[str | None, Field(description="Additional details about the salary.")]
    benefits: Annotated[
        list[str],
        Field(
            description="List of benefits offered. Here you can reword the description to make them more concise."
        ),
    ]


Modality = Literal["remote", "in_office", "hybrid"]


class Job(BaseModel):
    compensation: Annotated[
        Compensation,
        Field(
            description="Salary information. Please fill it out when the job "
            "description provides salary range and compensation details. Make sure to fill it out EVERY TIME YOU CAN PLEASE"
        ),
    ]
    company: Company
    job_title: Annotated[str, Field(description="The job title of this job posting.")]
    job_type: Annotated[
        Literal["full_time", "part_time", "contract"],
        Field(description="The type of the contract for this job."),
    ]
    llm_summary: Annotated[
        str,
        Field(
            description="Generate a short summary of the overall job description including the most relevant details."
        ),
    ]
    job_description: Annotated[
        str,
        Field(
            description="Job description text, formatted nicely. "
            "Do not alter the content of the description, just format it in a human-readable way. "
            "Do NOT add titles or subtitles. This should be just a series of blocks of text. Nothing else. "
            "Please make sure that this is just a paragraph. Do not include headings like: "
            "Location\nRemote\nEmployment Type\nFull time\nLocation Type\nRemote"
        ),
    ]
    requirements: Annotated[List[str], Field(description="List of job requirements.")]
    skills: Annotated[List[str], Field(description="List of required skills.")]
    location: Annotated[str, Field(description="Job location.")]
    modality: Annotated[
        List[Modality],
        Field(description="List of work modalities offered (remote, in_office, hybrid)."),
    ]
    other_details: Annotated[
        str | None,
        Field(
            description="Any other relevant job details that haven't been covered by "
            "other sections. Please do not repeat any other information that can be found in other fields of the schema. "
            "Make sure that this is at least a complete sentence. If there are no relevant details to form"
            "a complete sentence, then do not include it, set it as null."
        ),
    ]


class LLMResult(BaseModel):
    job_description: Annotated[Job, "Structured data with job description details."]
    parsed: Annotated[bool, "If the input was correctly parsed into a structured schema."]


if __name__ == "__main__":
    print(json.dumps(Job.model_json_schema(by_alias=False), indent=2))

import sqlalchemy as sa

from datetime import datetime
from sqlmodel import SQLModel, Field


class BaseSQLModel(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime | None = Field(  # type: ignore
        default=None, sa_type=sa.DateTime(), sa_column_kwargs={"server_default": sa.func.now()}
    )
    # TODO: find a way to make this serverside and work automagically with alembic without manual trigger creation
    updated_at: datetime | None = Field(  # type: ignore
        default=None,
        sa_type=sa.DateTime(),
        sa_column_kwargs={"onupdate": sa.func.now(), "server_default": sa.func.now()},
    )

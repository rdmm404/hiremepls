"""Add unique constraint in applications table

Revision ID: 39ee9745ed1c
Revises: 6d0f20ad13e6
Create Date: 2025-03-14 19:47:30.709801

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '39ee9745ed1c'
down_revision: Union[str, None] = '6d0f20ad13e6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('user_job_unique_constraint', 'application', ['user_id', 'job_id'], schema='applications')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_job_unique_constraint', 'application', schema='applications', type_='unique')
    # ### end Alembic commands ###

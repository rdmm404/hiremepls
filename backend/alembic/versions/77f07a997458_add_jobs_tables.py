"""Add jobs tables

Revision ID: 77f07a997458
Revises: 0b745d619f0a
Create Date: 2025-03-12 17:35:35.049998

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '77f07a997458'
down_revision: Union[str, None] = '0b745d619f0a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("CREATE SCHEMA IF NOT EXISTS jobs")
    op.create_table('company',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('logo_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    schema='jobs'
    )
    op.create_table('compensation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('currency', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('hiring_bonus', sa.Float(), nullable=True),
    sa.Column('equity', sa.Boolean(), nullable=True),
    sa.Column('minimum', sa.Float(), nullable=True),
    sa.Column('maximum', sa.Float(), nullable=True),
    sa.Column('details', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('benefits', sa.ARRAY(sa.String()), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    schema='jobs'
    )
    op.create_table('job',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_title', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('job_url', sa.String(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('compensation_id', sa.Integer(), nullable=True),
    sa.Column('job_type', sa.String(), nullable=False),
    sa.Column('llm_summary', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('job_description', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('requirements', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('skills', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('modality', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('location', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('other_details', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['jobs.company.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['compensation_id'], ['jobs.compensation.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('compensation_id'),
    schema='jobs'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('job', schema='jobs')
    op.drop_table('compensation', schema='jobs')
    op.drop_table('company', schema='jobs')
    op.execute("DROP SCHEMA IF EXISTS jobs")
    # ### end Alembic commands ###

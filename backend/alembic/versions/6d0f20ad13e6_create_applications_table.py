"""Create applications table

Revision ID: 6d0f20ad13e6
Revises: 3179cea41117
Create Date: 2025-03-12 22:48:39.902578

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = '6d0f20ad13e6'
down_revision: Union[str, None] = '3179cea41117'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("CREATE SCHEMA IF NOT EXISTS applications")
    op.create_table('application',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('status', sqlmodel.sql.sqltypes.AutoString(), server_default='PENDING', nullable=False),
    sa.Column('interview_rounds', sa.Integer(), nullable=True),
    sa.Column('current_round', sa.Integer(), nullable=True),
    sa.Column('notes', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('fit', sa.Float(), nullable=True),
    sa.Column('resume_used', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['job_id'], ['jobs.job.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    schema='applications'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('application', schema='applications')
    op.execute("DROP SCHEMA IF EXISTS applications")
    # ### end Alembic commands ###

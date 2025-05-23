"""Add tasks table

Revision ID: 381a14557fa8
Revises: 39ee9745ed1c
Create Date: 2025-04-06 14:18:07.805822

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '381a14557fa8'
down_revision: Union[str, None] = '39ee9745ed1c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("CREATE SCHEMA IF NOT EXISTS tasks")
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('task_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('status', sqlmodel.sql.sqltypes.AutoString(), server_default='PENDING', nullable=False),
    sa.Column('params', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.Column('result', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    schema='tasks'
    )
    op.create_index(op.f('ix_tasks_task_task_id'), 'task', ['task_id'], unique=True, schema='tasks')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_tasks_task_task_id'), table_name='task', schema='tasks')
    op.drop_table('task', schema='tasks')
    op.execute("DROP SCHEMA IF EXISTS tasks")
    # ### end Alembic commands ###

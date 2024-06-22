"""Merging three heads

Revision ID: c8b1cdaf069a
Revises: 2c346e2ca8a7, 6471b35f82c8, 6dc6ae7d62f1
Create Date: 2024-06-22 14:08:22.958547

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8b1cdaf069a'
down_revision = ('2c346e2ca8a7', '6471b35f82c8', '6dc6ae7d62f1')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass

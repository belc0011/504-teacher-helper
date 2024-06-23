"""merge migration

Revision ID: d59cba814500
Revises: 2c346e2ca8a7, 6471b35f82c8
Create Date: 2024-06-22 13:59:22.857305

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd59cba814500'
down_revision = ('2c346e2ca8a7', '6471b35f82c8')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass

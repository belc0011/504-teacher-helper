"""remove unnecessary column in Comment class

Revision ID: 92bb5714ab43
Revises: 781aa4b75224
Create Date: 2024-06-20 19:33:16.085396

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92bb5714ab43'
down_revision = '781aa4b75224'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint('fk_comments_accommodation_id_accommodations', type_='foreignkey')
        batch_op.drop_column('accommodation_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('accommodation_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_comments_accommodation_id_accommodations', 'accommodations', ['accommodation_id'], ['id'])

    # ### end Alembic commands ###
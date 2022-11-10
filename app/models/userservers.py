# from app.models.user import User
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from app.models import User, Server


class ServerUser(db.Model):

    __tablename__ = "server_users"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    server_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("servers.id")), nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False, primary_key=True)

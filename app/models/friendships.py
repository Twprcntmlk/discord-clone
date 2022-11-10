from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friendship(db.Model):
    __tablename__ = 'friend'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    fk_user_from = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), primary_key=True)
    fk_user_to = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), primary_key=True)
    extra_field = db.Column(db.Integer)


class User (db.Model):
    __tablename__ = 'user'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_to = db.relationship(
        'Friendship', backref='to', primaryjoin=id == Friendship.fk_user_to)
    user_from = db.relationship(
        'Friendship', backref='from', primaryjoin=id == Friendship.fk_user_from)

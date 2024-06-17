from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Student(db.Model, SerializerMixin):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    grade = db.Column(db.Integer)
    
    accommodations = db.relationship('Accommodation', backref='student')

    def repr(self):
        return f'{self.last_name}, {self.first_name} in grade {self.grade}'

class Accommodation(db.Model, SerializerMixin):
    __tablename__ = "accommodations"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    student = db.relationship('Student', backref='accommodations')
    comments = db.relatinship('Comment', backref="accomodation")

class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodations.id'))

    accommodation = db.relationship('Accommodation', backref='comments')
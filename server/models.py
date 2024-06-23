from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

student_accommodation = db.Table(
    'students_accommodations',
    db.Column('comments', db.String),
    db.Column('student_id', db.Integer, db.ForeignKey(
        'students.id'), primary_key=True),
    db.Column('accommodation_id', db.Integer, db.ForeignKey(
        'accommodations.id'), primary_key=True)
)

class Student(db.Model, SerializerMixin):
    __tablename__ = "students"

    serialize_rules = ('-accommodations.students', '-user.students', '-classes.student')
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    grade = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='students')
    
    accommodations = db.relationship('Accommodation', secondary=student_accommodation, back_populates="students")
    classes = db.relationship('Classes', back_populates='student')

class Accommodation(db.Model, SerializerMixin):
    __tablename__ = "accommodations"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)

    students = db.relationship('Student', secondary=student_accommodation, back_populates="accommodations")
    
    
class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    serialize_rules = ('-students.user',)
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    students = db.relationship('Student', back_populates='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash is not a readable attribute.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
class Classes(db.Model, SerializerMixin):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    student = db.relationship('Student', back_populates='classes')

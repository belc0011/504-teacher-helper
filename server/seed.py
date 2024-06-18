#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Accommodation, Student

if __name__ == '__main__':
    with app.app_context():

        print("Deleting all records...")
        Student.query.delete()
        User.query.delete()
        Accommodation.query.delete()

        fake = Faker()
    
        print("Starting seed...")
    
        accommodation1 = Accommodation(description="Preferential seating, Guided notes, Extra time on assessments, Graphing organizer")
        student1 = Student(
            first_name="Alice", 
            last_name="Smith", 
            grade=10)
        user1 = User(
            first_name="Jenny",
            last_name="Goodwinn",
            username="becky", 
            _password_hash="goodhair")

        db.session.add(accommodation1)
        db.session.add(student1)
        db.session.add(user1)

        db.session.commit()

        print("Seeding complete")

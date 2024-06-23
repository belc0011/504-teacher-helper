#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from datetime import timedelta
from sqlalchemy import select

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Student, Accommodation, Classes, student_accommodation

# Views go here!
class Signup(Resource):
    def post(self):
        request_dict = request.get_json()
        new_user = User(
                first_name=request_dict['firstName'].title(),
                last_name=request_dict['lastName'].title(),
                username=request_dict['userName'])
        new_user.password_hash = request_dict['password']
        
        db.session.add(new_user)
        db.session.commit()
        new_user_dict = new_user.to_dict()
        session['user_id'] = new_user.id
        response = make_response(new_user_dict, 201)
        return response
    
class Login(Resource):
    def post(self):
        session.permanent = True
        request_dict = request.get_json()
        user = User.query.filter_by(username=request_dict['userName']).first()
        if user and user.authenticate(request_dict['password']):
            user_dict = user.to_dict()
            session['user_id'] = user.id
            response = make_response(user_dict, 200)
            return response
        else:
            return {'message': 'Incorrect username or password'}, 401

class CheckSession(Resource):
    def get(self):
        session.permanent = True
        print("Printing session object in CheckSession", session)
        if session.get('user_id'):
            user = User.query.filter_by(id=session.get('user_id')).first()
            response = make_response(user.to_dict(), 200)
            return response
        else:
            return {'message': 'Error, unauthorized user'}, 401

class Session(Resource):
    def get(self):
        user_id = session.get('user_id')
        return jsonify({'user_id': user_id})
   
class Logout(Resource):
    def delete(self):
        print("In Logout")
        session.get('user_id')
        session['user_id'] = None
        return {}, 204

class Students(Resource):
    def get(self):
        session.permanent = True
        print("Here is the user_id: ", session.get('user_id'))
        if session.get('user_id'):
            user_id = session['user_id']
            students = Student.query.filter_by(user_id=user_id).all()
            print("Here is the results of the query for students: ", students)
            if students:
                student_list = []
                for student in students:
                    student_found = student.to_dict()
                    student_list.append(student_found)
                response = make_response(student_list, 200)
                return response
            else:
                return {'message': 'No students found'}, 404
        else:
            return {'message': 'Unauthorized user'}, 401
    def post(self):
        print("Session User ID:", session.get('user_id'))
        request_json = request.get_json()
        if session.get('user_id'):
            print("insidse if statement")
            user_id = session.get('user_id')
            new_student = Student(
                first_name=request_json['firstName'].title(),
                last_name=request_json['lastName'].title(),
                grade=request_json['grade'],
                user_id=user_id
            )
            print("Here's the new student", new_student)
            if new_student:
                db.session.add(new_student)
                db.session.commit()
                new_student_dict = new_student.to_dict()
                response = make_response(new_student_dict, 201)
                print("Here is the response:", response)
                return response
            else:
                return {'message': 'Error: unable to create new student'}, 404
        else:
            return 401

class StudentById(Resource):

    def get(self, id):
        print("Here's the id from studentbyid: ", id)
        if session.get('user_id'):
            student = Student.query.filter_by(id=id).first()
            if student:
                response = make_response(student.to_dict(), 200)
                return response
            else:
                return {'message': 'Student not found'}, 404
        else:
            return {'message': 'Error, unauthorized user'}, 401
    
    def post(self, id):
        if session.get('user_id'):
            new_class_dict = request.get_json()
            new_class = Classes(
                name = new_class_dict['class'].title(),
                student_id=id
                )
            db.session.add(new_class)
            db.session.commit()
            student = Student.query.filter_by(id=id).first()
            response = make_response(student.to_dict(), 201)
            return response
        else:
            return {'message': 'Unauthorized user'}, 401
    

class AddAccommodation(Resource):
    def post(self, id):
        request_json = request.get_json()
        print("Inside AddAccommodation, here's request_json: ", request_json)
        if session.get('user_id'):
            description = request_json.get('accommodation')
            existing_accommodation = Accommodation.query.filter_by(description=description).first()
            if existing_accommodation:
                accommodation = existing_accommodation
            else:
                accommodation = Accommodation(
                    description=request_json['accommodation']
                )
                db.session.add(accommodation)
            student = Student.query.filter_by(id=id).first()
            student.accommodations.append(accommodation)
            accommodation.students.append(student)
            db.session.commit()
            response = make_response(student.to_dict(), 201)
            return response
        else:
            return {'message': 'Error, unauthorized user'}, 401

class AccommodationSearch(Resource):
    def get(self):
        print("Inside AccommodationSearch Resource, here's the request args:", request.args)
        if session.get('user_id'):
            description = request.args.get('description')
            accommodation = Accommodation.query.filter_by(description=description).first()
            accommodation_id = accommodation.id
            query = select(student_accommodation).where(
            (student_accommodation.c.accommodation_id == accommodation_id)
            )
            result = db.session.execute(query)
            accommodations = result.fetchall()
            student_list = []
            for accommodation in accommodations:
                student = Student.query.filter_by(id=accommodation.student_id).first()
                if student:
                    student_list.append(student.to_dict())
            response = make_response(student_list, 200)
            return response
        else:
            return {'message': 'Error, unauthorized user'}, 401

class AddComment(Resource):
    def post(self, id, aid):
        if session.get('user_id'):
            comment = request.json.get('comment')
            accommodation = Accommodation.query.filter_by(id=aid).first()
            stmt = student_accommodation.update().where(
                (student_accommodation.c.student_id == id) &
                (student_accommodation.c.accommodation_id == aid)
                ).values(comments=comment)
            db.session.execute(stmt)
            db.session.commit()
            stmt = select(student_accommodation).where(
                (student_accommodation.c.student_id == id) &
                (student_accommodation.c.accommodation_id == aid)
            )
            result = db.session.execute(stmt)
            updated_record = result.fetchone()
            response_data = {
                'accommodations': {
                    'aid': updated_record.accommodation_id,
                    'id': updated_record.student_id,
                    'description': accommodation.description,
                    'comment': updated_record.comments
                }
            }
            response = make_response(response_data, 201)
            return response
        else:
            return 401
class JoinTableStudent(Resource):
    def get(self, id):
        if session.get('user_id'):
            print("Inside JoinTable, ID:", id)
            stmt = select(student_accommodation).where(
                (student_accommodation.c.student_id == id)
            )
            result = db.session.execute(stmt)
            print("Here's JoinTable result:", result)
            updated_record = result.fetchall()
            student = Student.query.filter_by(id=id).first()
            first_name = student.first_name
            last_name = student.last_name
            student = first_name + " " + last_name
            response_accommodations = []
            if updated_record:
                for record in updated_record:
                    accommodation = Accommodation.query.filter_by(id=record.accommodation_id).first()
                    response_accommodations.append({
                        "description": accommodation.description,
                        "comment": record.comments,
                        "id": accommodation.id
                    })
                response_dict = {
                    'student': student,
                    'accommodations': response_accommodations
                }
                response = make_response(response_dict, 200)
                return response
            else:
                return {'message': 'No data'}, 404
        else:
            return 401


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/', endpoint='')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Students, '/students', endpoint='students')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Session, '/get_session_id', endpoint='get_session_id')
api.add_resource(StudentById, '/students/<int:id>', endpoint='students/<int:id>')
api.add_resource(AddAccommodation, '/add_accommodation/<int:id>', endpoint='add_accommodation/<int:id>')
api.add_resource(AccommodationSearch, '/search_accommodation', endpoint='search_accommodation')
api.add_resource(AddComment, '/comments/<int:id>/<int:aid>', endpoint='comments/<int:id>/<int:aid>')
api.add_resource(JoinTableStudent, '/join_table_student/<int:id>', endpoint='join_table_student/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=False)


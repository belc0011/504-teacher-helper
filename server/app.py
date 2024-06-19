#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from datetime import timedelta

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Accommodation, Student, Comment

# Views go here!
class Signup(Resource):
    def post(self):
        request_dict = request.get_json()
        new_user = User(
                first_name=request_dict['first_name'].title(),
                last_name=request_dict['last_name'].title(),
                username=request_dict['username'])
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
        user = User.query.filter_by(username=request_dict['username']).first()
        if user and user.authenticate(request_dict['password']):
            user_dict = user.to_dict()
            session['user_id'] = user.id
            print("PRINTING SESSION OBJECT1:", session)
            response = make_response(user_dict, 200)
            print("PRINTING SESSION OBJECT AGAIN:", session)
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

class StudentList(Resource):
    def get(self):
        session.permanent = True

        print("PRINTING SESSION OBJECT3:", session)
        print("REQUEST HEADERS:", request.headers)

        if session.get('user_id'):
            # User is logged in, fetch their students
            user_id = session['user_id']
            students = Student.query.filter_by(user_id=user_id).all()
            if students:
                response = make_response(students.to_dict(), 200)
                return response
            else:
                return {'message': 'No students found'}, 404
        else:
            return {'message': 'Unauthorized user'}, 401

class StudentByName(Resource):

    def get(self, name):
        if session.get('user_id'):
            student = Student.query.filter_by(last_name=session.get('last_name')).first()
            if student:
                response = make_response(student.to_dict(), 200)
                return response
            else:
                return {'message': 'Student not found'}, 404
        else:
            return {'message': 'Error, unauthorized user'}, 401
        

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/', endpoint='')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(StudentList, '/students', endpoint='students')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Session, '/get_session_id', endpoint='get_session_id')

if __name__ == '__main__':
    app.run(port=5555, debug=False)


#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Accommodation, Student, Comment

# Views go here!
class Signup(Resource):
    def post(self):
        request_dict = request.get_json()
        print("PRINT:", request_dict)
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
        request_dict = request.get_json()
        user = User.query.filter_by(username=request_dict['username']).first()
        if user and user.authenticate(request_dict['password']):
            user_dict = user.to_dict()
            print("PRINT STATEMENT:", user_dict)
            session['user_id'] = user.id
            response = make_response(user_dict, 200)
            return response
        else:
            return {'message': 'Incorrect username or password'}, 401

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter_by(id=session.get('user_id')).first()
            response = make_response(user.to_dict(), 200)
            return response
        else:
            return {'message': 'Error, unauthorized user'}, 401
        
class Logout(Resource):
    def delete(self):
        print("PRINT STATEMENT:******", session)
        if session.get('user_id'):
            print("PRINT STATEMENT*******, inside if")
            session['user_id'] = None
            return {}, 204
        else:
            return {'message': 'Error, not currently logged in'}, 401

class StudentList(Resource):
    def get(self):
        if session.get('user_id'):
            students = Student.query.filter_by(user_id=session.get('user_id')).all()

class Home(Resource):
    def get(self):
        return {}, 200

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/', endpoint='')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(StudentList, '/students', endpoint='students')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Home, '/home', endpoint='home')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


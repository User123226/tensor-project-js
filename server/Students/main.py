import json
from types import SimpleNamespace

# import bottle
from flask import Flask
from flask import request
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from flask_cors import CORS
from pydantic import BaseModel

# from bottle import request, response, hook, route, put
# from bottle import post, get, run, delete
import db_helper
import config

# class EnableCors(object):
#     name = 'enable_cors'
#     api = 2
#     def apply(self, fn, context):
#         def _enable_cors(*args, **kwargs):
#             # set CORS headers
#             response.headers['Access-Control-Allow-Origin'] = '*'
#             response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS, DELETE'
#             response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
#
#
#             if bottle.request.method != 'OPTIONS':
#                 # actual request; reply with the actual response
#                 return fn(*args, **kwargs)
#
#         return _enable_cors

app = Flask(__name__)
CORS(app)

class Student(BaseModel):
    id: int = None
    name: str
    middle_name: str
    last_name: str
    university: str
    course: int
    birth_date: str
    student_number: int
    photo: str


@app.route('/students', methods=['GET'])
def students_list():
    # ничего не делаем, т.к. в конце любого действия action все равно возвращает таблицу
    list_all = ""
    return db_helper.action(list_all)


@app.route('/create_student/', methods=['GET', 'PUT'])
def create():
    student = request.json
    name = student['name']
    middle_name = student['middle_name']
    last_name = student['last_name']
    university = student['university']
    course = str(student['course'])
    birth_date = student['birth_date']
    student_number = str(student['student_number'])
    photo = student['photo']
    insert = "INSERT INTO `students` (Name, Middle_name, Last_name," \
             "University, Course, Birth_date, Student_number, Photo) VALUES (\'" + name + "\'," \
             "\'" + middle_name + "\', \'" + last_name + "\', \'" + university + "\', " + course + "," \
             "\'" + birth_date + "\', " + student_number + ", \'" + photo + "\');"
    print(insert)
    return db_helper.action(insert)


@app.route('/update_student/<id>', methods=['GET','POST'])
def update(id: int):
    student = request.json
    name = student['name']
    middle_name = student['middle_name']
    last_name = student['last_name']
    university = student['university']
    course = str(student['course'])
    birth_date = student['birth_date']
    student_number = str(student['student_number'])
    photo = student['photo']
    update = "UPDATE `students` SET Name = \'" + name + "\', Middle_name = \'" + middle_name + "\'," \
             "Last_name = \'" + last_name + "\', University = \'" + university + "\'," \
             "Course = " + course + ", Birth_date = \'" + birth_date + "\'," \
             "Student_number = " + student_number + ", Photo = \'" + photo + "\' WHERE id =" + str(id)
    return db_helper.action(update)


@app.route('/delete_student/<id>', methods=['GET','DELETE'])
def delete(id: int):
    delete = "DELETE FROM `Students` WHERE id =" + str(id)
    return db_helper.action(delete)

# app.install(EnableCors())
# if __name__ == "__main__":
#     app.run(host='localhost', port=8080)

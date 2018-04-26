from flask import Flask, jsonify, request
from service import Service, InvalidUsage
from db.db import db, Task, User

app = Flask(__name__)
service = Service()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.sqlite'

with app.app_context():
    db.init_app(app)
    db.create_all()


@app.route("/tasks")
def list_tasks():
    return jsonify(service.list_tasks())


@app.route("/users")
def list_users():
    return jsonify(service.list_users())


@app.route("/user/<int:id>/tasks", methods=["POST"])
def create_task(id: int):
    body = request.get_json()
    task = service.create_task(id, body)
    return jsonify(task)


@app.route("/user/<int:id>/tasks")
def get_user_tasks(id: int):
    return jsonify(service.list_user_tasks(id))


@app.route("/task/<int:task_id>")
def get_task(task_id: int):
    return jsonify(service.get_task(task_id))


@app.route("/task/<int:task_id>", methods=["POST"])
def update_task(task_id: int):
    body = request.get_json()
    task = service.update_task(task_id, body)
    return jsonify(task)


@app.route("/task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id: int):
    service.delete_task(task_id)
    return ('', 204)


@app.route("/task/<int:task_id>/status", methods=["PUT"])
def mark_as_done(task_id: int):
    body = request.get_json()
    task = service.set_task_completed(task_id, body['status'])
    return jsonify(task)


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

if __name__ == '__main__':
    app.run()

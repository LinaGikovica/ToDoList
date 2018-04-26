from db.db import db, User, Task


class Service(object):
    def list_users(self):
        return [u.serialize() for u in User.find_all()]

    def list_tasks(self):
        return [t.serialize() for t in Task.find_all()]

    def list_user_tasks(self, user_id: int):
        user = User.find_by_id(user_id)
        if user is None:
            raise InvalidUsage("No such user", 404)

        return [t.serialize() for t in user.tasks]

    def get_task(self, task_id: int):
        task = Task.find_by_id(task_id)
        if task is None:
            raise InvalidUsage("No such task", 404)

        return task.serialize()

    def delete_task(self, task_id):
        task = Task.find_by_id(task_id)
        if task is None:
            raise InvalidUsage("No such task", 404)

        Task.delete(task)

    def create_task(self, user_id, body):
        user = User.find_by_id(user_id)
        if user is None:
            raise InvalidUsage("No such user", 404)

        if 'content' not in body:
            raise InvalidUsage("Task must have content")

        newTask = Task(content=body['content'])
        User.add_task(user, newTask)

        return newTask.serialize()

    def update_task(self, task_id, body):
        if 'content' not in body:
            raise InvalidUsage("Task must have content")

        task = Task.find_by_id(task_id)
        if task is None:
            raise InvalidUsage("No such task", 404)

        task.content = body['content']
        Task.save(task)

        return task.serialize()

    def set_task_completed(self, task_id: int, completed: bool):
        task = Task.find_by_id(task_id)
        if task is None:
            raise InvalidUsage("No such task", 404)

        task.completed = completed
        Task.save(task)

        return task.serialize()

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code: int=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
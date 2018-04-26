from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('tasks', lazy=True))

    @staticmethod
    def find_all():
        return Task.query.all()

    @staticmethod
    def find_by_id(id: int):
        return Task.query.filter_by(id=id).first()

    @staticmethod
    def save(task):
        db.session.add(task)
        db.session.commit()

    @staticmethod
    def delete(task):
        db.session.delete(task)
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'completed': self.completed,
            'user_id': self.user_id
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)

    @staticmethod
    def find_all():
        return User.query.all()

    @staticmethod
    def find_by_id(user_id: int):
        return User.query.filter_by(id=user_id).first()

    @staticmethod
    def add_task(user, task: Task):
        task.user = user
        user.tasks.append(task)

        db.session.add(task)
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username
        }

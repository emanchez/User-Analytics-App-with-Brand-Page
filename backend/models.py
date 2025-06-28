from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()


class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(50), nullable=False)
    element = db.Column(db.String(100))
    component = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    user_session = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "event_type": self.event_type,
            "element": self.element,
            "component": self.component,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            "user_session": self.user_session,
        }

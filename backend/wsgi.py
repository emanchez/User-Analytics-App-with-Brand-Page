from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Event
import os

app = Flask(__name__)

# Configure CORS to allow requests from Next.js frontend
CORS(
    app,
    origins=["http://localhost:3000"],
    methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f'sqlite:///{os.path.join(basedir, "analytics.db")}'
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy with app
db.init_app(app)


@app.route("/")
def home():
    return jsonify({"message": "Analytics API Ready"})


@app.route("/events", methods=["POST"])
def log_event():
    try:
        response = request.json
        if not response:
            return jsonify({"error": "No JSON response provided"}), 400

        event = Event(
            event_type=response.get("event_type"),  # type: ignore
            element=response.get("element"),  # type: ignore
            component=response.get("component"),  # type: ignore
            user_session=response.get("user_session"),  # type: ignore
        )
        db.session.add(event)
        db.session.commit()
        return jsonify({"status": "logged", "id": event.id})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/events", methods=["GET"])
def get_events():
    try:
        events = Event.query.order_by(Event.timestamp.desc()).limit(100).all()
        return jsonify([event.to_dict() for event in events])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Create tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run()

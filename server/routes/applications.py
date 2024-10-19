from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# FastAPI app instance
router = APIRouter()

# Get the DATABASE_URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# SQLAlchemy model
class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    time = Column(String, nullable=False)
    location = Column(String, nullable=False)
    status = Column(String, nullable=False)  # e.g., 'upcoming', 'completed'


# Create the table
Base.metadata.create_all(bind=engine)


# Pydantic models
class AppointmentCreate(BaseModel):
    title: str
    date: datetime
    time: str
    location: str
    status: str

    class Config:
        orm_mode = True


class AppointmentResponse(AppointmentCreate):
    id: int


# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.on_event("startup")
def mock_data():
    db = SessionLocal()
    # Check if the table is empty
    if not db.query(Appointment).first():
        mock_appointments = [
            Appointment(
                title="Prenatal Checkup",
                date=datetime(2024, 10, 20, 10, 0),
                time="10:00 AM",
                location="Main Clinic",
                status="upcoming",
            ),
            Appointment(
                title="Ultrasound",
                date=datetime(2024, 10, 25, 14, 30),
                time="2:30 PM",
                location="Imaging Center",
                status="upcoming",
            ),
            Appointment(
                title="Dental Cleaning",
                date=datetime(2024, 10, 30, 9, 0),
                time="9:00 AM",
                location="Dental Clinic",
                status="completed",
            ),
            Appointment(
                title="Physical Therapy",
                date=datetime(2024, 11, 5, 11, 30),
                time="11:30 AM",
                location="Rehab Center",
                status="upcoming",
            ),
            Appointment(
                title="Eye Exam",
                date=datetime(2024, 11, 10, 15, 45),
                time="3:45 PM",
                location="Eye Clinic",
                status="upcoming",
            ),
        ]
        db.add_all(mock_appointments)
        db.commit()


@router.get("/appointments", response_model=list[AppointmentResponse])
def get_appointments(db=Depends(get_db)):
    appointments = db.query(Appointment).all()
    return appointments


@router.post("/appointments", response_model=AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, db=Depends(get_db)):
    new_appointment = Appointment(**appointment.dict())
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment

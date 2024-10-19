from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# FastAPI router instance
router = APIRouter()

# Mock database setup
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Database setup using SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()


def create_db_and_tables():
    # Replace with your DATABASE_URL
    DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)


create_db_and_tables()


# SQLAlchemy UserProfile model
class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    location = Column(String, nullable=False)
    blood_type = Column(String, nullable=False)
    allergies = Column(String, nullable=True)  # Storing as comma-separated string
    medications = Column(String, nullable=True)  # Storing as comma-separated string


# Create the table in the database
Base.metadata.create_all(bind=engine)


# Pydantic model for the user profile response
class UserProfileResponse(BaseModel):
    id: int
    name: str
    age: int
    phone: str
    email: str
    location: str
    blood_type: str
    allergies: list[str]
    medications: list[str]

    class Config:
        orm_mode = True


# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Mock data for demonstration
@router.on_event("startup")
def mock_data():
    db = SessionLocal()
    # Check if the table is empty
    if not db.query(UserProfile).first():
        mock_profile = UserProfile(
            name="John Doe",
            age=35,
            phone="(555) 123-4567",
            email="john.doe@example.com",
            location="New York, NY",
            blood_type="A+",
            allergies="Penicillin,Peanuts",  # Properly formatted string, no extra braces or quotes
            medications="Lisinopril 10mg daily,Metformin 500mg twice daily",  # Properly formatted
        )
        db.add(mock_profile)
        db.commit()


# API route to fetch the profile by user ID
@router.get("/profile/{user_id}", response_model=UserProfileResponse)
def get_user_profile(user_id: int, db=Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")

    # Ensure proper conversion of comma-separated strings into lists
    profile.allergies = (
        [item.strip() for item in profile.allergies.split(",")]
        if profile.allergies
        else []
    )
    profile.medications = (
        [item.strip() for item in profile.medications.split(",")]
        if profile.medications
        else []
    )

    return profile

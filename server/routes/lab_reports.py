from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy import Column, Integer, String, Date, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pydantic import BaseModel
from typing import List
from datetime import date
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# FastAPI instance

# FastAPI router
router = APIRouter()

# Database setup using environment variable
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for SQLAlchemy models
Base = declarative_base()


# SQLAlchemy LabReport model
class LabReport(Base):
    __tablename__ = "lab_reports"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # Name of the test
    category = Column(String, nullable=False)  # Category (e.g., Blood Test)
    report_date = Column(Date, nullable=False)  # Date of the test
    status = Column(String, nullable=False)  # Status (e.g., Normal, Abnormal, Pending)


# Pydantic model for creating a new lab report
class LabReportCreate(BaseModel):
    name: str
    category: str
    report_date: date
    status: str


# Pydantic model for the lab report response
class LabReportResponse(BaseModel):
    id: int
    name: str
    category: str
    report_date: date
    status: str

    class Config:
        orm_mode = True


# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create the database and tables
def create_db_and_tables():
    print("Ensuring tables are created...")
    Base.metadata.create_all(bind=engine)  # Ensure tables are created before querying


# Function to add mock data to the database
def mock_data():
    db = SessionLocal()
    # Check if the table is empty
    if not db.query(LabReport).first():
        print("Inserting mock data...")
        mock_reports = [
            LabReport(
                name="Complete Blood Count (CBC)",
                category="Blood Test",
                report_date=date(2024, 10, 15),
                status="Normal",
            ),
            LabReport(
                name="Thyroid Function Test",
                category="Hormone Test",
                report_date=date(2024, 10, 10),
                status="Abnormal",
            ),
            LabReport(
                name="Lipid Panel",
                category="Blood Test",
                report_date=date(2024, 9, 30),
                status="Normal",
            ),
            LabReport(
                name="Urinalysis",
                category="Urine Test",
                report_date=date(2024, 9, 25),
                status="Pending",
            ),
            LabReport(
                name="Vitamin D Test",
                category="Vitamin Test",
                report_date=date(2024, 9, 20),
                status="Abnormal",
            ),
        ]
        db.add_all(mock_reports)
        db.commit()
    db.close()


# Ensure tables are created on startup
@router.on_event("startup")
def startup_event():
    create_db_and_tables()
    mock_data()  # Populate with mock data if empty


# API route to add a lab report
@router.post("/lab-reports/", response_model=LabReportResponse)
def create_lab_report(report_data: LabReportCreate, db: Session = Depends(get_db)):
    new_report = LabReport(
        name=report_data.name,
        category=report_data.category,
        report_date=report_data.report_date,
        status=report_data.status,
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


# API route to get all lab reports
@router.get("/lab-reports/", response_model=List[LabReportResponse])
def get_lab_reports(db: Session = Depends(get_db)):
    reports = db.query(LabReport).all()
    return reports


# API route to get a specific lab report by ID
@router.get("/lab-reports/{report_id}", response_model=LabReportResponse)
def get_lab_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(LabReport).filter(LabReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Lab report not found")
    return report


# Include the router in the FastAPI router
router.include_router(router)

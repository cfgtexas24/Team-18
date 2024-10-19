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

# Database setup using SQLAlchemy
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# SQLAlchemy CustomQuestion model
class CustomQuestion(Base):
    __tablename__ = "custom_questions"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    type = Column(String, nullable=False)  # 'text', 'textarea', or 'select'
    options = Column(
        String, nullable=True
    )  # For 'select', store options as comma-separated string


# Pydantic model to accept custom question input
class CustomQuestionCreate(BaseModel):
    question: str
    type: str  # 'text', 'textarea', or 'select'
    options: str | None = None  # Only for 'select'

    class Config:
        orm_mode = True


# Pydantic model for the custom question response
class CustomQuestionResponse(BaseModel):
    id: int
    question: str
    type: str  # 'text', 'textarea', or 'select'
    options: list[str] | None  # Return options as a list if it's a 'select'

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
    Base.metadata.create_all(bind=engine)


# Ensure tables are created on startup
@router.on_event("startup")
def startup_event():
    create_db_and_tables()


# API route to add a custom question
@router.post("/questions/", response_model=CustomQuestionResponse)
def create_custom_question(question_data: CustomQuestionCreate, db=Depends(get_db)):
    # If 'type' is 'select', 'options' must be provided
    if question_data.type == "select" and not question_data.options:
        raise HTTPException(
            status_code=400,
            detail="Options must be provided for select type questions.",
        )

    new_question = CustomQuestion(
        question=question_data.question,
        type=question_data.type,
        options=question_data.options,  # Store as a comma-separated string if provided
    )
    db.add(new_question)
    db.commit()
    db.refresh(new_question)  # Refresh to get the new ID
    return new_question


# API route to get all custom questions
@router.get("/questions/", response_model=list[CustomQuestionResponse])
def get_custom_questions(db=Depends(get_db)):
    questions = db.query(CustomQuestion).all()

    # Convert comma-separated options to list for 'select' type questions
    for question in questions:
        if question.type == "select" and question.options:
            question.options = question.options.split(",")

    return questions


# Mock data for demonstration (optional)
@router.on_event("startup")
def mock_data():
    db = SessionLocal()
    # Check if the table is empty
    if not db.query(CustomQuestion).first():
        mock_question_1 = CustomQuestion(
            question="What is your favorite color?",
            type="select",
            options="Red,Blue,Green",  # Comma-separated options for select type
        )
        mock_question_2 = CustomQuestion(
            question="Describe yourself in a few words.", type="textarea", options=None
        )
        mock_question_3 = CustomQuestion(
            question="What is your name?", type="text", options=None
        )
        db.add_all([mock_question_1, mock_question_2, mock_question_3])
        db.commit()

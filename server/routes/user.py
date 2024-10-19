from fastapi import APIRouter, FastAPI, Query
from pydantic import BaseModel
import datetime

app = FastAPI()
# Initialize the APIRouter
router = APIRouter()

# Define user-related routes
@router.get("/user/appt")
async def user_appts(user_id: int = Query(..., description="The ID of the user")):
    mock_appointments = [
        {"id": 1, "user_id": 1, "date": datetime.datetime(2023, 10, 1, 10, 0), "description": "Dentist appointment"},
        {"id": 2, "user_id": 1, "date": datetime.datetime(2023, 10, 2, 12, 0), "description": "Therapy session"},
        {"id": 3, "user_id": 2, "date": datetime.datetime(2023, 10, 3, 14, 0), "description": "Doctor appointment"},
        {"id": 4, "user_id": 2, "date": datetime.datetime(2023, 10, 4, 16, 0), "description": "Job interview"},
        {"id": 5, "user_id": 3, "date": datetime.datetime(2023, 10, 5, 9, 0), "description": "Meeting with client"},
        {"id": 6, "user_id": 4, "date": datetime.datetime(2023, 10, 6, 11, 0), "description": "Lunch with friends"},
        {"id": 7, "user_id": 4, "date": datetime.datetime(2023, 10, 7, 13, 0), "description": "Gym workout"},
        {"id": 8, "user_id": 4, "date": datetime.datetime(2023, 10, 8, 15, 0), "description": "Shopping"},
        {"id": 9, "user_id": 4, "date": datetime.datetime(2023, 10, 9, 17, 0), "description": "Movie night"},
    ]

    user_appointments = [appt for appt in mock_appointments if appt['user_id'] == user_id]
    return user_appointments
    # Filter appointments by user_id
    user_appointments = [appt for appt in mock_appointments if appt['user_id'] == user_id]

    return user_appointments

# @router.get("/user/reports")
# async def user_reports():
#     return None


class UserSchedule(BaseModel):
    datetime: datetime.datetime
    user_id: int
    location: str


@router.post("/user/schedule")
async def user_schedule(schedule: UserSchedule):
    return schedule

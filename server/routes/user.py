from fastapi import APIRouter, FastAPI
import datetime
# Create the FastAPI app
app = FastAPI()
# Initialize the APIRouter
router = APIRouter()

# Define user-related routes
@router.get("/user/appt")
async def user_appts():
    mock_appointments = [
        {"id": 1, "user_id": 1, "date": datetime.datetime(2023, 10, 1, 10, 0), "description": "Dentist appointment"},
        {"id": 2, "user_id": 1, "date": datetime.datetime(2023, 10, 2, 12, 0), "description": "Therapy session"},
        {"id": 3, "user_id": 2, "date": datetime.datetime(2023, 10, 3, 14, 0), "description": "Doctor appointment"},
    ]
    return mock_appointments

# @router.get("/user/reports")
# async def user_reports():
#     return None

# body is datetime, user_id, location
@router.post("/user/schedule")
async def user_schedule(datetime: datetime.datetime, user_id: int, location: str):
    return datetime, user_id, location
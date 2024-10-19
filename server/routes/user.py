from fastapi import APIRouter, FastAPI
# Create the FastAPI app
app = FastAPI()
# Initialize the APIRouter
router = APIRouter()

# Define user-related routes
@router.get("/user/appt")
async def user_appts():
    return None

@router.get("/user/reports")
async def user_reports():
    return None

@router.post("/user/schedule")
async def user_schedule():
    return None



from fastapi import APIRouter, FastAPI

app = FastAPI()
router = APIRouter()


@router.get("/user/appt")
async def user_appts():
    return None

@router.get("/user/reports")
async def user_reports():
    return None

@router.post("/user/schedule")
async def user_schedule():
    return None



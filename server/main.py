from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
app = FastAPI()
from routes.user import router as user_router

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the user router
app.include_router(user_router)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Team 18 Abide",
    }


# Debugging Middleware
@app.middleware("http")
async def cors_debug(request, call_next):
    response = await call_next(request)
    print(f"Request: {request.method} {request.url} - CORS Headers: {response.headers}")
    return response

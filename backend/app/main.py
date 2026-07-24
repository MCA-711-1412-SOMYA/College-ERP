from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# MODELS
from app.models.student import Student
from app.models.attendance import Attendance
from app.models.faculty import Faculty

# ROUTES
from app.routes.student_routes import router as student_router
from app.routes.auth_routes import router as auth_router
from app.routes.ai_routes import router as ai_router
from app.routes.attendance_routes import router as attendance_router
from app.routes.faculty_routes import router as faculty_router


app = FastAPI(
    title="AI Powered College ERP",
    version="1.0.0"
)

# Create Tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "AI Powered ERP Backend Running 🚀"
    }

# Register Routers
app.include_router(student_router)
app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(attendance_router)
app.include_router(faculty_router)
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.student import Student
from app.models.attendance import Attendance

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/ai-report")
def ai_report(db: Session = Depends(get_db)):

    total_students = db.query(Student).count()

    present_students = db.query(Attendance)\
        .filter(Attendance.status == "Present")\
        .count()

    absent_students = db.query(Attendance)\
        .filter(Attendance.status == "Absent")\
        .count()

    attendance_percentage = 0

    if total_students > 0:
        attendance_percentage = round(
            (present_students / total_students) * 100,
            2
        )

    report = f"""
College ERP AI Report

Total Students: {total_students}

Present Students: {present_students}

Absent Students: {absent_students}

Attendance Percentage: {attendance_percentage}%

Recommendation:
Keep maintaining attendance above 75%.
"""

    return {
        "report": report
    }
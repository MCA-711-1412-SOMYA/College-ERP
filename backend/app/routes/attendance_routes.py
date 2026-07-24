from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.db import SessionLocal
from app.models.attendance import Attendance
from app.models.student import Student
from app.schemas.attendance_schema import AttendanceCreate

router = APIRouter()


# DATABASE CONNECTION

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET ALL ATTENDANCE

@router.get("/attendance")
def get_attendance(
    db: Session = Depends(get_db)
):
    return db.query(Attendance).all()


# ADD ATTENDANCE

@router.post("/attendance")
def add_attendance(
    data: AttendanceCreate,
    db: Session = Depends(get_db)
):

    # Check Student Exists

    student = db.query(Student)\
                .filter(Student.id == data.student_id)\
                .first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail=f"Student ID {data.student_id} not found"
        )

    # Prevent Duplicate Attendance
    existing = db.query(Attendance).filter(
        Attendance.student_id == data.student_id,
        Attendance.attendance_date == data.attendance_date
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this student on this date"
        )

    new_attendance = Attendance(
        student_id=data.student_id,
        status=data.status,
        attendance_date=data.attendance_date
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return {
        "message": "Attendance marked successfully",
        "data": new_attendance
    }


# ATTENDANCE STATS

@router.get("/attendance-stats")
def attendance_stats(
    db: Session = Depends(get_db)
):

    total_students = db.query(Student).count()

    latest_date = db.query(
        func.max(Attendance.attendance_date)
    ).scalar()

    if not latest_date:
        return {
            "total_students": total_students,
            "present_students": 0,
            "absent_students": 0,
            "attendance_percentage": 0,
            "attendance_date": None
        }

    present_students = db.query(Attendance)\
        .filter(
            Attendance.status == "Present",
            Attendance.attendance_date == latest_date
        )\
        .count()

    absent_students = db.query(Attendance)\
        .filter(
            Attendance.status == "Absent",
            Attendance.attendance_date == latest_date
        )\
        .count()

    attendance_percentage = 0

    if (present_students + absent_students) > 0:
        attendance_percentage = round(
            (
                present_students /
                (present_students + absent_students)
            ) * 100,
            2
        )

    return {
        "total_students": total_students,
        "present_students": present_students,
        "absent_students": absent_students,
        "attendance_percentage": attendance_percentage,
        "attendance_date": latest_date
    }
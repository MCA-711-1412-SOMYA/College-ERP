from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from openpyxl import Workbook
from reportlab.platypus import SimpleDocTemplate, Table

from app.database.db import SessionLocal
from app.models.student import Student
from app.schemas.student_schema import StudentCreate

router = APIRouter()


# DATABASE CONNECTION

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET ALL STUDENTS

@router.get("/students")
def get_students(
    db: Session = Depends(get_db)
):
    return db.query(Student).all()


# ADD STUDENT

@router.post("/students")
def add_student(
    student: StudentCreate,
    db: Session = Depends(get_db)
):

    # Duplicate Email Check
    existing_student = db.query(Student).filter(
        Student.email == student.email
    ).first()

    if existing_student:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_student = Student(
        name=student.name,
        email=student.email,
        course=student.course
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# UPDATE STUDENT

@router.put("/students/{student_id}")
def update_student(
    student_id: int,
    student: StudentCreate,
    db: Session = Depends(get_db)
):

    existing_student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not existing_student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # Duplicate Email Check
    existing_email = db.query(Student).filter(
        Student.email == student.email,
        Student.id != student_id
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    existing_student.name = student.name
    existing_student.email = student.email
    existing_student.course = student.course

    db.commit()
    db.refresh(existing_student)

    return existing_student


# DELETE STUDENT

@router.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(Student)\
        .filter(Student.id == student_id)\
        .first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": "Student deleted successfully"
    }


# EXPORT STUDENTS TO EXCEL

@router.get("/export-students")
def export_students(
    db: Session = Depends(get_db)
):

    students = db.query(Student).all()

    wb = Workbook()
    ws = wb.active

    ws.title = "Students"

    ws.append([
        "ID",
        "Name",
        "Email",
        "Course"
    ])

    for student in students:
        ws.append([
            student.id,
            student.name,
            student.email,
            student.course
        ])

    file_name = "students.xlsx"

    wb.save(file_name)

    return FileResponse(
        path=file_name,
        filename=file_name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


# EXPORT STUDENTS TO PDF

@router.get("/student-report")
def student_report(
    db: Session = Depends(get_db)
):

    students = db.query(Student).all()

    pdf_file = "student_report.pdf"

    doc = SimpleDocTemplate(pdf_file)

    data = [["ID", "Name", "Email", "Course"]]

    for s in students:
        data.append([
            s.id,
            s.name,
            s.email,
            s.course
        ])

    table = Table(data)

    doc.build([table])

    return FileResponse(
        pdf_file,
        media_type="application/pdf",
        filename="student_report.pdf"
    )


# COURSE WISE STUDENT STATS

@router.get("/course-stats")
def course_stats(
    db: Session = Depends(get_db)
):

    data = (
        db.query(
            Student.course,
            func.count(Student.id)
        )
        .group_by(Student.course)
        .all()
    )

    return [
        {
            "course": item[0],
            "count": item[1]
        }
        for item in data
    ]
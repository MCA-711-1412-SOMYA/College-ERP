from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.faculty import Faculty

router = APIRouter()


# Database Connection

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Add Faculty

@router.post("/faculty")
def add_faculty(
    data: dict,
    db: Session = Depends(get_db)
):

    # Empty Validation

    if (
        not data.get("name") or
        not data.get("email") or
        not data.get("department") or
        not data.get("designation")
    ):
        raise HTTPException(
            status_code=400,
            detail="All fields are required"
        )

    # Duplicate Email Check

    existing_faculty = db.query(Faculty).filter(
        Faculty.email == data["email"]
    ).first()

    if existing_faculty:
        raise HTTPException(
            status_code=400,
            detail="Faculty email already exists"
        )

    faculty = Faculty(
        name=data["name"],
        email=data["email"],
        department=data["department"],
        designation=data["designation"]
    )

    db.add(faculty)
    db.commit()
    db.refresh(faculty)

    return {
        "message": "Faculty Added Successfully"
    }


# Get All Faculty

@router.get("/faculty")
def get_faculty(
    db: Session = Depends(get_db)
):
    return db.query(Faculty).all()


# Delete Faculty

@router.delete("/faculty/{faculty_id}")
def delete_faculty(
    faculty_id: int,
    db: Session = Depends(get_db)
):

    faculty = db.query(Faculty).filter(
        Faculty.id == faculty_id
    ).first()

    if not faculty:
        raise HTTPException(
            status_code=404,
            detail="Faculty not found"
        )

    db.delete(faculty)
    db.commit()

    return {
        "message": "Faculty Deleted Successfully"
    }
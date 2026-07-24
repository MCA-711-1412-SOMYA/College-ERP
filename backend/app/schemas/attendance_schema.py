from pydantic import BaseModel
from datetime import date

class AttendanceCreate(BaseModel):
    student_id: int
    status: str
    attendance_date: date
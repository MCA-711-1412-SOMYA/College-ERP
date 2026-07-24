from sqlalchemy import Column, Integer, String, Date
from app.database.db import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)
    attendance_date = Column(Date, nullable=False)
from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)
    designation = Column(String, nullable=False)
from fastapi import APIRouter, HTTPException
from app.database.db import SessionLocal
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.auth.auth_handler import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


# REGISTER
@router.post("/register")
def register(user: UserCreate):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# LOGIN
@router.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # DEBUG LOGS
    print("\n========== LOGIN DEBUG ==========")
    print("Email:", user.email)
    print("Entered Password:", user.password)
    print("DB Password Hash:", existing_user.password)
    print("Role:", existing_user.role)

    password_match = verify_password(
        user.password,
        existing_user.password
    )

    print("Password Match:", password_match)
    print("=================================\n")

    if not password_match:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {"sub": existing_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": existing_user.role,
        "username": existing_user.username
    }
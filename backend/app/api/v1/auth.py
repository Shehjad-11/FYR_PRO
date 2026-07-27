"""
StoreMind Pro - Authentication Router
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime

from app.database import get_db
from app.models.auth import User, Organization
from app.schemas.auth import UserRegister, UserLogin, LoginResponse, UserResponse, OrganizationResponse
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive or missing")
    return user


@router.post("/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
async def register(data: UserRegister, db: AsyncSession = Depends(get_db)):
    # Check existing user
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create Organization
    org = Organization(
        name=data.organization_name,
        type=data.organization_type
    )
    db.add(org)
    await db.flush()

    # Create User
    user = User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password),
        role="admin",
        organization_id=org.id
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    await db.refresh(org)

    access_token = create_access_token({"sub": user.id, "role": user.role, "org_id": org.id})
    refresh_token = create_refresh_token({"sub": user.id})

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user),
        organization=OrganizationResponse.model_validate(org)
    )


@router.post("/login", response_model=LoginResponse)
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    user.last_login = datetime.utcnow()
    await db.commit()

    org = None
    if user.organization_id:
        org_res = await db.execute(select(Organization).where(Organization.id == user.organization_id))
        org = org_res.scalar_one_or_none()

    access_token = create_access_token({"sub": user.id, "role": user.role, "org_id": user.organization_id})
    refresh_token = create_refresh_token({"sub": user.id})

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user),
        organization=OrganizationResponse.model_validate(org) if org else None
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)

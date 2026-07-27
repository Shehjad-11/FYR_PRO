"""
StoreMind Pro - Auth Pydantic Schemas
"""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime


class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    phone: Optional[str] = Field(default=None)
    organization_name: str = Field(..., min_length=2, max_length=100)
    organization_type: str = Field(default="supermarket")


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    role: str
    organization_id: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class OrganizationResponse(BaseModel):
    id: str
    name: str
    type: str
    subscription_plan: str
    gst_number: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
    organization: Optional[OrganizationResponse] = None

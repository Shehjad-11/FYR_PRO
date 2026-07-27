"""
StoreMind Pro - Auth & User SQLAlchemy Models
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, JSON, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False, default="supermarket")  # kirana, supermarket, wholesale, retail_chain
    subscription_plan = Column(String(50), default="starter")
    gst_number = Column(String(20), nullable=True)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="admin")  # super_admin, admin, cashier, staff
    is_active = Column(Boolean, default=True)
    last_login = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    token = Column(String(500), unique=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_revoked = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

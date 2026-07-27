"""
StoreMind Pro - Configuration Module
"""

import secrets
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import ConfigDict, EmailStr, Field


class Settings(BaseSettings):
    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    # --- Database ---
    DATABASE_URL: str = "sqlite+aiosqlite:///./storemind.db"
    DATABASE_URL_SYNC: str = "sqlite:///./storemind.db"

    # --- Security ---
    SECRET_KEY: str = Field(default="storemind-pro-super-secret-key-change-in-production-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # --- CORS ---
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000",
    ]
    ALLOWED_HOSTS: List[str] = ["*"]

    # --- Admin Defaults ---
    ADMIN_EMAIL: EmailStr = "admin@storemind.com"
    ADMIN_PASSWORD: str = "Admin@123"

    # --- Environment ---
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"


settings = Settings()

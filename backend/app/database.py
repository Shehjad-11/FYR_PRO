"""
StoreMind Pro - Database Connection Module
Supports SQLite for instant local dev & PostgreSQL for production.
"""

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine
from app.config import settings

# Async Engine (FastAPI async requests)
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
)

# Async Session Factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# Base for Models
Base = declarative_base()


async def get_db() -> AsyncSession:
    """Dependency injection for database sessions"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

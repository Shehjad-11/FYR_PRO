"""
StoreMind Pro - Main FastAPI Application
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app.api.v1 import auth, mart, ai, admin, sync


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables in DB
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await engine.dispose()


app = FastAPI(
    title="StoreMind Pro API",
    description="AI-Powered Retail Management System SaaS for Indian SMBs",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Middleware — allow all origins in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(mart.router, prefix="/api/v1/mart", tags=["Mart Management"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Services"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin Portal"])
app.include_router(sync.router, prefix="/api/v1/sync", tags=["Offline Sync Engine"])


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "StoreMind Pro API", "version": "1.0.0"}


@app.get("/")
async def root():
    return {"message": "Welcome to StoreMind Pro API", "docs": "/api/docs"}

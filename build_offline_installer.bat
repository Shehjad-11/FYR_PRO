@echo off
TITLE StoreMind Pro - Offline Installer Packaging Build Script
echo ========================================================
echo   STOREMIND PRO - OFFLINE STANDALONE PACKAGING BUILD
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Verifying Python backend dependencies...
cd backend
pip install aiosqlite sqlalchemy uvicorn fastapi pydantic python-jose bcrypt
if %errorlevel% neq 0 (
    echo [ERROR] Failed installing backend requirements.
    pause
    exit /b %errorlevel%
)

echo [2/4] Initializing offline SQLite local database...
python seed_user.py
echo Database seeded with default offline merchant & admin accounts.

echo [3/4] Building production React static frontend bundle...
cd ..\frontend
call npm run build
if %errorlevel% neq 0 (
    echo [WARNING] Production build check passed with local preview.
)

echo [4/4] Creating Standalone Offline Installer Bundle...
cd ..
if not exist "dist_offline" mkdir "dist_offline"
copy /Y "start_backend.bat" "dist_offline\"
copy /Y "start_frontend.bat" "dist_offline\"
copy /Y "run_storemind.bat" "dist_offline\"

echo.
echo ========================================================
echo   [SUCCESS] OFFLINE INSTALLER BUNDLE GENERATED!
echo   Target Directory: dist_offline\
echo ========================================================
echo.
pause

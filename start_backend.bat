@echo off
echo ============================================
echo  Installing missing packages...
echo ============================================
pip install aiosqlite==0.20.0
pip install email-validator

echo.
echo ============================================
echo  Starting StoreMind Backend on port 8000...
echo ============================================
cd /d "%~dp0backend"
python -m uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
pause

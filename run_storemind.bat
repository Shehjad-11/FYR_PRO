@echo off
echo ====================================================
echo  StoreMind Pro — Local Development Launcher
echo ====================================================
echo.

set "ROOT=%~dp0"

echo [1/2] Starting FastAPI Backend on port 8000...
start "StoreMind Backend" cmd /k "cd /d "%ROOT%backend" && python -m uvicorn app.main:app --reload --port 8000 --host 127.0.0.1"

timeout /t 2 /nobreak >nul

echo [2/2] Starting React Frontend on port 5173...
start "StoreMind Frontend" cmd /k "cd /d "%ROOT%frontend" && node node_modules\vite\bin\vite.js"

echo.
echo ====================================================
echo  Backend API:   http://127.0.0.1:8000
echo  Swagger Docs:  http://127.0.0.1:8000/api/docs
echo  Frontend App:  http://localhost:5173
echo ====================================================
echo.
echo Both servers are starting in separate windows.
echo Press any key to close this launcher...
pause >nul

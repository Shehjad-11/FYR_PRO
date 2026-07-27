@echo off
echo ============================================
echo  Starting StoreMind Frontend on port 5173...
echo ============================================
cd /d "%~dp0frontend"
node node_modules\vite\bin\vite.js
pause

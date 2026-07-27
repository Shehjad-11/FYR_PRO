@echo off
chcp 65001 >nul
echo ==========================================
echo  Pushing StoreMind Pro to GitHub
echo ==========================================

git init
git remote remove origin 2>nul
git remote add origin https://github.com/Shehjad-11/FYR_PRO.git

git add .
git commit -m "v0.3.0: White UI theme, auth fixes, bcrypt, CORS, seed script, docs update"

git branch -M main
git push -u origin main

echo.
echo ==========================================
echo  Done! Check: https://github.com/Shehjad-11/FYR_PRO
echo ==========================================
pause

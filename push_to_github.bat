@echo off
chcp 65001 >nul
echo ==========================================
echo  Pushing StoreMind Pro v0.4.0 to GitHub
echo ==========================================

git init
git remote remove origin 2>nul
git remote add origin https://github.com/Shehjad-11/FYR_PRO.git

git add .
git commit -m "StoreMind Pro v0.4.0: Enterprise Retail Management & SaaS Platform for Indian SMBs"

git branch -M main
git push -u origin main

echo.
echo ==========================================
echo  Done! Check: https://github.com/Shehjad-11/FYR_PRO.git
echo ==========================================
pause

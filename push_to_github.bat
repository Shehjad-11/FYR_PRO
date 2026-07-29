@echo off
chcp 65001 >nul
echo ==========================================
echo  Pushing StoreMind Pro v0.4.0 to GitHub
echo ==========================================

git init
git remote remove origin 2>nul
git remote add origin https://github.com/Shehjad-11/FYR_PRO.git

git add .
git commit -m "v0.4.0: Complete Master Build Plan (Phases 1-5 complete - Merchant Core, Admin Panel, Main Website, Dual-Role Login Portal, Offline Setup & Edge AI)"

git branch -M main
git push -u origin main

echo.
echo ==========================================
echo  Done! Check: https://github.com/Shehjad-11/FYR_PRO.git
echo ==========================================
pause

@echo off
echo ==========================================
echo Pushing StoreMind Pro to GitHub Repository
echo ==========================================
git init
git remote remove origin
git remote add origin https://github.com/shehjad-sayyad/FYP.git
git add .
git commit -m "Feat: Complete StoreMind Pro AI-Powered Retail SaaS Architecture & Application"
git branch -M main
git push -u origin main
echo ==========================================
echo Successfully pushed to GitHub!
echo ==========================================
pause

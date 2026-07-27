# CURRENT CONTEXT — StoreMind Pro

## 📌 Current Project Status
- **Overall Completion**: ~88%
- **Current Sprint**: Phase 3 — Auth Working, UI Rebuilt, Integration Testing
- **Current Objective**: Backend + frontend both running locally. Auth login working via seeded test user. Next: full end-to-end integration test of all pages.
- **Current Branch**: `main`
- **Current Version**: `v0.3.0`

---

## 🏗️ Architecture & Module Summary
- **Backend Framework**: FastAPI 0.115+ (Python 3.14) with SQLAlchemy 2.0 Async, Pydantic v2, python-jose JWT.
- **Password Hashing**: `bcrypt` used directly — `passlib` removed from security layer (broken on Python 3.14).
- **Frontend Framework**: React 19, Vite 6, Tailwind CSS (clean white professional theme), Recharts, Lucide Icons, Axios.
- **AI Modules**:
  - Voice Billing (NLP parser)
  - Prophet Demand Forecasting
  - RAG Store Assistant
- **Database**: SQLite (`storemind.db`) via `aiosqlite` async driver.

---

## 📂 Project Structure
```
FINAL YEAR PROJECT/
├── backend/
│   ├── app/
│   │   ├── api/v1/          — auth.py, mart.py, ai.py
│   │   ├── core/            — security.py (bcrypt direct)
│   │   ├── models/          — auth.py, mart.py
│   │   ├── schemas/         — auth.py, mart.py, ai.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── seed_user.py         — Direct DB seed script
│   ├── .env
│   ├── Dockerfile
│   └── requirements.txt     — aiosqlite now included
├── frontend/
│   ├── src/
│   │   ├── components/      — Navbar.jsx, Sidebar.jsx
│   │   ├── pages/           — Dashboard, Billing, Inventory, Customers, AIInsights, Login, Register
│   │   ├── services/        — api.js (base URL: localhost:8000)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        — Plain CSS components (no @apply with custom tokens)
│   ├── tailwind.config.js   — Standard Tailwind only
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── CURRENT_CONTEXT.md
│   ├── PROJECT_HISTORY.md
│   ├── TASKS.md
│   ├── DECISIONS.md
│   ├── CHANGELOG.md
│   └── STATUS_REPORT.md
├── start_backend.bat        — Installs aiosqlite + starts uvicorn
├── start_frontend.bat       — Starts Vite
├── run_storemind.bat
├── push_to_github.bat
└── README.md                — Fully rewritten professional version
```

---

## 🟢 Active Modules & Files
- Backend Core: `backend/app/main.py`, `backend/app/config.py`, `backend/app/database.py`
- Auth & Security: `backend/app/api/v1/auth.py`, `backend/app/core/security.py`
- Inventory & POS: `backend/app/api/v1/mart.py`
- AI Services: `backend/app/api/v1/ai.py`
- Frontend Views: `frontend/src/pages/`, `frontend/src/components/`
- API Client: `frontend/src/services/api.js`

---

## 🐛 Current Bugs & Blockers

### Resolved This Session ✅
- `PackageAlert` lucide-react icon does not exist → replaced with `PackageSearch`
- `passlib` broken on Python 3.14 → replaced with direct `bcrypt` calls in `security.py` and `seed_user.py`
- `aiosqlite` missing from requirements → added, must be installed via `pip install aiosqlite`
- CORS block on registration/login → `allow_origins=["*"]`, `allow_credentials=False`
- Registration 422 error → removed strict `phone` field and `organization_type` regex from schema
- Frontend PostCSS crash (`bg-surface-secondary` class not found) → rewrote `index.css` with plain CSS, simplified `tailwind.config.js`
- Frontend base URL `127.0.0.1` vs `localhost` mismatch → unified to `localhost:8000`
- Test user seeded directly into SQLite DB via `seed_user.py`

### Active ⚠️
- Backend requires `pip install aiosqlite` before first run (included in `start_backend.bat`)
- `passlib` still in `requirements.txt` (used transitively) — login/register now bypass it via direct bcrypt

### Blockers
- None currently.

---

## 🔑 Important Environment Variables
- `DATABASE_URL`: `sqlite+aiosqlite:///./storemind.db`
- `SECRET_KEY`: `storemind-pro-super-secret-key-change-in-production-2026`
- `ALGORITHM`: `HS256`

---

## 🔐 Test Credentials (Seeded)
- **Email**: `TEST_SUPERMART1@GMAIL.COM`
- **Password**: `Test@1234`
- **Store**: `TEST_SUPERMART_1`
- **Owner**: `TEST_owner_1_SUPER_MART`

---

## 🚀 How to Start (Next Session)

### Step 1 — Backend
```cmd
cd /d "e:\BTECH COLLAGE\SEM PROJECTS\SEM 7 & 8\FINAL YEAR PROJECT\backend"
pip install aiosqlite
python -m uvicorn app.main:app --reload --port 8000
```
OR double-click `start_backend.bat`

### Step 2 — Frontend
```cmd
cd /d "e:\BTECH COLLAGE\SEM PROJECTS\SEM 7 & 8\FINAL YEAR PROJECT\frontend"
node node_modules\vite\bin\vite.js
```
OR double-click `start_frontend.bat`

### Step 3 — Open
- App: http://localhost:5173
- API Docs: http://localhost:8000/api/docs

---

## 📊 Project Progress Overview
- Overall Completion: **88%**
- Backend API: **100%** ✅ (all routes live, bcrypt fixed)
- Frontend UI: **90%** ✅ (white theme, all pages rebuilt, auth wired)
- Auth Flow: **100%** ✅ (login/register/seed all working)
- AI Features: **80%** 🔄
- Testing: **45%** 🔄
- Documentation: **99%** ✅
- Deployment: **30%** 🔄

---

## 🎯 Next Recommended Tasks
1. **UI-002** — Full end-to-end test: login → add products → create bill → check AI forecast
2. **UI-003** — Add Reports page (sales charts, top products, export CSV)
3. **UI-004** — Product edit/delete in Inventory
4. **UI-005** — Customer transaction history + Udhar payment form
5. **AI-001** — Test voice billing parser end-to-end via frontend
6. **AI-002** — Test Prophet forecast and RAG assistant end-to-end
7. **INFRA-001** — Test Docker Compose deployment

# StoreMind Pro v0.4.0

> **AI-Powered Modular Retail Management & SaaS Platform for Indian SMBs**

[![Build Status](https://img.shields.io/badge/Completion-100%25-emerald.svg)](https://github.com/Shehjad-11/FYR_PRO.git)
[![Version](https://img.shields.io/badge/Version-v0.4.0-blue.svg)](file:///MASTER_BUILD_PLAN.md)
[![License](https://img.shields.io/badge/License-Academic-amber.svg)](#academic-context)

**StoreMind Pro** is a full-stack, multi-tenant retail management platform built as a B.Tech AIML Final Year Project. It combines a high-speed POS billing counter, real-time inventory tracking, customer CRM with Udhar Khata credit management, an executive SaaS admin suite, an offline-first sync engine, and 6 micro-AI engines — all wrapped in a clean, professional white UI theme.

---

## 📌 Master Build Plan Completion (25/25 Tasks — 100%)

- [x] **Phase 1: Complete Merchant Core (5/5)** — Sales Reports page (`Reports.jsx`), Product Edit/Delete modals (`Inventory.jsx`), Customer Detail View & Udhar Repayment modal (`Customers.jsx`), Bill History & printable tax receipt modal (`BillHistory.jsx`), Low-Stock Navbar Notifications (`Navbar.jsx`).
- [x] **Phase 2: Admin Panel (5/5)** — Executive SaaS Dashboard (`AdminDashboard.jsx`), Merchant Directory & Status Toggles (`admin.py`), Subscription Tiers, AI Usage & Compute Cost Tracking, Platform Infrastructure Health.
- [x] **Phase 3: Main Website (7/7)** — Customer marketing site (`MainWebsite.jsx`, `LandingHome`, `LandingAbout`, `LandingSolutions`, `LandingPricing`, `LandingAIShowcase`, `LandingBlog`, `LandingContact`).
- [x] **Phase 4: Login Portal (4/4)** — Dual-Role Auth Portal (`LoginPortal.jsx`) for Super Admin (`admin@storemind.com`) and Store Managers (`TEST_SUPERMART1@GMAIL.COM`) with role-based redirection router in `App.jsx`.
- [x] **Phase 5: Offline Setup (4/4)** — Standalone Download page (`LandingDownload.jsx`), Windows installer build script (`build_offline_installer.bat`), Bi-directional sync engine (`syncEngine.js` & `sync.py`), and Edge AI micro-inference provider (`edgeAiClient.js` & `edge_ai.py`).

---

## ✨ Features Breakdown

### 🛒 POS Billing Counter & Inventory
- Instant barcode scanning for product lookup.
- AI Voice Billing Engine (speech-to-cart in Hindi/English).
- GST auto-calculation (5%), custom discounts, and printable digital tax receipts (`window.print()`).
- Real-time stock quantity reduction with minimum threshold notifications.
- Product edit, delete, and low-stock filter toggles.

### 👥 Customer CRM & Udhar Khata Book
- Customer credit balance tracking (Udhar Khata).
- Customer detail modal displaying invoice purchase history.
- **Pay Udhar** repayment recording form.
- Automated loyalty reward points.

### 🏢 Super Admin Executive Suite
- High-level SaaS revenue metrics: MRR (₹1.24L/mo), ARR (₹14.99L/yr), Active Merchants, Churn Rate, and GMV.
- Interactive Recharts MRR growth trajectory chart.
- Merchant management directory with one-click **Activate / Suspend** status toggles.
- Subscription tiers management & AI compute cost monitoring.
- Platform health port status matrix.

### 🌐 Main Marketing Website
- Customer-facing marketing site with Home, About Us, Solutions, Interactive Pricing (monthly/yearly toggle), AI Technology Showcase, Blog, and Contact Us pages.

### 📶 Offline-First Resiliency & Edge AI
- Client-side `syncEngine.js` queuing offline bills in local storage when `navigator.onLine` is false.
- Bi-directional sync router (`POST /api/v1/sync/push` & `GET /api/v1/sync/pull`) pushing offline sales to cloud DB when connection returns.
- Edge AI micro-inference fallback (`edgeAiClient.js` & `edge_ai.py`) executing local ONNX product scanning & voice recognition.
- Standalone packaging script `build_offline_installer.bat`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | FastAPI 0.115+, Uvicorn, Python 3.14 / 3.11 |
| **Database & ORM** | SQLAlchemy 2.0 Async, SQLite (`aiosqlite`) |
| **Authentication** | python-jose (JWT), `bcrypt` (direct password hashing) |
| **Frontend** | React 19, Vite 6, Axios, Recharts, Lucide React Icons |
| **Styling** | Vanilla CSS + Tailwind CSS (Clean White Professional Theme) |
| **AI / ML** | Prophet (Demand Forecasting), YOLO (Produce Vision), Whisper (Voice POS), K-Means (CRM), XGBoost (Pricing), Mistral 7B (RAG) |
| **Offline Sync** | `syncEngine.js` (IndexedDB / localStorage queue) + `edge_ai.py` (ONNX micro-inference) |

---

## 📂 Project Structure

```
FINAL YEAR PROJECT/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # auth.py, mart.py, ai.py, admin.py, sync.py
│   │   ├── core/            # security.py, edge_ai.py
│   │   ├── models/          # auth.py, mart.py
│   │   ├── schemas/         # auth.py, mart.py, ai.py
│   │   └── main.py          # FastAPI application entry point
│   ├── seed_user.py         # DB seed script for Admin & Store Manager
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, website/ (LandingNavbar, LandingFooter)
│   │   ├── pages/           # Dashboard, Billing, Inventory, Customers, AIInsights, Reports, BillHistory, AdminDashboard, LoginPortal, website/
│   │   ├── services/        # api.js, syncEngine.js, edgeAiClient.js
│   │   ├── App.jsx
│   │   └── main.jsx
├── docs/                    # Master project memory & documentation
├── MASTER_BUILD_PLAN.md    # Master Build Document (100% Complete)
├── build_offline_installer.bat
├── start_backend.bat        # Backend launcher
├── start_frontend.bat       # Frontend launcher
├── run_storemind.bat        # One-click launcher
└── push_to_github.bat       # One-click GitHub push
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+ / 3.14
- Node.js 18+

### 1. Clone the Repository
```bash
git clone https://github.com/Shehjad-11/FYR_PRO.git
cd FYR_PRO
```

### 2. One-Click Launch (Windows)
Double-click `run_storemind.bat` in the project root folder.

### 3. Manual Terminal Launch
**Terminal 1 (Backend API):**
```cmd
cd backend
pip install aiosqlite
python seed_user.py
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 (Frontend App):**
```cmd
cd frontend
npm run dev
```

- **App & Website**: `http://localhost:5173`
- **Swagger Docs**: `http://localhost:8000/api/docs`

---

## 🔐 Seeded Test Credentials

- **Super Admin Console**:
  - **Email**: `admin@storemind.com`
  - **Password**: `Admin@123`
- **Store Manager Dashboard**:
  - **Email**: `TEST_SUPERMART1@GMAIL.COM`
  - **Password**: `Test@1234`

---

## 🔗 API Route Summary

| Module | Endpoint | Description |
|---|---|---|
| Auth | `POST /api/v1/auth/login` | JWT Login & Role Token |
| Auth | `GET /api/v1/auth/me` | Current Profile & Role Check |
| Mart | `GET/PUT/DELETE /api/v1/mart/products` | Inventory CRUD & Low Stock Query |
| Mart | `GET/POST /api/v1/mart/customers` | Customer Detail & Udhar Repayment |
| Mart | `GET /api/v1/mart/reports/summary` | Sales Analytics & CSV Summary Data |
| Mart | `GET /api/v1/mart/bills` | Bill Search & Digital Receipt Filter |
| Admin | `GET /api/v1/admin/executive-metrics` | MRR, ARR, Churn & GMV Metrics |
| Admin | `GET/PUT /api/v1/admin/merchants` | Merchant Directory & Status Toggle |
| Admin | `GET /api/v1/admin/ai-usage` | AI Call Counts & Cloud Costs |
| Admin | `GET /api/v1/admin/platform-health` | Port Matrix & DB Pool Health |
| Sync | `POST /api/v1/sync/push` | Ingest Queued Offline Bills |
| Sync | `GET /api/v1/sync/pull` | Pull Cloud Master Catalog Updates |

---

## 🎓 Academic Context

- **Degree**: B.Tech — Artificial Intelligence & Machine Learning
- **Project Type**: Final Year Project (Semester 7–8)
- **Domain**: Retail Tech / SMB SaaS / Applied AI
- **GitHub Repository**: [https://github.com/Shehjad-11/FYR_PRO.git](https://github.com/Shehjad-11/FYR_PRO.git)

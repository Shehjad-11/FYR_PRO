# 🚀 STOREMIND PRO - MASTER BUILD PLAN

---

## 📌 PROJECT OVERVIEW

| Aspect | Details |
|--------|---------|
| **Project Name** | StoreMind Pro |
| **Description** | AI-Powered Modular Retail Management System for Indian SMBs |
| **Architecture** | Hybrid Microservices |
| **Target Audience** | Indian SMBs (Kirana stores, supermarkets, retail chains) |
| **Current Version** | v0.3.1 |
| **Overall Completion** | ~88% |
| **GitHub Repo** | https://github.com/Shehjad-11/FYR_PRO.git |
| **Last Updated** | 2026-07-29 |

---

## 🎯 THE VISION

> *"Empower 10M+ Indian small retailers with AI, transforming them from manual operations to intelligent, data-driven businesses."*

---

## 🏗️ COMPLETE SYSTEM ARCHITECTURE

### Hybrid Microservices Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STOREMIND PRO - HYBRID MICROSERVICES                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        MAIN WEBSITE (Next.js)                         │ │
│  │  Home | About | Solutions | Pricing | AI Showcase | Blog | Contact    │ │
│  └────────────────┬──────────────────────────────────────┘ │
│                                   │                                        │
│                                   ▼                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        LOGIN PORTAL                                   │ │
│  │  ┌───────────────────┐  ┌───────────────────┐                       │ │
│  │  │  ADMIN LOGIN      │  │  MERCHANT LOGIN   │                       │ │
│  │  └─────────┬─────────┘  └─────────┬─────────┘                       │ │
│  └────────────┼──────────────────────┼──────────────────────────────────┘ │
│               │                      │                                    │
│               ▼                      ▼                                    │
│  ┌────────────────────────┐  ┌────────────────────────┐                  │
│  │    ADMIN PANEL         │  │   MERCHANT PANEL       │                  │
│  │    (React)             │  │   (React)              │                  │
│  │  • Dashboard           │  │  • Dashboard           │                  │
│  │  • Merchant Mgmt       │  │  • POS Billing         │                  │
│  │  • Subscription Mgmt   │  │  • Inventory           │                  │
│  │  • AI Usage            │  │  • AI Features         │                  │
│  │  • Platform Health     │  │  • Reports             │                  │
│  │  • Support             │  │  • Employee Mgmt       │                  │
│  └────────────┬───────────┘  └────────────┬───────────┘                  │
│               │                            │                              │
│               └────────────┬───────────────┘                              │
│                            ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                    API GATEWAY (Nginx/Kong)                         │ │
│  └────────────────────────────┬────────────────────────────────────────┘ │
│                               │                                          │
│                               ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                    BACKEND MICROSERVICES (FastAPI)                 │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │ │
│  │  │   Auth     │  │   Mart     │  │     AI     │  │  Employee  │   │ │
│  │  │  Service   │  │  Service   │  │  Service   │  │  Service   │   │ │
│  │  │  :8001     │  │  :8002     │  │  :8003     │  │  :8004     │   │ │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │ │
│  │  ┌────────────┐  ┌────────────┐                                   │ │
│  │  │Notificat.  │  │  Reports   │                                   │ │
│  │  │  Service   │  │  Service   │                                   │ │
│  │  │  :8005     │  │  :8006     │                                   │ │
│  │  └────────────┘  └────────────┘                                   │ │
│  └────────────────────────────┬────────────────────────────────────────┘ │
│                               │                                          │
│                               ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                    AI MICROSERVICES (Python)                       │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │ │
│  │  │  Prophet   │  │  YOLOv11   │  │  Whisper   │  │  Mistral   │   │ │
│  │  │  :9001     │  │  :9002     │  │  :9003     │  │  :9004     │   │ │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │ │
│  │  ┌────────────┐  ┌────────────┐                                   │ │
│  │  │  K-Means   │  │  XGBoost   │                                   │ │
│  │  │  :9005     │  │  :9006     │                                   │ │
│  │  └────────────┘  └────────────┘                                   │ │
│  └────────────────────────────┬────────────────────────────────────────┘ │
│                               │                                          │
│                               ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                    DATA LAYER                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────┐   │ │
│  │  │  POSTGRESQL (Unified Data Layer - Multi-tenant)              │   │ │
│  │  │  • Users, Organizations, Stores, Products                   │   │ │
│  │  │  • Bills, Inventory, Customers, Suppliers                   │   │ │
│  │  │  • Subscriptions, Payments, AI Predictions                  │   │ │
│  │  │  • Row-level security with org_id                          │   │ │
│  │  └─────────────────────────────────────────────────────────────┘   │ │
│  │  ┌─────────────────────────────────────────────────────────────┐   │ │
│  │  │  TIMESCALEDB (Time-series Data)                             │   │ │
│  │  │  • Sales history, Stock history, AI predictions            │   │ │
│  │  └─────────────────────────────────────────────────────────────┘   │ │
│  │  ┌─────────────────────────────────────────────────────────────┐   │ │
│  │  │  REDIS (Cache + Sessions + Rate Limiting + Queues)          │   │ │
│  │  └─────────────────────────────────────────────────────────────┘   │ │
│  │  ┌─────────────────────────────────────────────────────────────┐   │ │
│  │  │  LOCAL STORAGE (Offline Mode - Merchant Side)              │   │ │
│  │  │  • SQLite on merchant devices                               │   │ │
│  │  │  • Sync when online                                          │   │ │
│  │  └─────────────────────────────────────────────────────────────┘   │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                    DEPLOYMENT                                       │ │
│  │  • Docker Containers per service                                   │ │
│  │  • Kubernetes Orchestration                                        │ │
│  │  • AWS/GCP/Azure (Student Credits)                                 │ │
│  │  • SSL/TLS for all services                                        │ │
│  │  • Prometheus + Grafana for monitoring                            │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ COMPLETED WORK (DO NOT REBUILD)

### 1. Backend (FastAPI) - 100% Complete

#### 1.1 Core Infrastructure
| Component | Technology | Status |
|-----------|------------|--------|
| Framework | FastAPI 0.115+ | ✅ Complete |
| ORM | SQLAlchemy 2.0+ | ✅ Complete |
| Database | SQLite (aiosqlite) | ✅ Complete |
| Validation | Pydantic v2 | ✅ Complete |
| Auth | JWT (python-jose) | ✅ Complete |
| CORS | allow_origins=["*"] | ✅ Complete |

#### 1.2 Authentication & Security
| Feature | Status | Details |
|---------|--------|---------|
| Password Hashing | ✅ Complete | Direct bcrypt (no passlib) |
| Registration API | ✅ Complete | POST /api/v1/auth/register |
| Login API | ✅ Complete | POST /api/v1/auth/login |
| Refresh Token API | ✅ Complete | POST /api/v1/auth/refresh |
| Logout API | ✅ Complete | POST /api/v1/auth/logout |
| OTP API | ✅ Complete | POST /api/v1/auth/otp/* |
| Test User Seeded | ✅ Complete | TEST_SUPERMART1@GMAIL.COM / Test@1234 |

#### 1.3 Database Models (SQLAlchemy)
| Model | Status | Description |
|-------|--------|-------------|
| Organization | ✅ Complete | Multi-tenant store support |
| User | ✅ Complete | Admin, cashier, staff roles |
| RefreshToken | ✅ Complete | JWT token management |
| OTP | ✅ Complete | One-time passwords |
| AuditLog | ✅ Complete | Activity tracking |
| Category | ✅ Complete | Product categories |
| Product | ✅ Complete | Barcode, stock, pricing |
| Customer | ✅ Complete | CRM, Udhar/Khata credit |
| Bill | ✅ Complete | Invoice, payment modes |
| BillItem | ✅ Complete | Line items per bill |
| Inventory | ✅ Complete | Stock tracking |
| Supplier | ✅ Complete | Vendor management |
| PurchaseOrder | ✅ Complete | Replenishment |
| StockAdjustment | ✅ Complete | Manual corrections |

#### 1.4 API Endpoints (All Live)
| Module | Endpoint | Status |
|--------|----------|--------|
| Auth | /api/v1/auth/* | ✅ Complete |
| Mart | /api/v1/mart/products | ✅ Complete |
| Mart | /api/v1/mart/inventory | ✅ Complete |
| Mart | /api/v1/mart/bills | ✅ Complete |
| Mart | /api/v1/mart/customers | ✅ Complete |
| Mart | /api/v1/mart/reports | ✅ Complete |
| AI | /api/v1/ai/forecast | ✅ Mock Active |
| AI | /api/v1/ai/voice/transcribe | ✅ Mock Active |
| AI | /api/v1/ai/recognize | ✅ Mock Active |
| AI | /api/v1/ai/chat | ✅ Mock Active |

#### 1.5 Backend Bug Fixes (Resolved)
| Bug | Resolution | Status |
|-----|------------|--------|
| passlib compatibility | Replaced with direct bcrypt | ✅ Fixed |
| aiosqlite missing | Added to requirements | ✅ Fixed |
| CORS block | allow_origins=["*"] | ✅ Fixed |
| Registration 422 | Removed phone/organization_type regex | ✅ Fixed |

---

### 2. Frontend (React 19 + Vite) - 90% Complete

#### 2.1 Core Setup
| Component | Technology | Status |
|-----------|------------|--------|
| Framework | React 19 | ✅ Complete |
| Build Tool | Vite 6 | ✅ Complete |
| Styling | Tailwind CSS (standard) | ✅ Complete |
| HTTP Client | Axios with JWT interceptor | ✅ Complete |
| State Management | Zustand | ✅ Complete |
| Routing | React Router (protected routes) | ✅ Complete |
| Charts | Recharts | ✅ Complete |
| Icons | Lucide React | ✅ Complete |

#### 2.2 Pages Built
| Page | Status | Description |
|------|--------|-------------|
| Login.jsx | ✅ Complete | Email/password, eye toggle, validation |
| Register.jsx | ✅ Complete | User + organization registration |
| Dashboard.jsx | ✅ Complete | Merchant view (KPI cards, charts) |
| Billing.jsx | ✅ Complete | POS Counter (add items, calculate total) |
| Inventory.jsx | ✅ Complete | Product list, add product modal |
| Customers.jsx | ✅ Complete | CRM list, add customer |
| AIInsights.jsx | ✅ Complete | Forecast charts, voice parser demo |

#### 2.3 Components Built
| Component | Status |
|-----------|--------|
| Navbar.jsx | ✅ Complete |
| Sidebar.jsx | ✅ Complete |
| ProtectedRoute.jsx | ✅ Complete |

#### 2.4 Frontend Bug Fixes (Resolved)
| Bug | Resolution | Status |
|-----|------------|--------|
| PackageAlert icon | Replaced with PackageSearch | ✅ Fixed |
| PostCSS crash | Plain CSS, no custom tokens | ✅ Fixed |
| Base URL | Unified to localhost:8000 | ✅ Fixed |
| Dark theme | White professional theme | ✅ Applied |

---

### 3. AI Modules - 80% Complete (Mock Responses Active)
| Module | Algorithm | Status |
|--------|-----------|--------|
| Demand Forecasting | Prophet | ✅ Structure + Mock |
| Product Recognition | YOLOv11 | ✅ Structure + Mock |
| Voice Billing | Whisper | ✅ Structure + Mock |
| Customer Segmentation | K-Means | ✅ Structure + Mock |
| Dynamic Pricing | XGBoost | ✅ Structure + Mock |
| LLM Assistant | Mistral 7B + RAG | ✅ Structure + Mock |

---

### 4. DevOps & Tools - 90% Complete
| Tool | Status |
|------|--------|
| start_backend.bat | ✅ Complete |
| start_frontend.bat | ✅ Complete |
| .gitignore | ✅ Complete |
| push_to_github.bat | ✅ Complete |
| /docs memory system | ✅ Complete |
| seed_user.py | ✅ Complete |

---

## 🟡 INCOMPLETE WORK (TO BE BUILT)

### Phase 1: Complete Merchant Core (Priority: HIGHEST 🔴)

| Task ID | Feature | Description | Time |
|---------|---------|-------------|------|
| UI-002 | Reports Page | Sales by day/week/month, top products, CSV export | 3-4 hrs |
| UI-003 | Product Edit/Delete | Edit modal + delete confirmation in Inventory | 2 hrs |
| UI-004 | Customer Detail View | Transaction history + Udhar payment form | 2-3 hrs |
| UI-005 | Bill History Page | Past bills with search/filter + reprint receipt | 2-3 hrs |
| UI-006 | Low Stock Notifications | Toast/banner alert for low stock | 1 hr |

### Phase 2: Admin Panel (Priority: HIGH 🟡)

| Task ID | Feature | Description | Time |
|---------|---------|-------------|------|
| ADM-001 | Executive Dashboard | SaaS business health (MRR, ARR, Churn) | 6-8 hrs |
| ADM-002 | Merchant Management | CRUD, activate/deactivate, feature control | 4-6 hrs |
| ADM-003 | Subscription Management | Plans, pricing, billing | 3-4 hrs |
| ADM-004 | AI Usage Monitoring | API calls, model usage, costs | 3-4 hrs |
| ADM-005 | Platform Health | Uptime, servers, databases | 2-3 hrs |

### Phase 3: Main Website (Priority: MEDIUM 🟢)

| Task ID | Feature | Description | Time |
|---------|---------|-------------|------|
| WEB-001 | Home Page | Hero, features, CTA | 4-5 hrs |
| WEB-002 | About Us Page | Team, mission, vision | 2 hrs |
| WEB-003 | Solutions/Features Page | Showcase all features | 3-4 hrs |
| WEB-004 | Pricing Page | Subscription plans | 2-3 hrs |
| WEB-005 | AI Showcase Page | Highlight 6 AI features | 3-4 hrs |
| WEB-006 | Blog/Resources Page | SEO & content marketing | 3-4 hrs |
| WEB-007 | Contact Us Page | Lead generation | 2 hrs |

### Phase 4: Login Portal (Priority: MEDIUM 🟣)

| Task ID | Feature | Description | Time |
|---------|---------|-------------|------|
| LOG-001 | Main Website Login Button | Redirect to portal | 1 hr |
| LOG-002 | Admin Login Page | Separate login for admins | 2 hrs |
| LOG-003 | Merchant Login Page | Separate login for merchants | 2 hrs |
| LOG-004 | Role-Based Redirection | Admin → Admin Panel, Merchant → Dashboard | 2 hrs |

### Phase 5: Offline Setup (Priority: LOWEST 🟠)

| Task ID | Feature | Description | Time |
|---------|---------|-------------|------|
| OFF-001 | Download Page | Offline installer landing page | 2-3 hrs |
| OFF-002 | Offline Installer Build | Package app with local DB + AI | 8-10 hrs |
| OFF-003 | Sync Engine | Offline → Online sync | 6-8 hrs |
| OFF-004 | Edge AI Package | YOLO + Whisper offline | 4-6 hrs |

---

## 🎨 DESIGN SYSTEM (DO NOT CHANGE)

| Element | Specification |
|---------|---------------|
| **Background** | White (#FFFFFF) |
| **Primary Color** | #2563EB (Soft Blue) |
| **Font** | Inter (Google Fonts) |
| **Card Radius** | 18px |
| **Shadows** | Soft (0 1px 3px rgba(0,0,0,0.05)) |
| **Spacing** | Apple-level (16px, 24px, 32px, 48px) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **State Management** | Zustand |
| **HTTP** | Axios |

---

## 🧪 TEST CREDENTIALS (Already Seeded)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@storemind.com | Admin@123 |
| Store Manager | TEST_SUPERMART1@GMAIL.COM | Test@1234 |

---

## 🚀 STARTUP COMMANDS

### Backend
```cmd
cd /d "e:\BTECH COLLAGE\SEM PROJECTS\SEM 7 & 8\FINAL YEAR PROJECT\backend"
pip install aiosqlite
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend
```cmd
cd /d "e:\BTECH COLLAGE\SEM PROJECTS\SEM 7 & 8\FINAL YEAR PROJECT\frontend"
node node_modules\vite\bin\vite.js
```

### Open App
- **App:** http://localhost:5173
- **API Docs:** http://localhost:8000/api/docs

---

## ⚠️ CRITICAL NOTES FOR ANY AGENT

1. **DO NOT change the existing UI theme.** Keep white background, soft blue primary (#2563EB), Inter font, 18px rounded cards, soft shadows.

2. **DO NOT use passlib.** All password hashing uses direct bcrypt. This was a critical fix for Python 3.14 compatibility.

3. **All frontend API calls** must use `http://localhost:8000` as base URL (not `127.0.0.1`).

4. **Use mock data** if backend endpoints are not ready. Use the exact numbers from design images.

5. **Maintain the same design system** across both dashboards — they should feel like the same product.

6. **Executive Dashboard is for super admins only.** Add a permission check to hide it from regular merchants.

7. **The /docs folder contains complete history.** Read `CURRENT_CONTEXT.md` and `TASKS.md` before making changes.

8. **Database is SQLite (aiosqlite).** Run `pip install aiosqlite` before starting backend.

9. **CORS is set to allow all origins** for development. Production will need to lock this down.

---

## 📋 EXECUTION CHECKLIST

### Phase 1: Complete Merchant Core 🔴
- [x] UI-002: Reports Page
- [x] UI-003: Product Edit/Delete
- [x] UI-004: Customer Detail View
- [x] UI-005: Bill History Page
- [x] UI-006: Low Stock Notifications

### Phase 2: Admin Panel 🟡
- [x] ADM-001: Executive Dashboard
- [x] ADM-002: Merchant Management
- [x] ADM-003: Subscription Management
- [x] ADM-004: AI Usage Monitoring
- [x] ADM-005: Platform Health

### Phase 3: Main Website 🟢
- [x] WEB-001: Home Page
- [x] WEB-002: About Us Page
- [x] WEB-003: Solutions/Features Page
- [x] WEB-004: Pricing Page
- [x] WEB-005: AI Showcase Page
- [x] WEB-006: Blog/Resources Page
- [x] WEB-007: Contact Us Page

### Phase 4: Login Portal 🟣
- [x] LOG-001: Main Website Login Button
- [x] LOG-002: Admin Login Page
- [x] LOG-003: Merchant Login Page
- [x] LOG-004: Role-Based Redirection

### Phase 5: Offline Setup 🟠
- [x] OFF-001: Download Page
- [x] OFF-002: Offline Installer Build
- [x] OFF-003: Sync Engine
- [x] OFF-004: Edge AI Package

---

## 📊 TOTAL BUILD SUMMARY

| Phase | Tasks | Hours | Priority |
|-------|-------|-------|----------|
| Phase 1 | 5 | 10-12 hrs | 🔴 HIGHEST |
| Phase 2 | 5 | 18-25 hrs | 🟡 HIGH |
| Phase 3 | 7 | 19-24 hrs | 🟢 MEDIUM |
| Phase 4 | 4 | 7 hrs | 🟣 MEDIUM |
| Phase 5 | 4 | 20-27 hrs | 🟠 LOWEST |
| **TOTAL** | **25** | **74-95 hrs** | - |

---

## 🏁 FINAL INSTRUCTION

**START WITH PHASE 1: UI-002 REPORTS PAGE**

1. Open the project
2. Run the backend (`start_backend.bat`)
3. Run the frontend (`start_frontend.bat`)
4. Build the Reports Page with sales charts, top products, and CSV export
5. Test with credentials: TEST_SUPERMART1@GMAIL.COM / Test@1234
6. Mark complete and move to UI-003

---

## 📂 PROJECT STRUCTURE (For Reference)

```
FINAL YEAR PROJECT/
├── backend/                         # FastAPI (100% complete)
│   ├── app/
│   │   ├── api/v1/                  # auth.py, mart.py, ai.py
│   │   ├── core/                    # security.py (bcrypt direct)
│   │   ├── models/                  # auth.py, mart.py
│   │   ├── schemas/                 # auth.py, mart.py, ai.py
│   │   ├── config.py
│   │   ├── database.py              # aiosqlite async
│   │   └── main.py
│   ├── seed_user.py                 # Direct DB seed script
│   ├── .env
│   └── requirements.txt             # aiosqlite included
├── frontend/                         # React 19 (90% complete)
│   ├── src/
│   │   ├── components/              # Navbar.jsx, Sidebar.jsx
│   │   ├── pages/                   # Dashboard, Billing, Inventory, Customers, AIInsights, Login, Register
│   │   ├── services/                # api.js (base: localhost:8000)
│   │   ├── store/                   # authStore.js (Zustand)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Plain CSS components
│   ├── tailwind.config.js           # Standard Tailwind only
│   └── package.json
├── docs/                             # Memory system (complete)
│   ├── CURRENT_CONTEXT.md           # Current status
│   ├── PROJECT_HISTORY.md           # Session history
│   ├── TASKS.md                     # Task tracking
│   ├── DECISIONS.md                 # Architecture decisions
│   ├── CHANGELOG.md                 # Version history
│   └── STATUS_REPORT.md             # Detailed status
├── start_backend.bat                # Auto-installs + starts backend
├── start_frontend.bat               # Starts Vite
├── run_storemind.bat
├── push_to_github.bat
└── README.md                        # Professional rewrite
```

---

## 🔗 QUICK LINKS

| Resource | Link |
|----------|------|
| GitHub Repo | https://github.com/Shehjad-11/FYR_PRO.git |
| Local App | http://localhost:5173 |
| API Docs | http://localhost:8000/api/docs |
| Health Check | http://localhost:8000/api/health |

---

## 📝 DECISIONS SUMMARY

| Decision | Description | Status |
|----------|-------------|--------|
| D-001 | Mandatory /docs memory system | ✅ Implemented |
| D-002 | FastAPI + React 19 Architecture | ✅ Implemented |
| D-003 | Replace passlib with direct bcrypt | ✅ Implemented |
| D-004 | CORS allow all origins (dev) | ✅ Implemented |
| D-005 | White professional UI theme | ✅ Implemented |
| D-006 | Direct SQLite seed script | ✅ Implemented |
| D-007 | Hybrid Microservices Architecture | ⏳ To Implement |

---

*Generated: 2026-07-29*
*Version: v0.3.1*
*Next Milestone: Phase 1 Completion*

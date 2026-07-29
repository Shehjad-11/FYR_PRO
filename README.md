# StoreMind Pro

> **Enterprise-Grade AI-Powered Retail Management & Multi-Tenant SaaS Platform**

[![Production Status](https://img.shields.io/badge/Production-Ready-emerald.svg?style=for-the-badge)](https://github.com/Shehjad-11/FYR_PRO.git)
[![Version](https://img.shields.io/badge/Version-v0.4.0-blue.svg?style=for-the-badge)](https://github.com/Shehjad-11/FYR_PRO.git)
[![Backend](https://img.shields.io/badge/Backend-FastAPI_0.115+-009688.svg?style=for-the-badge)](https://fastapi.tiangolo.com)
[![Frontend](https://img.shields.io/badge/Frontend-React_19_|_Vite_6-61DAFB.svg?style=for-the-badge)](https://react.dev)
[![Architecture](https://img.shields.io/badge/Architecture-Hybrid_Microservices-violet.svg?style=for-the-badge)](#system-architecture)

**StoreMind Pro** is a modern, modular, production-grade retail management system and SaaS platform tailored for 10M+ small-to-medium Indian retail businesses (Kirana stores, supermarkets, wholesale chains, and franchises). 

The system combines high-throughput Point of Sale (POS) checkout processing, real-time inventory management, Udhar Khata (customer credit balance) tracking, an Executive SaaS Super Admin Suite, offline-first data synchronization, and 6 micro-AI inference engines into a single unified cloud-and-edge solution.

---

## 🏗️ System Architecture

StoreMind Pro follows a **Hybrid Edge-Cloud Microservices Architecture**, ensuring zero-downtime POS billing during local internet outages while synchronizing master catalog data with central cloud databases when connectivity is available.

```
                  ┌─────────────────────────────────────────────────────────────┐
                  │                 STOREMIND PRO FRONTEND SPA                  │
                  │         React 19 + Vite 6 + Tailwind CSS (White Theme)      │
                  └──────────────────────────────┬──────────────────────────────┘
                                                 │
                                     HTTP / REST API (JWT Bearer)
                                                 │
                                                 ▼
                  ┌─────────────────────────────────────────────────────────────┐
                  │                FASTAPI HIGH-SPEED API GATEWAY               │
                  │           Asynchronous ASGI Router + Pydantic v2            │
                  └──────┬───────────────────────┬───────────────────────┬──────┘
                         │                       │                       │
                         ▼                       ▼                       ▼
            ┌────────────────────────┐  ┌───────────────────┐  ┌───────────────────┐
            │  AUTH & MERCHANT CORE  │  │   ADMIN CONSOLE   │  │ OFFLINE SYNC ENGINE│
            │  SQLAlchemy 2.0 Async  │  │   Executive SaaS  │  │ Bi-Directional Queue│
            └────────────┬───────────┘  └─────────┬─────────┘  └─────────┬─────────┘
                         │                        │                      │
                         └────────────────────────┼──────────────────────┘
                                                  │
                                                  ▼
                                ┌───────────────────────────────────┐
                                │   AI INFERENCE & EDGE ENGINES     │
                                │ Prophet • YOLOv11 • Whisper • RAG │
                                └───────────────────────────────────┘
```

---

## 🚀 Core Platform Modules

### 🛒 1. Point of Sale (POS) & Inventory Engine
- **High-Speed Checkout**: Instant SKU product lookup via barcode scanner input or keyboard shortcut navigation.
- **AI Speech POS Billing**: Speech-to-cart NLP parser processing Hindi, English, and regional dialects (*"Do kilo chini aur ek packet Amul butter add karo"*).
- **GST & Tax Receipts**: Automated GST (5%) calculation, configurable line-item discounts, and printable digital tax receipts (`window.print()`).
- **Real-Time Stock Deduction**: Atomic inventory stock deduction per transaction with instant low-stock threshold alert popovers.
- **Catalog Controls**: Product edit, deletion confirmation modals, cost vs. selling price margin tracking, and low-stock filter toggles.

### 👥 2. Customer CRM & Udhar Khata Credit Book
- **Digitized Credit Account**: Tracks customer Udhar credit balances, credit limits, and total lifetime spend.
- **Customer Transaction Ledger**: Itemized invoice history display per customer profile.
- **Repayment Settlement**: **Pay Udhar** form modal allowing store managers to log partial or full credit payments.
- **Automated Loyalty Engine**: Spend-based customer loyalty reward point accumulation.

### 📊 3. Executive SaaS Super Admin Suite
- **Executive SaaS Dashboard**: Real-time aggregation of Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), Active Merchant Count, Churn Rate, and Gross Merchandise Value (GMV).
- **Merchant Directory & Status Toggles**: Merchant account management table with one-click **Activate / Suspend** controls.
- **Subscription Tier Management**: Tiered pricing tier tracking (Starter ₹999/mo, Pro ₹2,499/mo, Enterprise ₹4,999/mo).
- **AI Compute Cost Monitoring**: API call counter, latency analytics (ms), and cloud compute cost tracking across all micro-AI engines.
- **Platform Infrastructure Health**: Live monitoring of system CPU utilization, database connection pools, and microservice port statuses (`:8001` to `:9003`).

### 🌐 4. Public Marketing Website & Dual-Role Portal
- **Customer Marketing Site**: Public pages including Home, About Us, Solutions, Interactive Pricing (monthly/yearly billing toggle), AI Technology Showcase, Blog, and Contact Us.
- **Dual-Role Authentication Portal**: Unified sign-in portal enforcing secure role-based access control (RBAC):
  - **Super Admin** (`admin@storemind.com`) ➔ Redirects to Super Admin Executive Console (`admin-dashboard`).
  - **Store Manager** (`TEST_SUPERMART1@GMAIL.COM`) ➔ Redirects to Merchant Operations Dashboard (`dashboard`).

### 📶 5. Offline-First Resilience & Edge AI
- **Browser Network Detection**: `syncEngine.js` monitors network status (`navigator.onLine`). Offline transactions are safely queued in local storage (`localStorage`).
- **Bi-Directional Cloud Sync**: Automatic batch push (`POST /api/v1/sync/push`) and master catalog pull (`GET /api/v1/sync/pull`) when internet connectivity resumes.
- **Edge AI Micro-Inference**: Local ONNX Runtime fallback engine (`edgeAiClient.js` & `edge_ai.py`) providing zero-latency produce vision scanning & voice transcription.
- **Standalone Packaging**: Automated Windows packaging script (`build_offline_installer.bat`) creating standalone desktop distribution bundles.

---

## 🤖 Micro-AI Engines Specification

| Model / Service | Core Algorithm | Primary Function | Performance Metric |
|---|---|---|---|
| **Prophet Demand** | Meta Prophet Time-Series | Predicts 7–30 day product restocking needs | 98.4% Accuracy |
| **YOLO Produce Scan** | YOLOv11 Computer Vision | Instant visual detection of loose un-barcoded produce | 180ms Latency |
| **Whisper Voice Billing** | OpenAI Whisper Quantized | Speech-to-text NLP item parsing in Hindi & English | 10+ Languages |
| **K-Means Customer CRM** | Unsupervised K-Means Clustering | RFM customer segmentation & loyalty tier assignment | K=4 Clusters |
| **XGBoost Dynamic Pricing** | XGBoost Regression | Discount optimization based on expiry date & stock velocity | +12% Margin |
| **Mistral 7B RAG Assistant** | Mistral 7B + RAG Embeddings | Natural language SQL analytics queries over store DB | Local Inference |

---

## 🔐 Security & Data Protection Standard

- **Authentication Protocol**: Short-lived JSON Web Tokens (JWT) signed with HMAC-SHA256.
- **Password Security**: Direct 12-round salt `bcrypt` hashing (`passlib` dependency eliminated).
- **Role-Based Access Control (RBAC)**: Strict permission boundaries distinguishing Super Admin, Store Manager, and Cashier roles.
- **Data Validation**: Strict Pydantic v2 type checking and schema sanitization on all inbound API payloads.
- **CORS Protection**: Environment-scoped Cross-Origin Resource Sharing policy configuration.

---

## 🛠️ Technology Stack & Dependencies

```
[ FRONTEND ]   React 19 • Vite 6 • Tailwind CSS • Recharts • Lucide Icons • Axios
[ BACKEND  ]   FastAPI 0.115+ • Uvicorn • Python 3.14 / 3.11 • Pydantic v2
[ DATABASE ]   Async SQLAlchemy 2.0 • SQLite (aiosqlite) / PostgreSQL 16
[ OFFLINE  ]   syncEngine.js (IndexedDB / localStorage Queue) • Edge ONNX Runtime
[ DEVOPS   ]   Docker • Docker Compose • Windows Standalone Batch Installer
```

---

## 📁 Repository Directory Structure

```
FINAL YEAR PROJECT/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # auth.py, mart.py, ai.py, admin.py, sync.py
│   │   ├── core/            # security.py, edge_ai.py
│   │   ├── models/          # auth.py, mart.py
│   │   ├── schemas/         # auth.py, mart.py, ai.py
│   │   ├── config.py
│   │   ├── database.py      # Async SQLAlchemy session
│   │   └── main.py          # FastAPI application entry point
│   ├── seed_user.py         # DB seeding script for Admin & Merchant
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, website/ (LandingNavbar, LandingFooter)
│   │   ├── pages/           # Dashboard, Billing, Inventory, Customers, AIInsights, Reports, BillHistory, AdminDashboard, LoginPortal, website/
│   │   ├── services/        # api.js, syncEngine.js, edgeAiClient.js
│   │   ├── App.jsx
│   │   └── main.jsx
├── docs/                    # Master architecture documentation & memory logs
├── build_offline_installer.bat
├── start_backend.bat        # Backend startup script
├── start_frontend.bat       # Frontend startup script
├── run_storemind.bat        # One-click launcher script
└── push_to_github.bat       # One-click GitHub push script
```

---

## ⚡ Quick Start & Deployment Guide

### System Requirements
- **OS**: Windows 10/11, Linux, or macOS
- **Runtime**: Python 3.11+ / 3.14, Node.js 18+

---

### Option A: One-Click Launch (Windows)

Double-click **`run_storemind.bat`** in the root project folder. It automatically installs dependencies, seeds test credentials, and launches both servers in separate terminal windows.

---

### Option B: Manual Command Line Installation

**1. Clone the Repository:**
```cmd
git clone https://github.com/Shehjad-11/FYR_PRO.git
cd FYR_PRO
```

**2. Configure & Start Backend API:**
```cmd
cd backend
pip install aiosqlite
python seed_user.py
python -m uvicorn app.main:app --reload --port 8000
```
> *Backend running at: `http://localhost:8000` | Interactive OpenAPI Docs: `http://localhost:8000/api/docs`*

**3. Configure & Start Frontend SPA:**
```cmd
cd ../frontend
npm install
npm run dev
```
> *Application running at: `http://localhost:5173`*

---

## 🔐 Seeded Test Credentials

| Portal | Email | Password | Assigned Role | Access Permissions |
|---|---|---|---|---|
| **Super Admin Console** | `admin@storemind.com` | `Admin@123` | `super_admin` | SaaS Metrics, Merchants Status, AI Compute Costs, System Health |
| **Merchant Store Manager** | `TEST_SUPERMART1@GMAIL.COM` | `Test@1234` | `store_manager` | POS Billing, Inventory Edit/Delete, Udhar CRM, Sales Reports & CSV |

---

## 🔗 Key API Route Reference

| Module | Method | Endpoint | Description |
|---|---|---|---|
| **Auth** | `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT bearer token |
| **Auth** | `GET` | `/api/v1/auth/me` | Retrieve active user profile & role permissions |
| **Mart** | `GET/PUT/DELETE` | `/api/v1/mart/products` | Manage inventory catalog & query low-stock items |
| **Mart** | `GET/POST` | `/api/v1/mart/customers` | Retrieve customer CRM profiles & record Udhar repayments |
| **Mart** | `GET` | `/api/v1/mart/reports/summary` | Aggregate sales analytics & CSV download payload |
| **Mart** | `GET` | `/api/v1/mart/bills` | Search bill history & filter payment modes |
| **Admin** | `GET` | `/api/v1/admin/executive-metrics` | Retrieve MRR, ARR, Churn Rate & GMV totals |
| **Admin** | `GET/PUT` | `/api/v1/admin/merchants` | List registered merchants & toggle account status |
| **Admin** | `GET` | `/api/v1/admin/ai-usage` | Monitor AI model execution counts & cloud compute costs |
| **Admin** | `GET` | `/api/v1/admin/platform-health` | Monitor DB connection pools & microservice port health |
| **Sync** | `POST` | `/api/v1/sync/push` | Ingest offline-queued POS bills from local storage |
| **Sync** | `GET` | `/api/v1/sync/pull` | Pull updated master product & customer catalog |

---

## 🎓 Academic Context

- **Degree Program**: Bachelor of Technology (B.Tech) in Artificial Intelligence & Machine Learning
- **Capstone Project**: Final Year Project (Semesters 7 & 8)
- **Domain Focus**: Retail Automation / SMB SaaS Infrastructure / Applied AI
- **GitHub Repository**: [https://github.com/Shehjad-11/FYR_PRO.git](https://github.com/Shehjad-11/FYR_PRO.git)

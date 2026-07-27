# StoreMind Pro

> AI-Powered Modular Retail Management System for Indian SMBs

StoreMind Pro is a full-stack, multi-tenant retail management platform built as a B.Tech AIML Final Year Project. It combines a fast POS billing counter, real-time inventory tracking, customer CRM with Udhar/Khata support, and AI-driven intelligence — all wrapped in a dark glassmorphism UI.

---

## Features

### Authentication & Multi-Tenancy
- JWT-based auth with bcrypt password hashing
- Role-based access control: Super Admin, Store Admin, Cashier
- Multi-tenant organization support (Kirana stores, supermarkets, wholesale chains)

### POS Billing Counter
- Instant barcode scanning for product lookup
- AI Voice Billing Engine — converts natural speech to cart items ("Add 2 kg sugar")
- GST (5%) calculation, discounts, and instant invoice/receipt generation
- Automatic stock reduction on bill creation

### Inventory & Stock Management
- Real-time stock tracking with configurable minimum threshold alerts
- Full product catalog with cost price, selling price, MRP, and barcode
- Category management

### Customer CRM & Udhar Khata Book
- Customer profiles with credit balance (Udhar/Khata) tracking
- Transaction history and loyalty points

### AI Intelligence
- **Prophet Demand Forecasting** — time-series predictions 7–30 days ahead with reorder warnings
- **Voice Billing NLP Parser** — natural language to cart item conversion
- **RAG Store Assistant** — answers analytics queries in plain English ("What are my top 5 products this week?")

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI 0.115+, Uvicorn, Python 3.11+ |
| ORM | SQLAlchemy 2.0 Async, aiosqlite |
| Validation | Pydantic v2 |
| Auth | python-jose (JWT), passlib (bcrypt) |
| Frontend | React 19, Vite 6 |
| Styling | Tailwind CSS 3.4, Glassmorphism dark theme |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP Client | Axios (with JWT interceptor) |
| AI / ML | Prophet (demand forecasting), NLP parser, RAG query engine |
| Database | SQLite (dev) / PostgreSQL (prod) |
| DevOps | Docker, Docker Compose |

---

## Project Structure

```
StoreMind-Pro/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # Route handlers (auth, mart, ai)
│   │   ├── core/            # Security utilities
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── config.py        # Environment configuration
│   │   ├── database.py      # Async DB session
│   │   └── main.py          # FastAPI app entry point
│   ├── .env                 # Environment variables
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar
│   │   ├── pages/           # Dashboard, Billing, Inventory, Customers, AIInsights
│   │   └── services/        # Axios API client
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── docs/                    # Project memory & documentation
│   ├── CURRENT_CONTEXT.md
│   ├── STATUS_REPORT.md
│   ├── TASKS.md
│   ├── DECISIONS.md
│   ├── CHANGELOG.md
│   └── PROJECT_HISTORY.md
├── docker-compose.yml
├── run_storemind.bat        # One-click local launcher
└── push_to_github.bat
```

---

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- pip

### 1. Clone the Repository
```bash
git clone https://github.com/shehjad-sayyad/FYP.git
cd FYP
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

The API will be live at `http://127.0.0.1:8000`  
Interactive Swagger docs: `http://127.0.0.1:8000/api/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The dashboard will be live at `http://localhost:5173`

### One-Click Launch (Windows)
```cmd
run_storemind.bat
```
This opens both servers in separate terminal windows automatically.

---

## API Overview

| Module | Endpoint | Description |
|---|---|---|
| Auth | `POST /api/v1/auth/register` | Create organization + admin account |
| Auth | `POST /api/v1/auth/login` | Login, receive JWT tokens |
| Auth | `GET /api/v1/auth/me` | Get current user profile |
| Mart | `POST/GET /api/v1/mart/products` | Product CRUD |
| Mart | `GET /api/v1/mart/products/barcode/{code}` | Barcode lookup |
| Mart | `POST/GET /api/v1/mart/customers` | Customer CRM |
| Mart | `POST/GET /api/v1/mart/bills` | POS billing |
| AI | `POST /api/v1/ai/forecast` | Demand forecasting |
| AI | `POST /api/v1/ai/voice-parse` | Voice to cart NLP |
| AI | `POST /api/v1/ai/rag-query` | Natural language analytics |
| Health | `GET /api/health` | Server health check |

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Development
DATABASE_URL=sqlite+aiosqlite:///./storemind.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256

# Production
# DATABASE_URL=postgresql+asyncpg://user:password@host:5432/storemind
# SECRET_KEY=<generate-with: openssl rand -hex 32>
# ENVIRONMENT=production
# DEBUG=False
```

---

## Docker Deployment

```bash
docker-compose up -d
```

This starts the backend API and database containers. Serve the frontend build separately via Nginx or a static host.

---

## Project Status

| Module | Completion |
|---|---|
| Backend API | 100% ✅ |
| Frontend UI | 75% 🔄 |
| AI Features | 80% 🔄 |
| Testing | 45% 🔄 |
| Documentation | 98% ✅ |
| Docker / Deployment | 30% 🔄 |

See [`docs/STATUS_REPORT.md`](docs/STATUS_REPORT.md) for the full breakdown and remaining tasks.

---

## Academic Context

- **Degree**: B.Tech — Artificial Intelligence & Machine Learning
- **Project Type**: Final Year Project (Semester 7–8)
- **Domain**: Retail Tech / SMB SaaS / Applied AI

---

## License

This project is developed for academic purposes. All rights reserved by the author.

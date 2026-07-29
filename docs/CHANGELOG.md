# CHANGELOG — StoreMind Pro

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.1.0] - 2026-07-27

### Added
- Created `/docs` permanent master memory system (`CURRENT_CONTEXT.md`, `PROJECT_HISTORY.md`, `TASKS.md`, `DECISIONS.md`, `CHANGELOG.md`).
- Multi-Tenant Authentication & Authorization engine foundation.
- Fast POS Billing Counter framework with AI Voice Billing Engine integration.
- Inventory & Stock Management backend & frontend modules.
- Customer CRM & Udhar Khata Book tracking.
- Prophet Demand Forecasting & RAG Store Assistant AI capabilities.

## [v0.3.0] - 2026-07-27

### Fixed
- `PackageAlert` icon (does not exist in lucide-react) replaced with `PackageSearch` in `Dashboard.jsx`.
- `organization_type` strict regex pattern removed from `UserRegister` Pydantic schema — was rejecting valid store types.
- `phone` field removed from registration form — was causing silent 422 validation failures.
- CORS middleware changed from `allow_origins=settings.CORS_ORIGINS` with `allow_credentials=True` to `allow_origins=["*"]` with `allow_credentials=False` — fixes cross-origin block between localhost:5173 and localhost:8000.
- `passlib` replaced with direct `bcrypt` calls in `security.py` — passlib is broken on Python 3.14 (no `__about__` attribute, 72-byte hash bug).
- Frontend API base URL changed from `http://127.0.0.1:8000` to `http://localhost:8000` for consistent CORS origin matching.
- `aiosqlite` added to `requirements.txt` — was missing, causing 500 crash on every DB operation.

### Added
- `README.md` fully rewritten — professional structure, tech stack table, API overview table, project structure diagram, environment variables section, academic context section.
- Complete UI theme overhaul: dark glassmorphism replaced with clean professional white theme.
- `index.css` rewritten with plain CSS component classes (`card`, `card-md`, `btn-primary`, `btn-secondary`, `input-field`, `badge-*`) — no `@apply` with custom tokens (was causing PostCSS crash).
- `tailwind.config.js` simplified to standard Tailwind only — removed custom color tokens that broke `@apply`.
- Eye/hide password toggle button added to Login and Register password fields.
- `Register.jsx` — improved error handling: shows exact Pydantic validation errors on screen instead of generic message.
- `seed_user.py` — direct SQLite seed script created, inserts user+org bypassing the API entirely (useful when API is unstable).
- `start_backend.bat` — auto-installs `aiosqlite` + `email-validator` then starts uvicorn.
- `start_frontend.bat` — starts Vite frontend server.
- Test user seeded: `TEST_SUPERMART1@GMAIL.COM` / `Test@1234` / Store: `TEST_SUPERMART_1`.

### Changed
- All frontend pages restyled: `Dashboard.jsx`, `Billing.jsx`, `Inventory.jsx`, `Customers.jsx`, `AIInsights.jsx`, `Login.jsx`, `Register.jsx`, `Navbar.jsx`, `Sidebar.jsx`.
- `App.jsx` cleaned up and simplified.
- `docs/STATUS_REPORT.md` added as new doc file.

## [v0.4.0] - 2026-07-29

### Added
- **Phase 1 (Merchant Core)**: Built `Reports.jsx` (Recharts charts, CSV export), Product Edit/Delete modals in `Inventory.jsx`, Customer Detail View & Udhar Repayment Form Modal in `Customers.jsx`, `BillHistory.jsx` with printable digital tax invoice receipt modal, and Low Stock Notifications Popover Dropdown in `Navbar.jsx`.
- **Phase 2 (Admin Panel)**: Built `AdminDashboard.jsx` & `admin.py` with 5 sub-tabs (Executive Dashboard, Merchant Management & Status Toggle, Subscription Tiers, AI Usage & Compute Costs, Platform Health & Microservices port matrix).
- **Phase 3 (Main Website)**: Built complete customer marketing site (`MainWebsite.jsx`, `LandingHome`, `LandingAbout`, `LandingSolutions`, `LandingPricing`, `LandingAIShowcase`, `LandingBlog`, `LandingContact`).
- **Phase 4 (Login Portal)**: Built `LoginPortal.jsx` for Super Admin (`admin@storemind.com`) & Store Manager (`TEST_SUPERMART1@GMAIL.COM`) with role-based redirection in `App.jsx`.
- **Phase 5 (Offline Setup)**: Built `LandingDownload.jsx`, `build_offline_installer.bat`, `syncEngine.js` & `sync.py` bi-directional data sync router, and `edgeAiClient.js` & `edge_ai.py` Edge AI micro-inference provider.


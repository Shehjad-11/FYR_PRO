# TASKS — StoreMind Pro Task List

## 🔴 High Priority

- [x] MEM-001
  Initialize and enforce master project memory system under `/docs/`
  Priority: High
  Files: `docs/CURRENT_CONTEXT.md`, `docs/PROJECT_HISTORY.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/CHANGELOG.md`
  Status: Completed
  Dependencies: None
  Owner: Antigravity AI
  Completion Date: 2026-07-27

- [ ] QUAL-001
  Audit backend routes and verify runtime stability under FastAPI test suite / Uvicorn runner
  Priority: High
  Files: `backend/app/`
  Status: Pending
  Dependencies: MEM-001
  Owner: Antigravity AI

---

## 🟡 Medium Priority

- [ ] AI-001
  Refine AI Voice Billing Engine NLP parser efficiency and error handling
  Priority: Medium
  Files: `backend/app/routers/` or AI modules
  Status: Pending
  Dependencies: QUAL-001
  Owner: Antigravity AI

- [ ] AI-002
  Validate Prophet Demand Forecasting predictions & visualization pipeline
  Priority: Medium
  Files: `backend/app/`
  Status: Pending
  Dependencies: QUAL-001
  Owner: Antigravity AI

---

## 🟢 Low Priority

- [ ] UI-001
  Polish UI theme, micro-animations, and glassmorphism styling details across POS & CRM pages
  Priority: Low
  Files: `frontend/src/`
  Status: Pending
  Dependencies: None
  Owner: Antigravity AI

---

## 📂 Backlog

- [ ] INFRA-001
  Docker containerization optimization and production deployment scripts review
  Priority: Low
  Files: `Dockerfile`, `docker-compose.yml`
  Status: Backlog
  Dependencies: None
  Owner: Antigravity AI

---

## ✅ Completed

- [x] INIT-000
  Initial baseline repository setup with FastAPI backend & React/Vite glassmorphism frontend architecture.
  Priority: High
  Status: Completed
  Completion Date: 2026-07-27

---

## ✅ Completed This Session (2026-07-27)

- [x] README-001
  Fully rewrite README.md with professional structure, tech stack table, API overview, project structure, setup instructions, environment variables, Docker deployment, and academic context section.
  Status: Completed — 2026-07-27

- [x] BUG-001
  Fix `PackageAlert` broken lucide-react import in Dashboard.jsx → replaced with `PackageSearch`.
  Status: Completed — 2026-07-27

- [x] BUG-002
  Fix frontend PostCSS crash caused by `@apply` with custom color tokens in index.css.
  Rewrote index.css with plain CSS. Simplified tailwind.config.js to standard tokens only.
  Status: Completed — 2026-07-27

- [x] BUG-003
  Fix registration 422 Validation Error — removed strict phone field requirement and organization_type regex from UserRegister schema.
  Status: Completed — 2026-07-27

- [x] BUG-004
  Fix CORS block on all API calls — changed allow_origins to ["*"] and allow_credentials to False in main.py.
  Status: Completed — 2026-07-27

- [x] BUG-005
  Fix passlib broken on Python 3.14 — replaced hash_password() and verify_password() in security.py with direct bcrypt calls.
  Status: Completed — 2026-07-27

- [x] BUG-006
  Fix missing aiosqlite — added to requirements.txt. Added auto-install in start_backend.bat.
  Status: Completed — 2026-07-27

- [x] UI-001
  Complete UI overhaul: replaced dark glassmorphism with clean white professional theme across all pages and components.
  Files: index.css, tailwind.config.js, Login.jsx, Register.jsx, Dashboard.jsx, Billing.jsx, Inventory.jsx, Customers.jsx, AIInsights.jsx, Navbar.jsx, Sidebar.jsx, App.jsx
  Status: Completed — 2026-07-27

- [x] AUTH-001
  Add eye/hide password toggle to Login and Register password fields.
  Status: Completed — 2026-07-27

- [x] SEED-001
  Create seed_user.py to insert test user directly into SQLite DB bypassing the API.
  Seeded: TEST_SUPERMART1@GMAIL.COM / Test@1234 / TEST_SUPERMART_1
  Status: Completed — 2026-07-27

- [x] INFRA-002
  Create start_backend.bat and start_frontend.bat convenience launch scripts.
  Status: Completed — 2026-07-27

---

## 🔴 High Priority — Pending

- [ ] QUAL-001
  Full end-to-end integration test: login → add category → add products → create bill → check dashboard metrics → test AI forecast → test voice billing → test RAG chat.
  Priority: High
  Status: Pending
  Owner: Developer

- [ ] UI-002
  Build Reports page: sales by day/week/month chart, top products table, customer leaderboard, CSV export.
  Priority: High
  Status: Pending

---

## 🟡 Medium Priority — Pending

- [ ] UI-003
  Product edit and delete functionality in Inventory page (edit modal + delete confirmation).
  Priority: Medium
  Status: Pending

- [ ] UI-004
  Customer detail view — click customer → transaction history + Udhar payment form.
  Priority: Medium
  Status: Pending

- [ ] UI-005
  Bill history page — list all past bills with search/filter + reprint receipt.
  Priority: Medium
  Status: Pending

- [ ] AI-001
  Test voice billing parser end-to-end via frontend Billing page.
  Priority: Medium
  Status: Pending

- [ ] AI-002
  Test Prophet demand forecast and RAG assistant end-to-end via AI Insights page.
  Priority: Medium
  Status: Pending

---

## 🟢 Low Priority — Pending

- [ ] INFRA-001
  Docker containerization test and production deployment scripts review.
  Priority: Low
  Files: `Dockerfile`, `docker-compose.yml`
  Status: Pending

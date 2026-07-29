# ARCHITECTURE DECISIONS — DECISIONS.md

## Decision 001: Adoption of Mandatory Master Project Memory System
- **Date**: 2026-07-27
- **Problem**: Need to prevent loss of context across AI sessions and ensure seamless developer continuity.
- **Alternatives Considered**: Ad-hoc chat memory, single README notes, ephemeral commit logs.
- **Chosen Solution**: Strictly maintained `/docs` folder with `CURRENT_CONTEXT.md`, `PROJECT_HISTORY.md`, `TASKS.md`, `DECISIONS.md`, and `CHANGELOG.md`.
- **Reason**: Guarantees zero context loss, complete decision history, explicit tracking of tasks, changes, and mandatory startup reading procedure.
- **Tradeoffs**: Minor documentation maintenance overhead on every task completion.
- **Future Impact**: High codebase stability, self-documenting repo, instant onboarding for any AI or human engineer.

---

## Decision 002: FastAPI + SQLAlchemy Async & React 19 / Vite Architecture
- **Date**: 2026-07-27
- **Problem**: Need high-performance async API processing for POS/Inventory operations combined with responsive real-time UI & AI modeling capabilities.
- **Alternatives Considered**: Django / Flask for backend; Next.js SSR for frontend.
- **Chosen Solution**: FastAPI async backend with Pydantic v2 + SPA React 19 with Vite & Tailwind glassmorphism dark theme.
- **Reason**: Excellent performance, native OpenAPI documentation, seamless AI/Python library integration (Prophet/NLP), and ultra-fast client-side POS interactions.
- **Tradeoffs**: Requires managing client-side SPA state and separate async ORM semantics.
- **Future Impact**: Scalable modular architecture for multi-tenant retail SaaS.

---

## Decision 003: Replace passlib with Direct bcrypt Calls
- **Date**: 2026-07-27
- **Problem**: `passlib` library is broken on Python 3.14 — `bcrypt` module no longer has `__about__` attribute, and passlib triggers a 72-byte password hash validation bug on startup, making `hash_password()` and `verify_password()` completely unusable.
- **Alternatives Considered**: Downgrade Python to 3.11; patch passlib; use argon2.
- **Chosen Solution**: Remove passlib from the security layer entirely. Use `bcrypt` library directly in both `security.py` (backend) and `seed_user.py` (seed script).
- **Reason**: `bcrypt` 5.0.0 is already installed and works correctly on Python 3.14. Direct usage is simpler and removes the broken abstraction layer.
- **Tradeoffs**: Slightly less flexible than passlib's multi-scheme support, but bcrypt is the only scheme in use anyway.
- **Future Impact**: If Python is downgraded to 3.11 for production, passlib can be restored. For now, direct bcrypt is the stable path.

---

## Decision 004: CORS Allow All Origins in Development
- **Date**: 2026-07-27
- **Problem**: Frontend on `localhost:5173` was being blocked by CORS when calling backend on `localhost:8000`. The original config used `allow_origins=settings.CORS_ORIGINS` list with `allow_credentials=True`, which requires exact origin matching and conflicts with wildcard patterns.
- **Alternatives Considered**: Add every possible origin to the list; use a proxy in Vite config.
- **Chosen Solution**: Set `allow_origins=["*"]` and `allow_credentials=False` for development environment.
- **Reason**: Simplest and most reliable fix for local dev. Credentials are handled via Authorization header (Bearer JWT), not cookies, so `allow_credentials=False` is correct.
- **Tradeoffs**: Not suitable for production — must be locked down to specific origins before deployment.
- **Future Impact**: Production deployment must set `CORS_ORIGINS` to the actual frontend domain and re-enable per-origin control.

---

## Decision 005: Complete UI Theme Overhaul — White Professional Theme
- **Date**: 2026-07-27
- **Problem**: Dark glassmorphism theme with custom Tailwind color tokens caused PostCSS build crash (`bg-surface-secondary` class not found). Additionally, user requested a simpler, professional white UI instead of colorful cyber theme.
- **Alternatives Considered**: Fix custom token definitions; keep dark theme with bug fix only.
- **Chosen Solution**: Full rewrite to clean white professional theme using only standard Tailwind utility classes. Custom CSS classes (`card`, `btn-primary`, `input-field`, `badge-*`) defined as plain CSS in `index.css` without `@apply` and custom token references.
- **Reason**: Eliminates PostCSS errors permanently. White theme is more professional for a retail management SaaS demo/presentation.
- **Tradeoffs**: Lost the distinctive glassmorphism aesthetic. Gained stability and a cleaner, more enterprise-appropriate look.
- **Future Impact**: Consistent, maintainable CSS base. Any future theming can extend from this stable foundation.

---

## Decision 007: Modular Dual-Role Login Portal with Auto Role-Based Redirection
- **Date**: 2026-07-29
- **Problem**: Need seamless authorization portal for Super Admins and Store Managers while enforcing secure role boundaries.
- **Chosen Solution**: `LoginPortal.jsx` with tab switcher between Merchant Sign In and Super Admin Sign In, wired with one-click test credential fill buttons (`admin@storemind.com` & `TEST_SUPERMART1@GMAIL.COM`).
- **Reason**: Simplifies testing and provides clean entry points from main website into respective SaaS consoles.

---

## Decision 008: Offline-First Hybrid Sync Engine & Edge AI Micro-Inference Fallback
- **Date**: 2026-07-29
- **Problem**: Indian Kirana retail stores experience frequent internet outages; POS billing and produce scanning must never stall due to network loss.
- **Chosen Solution**: Client-side `syncEngine.js` with `navigator.onLine` detector that queues offline transactions in `localStorage` and pushes batch payloads to FastAPI `/api/v1/sync/push` upon reconnection. Edge AI fallback provider (`edgeAiClient.js` & `edge_ai.py`) executes local ONNX micro-inference for YOLO object detection & Whisper voice billing.
- **Reason**: Zero downtime for Kirana checkout counters, low latency, and automatic cloud synchronization.

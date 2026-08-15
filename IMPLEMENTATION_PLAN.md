# Karvao India — Implementation Plan

## 1. Development Phases

### Phase 0: Planning and Architecture (Current Phase)
*   Define specs, route mapping, component lists, and database models.
*   Establish codebase rules and write starter config files.

### Phase 1: Foundation (Tech Stack Setup)
*   Initialize Next.js App Router, TypeScript, Tailwind CSS, and Prisma.
*   Configure Linting, Formatting (Prettier), and Test setup (Vitest & Playwright).
*   Create databases, migration scripts, and seed files.

### Phase 2: Design System & Core Layout
*   Define CSS variables and custom utility styles inside Tailwind/CSS configurations.
*   Build reusable primitive components (`Button`, `Card`, `Input`, `ScoreRing`, `ProgressBar`).
*   Establish layout files, core navigation with responsive menus, and mobile sticky conversion CTA bar.

### Phase 3: Homepage & Marketing Sections
*   Build the high-conversion Hero section featuring the text-based LCP and subtle CSS animation.
*   Build capability/trust strip, business challenge section, Karvao growth system visual.
*   Assemble solutions, industries, process, "Why Karvao", and final CTA sections.
*   Confirm zero layout shift (CLS) for dynamic elements.

### Phase 4: Quotation Engine
*   Implement multi-step stepper state with React Hook Form & Zod validation.
*   Build step views: Business info, services checklist, goals, budget, contact.
*   Implement API route `/api/quotation` for validation, lead creation, database transaction.

### Phase 5: Business Growth Score Diagnostic
*   Configure the 8-12 questionnaire data structure.
*   Build client-side diagnostic questionnaire stepper with keyboard-navigable radio & check options.
*   Implement scoring math & deterministic recommendations in helper modules.
*   Implement API route `/api/assessment` to save responses, calculate scores, link to/create lead.

### Phase 6: Growth Report Page
*   Build `/report/[token]` page containing score gauges, gap analysis, next steps.
*   Secure details using UUID access tokens (no simple integer IDs exposed).
*   Implement print styles (so reports can be exported to PDF easily by users).

### Phase 7: Admin Dashboard
*   Setup simple credentials or mock authentication for admin protection in V1.
*   Implement overview statistics dashboard.
*   Build paginated tables for Leads, Quotations, and Reports.
*   Enable lead status update triggers (NEW ➔ CONTACTED ➔ QUALIFIED ➔ WON/LOST).

### Phase 8: Hardening & Audits
*   Benchmark using PageSpeed / Lighthouse.
*   Tune images, bundle sizes, tree-shaking, and lazy loading.
*   Audit WCAG 2.2 AA accessibility (contrast, keyboard trapping, ARIA tags).
*   Perform E2E test runs for the complete lead paths.

### Phase 9: Deployment & Release
*   Deploy to Vercel/similar hosting.
*   Setup database migrations & environment variables.
*   Test production paths and confirm analytics tracking is active.

---

## 2. Hard Performance Budgets & Priority Weights
Our priority weights are ordered as follows:
1.  **TBT** (Priority Weight: 30) — Target: `< 200ms`
2.  **LCP** (Priority Weight: 25) — Target: `< 2.5s`
3.  **CLS** (Priority Weight: 25) — Target: `< 0.1`
4.  **Speed Index** (Priority Weight: 15) — Target: `< 3.4s` on Mobile, `< 1.3s` on Desktop
5.  **FCP** (Priority Weight: 10) — Target: `< 1.8s`
6.  **INP** (Priority Weight: 15) — Target: `< 200ms`

### Budget Rules
*   **JS Bundle Size**: Main thread initialization code must stay under `85KB` gzipped.
*   **Font Weights**: Only load Inter Regular (400), Medium (500), and Bold (700) in WOFF2 format using `font-display: swap`.
*   **Hero Asset**: Must use pure HTML + inline SVGs + CSS transforms (no client-side JS framework for LCP, no lazy-loading).

---

## 3. Testing Strategy
*   **Unit Tests (Vitest)**: Score calculation boundaries (0, 39, 40, 59, 60, 74, 75, 89, 90, 100). Recommendation triggers. Form schema validation rules.
*   **E2E Tests (Playwright)**: Full Quotation submission flow. Diagnostic score submission and PDF report display. Mobile viewport sticky CTA functionality. Admin route security check.

---

## 4. Risks & Mitigations
*   **Risk**: Cold start on serverless DB (PostgreSQL) causing API delay.
    *   *Mitigation*: Use connection pooling and host the database in the same region as the Vercel app.
*   **Risk**: Analytics scripts bloating TBT.
    *   *Mitigation*: Delay loading GA4/Pixel script until after the first interaction or use `next/script` with `strategy="lazyOnload"`.

---

## 5. Open Inputs Required from User
1.  **Production Domain**: Target URL for testing SEO & PageSpeed.
2.  **SMTP credentials / Transactional Email Provider**: Resend, Sendgrid, etc.
3.  **Database Instance Location**: Preferred cloud hosting details (Supabase, Neon, etc.).

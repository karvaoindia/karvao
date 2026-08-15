# Karvao India — Project Specification

## 1. Product Objective
The primary objective of the Karvao India website is to communicate the core value proposition of Karvao within approximately **5 seconds** of a visitor arriving on the page.

The landing experience must clearly answer:
1. **What is Karvao?** (Digital growth partner for businesses)
2. **What does Karvao do?** (Builds digital presence, generates demand, improves conversions, automates operations, and measures growth)
3. **Who is Karvao for?** (Businesses looking to build, attract, convert, automate, measure, and grow)
4. **What should I do next?** (Primary CTAs: "Get a Quotation" or "Check Your Business Score")

### Primary Conversion Paths
The platform supports two high-conversion user pathways, bypassing generic contact forms as primary capture mechanisms:

```
[PATH A: High Intent (Knows Needs)]
Visitor ➔ Get Quotation ➔ Quotation Request ➔ Lead (DB) ➔ Karvao Follow-up

[PATH B: Discovery Intent (Doesn't Know Needs)]
Visitor ➔ Business Growth Score Assessment ➔ Score & Recommendations ➔ Report Generated ➔ Lead (DB) ➔ Karvao Follow-up
```

---

## 2. Core Positioning & Pillars
Karvao operates under a unified business growth system: **BUILD ➔ ATTRACT ➔ CONVERT ➔ AUTOMATE ➔ MEASURE ➔ GROW**.

*   **BUILD**: Website Development, E-commerce, Shopify, Branding.
*   **ATTRACT**: SEO, Social Media, Meta Ads, Google Ads.
*   **CONVERT**: CRM, Lead Management, Conversion Systems, Sales Enablement.
*   **AUTOMATE**: WhatsApp Automation, Workflow Automation, Integrations, Chatbots.
*   **MEASURE**: Analytics, Tracking, Reporting, Dashboards.
*   **GROW**: Sustainable and scalable business expansion.

**Mantra**: *Clear Thinking. Simple Systems. Measurable Growth.*

---

## 3. Design Philosophy & Guidelines
*   **Minimal & Premium**: Clean layout, generous whitespace, strong typography, and structured grid rhythm.
*   **High Contrast & Accessible**: Strict adherence to WCAG 2.2 AA (contrast, focus outlines, button markup, font sizing).
*   **No Fluff / Gimmicks**: Avoid stock-heavy sections, continuous distracting scroll loops, WebGL, or particle effects.
*   **Performance First**: Layout hierarchy must be preserved without sacrificing Core Web Vitals.

---

## 4. Key Functional Requirements
1.  **Marketing & Capabilities**: Fully responsive homepage, solution/industry detail landing pages, about, and insights.
2.  **Quotation Engine**: Secure multi-step form validation using React Hook Form & Zod, saving leads/quotations to a PostgreSQL DB via Prisma.
3.  **Business Growth Score**: Diagnostic quiz (8–12 questions) calculating scores across 6 categories.
4.  **Deterministic Recommendation Engine**: Generates action points based on score categories.
5.  **Growth Report**: Generates access token-secured, shareable growth report.
6.  **Protected Admin Dashboard**: View leads, quotations, assessments, and reports with status controls.
7.  **Analytics Tracking**: GA4 and Meta Pixel tracking custom events without blocking rendering.
8.  **Automated Tests**: Unit, integration, and Playwright E2E suites.

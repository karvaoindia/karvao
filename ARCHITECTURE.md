# Karvao India — Architectural Specification

## 1. Directory Structure
We use a Next.js App Router project structure:

```
WEBSITE/
├── .agents/
│   └── rules/
│       └── karvao.md
├── app/
│   ├── (marketing)/                # Layout for public marketing pages
│   │   ├── page.tsx                # Homepage
│   │   ├── solutions/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── how-we-work/page.tsx
│   │   ├── about/page.tsx
│   │   ├── insights/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── (product)/                  # Layout for score & quotation
│   │   ├── quotation/page.tsx
│   │   ├── business-score/
│   │   │   ├── page.tsx            # Multi-step Assessment
│   │   │   └── result/page.tsx     # Result Screen
│   │   └── report/
│   │       └── [token]/page.tsx    # Shareable token-based Report
│   ├── admin/                      # Protected Admin dashboard
│   │   ├── page.tsx
│   │   ├── leads/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── quotations/page.tsx
│   │   ├── assessments/page.tsx
│   │   └── reports/page.tsx
│   ├── api/                        # API routes
│   │   ├── leads/route.tsx
│   │   ├── quotation/route.tsx
│   │   ├── assessment/route.tsx
│   │   ├── reports/route.tsx
│   │   └── contact/route.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/                     # Reusable components
│   ├── ui/                         # Atomic Design System (Button, Input, Select, etc.)
│   ├── marketing/                  # Sections (Hero, GrowthSystem, etc.)
│   ├── product/                    # Interactive flows (AssessmentForm, QuotationForm)
│   └── admin/                      # Admin components
├── lib/                            # Business logic & utilities
│   ├── prisma.ts                   # Prisma client wrapper
│   ├── scoring.ts                  # Scoring algorithm
│   ├── recommendations.ts          # Recommendation engine logic
│   └── analytics.ts                # Non-blocking analytics abstraction
├── prisma/
│   ├── schema.prisma               # DB schemas
│   └── seed.ts                     # Database seed
├── public/                         # Public assets (icons, font assets)
├── styles/                         # Style modules/variables
├── types/                          # Shared TypeScript types
└── tests/                          # Automated tests (Unit, Integration, E2E)
```

---

## 2. Database Models (Prisma Schema)
The PostgreSQL database stores leads, assessments, quotations, and reports.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL
  WON
  LOST
}

model Lead {
  id          String       @id @default(uuid())
  email       String       @unique
  name        String
  phone       String?
  company     String?
  status      LeadStatus   @default(NEW)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  assessments Assessment[]
  quotations  Quotation[]
  contactSubs ContactSubmission[]
}

model Assessment {
  id               String       @id @default(uuid())
  leadId           String
  lead             Lead         @relation(fields: [leadId], references: [id], onDelete: Cascade)
  answers          Json         // Raw selected answers structure
  digitalPresence  Int          // Score out of 100
  brand            Int
  acquisition      Int
  conversion       Int
  automation       Int
  measurement      Int
  overallScore     Int          // Calculated weighted score
  createdAt        DateTime     @default(now())
  
  reports          Report[]
}

model Report {
  id           String     @id @default(uuid())
  assessmentId String
  assessment   Assessment @relation(fields: [assessmentId], references: [id], onDelete: Cascade)
  accessToken  String     @unique // Secure random token
  createdAt    DateTime   @default(now())
}

model Quotation {
  id           String          @id @default(uuid())
  leadId       String
  lead         Lead            @relation(fields: [leadId], references: [id], onDelete: Cascade)
  goals        String
  timeline     String
  budget       String
  status       String          @default("PENDING")
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
  
  items        QuotationItem[]
}

model QuotationItem {
  id          String    @id @default(uuid())
  quotationId String
  quotation   Quotation @relation(fields: [quotationId], references: [id], onDelete: Cascade)
  service     String    // E.g. "Website Development", "SEO"
}

model ContactSubmission {
  id        String   @id @default(uuid())
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  message   String
  createdAt DateTime @default(now())
}
```

---

## 3. Business Growth Score System
### Category Weights (Configured in `lib/scoring.ts`)
*   **Digital Presence**: 20%
*   **Brand**: 10%
*   **Acquisition**: 20%
*   **Conversion**: 20%
*   **Automation**: 15%
*   **Measurement**: 15%

### Score Formula
$$\text{Overall Score} = (\text{Presence} \times 0.20) + (\text{Brand} \times 0.10) + (\text{Acquisition} \times 0.20) + (\text{Conversion} \times 0.20) + (\text{Automation} \times 0.15) + (\text{Measurement} \times 0.15)$$

### Score Bands
*   **0–39**: Foundation Required
*   **40–59**: Developing
*   **60–74**: Growing
*   **75–89**: Strong
*   **90–100**: Advanced

---

## 4. Deterministic Recommendation Engine (`lib/recommendations.ts`)
Triggered automatically based on category scores being less than 50:
1.  **Digital Presence < 50**: Recommend *Website Development, E-commerce, Shopify Setup, Branding*.
2.  **Brand < 50**: Recommend *Identity & Branding Refinement*.
3.  **Acquisition < 50**: Recommend *SEO Audit, Meta Ads, Google Ads Campaign, Social Media Setup*.
4.  **Conversion < 50**: Recommend *CRM Setup, Lead Management Systems, Sales Enablement*.
5.  **Automation < 50**: Recommend *WhatsApp Automation, Workflow Integration, Automated Chatbots*.
6.  **Measurement < 50**: Recommend *Analytics Auditing, Custom Reporting Dashboards, Tracking setup*.

Returns a maximum of 3–5 highest-priority recommendations.

---

## 5. Analytics Abstraction (`lib/analytics.ts`)
Tracks conversions without blocking rendering:
-   Uses queueing or dynamic script load for GA4 / Meta Pixel.
-   Key tracked events: `hero_quotation_click`, `hero_score_click`, `quotation_completed`, `score_completed`, `report_requested`.

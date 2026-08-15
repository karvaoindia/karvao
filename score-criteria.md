# Business Growth Score — Scoring Criteria & How It Works

This document explains exactly how the **Business Growth Score** diagnostic works —
the questions, the categories, the math, and the recommendations.

**Source of truth (code):**
| What | File |
| :--- | :--- |
| Questions & answer options | `lib/assessmentData.ts` |
| Category weights, formula, stage bands | `lib/scoring.ts` |
| Category score calculation from answers | `app/api/assessment/route.ts` |
| Recommendation engine | `lib/recommendations.ts` |

---

## 1. High-Level Overview

A visitor answers **12 multiple-choice questions**. Each answer carries a **score
from 0 to 100**. The questions are grouped into **6 categories** (2 questions each).

```
12 answers
   │  grouped into 6 categories (average of 2 answers each)
   ▼
6 category scores  (each 0–100)
   │  weighted sum (weights below)
   ▼
Overall Score  (0–100)
   │  mapped to a stage/band
   ▼
Stage + Strongest Area + Biggest Opportunity + Recommendations
```

The score is **100% deterministic** — the same answers always produce the same
result. There is no randomness or AI guessing.

---

## 2. The 6 Categories and Their Weights

Each category contributes a fixed percentage to the overall score.

| Category | Code key | Weight | Meaning |
| :--- | :--- | :--- | :--- |
| Digital Presence | `digitalPresence` | **20%** | Website, search visibility, online hub |
| Brand | `brand` | **10%** | Identity consistency, positioning |
| Acquisition | `acquisition` | **20%** | How you attract leads (ads, SEO, social) |
| Conversion | `conversion` | **20%** | Turning leads into customers (CRM, follow-up) |
| Automation | `automation` | **15%** | Automated processes (WhatsApp, bookings, invoices) |
| Measurement | `measurement` | **15%** | Tracking, dashboards, cost per acquisition |

Weights total **100%**. Digital Presence, Acquisition and Conversion matter most
(20% each), Brand matters least (10%).

> Weights are defined in `lib/scoring.ts` as `CATEGORY_WEIGHTS`.

---

## 3. The 12 Questions (with exact scoring)

### Category: Digital Presence (20% weight)

**Q1 — `dp_website`** · "How would you describe your company's primary website or online hub?"

| Option | Score |
| :--- | :---: |
| We don't have a website, or it's extremely outdated / not mobile friendly. | 0 |
| We have a basic website, but it's slow, hard to update, or lacks clear CTAs. | 40 |
| We have a modern website that works well, but it could be optimized for speed & conversion. | 75 |
| We have a blazing-fast, custom-built website with clear growth and conversion paths. | 100 |

**Q2 — `dp_search`** · "How easily can potential customers find your business online?"

| Option | Score |
| :--- | :---: |
| We don't show up on search engines or local business listings. | 0 |
| We show up only if someone searches our exact business name. | 50 |
| We appear prominently for broad industry keywords in our location/market. | 100 |

### Category: Brand (10% weight)

**Q3 — `br_consistency`** · "How consistent is your brand messaging and identity across all customer touchpoints?"

| Option | Score |
| :--- | :---: |
| We don't have a defined logo, color palette, or messaging guideline. | 0 |
| We have a logo, but our social media, website, and brochures look inconsistent. | 50 |
| Our branding is highly polished, professional, and consistent everywhere. | 100 |

**Q4 — `br_positioning`** · "How well does your website reflect your current brand positioning?"

| Option | Score |
| :--- | :---: |
| It does not reflect our current services or positioning at all. | 0 |
| It contains our logo and colors, but doesn't explain our unique value proposition clearly. | 50 |
| It communicates our exact value proposition and positions us as industry leaders instantly. | 100 |

### Category: Acquisition (20% weight)

**Q5 — `ac_channels`** · "How do you currently acquire new leads or customers digitally?"

| Option | Score |
| :--- | :---: |
| Strictly word-of-mouth or offline channels. No digital lead generation. | 0 |
| We post occasionally on social media but have no active search or paid ad campaigns. | 40 |
| We run paid search/social ads, but performance is erratic and cost-per-lead is high. | 75 |
| We have a predictable, automated, multi-channel lead generation engine running. | 100 |

**Q6 — `ac_tracking`** · "Are your advertising campaigns set up with professional tracking parameters?"

| Option | Score |
| :--- | :---: |
| No, we just click 'Boost Post' or run basic campaigns with no tracking. | 0 |
| Yes, we run campaigns but tracking is limited and we can't tie leads to specific ads. | 50 |
| Yes, we use advanced UTM setups and track return on ad spend (ROAS) precisely. | 100 |

### Category: Conversion (20% weight)

**Q7 — `co_crm`** · "How do you manage and follow up with leads once they express interest?"

| Option | Score |
| :--- | :---: |
| We write them down in diaries, Excel sheets, or just reply directly to emails manually. | 0 |
| We have a CRM but leads are updated slowly and follow-ups take 24+ hours. | 40 |
| We use a CRM with organized sales stages, but follow-up is still mostly manual. | 75 |
| We have a unified CRM with instant lead routing and automated sales pipelines. | 100 |

**Q8 — `co_rate`** · "What is your average website/landing page conversion rate (visitors to inquiries)?"

| Option | Score |
| :--- | :---: |
| Under 1% (or we have no idea how many visitors convert). | 0 |
| Between 1% and 3%. | 50 |
| Above 3% (fully optimized landing pages). | 100 |

### Category: Automation (15% weight)

**Q9 — `au_whatsapp`** · "Do you use instant messaging (e.g. WhatsApp, SMS) to automate customer outreach?"

| Option | Score |
| :--- | :---: |
| No, we only call or email manually. | 0 |
| We use WhatsApp Web manually, which is slow and hard to delegate. | 50 |
| We use WhatsApp Cloud APIs to trigger automated greetings, alerts, and FAQs. | 100 |

**Q10 — `au_ops`** · "How automated are your administrative processes (bookings, notifications, invoices)?"

| Option | Score |
| :--- | :---: |
| Completely manual. Everything requires human intervention. | 0 |
| Some things are automated (e.g., calendar bookings), but systems don't talk to each other. | 50 |
| Fully integrated. Booking triggers customer alerts, updates CRM, and sends invoices. | 100 |

### Category: Measurement (15% weight)

**Q11 — `me_cac`** · "How accurately can you measure your digital customer acquisition cost (CAC)?"

| Option | Score |
| :--- | :---: |
| We do not track visitors or spend metrics. We just look at total revenue. | 0 |
| We track total ad spend and total leads, but don't know the exact cost per acquired client. | 50 |
| We can track visitor-to-customer conversion and calculate exact CAC by channel. | 100 |

**Q12 — `me_dashboard`** · "Do you have a central dashboard showing real-time business growth metrics?"

| Option | Score |
| :--- | :---: |
| No, we compile reports manually at the end of the month/quarter. | 0 |
| Yes, we use live dashboards (Looker Studio, Custom CRM dashboards) to view stats. | 100 |

> All question text and option scores are defined in `lib/assessmentData.ts`.
> The answer choices shown in the quiz UI store the **numeric score** of the
> selected option.

---

## 4. How Category Scores Are Calculated

Each category has exactly **2 questions**. The category score is the **average
of those two question scores**, rounded to the nearest whole number.

```
Category score = round( (question1Score + question2Score) / 2 )
```

Example — Digital Presence:
```
dp_website = 40        (basic website)
dp_search  = 50        (shows up only for exact name)
Digital Presence = round( (40 + 50) / 2 ) = 45
```

> Code reference — `app/api/assessment/route.ts` (`getAverage` helper):
> ```ts
> const getAverage = (q1: string, q2: string): number => {
>   const val1 = typeof answers[q1] === 'number' ? answers[q1] : 0
>   const val2 = typeof answers[q2] === 'number' ? answers[q2] : 0
>   return Math.round((val1 + val2) / 2)
> }
> ```
> If an answer is missing or not a number, it is treated as **0**.

---

## 5. How the Overall Score Is Calculated

The **Overall Score** is the weighted sum of the 6 category scores:

```
Overall = round(
    DigitalPresence × 0.20
  + Brand          × 0.10
  + Acquisition    × 0.20
  + Conversion     × 0.20
  + Automation     × 0.15
  + Measurement    × 0.15
)
```

### Worked example

Suppose a business answers as follows:

| Category | Q1 | Q2 | Category score |
| :--- | :---: | :---: | :---: |
| Digital Presence | 40 | 50 | 45 |
| Brand | 0 | 50 | 25 |
| Acquisition | 40 | 0 | 20 |
| Conversion | 40 | 0 | 20 |
| Automation | 0 | 50 | 25 |
| Measurement | 0 | 0 | 0 |

```
Overall = (45 × 0.20) + (25 × 0.10) + (20 × 0.20)
        + (20 × 0.20) + (25 × 0.15) + (0 × 0.15)

        = 9.0 + 2.5 + 4.0 + 4.0 + 3.75 + 0.0
        = 23.25
        → rounded = 23
```

**Final: Overall Score = 23 → "Foundation Required"**

> Code reference — `lib/scoring.ts` `calculateScores()`. The result is **clamped**
> between 0 and 100 and rounded (`Math.round`).

---

## 6. Score Bands / Stages

The overall score maps to a stage. Boundaries are defined in `lib/scoring.ts`
`getScoreStage()`:

| Overall Score | Stage | Meaning |
| :--- | :--- | :--- |
| 0 – 39 | **Foundation Required** | Basic digital foundation is missing |
| 40 – 59 | **Developing** | Some foundation exists, needs structure |
| 60 – 74 | **Growing** | Working systems, room to scale |
| 75 – 89 | **Strong** | Solid systems, optimization stage |
| 90 – 100 | **Advanced** | Fully optimized growth machine |

Note the exact boundaries:
- below **40** → Foundation Required
- below **60** → Developing
- below **75** → Growing
- below **90** → Strong
- **90 and above** → Advanced

---

## 7. Strongest Area & Biggest Opportunity

Besides the overall score, `calculateScores()` identifies:

* **Strongest Area** — the category with the **highest** score
  (first one wins on a tie).
* **Biggest Opportunity** — the category with the **lowest** score
  (first one wins on a tie).

These power the headline messages on the report page
(`app/(product)/report/[token]/page.tsx`).

---

## 8. Recommendation Engine

The deterministic engine in `lib/recommendations.ts` checks each category:

**If a category score is below 50, a recommendation is added.**
If the score is below **30**, it is marked **High priority**; otherwise **Medium**.

| Category < 50 | Recommendation title | Items |
| :--- | :--- | :--- |
| Digital Presence | Upgrade Digital Presence & Website Foundation | Website Development, E-commerce & Shopify Setup, Branding & Visuals Upgrade |
| Brand | Define & Refine Brand Identity | Identity & Brand Guidelines Refinement, Value Proposition Clarification |
| Acquisition | Optimize Ad Campaigns & Organic Traffic | SEO Audit & Keyword Plan, Google Ads Setup, Meta Paid Social Campaign Setup |
| Conversion | Strengthen Lead Follow-Up & CRM pipelines | CRM & Pipeline Setup, Lead Management Rules, Sales Enablement Systems |
| Automation | Automate Operations & Customer Messaging | WhatsApp Automation Solutions, Workflow Automation Integrations, Automated Chatbots & Auto-responders |
| Measurement | Setup Growth Measurement & Analytics | Analytics Auditing & Custom Dashboards, GA4 & Pixel Conversions Audit, Lead Source Attribution Tracking |

**Example:** a business scoring 45 on Digital Presence, 25 on Brand, 20 on
Acquisition, 20 on Conversion, 25 on Automation and 0 on Measurement gets
recommendations for **all six** categories, with Acquisition, Conversion and
Measurement marked **High priority** (all under 30).

If **all six categories are 50 or above**, no recommendations are triggered and
the report shows an "all clear" message instead.

---

## 9. Step-by-Step: What Happens When a User Submits

1. The quiz UI collects the **selected option scores** into an `answers` object
   (keys are question IDs, values are the chosen score).
2. `POST /api/assessment` validates the payload with a Zod schema
   (`lib/validation.ts` — requires name, email; phone/company optional).
3. Category scores are averaged from the two questions per category
   (Section 4).
4. `calculateScores()` computes the overall score, stage, strongest area and
   biggest opportunity (Sections 5–7).
5. `getRecommendations()` generates the action list (Section 8).
6. A **Lead** is found-or-created from the email, an **Assessment** row is saved
   with all six category scores + overall score, and a **Report** is created with
   a secure random UUID access token.
7. The user is redirected to `/report/[token]` to see their results and PDF.

---

## 10. Design Decisions & Edge Cases

* **Deterministic by design** — answers map directly to fixed scores, so the
  system is transparent, consistent, and testable (boundary tests exist for
  39/40, 59/60, 74/75, 89/90).
* **Missing answers = 0** — if a question is skipped, it contributes 0 to the
  category average.
* **Clamped 0–100** — the weighted sum is clamped so rounding can never produce
  a score below 0 or above 100.
* **First-wins on ties** — for strongest/opportunity selection.
* **Category scoring is an equal average** — Brand, for example, weighs the two
  brand questions equally even though Brand itself only contributes 10% to the
  overall total.
* **The six categories map to Karvao's growth system** — BUILD (presence/brand),
  ATTRACT (acquisition), CONVERT (conversion), AUTOMATE (automation),
  MEASURE (measurement), GROW (overall).

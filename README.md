# Karvao India — Business Growth Platform

Karvao India is a premium digital growth partner platform. This application integrates a marketing presence, a multi-step direct quotation engine, a deterministic Business Growth Score diagnostic tool, personalized growth reporting, lead management, and a protected administration portal.

---

## 🚀 Technology Stack
*   **Frontend**: Next.js App Router (React Server Components, React Hook Form, Tailwind CSS)
*   **Database & ORM**: PostgreSQL, Prisma Client
*   **Validation**: Zod (unified client & server-side schemas)
*   **Testing**: Vitest (Unit & Integration), Playwright (E2E testing)
*   **Analytics**: GA4 + Meta Pixel custom non-blocking tracking

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** or **yarn** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and adjust the configuration:
```bash
cp .env.example .env
```

### 4. Database Setup
Create database schemas and seed default entries:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Running the App locally
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the homepage.

---

## 🧪 Testing

### Running Unit & Integration Tests (Vitest)
```bash
npm run test
```

### Running E2E Tests (Playwright)
```bash
npx playwright test
```

---

## 📈 Performance & Accessibility Metrics
We enforce strict PageSpeed/Lighthouse audit targets of **95+** for:
*   Performance
*   Accessibility
*   Best Practices
*   SEO
*   Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

# Production Readiness Gate (V1 Checklist)

Prior to promoting V1 to production, the application must pass all items in this validation suite.

---

## 1. Quality Assurance Gate
- [ ] **Typecheck**: `npm run typecheck` passes with zero errors.
- [ ] **Lint**: `npm run lint` passes with zero warnings or errors.
- [ ] **Unit & Integration Tests**: All Vitest test suites execute successfully.
- [ ] **End-to-End Tests**: Playwright scripts pass for all routes on Chromium, WebKit, and Firefox viewports.
- [ ] **Database Migrations**: All migration files are correctly tracked, applied, and seeded with core config weights.

---

## 2. Accessibility & Performance Thresholds
- [ ] **Lighthouse Performance Score**:
    *   Mobile: `95+`
    *   Desktop: `95+`
- [ ] **Lighthouse Accessibility Score**: `95+` (Target: 100)
- [ ] **Lighthouse Best Practices Score**: `95+`
- [ ] **Lighthouse SEO Score**: `95+`
- [ ] **Core Web Vitals**:
    *   LCP < 2.5s
    *   CLS < 0.1
    *   INP < 200ms
    *   TBT < 200ms

---

## 3. Operations & Safety
- [ ] **Zero Dev Secrets**: Confirm no API keys or local passwords are present in code tracking commits or the client bundles.
- [ ] **Database Connection Pooling**: Ensure pool size limits are optimized for serverless API routing.
- [ ] **Error Monitoring Integration**: Active logging captured on production API requests.
- [ ] **Functional Form Actions**: Verify emails are delivered correctly and lead creation works on the production website instance.

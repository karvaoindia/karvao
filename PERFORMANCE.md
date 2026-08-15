# Performance Optimization Specification

## 1. Targets and Budgets

| Core Web Vital | Metric Target | Importance Weight |
| :--- | :--- | :--- |
| **TBT** (Total Blocking Time) | `< 200ms` | 30 (Highest) |
| **LCP** (Largest Contentful Paint) | `< 2.5s` | 25 |
| **CLS** (Cumulative Layout Shift) | `< 0.1` | 25 |
| **Speed Index (Mobile)** | `< 3.4s` | 15 |
| **Speed Index (Desktop)** | `< 1.3s` | 15 |
| **FCP** (First Contentful Paint) | `< 1.8s` | 10 |
| **INP** (Interaction to Next Paint) | `< 200ms` | 15 |

---

## 2. Hard Budgets
*   **JavaScript (Initial Bundle)**: `< 85KB` gzipped.
*   **CSS (Critical path)**: `< 15KB` inline in document head.
*   **Images**: All assets must be optimized in `.webp` or `.avif` format. Explicit width/height sizes must be set on every `img` tag to avoid layout shift (CLS).
*   **Web Fonts**: Inter WOFF2 fonts only, self-hosted, with `font-display: swap`.

---

## 3. Implementation Optimization Blueprint

### LCP Strategy (Text-Based)
1.  We will render the main hero headline (`<h1>`) strictly as static server-side HTML.
2.  No client-side dynamic content hydration will be placed in the main hero view area.
3.  Font loading will be preloaded inline in `<head>` to avoid font-swap shift.

### CLS Avoidance (Layout Shift)
1.  Define absolute width & height dimensions for all visual cards and diagrams.
2.  Reserve space for the mobile navigation layout.
3.  Use CSS skeleton placeholders for any dynamically rendered components (e.g. quiz loading state).

### TBT Minimization (Thread Blockers)
1.  Avoid loading heavy JS libraries (like Framer Motion) for simple layout transitions. Use CSS animations (`transform` / `opacity`).
2.  Load GA4 and Meta Pixel analytics dynamically after first interaction using non-blocking asynchronous script loaders.

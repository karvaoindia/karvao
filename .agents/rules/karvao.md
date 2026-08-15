# Karvao India Workspace Rules

## 1. Stack Restrictions
*   **Framework**: Next.js App Router (TypeScript).
*   **Styling**: Tailwind CSS + Vanilla CSS variables.
*   **Database**: Prisma + PostgreSQL (using pool connections).
*   **Forms & Validation**: Zod + React Hook Form + Server Action / API route validation.

---

## 2. Design System Guidelines
*   **Colors**:
    *   Primary Accent: Emerald Green (`text-emerald-600`, `bg-emerald-600` / `#10b981` or similar).
    *   Dark: Charcoal/Obsidian (`text-neutral-900`, `bg-neutral-900`).
    *   Backgrounds: Minimalist Light (`bg-neutral-50` or `#fafafa`), Clean White (`bg-white`).
*   **Visual Polish**:
    *   Keep layouts extremely clean with ample padding and thin borders (`border-neutral-200`).
    *   Card designs: Flat, modern, thin borders, subtle rounded corners (`rounded-xl` or `rounded-2xl`).
    *   Interactive elements: Subtle transition states (`transition-all duration-200 ease-in-out`), hover scales, distinct focus outlines for accessibility.

---

## 3. Performance & CWV Budgets
*   **Initial Page Load**: Must load in `< 1s` under simulated throttling.
*   **LCP element**: Must be text (specifically the main Hero Headline). No large LCP images or preloads.
*   **CLS Prevention**:
    *   Every SVG and Image must specify explicit width and height.
    *   Reserve height for the mobile navigation and sticky conversion bar to prevent layout shifts.
*   **INP Target**: `< 200ms`. Do not block click actions with heavy loops.
*   **Animations**: Limit to CSS transition, transform, and opacity. Never animate layout-triggering properties (width, height, top, left, margins).

---

## 4. Accessibility (WCAG 2.2 AA)
*   **Buttons**: Ensure interactive items are either `<button>` or `<a>` tags. Never use `<div>` or `<span>` for click actions.
*   **Focus State**: Keep `:focus-visible` outlines clear and distinct.
*   **Labels**: All input elements must have associated `<label>` tags (use `sr-only` if visually hidden but required for screen readers).
*   **Reduced Motion**: Respect media preference:
    ```css
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-delay: -1ms !important;
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        background-attachment: scroll !important;
        scroll-behavior: auto !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    }
    ```

---

## 5. SEO & Content Rules
*   **Headers**: Exactly one `<h1>` per page. Ensure subsequent headers (`<h2>`, `<h3>`) form a logical nested structure.
*   **Metadata**: Define static metadata for public pages using Next.js Metadata API.
*   **Indexability**: Use `robots` tag config to block indexation of `/admin`, `/report/[token]`, and internal `/api` endpoints.

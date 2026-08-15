# Accessibility (WCAG 2.2 AA) Compliance Checklist

## 1. Core Standards
All components and page layouts in this platform will target a score of **95+ (ideally 100)** on the Lighthouse Accessibility audit.

---

## 2. Interactive Components and Semantics
*   **Semantic Layout Elements**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` tags appropriately.
*   **Click Targets**:
    *   Any element that triggers a navigation change must be a semantic `<a>` link.
    *   Any element that triggers a state/modal action must be a semantic `<button>`.
    *   *Divs and Spans will never be used as clickable controls.*
*   **Touch Targets**: Minimum target size for mobile elements must be `44px x 44px`.

---

## 3. Keyboard Navigation and Focus Management
*   **Tab Order**: Navigation must be logical, starting from top-left to bottom-right.
*   **Focus Ring Visible**: The default browser focus outlines must never be overridden with `outline: none` unless customized with visible, high-contrast rings (e.g. `focus-visible:ring-2 focus-visible:ring-emerald-600`).
*   **Form Stepper Keyboard Support**: Interactive inputs (radios, check list cards in diagnostic tool) must accept `Space` or `Enter` to select, and `Tab` keys to move forward.
*   **Skip Link**: A "Skip to main content" link must be present at the top of the header for screen-reader/keyboard-only users.

---

## 4. Screen Readers & Forms
*   **Form Field Association**: All `<input>`, `<select>`, and `<textarea>` components must be associated with a visible `<label>` using the `htmlFor` attribute.
*   **Interactive Error Messages**: Invalid forms must update the field container with `aria-invalid="true"` and target descriptive error texts using `aria-describedby`.
*   **Image Alts**: Explicit descriptive alt attributes must be defined for all illustrative images. Decorative SVGs must be hidden using `aria-hidden="true"`.

# Search Engine Optimization (SEO) Specification

## 1. Page Metadata Mapping
Every public marketing page must declare unique head tags via Next.js metadata.

| Route | Title | Description | Indexing |
| :--- | :--- | :--- | :--- |
| `/` | Karvao India \| Digital Growth Partner for Businesses | Build better. Grow smarter. Scale with simple systems. | `index, follow` |
| `/solutions` | Digital Solutions for Scale \| Karvao India | Modern website development, CRM, analytics, and marketing automations. | `index, follow` |
| `/industries` | Industry Specific Business Scale Systems \| Karvao India | Growth systems customized for retail, clinic/healthcare, real estate, and education. | `index, follow` |
| `/business-score` | Business Growth Score Diagnostic \| Karvao India | Take a 2-minute diagnostic assessment to find your biggest digital opportunities. | `index, follow` |
| `/report/[token]` | Business Growth Score Report \| Karvao India | Custom digital diagnostic insights and recommendations. | `noindex, nofollow` |
| `/admin/*` | Admin Dashboard \| Karvao India | Lead & Quotation tracking system. | `noindex, nofollow` |

---

## 2. Structured Data (Schema.org JSON-LD)
We will embed valid structured data schemas:
*   **Organization Schema**: Homepage organization details (Name, URL, Brand Logo, Social Channels).
*   **WebSite Schema**: Search query links.
*   **Service Schema**: Solutions details pages.

---

## 3. Indexation Controls & Assets
*   **Sitemap**: Dynamic generation at `/sitemap.xml` mapping public routes.
*   **Robots File**: `/robots.txt` configuration:
    ```txt
    User-agent: *
    Allow: /
    Disallow: /admin/
    Disallow: /api/
    Disallow: /report/
    
    Sitemap: https://karvao.in/sitemap.xml
    ```
*   **Canonical URLs**: Each page must self-reference its absolute canonical URL path to prevent duplicate content flags.

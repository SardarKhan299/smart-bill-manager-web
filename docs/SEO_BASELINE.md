# Smart Bill Manager Web — SEO Baseline & Architecture Summary

- **Date:** 2026-11-27
- **Production Origin:** `https://smart-bill-manager-web.sardar-khan299.workers.dev`
- **Repository:** `https://github.com/SardarKhan299/smart-bill-manager-web`

## 1. Technical Stack & Rendering Architecture

- **Framework:** Next.js `15.5.26` (App Router, React `19.1.0`, TypeScript `5.8`).
- **Rendering Strategy:** Full static export (`next build` → `out/`), zero server runtime latency, fast TTFB/LCP on Cloudflare Workers static assets.
  - **Content, problem-solution, legal, support, App Link, and blog pages (46 routes):** Pre-rendered static Server Components with crawlable HTML headings, body copy, internal `<Link>` anchors, and JSON-LD.
  - **Interactive calculator pages (4 routes under `/tools/*/`):** Pre-rendered static HTML shell (H1, formula explanation, steps, FAQs, JSON-LD, related links, and CTAs in initial HTML) hydrated client-side for instant zero-network math.
- **International SEO (`scripts/localize-site.mjs`):** Supports reciprocal `hreflang` + `x-default` generation across 15 focused locales (`en-GB`, `en-US`, `en-AU`, `en-CA`, `nl-NL`, `de-DE`, `fr-FR`, `fr-CA`, `es-ES`, `it-IT`, `pt-PT`, `ar`, `ur-PK`, `hi-IN`, `zh-CN`) when `GOOGLE_TRANSLATE_API_KEY` is present in CI.
- **Android Deep Linking:** Verified Digital Asset Links at `/.well-known/assetlinks.json` (served with `Content-Type: application/json` via `public/_headers`) + `intent://...#Intent;scheme=smartbillmanager;package=com.smartbillmanager;S.browser_fallback_url=...;end` CTAs with Google Play Install Referrer campaign attribution.

## 2. Before vs. After SEO & Conversion Summary

| Area | Baseline State (Before) | Current State (After Phases 1–10) |
|---|---|---|
| **Public Canonical Routes** | 37 English routes (missing pain-point pages, App Link routes, and subscription calculator) | **49 canonical indexable English routes** (`50` audited HTML files with `/_not-found`), all preserved with zero broken URLs |
| **Trust & YMYL Pages** | `/privacy/` contained `"This is a website draft"` notice; `/support/` contained `"Replace this placeholder"` text | Production-verified `/privacy/` and `/support/` (`sardarkhan.dev@gmail.com`) + automated CI test blocking placeholder phrases |
| **Problem-Solution Pages** | Generic feature descriptions only | **6 targeted problem-solution landing pages** (`/offline-budget-app/`, `/offline-receipt-scanner/`, `/warranty-tracker/`, `/bill-reminder-app/`, `/daily-cash-tracker/`, `/debt-tracker/`) |
| **Free Web Calculators** | 3 basic calculators with no reset/remove, no `aria-live`, no `Offer` JSON-LD, no unit tests, and plain `/download/` button | **4 upgraded calculators** (added `/tools/subscription-cost-calculator/`), shared `calculator-math.mjs`, `WebApplication` free `Offer` JSON-LD, reset/remove controls, `aria-live="polite"`, and deep-link + Play CTAs |
| **Structured Data** | `SoftwareApplication` lacked `offers`; calculators lacked `WebApplication` & `FAQPage` | Verified `Organization`, `WebSite`, `SoftwareApplication` (`price: "0"`), `WebApplication` (`price: "0"`), `BlogPosting` (`dateModified`), `FAQPage`, and `BreadcrumbList` — zero fabricated ratings |
| **Internal Linking & Blog CTAs** | 14 blog articles & legacy feature pages linked only to `/download/` without deep links | All **50 indexable pages** include Play Store attribution links; all feature pages, tools, hubs, and **14 blog articles** include `.actions` (`OpenInAppCta` + `PlayCta`) and topic cross-links |
| **AI Search Discoverability** | No `/llms.txt` or verified product knowledge reference | Canonical `/llms.txt`, `docs/PRODUCT_KNOWLEDGE.md`, `docs/PRODUCT_DATA_AND_PRIVACY_FACTS.md`, and `docs/AI_SEARCH_TEST_QUERIES.md` |
| **Accessibility & Attribution** | No skip link, no `prefers-reduced-motion`, unattributed Play Store links | Skip-to-main-content link, `:focus-visible` outlines, `prefers-reduced-motion`, and privacy-safe Google Play Install Referrer (`utm_source=website&utm_medium=seo&utm_campaign=...`) |
| **Automated Verification** | Basic SEO audit only | `seo-audit.mjs` (**50 HTML pages**) + `node --test` suite covering HTML/SEO invariants, calculator edge-case math, and Phase 7 Problem Intelligence scoring |

## 3. Exact Build, Audit, Test & Deployment Commands

```bash
# 1. Install dependencies
npm install --no-audit --no-fund

# 2. Build static site into out/
npm run build:site

# 3. Run technical SEO audit across all exported HTML pages, robots.txt, and sitemap.xml
npm run seo:audit

# 4. Regenerate ground-truth route inventory CSV (docs/SEO_ROUTE_INVENTORY.csv)
npm run seo:inventory

# 5. Regenerate Phase 7 User Problem Intelligence Dashboard (docs/PROBLEM_INTELLIGENCE_DASHBOARD.md)
npm run seo:intelligence

# 6. Run full automated unit & HTML verification test suite
npm test

# 7. Deploy (pushing to master triggers GitHub Actions build + Cloudflare Workers deployment)
git push origin master
```

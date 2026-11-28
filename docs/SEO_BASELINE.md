# Smart Bill Manager Web — SEO Baseline & Architecture Summary

- **Date:** 2026-11-28
- **Production Origin:** `https://smart-bill-manager-web.sardar-khan299.workers.dev`
- **Repository:** `https://github.com/SardarKhan299/smart-bill-manager-web`

## 1. Technical Stack & Rendering Architecture

- **Framework:** Next.js `15.5.26` (App Router, React `19.1.0`, TypeScript `5.8`).
- **Rendering Strategy:** Full static export (`next build` → `out/`), zero server runtime latency, fast TTFB/LCP on Cloudflare Workers static assets.
  - **Content, problem-solution, comparison, legal, support, App Link, and blog pages (50 routes):** Pre-rendered static Server Components with crawlable HTML headings, body copy, internal `<Link>` anchors, and JSON-LD.
  - **Interactive calculator pages (9 routes under `/tools/*/`):** Pre-rendered static HTML shell (H1, formula explanation, steps, FAQs, JSON-LD, related links, and CTAs in initial HTML) hydrated client-side for instant zero-network math.
- **International SEO (`scripts/localize-site.mjs`):** Supports reciprocal `hreflang` + `x-default` generation across 15 focused locales (`en-GB`, `en-US`, `en-AU`, `en-CA`, `nl-NL`, `de-DE`, `fr-FR`, `fr-CA`, `es-ES`, `it-IT`, `pt-PT`, `ar`, `ur-PK`, `hi-IN`, `zh-CN`) when `GOOGLE_TRANSLATE_API_KEY` is present in CI.
- **Android Deep Linking & Deferred Install Attribution:** Verified Digital Asset Links at `/.well-known/assetlinks.json` (served with `Content-Type: application/json` via `public/_headers`), `intent://...#Intent;scheme=smartbillmanager;package=com.smartbillmanager;S.browser_fallback_url=...;end` CTAs with Google Play Install Referrer (`utm_source`, `utm_medium`, `utm_campaign`, `deep_link_route`), and desktop-to-phone vector QR bridge (`public/play-qr.svg`).

## 2. Before vs. After SEO & Conversion Summary

| Area | Baseline State (Before) | Current State (After Phases 1–10 + Track A/B) |
|---|---|---|
| **Public Canonical Routes** | 37 English routes (missing pain-point pages, App Link routes, comparisons, and 6 calculators) | **59 canonical indexable English routes** (`60` audited HTML files with `/_not-found`), all preserved with zero broken URLs |
| **Trust & YMYL Pages** | `/privacy/` contained `"This is a website draft"` notice; `/support/` contained `"Replace this placeholder"` text | Production-verified `/privacy/` and `/support/` (`sardarkhan.dev@gmail.com`) + automated CI test blocking placeholder phrases |
| **Problem-Solution & Comparison Pages** | Generic feature descriptions only | **6 targeted problem-solution landing pages** + **4 App vs. Spreadsheet comparison pages** under `/compare/*/` |
| **Free Web Calculators** | 3 basic calculators with no reset/remove, no `aria-live`, no `Offer` JSON-LD, no unit tests, and plain `/download/` button | **9 calculators** (Bill, Budget, Safe-to-Spend, Subscription Cost, Debt Payoff, Bill Split, Savings Goal, 30-Day Cash-Flow, Monthly Expense), shared `calculator-math.mjs`, `WebApplication` free `Offer` JSON-LD, reset/remove controls, `aria-live="polite"`, and deferred deep-link CTAs |
| **Structured Data** | `SoftwareApplication` lacked `offers`; calculators lacked `WebApplication` & `FAQPage` | Verified `Organization`, `WebSite`, `SoftwareApplication` (`price: "0"`), `WebApplication` (`price: "0"`), `BlogPosting` (`dateModified`), `FAQPage`, and `BreadcrumbList` — zero fabricated ratings |
| **Internal Linking & Blog CTAs** | 14 blog articles & legacy feature pages linked only to `/download/` without deep links | All **60 audited HTML pages** include Play Store attribution links; all feature pages, tools, comparisons, hubs, and **15 blog articles** (including offline CSV import guide) include `.actions` (`OpenInAppCta` + `PlayCta`) and topic cross-links |
| **AI Search & Desktop Conversion** | No `/llms.txt`, no desktop QR install bridge | Canonical `/llms.txt`, `docs/PRODUCT_KNOWLEDGE.md`, `docs/PRODUCT_DATA_AND_PRIVACY_FACTS.md`, `docs/AI_SEARCH_TEST_QUERIES.md`, and zero-JS desktop QR bridge (`/play-qr.svg`) |
| **Accessibility & Attribution** | No skip link, no `prefers-reduced-motion`, unattributed Play Store links | Skip-to-main-content link, `:focus-visible` outlines, `prefers-reduced-motion`, and privacy-safe Google Play Install Referrer (`utm_source=website&utm_medium=seo&utm_campaign=...&deep_link_route=...`) |
| **Automated Verification** | Basic SEO audit only | `seo-audit.mjs` (**60 HTML pages**) + `node --test` suite (**27 tests**) covering HTML/SEO invariants, calculator edge-case math, and Phase 7 Problem Intelligence scoring |

## 3. AI Search & Crawler Access Policy (Phase 6, Section 8.3)

- **Deliberate Crawler Policy (`public/robots.txt`):** `User-agent: *` with `Allow: /` and `Sitemap: https://smart-bill-manager-web.sardar-khan299.workers.dev/sitemap.xml`.
- **Permitted Search & Answer-Engine Crawlers:** Googlebot, Bingbot, `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Applebot`, and `Google-Extended` are **deliberately allowed** on all public canonical pages so answer engines and browser agents can read verified product capabilities, calculators, and guides.
- **Boundary Protection:** No private, user-authenticated, or financial-record endpoints exist on the static web origin (`smart-bill-manager-web.sardar-khan299.workers.dev`). All calculator inputs remain in client memory only.
- **Canonical Machine Index:** `/llms.txt` lists only verified, public canonical URLs and mirrors `docs/PRODUCT_KNOWLEDGE.md`.

## 4. Measured Lighthouse Lab Scores & Live Production Smoke Test (2026-11-27)

### 4.1 Live Production Smoke Test (`npm run seo:production`)
- **Origin:** `https://smart-bill-manager-web.sardar-khan299.workers.dev`
- **Verified Endpoints:** `/robots.txt` (`200`), `/sitemap.xml` (`200`), `/app-ads.txt` (`200`), `/llms.txt` (`200`), plus all **49** canonical HTML routes (`49 passed`, `0 failures`, `0 warnings`; `canonical === og:url === finalUrl` on every route).

### 4.2 Headless Chrome Lighthouse Results (Lab Data — Not CrUX Field Data)
> *Note (Section 11 & 14): The figures below are controlled Lighthouse lab measurements against the live Cloudflare Workers deployment, not Chrome UX Report (CrUX) 75th-percentile real-user field data.*

| Live Production URL & Form Factor | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` — Mobile | **100** | **100** | **100** | **100** | 1.2 s | 1.2 s | 0 ms | 0 |
| `/` — Desktop | **100** | **100** | **100** | **100** | 0.3 s | 0.3 s | 0 ms | 0 |
| `/offline-budget-app/` — Mobile | **100** | **100** | **100** | **100** | 0.8 s | 0.8 s | 20 ms | 0 |
| `/tools/subscription-cost-calculator/` — Mobile | **100** | **100** | **96** | **100** | 0.8 s | 0.8 s | 0 ms | 0 |

## 5. Exact Build, Audit, Test & Deployment Commands

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

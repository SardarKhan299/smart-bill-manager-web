# Smart Bill Manager Web — SEO, Trust & UX Issues Log

Each issue below documents what was wrong, the repository/live evidence, what was changed, how it was tested, and its current status.

---

### Issue 1 — Production Draft & Placeholder Text on `/privacy/` and `/support/` (Critical YMYL Blocker)
- **What was wrong:** Live `/privacy/` displayed a draft disclaimer (`"This is a website draft..."`) and `/support/` displayed `"Replace this placeholder..."` without a working developer contact email.
- **Evidence:** Inspected `app/privacy/page.tsx` and `app/support/page.tsx` prior to commit `2c96ba0`.
- **What was changed:** Replaced `/privacy/` with factual Android app vs. website disclosures verified against `privacy-policy.html` and Android source (`sardarkhan.dev@gmail.com`, Room SQLite, ML Kit on-device OCR, Play Billing, RevenueCat, AdMob, Firebase); replaced `/support/` with direct `mailto:sardarkhan.dev@gmail.com` support and self-service troubleshooting.
- **How tested:** Automated test in `scripts/verify-pages.test.mjs` scans all exported HTML files for forbidden placeholder phrases (`"this is a website draft"`, `"replace this placeholder"`, `"lorem ipsum"`, `"todo:"`).
- **Status:** **Resolved.**

### Issue 2 — Missing High-Intent Problem-Solution Pages & Verified Android App Link Fallbacks
- **What was wrong:** Users searching for specific pain points (`offline budget app`, `offline receipt scanner`, `warranty tracker`, `bill reminder app`, `daily cash tracker`, `personal debt tracker`) had no dedicated landing pages or web-to-app deep-link fallbacks.
- **Evidence:** Route audit of `app/` and Android `MainActivity.parseDeepLinkIntent`.
- **What was changed:** Added 6 problem-solution pages (`/offline-budget-app/`, `/offline-receipt-scanner/`, `/warranty-tracker/`, `/bill-reminder-app/`, `/daily-cash-tracker/`, `/debt-tracker/`), 6 App Link fallback pages (`/scan/`, `/bills/`, `/warranties/`, `/cash-log/`, `/analytics/`, `/pro/`), `public/.well-known/assetlinks.json`, and `public/_headers`.
- **How tested:** Verified in `scripts/verify-pages.test.mjs` (SHA-256 fingerprints, `_headers`, `intent://` deep links, `FAQPage` JSON-LD, and `sitemap.xml` coverage).
- **Status:** **Resolved.**

### Issue 3 — Missing Free `Offer` Schema on `SoftwareApplication` and Calculator Pages
- **What was wrong:** `app/site-jsonld.tsx` omitted `offers` on `SoftwareApplication`, and `app/calculator-jsonld.tsx` only output `WebPage` + `BreadcrumbList` without `WebApplication` free-offer metadata.
- **Evidence:** Inspected `app/site-jsonld.tsx` and `app/calculator-jsonld.tsx`.
- **What was changed:** Added verified free `Offer` (`price: "0"`, `priceCurrency: "USD"`) to `SoftwareApplication` and added `WebApplication` with free `Offer` to `CalculatorJsonLd` (zero fabricated ratings or reviews).
- **How tested:** Verified across all 4 calculator HTML outputs in `scripts/verify-pages.test.mjs`.
- **Status:** **Resolved.**

### Issue 4 — Calculator UX, Accessibility, Test Coverage & Missing Subscription Cost Calculator (Phase 5)
- **What was wrong:** The 3 existing calculators lacked reset/remove controls, `aria-live` result announcements, unique Open Graph/Twitter metadata, `OpenInAppCta` deep links, and automated math unit tests; no annualized subscription calculator existed.
- **Evidence:** Inspected `app/tools/*/page.tsx` and `app/tools/*/layout.tsx`.
- **What was changed:** Extracted deterministic math into `app/tools/calculator-math.mjs`, upgraded all 3 calculators, built `/tools/subscription-cost-calculator/` matching `SubscriptionTrackerEngine.kt`, updated `/tools/`, `sitemap.xml`, and `llms.txt`, and added `scripts/calculator-math.test.mjs`.
- **How tested:** `node --test scripts/calculator-math.test.mjs scripts/verify-pages.test.mjs` (zero, negative, decimal/rounding, large numbers, blank inputs, reset equivalence, `inputMode="decimal"`, `aria-live="polite"`).
- **Status:** **Resolved.**

### Issue 5 — Legacy Feature Pages & 14 Blog Articles Missing Deep-Link CTAs, OG Metadata & Attribution (Phases 2, 4, 8, 9 & 10)
- **What was wrong:** Legacy feature pages (`features`, `how-it-works`, `pricing`, `compare`, `budget-planner`, `cash-flow-forecast`, `expense-tracker`, `recurring-expense-tracker`, `safe-to-spend`) and all 14 `/blog/*/` articles lacked `.actions` (`OpenInAppCta` + `PlayCta`), page-level OG/Twitter overrides (on feature pages), duplicate `.related` links existed on `cash-flow-forecast` and `receipt-manager`, outbound Google Play links lacked Install Referrer campaign attribution, and global CSS lacked skip-link / `prefers-reduced-motion` rules.
- **Evidence:** Audited `app/*/page.tsx`, `app/blog/*/page.tsx`, `app/conversion-cta.tsx`, `app/layout.tsx`, and `app/globals.css`.
- **What was changed:** Added `buildPlayStoreUrl` (`utm_source=website&utm_medium=seo&utm_campaign=<placement>`) to `PlayCta` and `OpenInAppCta` fallbacks; created `BlogArticleCta` and added it + cross-links + `keywords` + `dateModified` to all 14 blog articles; upgraded all 13 legacy product/feature pages with OG/Twitter metadata and `.actions` CTAs; added `.skip-link`, `:focus-visible`, and `prefers-reduced-motion` in `layout.tsx` / `globals.css`.
- **How tested:** `npm run build:site`, `npm run seo:audit`, and expanded `scripts/verify-pages.test.mjs`.
- **Status:** **Resolved.**

### Issue 6 — Search Console Live Indexing & Query Export (Owner Action)
- **What needs owner action:** Google Search Console property access resides in the owner's Google account.
- **Next step for owner:** Re-submit `https://smart-bill-manager-web.sardar-khan299.workers.dev/sitemap.xml` in Google Search Console, and optionally feed exported GSC query CSVs into `npm run seo:intelligence -- --gsc-csv <path>`.
- **Status:** **Ready for owner action (non-blocking).**

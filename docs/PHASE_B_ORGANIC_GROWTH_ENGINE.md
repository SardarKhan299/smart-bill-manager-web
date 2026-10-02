# Smart Bill Manager — Phase B Organic Growth Engine

## Scope

Phase B builds the organic acquisition layer for the Smart Bill Manager website:

1. B1 — Search Console baseline
2. B2 — Keyword/topic map
3. B3 — Strong commercial landing pages
4. B4 — Comparison content
5. B5 — Free financial calculators/tools
6. B6 — Content clusters
7. B7 — Internal linking
8. B8 — Image/Discover optimization
9. B9 — International SEO
10. B10 — Search performance monitoring
11. B11 — Conversion optimization
12. B12 — Continuous content iteration

Production site: https://smart-bill-manager-web.sardar-khan299.workers.dev/

## Current baseline

The site currently contains:
- Core product pages: home, how-it-works, features, pricing, download, privacy, support.
- Commercial SEO pages: bill tracker, subscription tracker, expense tracker, budget planner, safe-to-spend, cash-flow forecast, receipt manager, recurring expense tracker.
- Blog hub plus six guides.
- FAQ and comparison pages.
- Robots.txt and sitemap.xml.
- Open Graph/social image metadata and JSON-LD.
- Automated build + SEO audit in GitHub Actions.

## B1 — Search Console baseline

Status: WAITING FOR PROPERTY ACCESS / AUTHENTICATION.

Do not invent baseline traffic, impressions, queries, CTR, positions, countries, or indexed-page counts.

Once Search Console access is available, record:
- Property URL
- Baseline date
- Total clicks
- Total impressions
- CTR
- Average position
- Indexed pages / excluded pages
- Top queries
- Top pages
- Top countries
- Mobile vs desktop
- Search appearance
- Any indexing/security/manual-action issues
- Sitemap status

Recommended comparison windows:
- Last 28 days
- Previous 28 days
- Last 3 months
- Query/page/country breakdowns

Google Search Console's Performance report supports clicks, impressions, CTR, average position, and dimensions including queries, pages, countries and devices. Use the report as the source of truth instead of manually estimating SEO performance.

## B2 — Keyword / topic map

No search-volume numbers are claimed here. Topics are grouped by user intent and mapped to pages that can actually satisfy that intent.

### Cluster 1 — Bill tracking

Primary commercial page:
- /bill-tracker/

Core topics:
- bill tracker
- bill tracking app
- bill reminder app
- monthly bill tracker
- household bill tracker
- recurring bill tracker
- bill due date tracker
- track monthly bills

Supporting content:
- /blog/how-to-track-monthly-bills/
- /tools/bill-calculator/ (B5)
- future household bill checklist guide

Intent:
Commercial / problem-solving

### Cluster 2 — Subscription tracking

Primary commercial page:
- /subscription-tracker/

Core topics:
- subscription tracker
- subscription manager
- subscription tracking app
- recurring subscription tracker
- track subscriptions
- subscription cost tracker
- annual subscription cost
- subscription price increase

Supporting content:
- /blog/how-to-track-subscriptions/
- /tools/subscription-cost-calculator/ (B5)
- future subscription audit guide

Intent:
Commercial / problem-solving

### Cluster 3 — Expense tracking

Primary commercial page:
- /expense-tracker/

Core topics:
- expense tracker
- expense tracking app
- household expense tracker
- daily expense tracker
- personal expense tracker
- family expense tracker
- track everyday spending

Supporting content:
- /tools/monthly-expense-calculator/ (B5)
- /blog/household-budget-guide/

Intent:
Commercial / problem-solving

### Cluster 4 — Household budgeting

Primary commercial page:
- /budget-planner/

Core topics:
- household budget planner
- household budget app
- monthly budget planner
- family budget planner
- budget tracker
- personal budget planner
- monthly budget calculator

Supporting content:
- /blog/household-budget-guide/
- /tools/budget-calculator/ (B5)

Intent:
Commercial / planning

### Cluster 5 — Safe-to-Spend

Primary commercial page:
- /safe-to-spend/

Core topics:
- safe to spend calculator
- how much can I safely spend
- money left after bills
- available spending calculator
- spending after bills
- bank balance vs available money
- safe spending amount

Supporting content:
- /blog/safe-to-spend-vs-bank-balance/
- /tools/safe-to-spend-calculator/ (B5)

Intent:
Problem-solving / high product relevance

### Cluster 6 — Cash flow

Primary commercial page:
- /cash-flow-forecast/

Core topics:
- cash flow forecast personal
- personal cash flow forecast
- household cash flow
- monthly cash flow planner
- cash flow planning app
- household financial forecast

Supporting content:
- /tools/cash-flow-calculator/ (B5)
- future cash-flow planning guide

Intent:
Planning / commercial

### Cluster 7 — Recurring expenses

Primary commercial page:
- /recurring-expense-tracker/

Core topics:
- recurring expense tracker
- recurring expenses
- find recurring expenses
- recurring payment tracker
- track recurring expenses
- recurring spending tracker

Supporting content:
- /blog/recurring-expense-guide/

Intent:
Problem-solving / commercial

### Cluster 8 — Receipts and warranties

Primary commercial page:
- /receipt-manager/

Core topics:
- receipt organizer
- receipt manager app
- receipt tracker
- warranty tracker
- warranty organizer
- digital receipt organizer
- receipt and warranty tracker

Supporting content:
- /blog/receipt-and-warranty-guide/

Intent:
Commercial / utility

### Cluster 9 — Generic household finance

Primary product page:
- /

Core topics:
- household finance app
- household money management
- family finance app
- personal finance organizer
- household expense management

Supporting content:
- /how-it-works/
- /features/
- /faq/
- blog cluster

Intent:
Commercial / product discovery

## B3 — Commercial landing-page standard

Every primary commercial page should eventually contain:

1. Clear search-intent H1.
2. One-sentence answer to the user's problem.
3. What the tool/app does.
4. Concrete feature list.
5. How it works.
6. Example/use case.
7. Privacy/local-first explanation where relevant.
8. FAQ relevant to that page.
9. Links to supporting guides.
10. Strong but accurate Google Play CTA.
11. Links to the next relevant calculator/tool once B5 exists.

Do not create near-duplicate pages only by changing a keyword.

## B4 — Comparison content

Existing:
- /compare/

Planned factual comparison pages:
- /compare/bill-tracker-vs-spreadsheet/
- /compare/budget-app-vs-spreadsheet/
- /compare/subscription-tracker-vs-spreadsheet/
- /compare/expense-tracker-vs-spreadsheet/

Comparison pages must describe differences accurately and avoid unsupported competitor claims.

## B5 — Free financial tools

Planned tools:
- /tools/bill-calculator/
- /tools/budget-calculator/
- /tools/safe-to-spend-calculator/
- /tools/subscription-cost-calculator/
- /tools/monthly-expense-calculator/
- /tools/savings-goal-calculator/
- /tools/debt-payoff-calculator/
- /tools/cash-flow-calculator/

Requirements:
- Client-side calculation for simple tools.
- No account required.
- No financial data sent to a server.
- Transparent formulas.
- Mobile-first UI.
- Accessible labels and keyboard support.
- Useful explanatory copy.
- Clear disclaimer where a result is only a planning estimate.
- CTA to the relevant Smart Bill Manager feature/app.
- Include calculator pages in sitemap after implementation.

## B6 — Content clusters

Status: IMPLEMENTED — initial cluster expansion completed.

Each commercial page is now treated as the hub of a small topic cluster.

Implemented supporting guides:
- Bill tracking: /blog/how-to-track-monthly-bills/ + /blog/household-bill-checklist/
- Subscription tracking: /blog/how-to-track-subscriptions/ + /blog/subscription-audit-guide/
- Expense tracking: /blog/monthly-expense-categories/ + /blog/household-budget-guide/
- Household budgeting: /blog/household-budget-guide/ + /blog/budget-vs-expense-tracker/
- Safe-to-Spend: /blog/safe-to-spend-vs-bank-balance/ + /blog/how-safe-to-spend-is-calculated/
- Cash flow: /blog/household-cash-flow-planning/ + /cash-flow-forecast/
- Recurring expenses: /blog/recurring-expense-guide/ + /blog/recurring-expense-audit/
- Receipts & warranties: /blog/receipt-and-warranty-guide/ + /blog/receipt-retention-warranty-guide/

Internal linking now connects the main commercial hubs to their supporting guides, and supporting guides connect back to the relevant hub, related tools where available, related hubs and the app download path.

Cluster rule:
Hub -> guide -> tool where available -> related hub -> app download.

Avoid publishing large numbers of thin AI-generated articles. Every article should answer a distinct user question and provide useful original explanation or a practical tool.

## B7 — Internal linking

Use descriptive anchors and contextual links.

Minimum intended pattern:
- Homepage -> primary commercial pages
- Commercial page -> relevant guides
- Guide -> commercial page
- Guide -> relevant calculator
- Calculator -> commercial page
- Blog hub -> all guides
- FAQ -> relevant commercial pages
- Comparison -> relevant product/commercial pages

Avoid excessive repeated footer-style keyword links.

## B8 — Image / Discover optimization

Status: IMPLEMENTED — article imagery, preferred-image metadata, image sitemap signals and automated checks are now in place.

Implemented:
- Added eight reusable 1600×900 topic illustrations under `/images/discover/` for bill tracking, subscriptions, household budgeting, expense tracking, Safe-to-Spend, cash flow, recurring expenses, and receipts/warranties.
- Added relevant article hero images with descriptive alt text to the 14 supporting guides.
- Added page-specific `og:image` and Twitter large-image metadata for each article instead of using the generic site social image.
- Extended BlogPosting JSON-LD with the article image and `primaryImageOfPage`.
- Kept `max-image-preview:large` enabled globally so large previews are permitted.
- Added image sitemap entries to the existing XML sitemap.
- Added automated SEO-audit checks for article imagery, alt text, preferred image metadata and article `og:image`.
- Kept images crawlable through normal `<img src>` markup and the sitemap.

Google's current Discover guidance recommends relevant, high-quality images at least 1200 px wide, with more than 300,000 total pixels, and notes that `max-image-preview:large` plus `og:image` or schema.org markup can influence the image selected for Discover. Google also recommends avoiding generic or text-heavy images as the preferred Discover image. This implementation uses 1600×900 topic illustrations rather than the generic logo/social image. Discover placement is not guaranteed.

Operational rule:
- Use a representative article image, not the site logo, as the preferred image for editorial content.
- Keep alt text concise and contextual.
- Prefer 16:9 landscape source artwork for Discover candidates.
- Keep image URLs stable and crawlable.
- Add future article images to both the page metadata/structured data and sitemap when appropriate.
- Do not fabricate Discover traffic or Search Console image metrics; measure them after indexing.

## B9 — International SEO

Status: IMPLEMENTED — focused multilingual/localized SEO generation is now wired into the static build.

Implemented:
- Added a focused 15-locale SEO set aligned with the web growth plan:
  - English regional targets: en-GB, en-US, en-AU, en-CA
  - Dutch: nl-NL
  - German: de-DE
  - French: fr-FR, fr-CA
  - Spanish: es-ES
  - Italian: it-IT
  - Portuguese: pt-PT
  - Arabic: ar
  - Urdu/Pakistan: ur-PK
  - Hindi/India: hi-IN
  - Simplified Chinese/China: zh-CN
- Non-English variants are generated under locale subdirectories such as `/nl-NL/`, `/de-DE/`, and `/ur-PK/`.
- English regional variants reuse the existing English page when the content is identical rather than creating unnecessary duplicate copies.
- Added reciprocal `hreflang` annotations to the HTML head of the canonical and localized pages.
- Added reciprocal `hreflang` entries to the XML sitemap using the XHTML sitemap extension.
- Added `x-default` pointing to the canonical English page.
- Localized pages now use their actual locale in the HTML `lang` attribute and correct RTL direction for Arabic and Urdu.
- Localized internal links stay inside the same locale path.
- Localized canonical URLs and Open Graph URLs point to the localized page.
- Preserved the B8 image-sitemap entries when the localization build rewrites the sitemap.
- SEO audit now checks the international `hreflang` set and sitemap coverage.

Build dependency:
- The existing Google Cloud Translation API key remains a build-time secret. If it is unavailable, the normal English static build remains valid and localized pages are not generated.
- Translations should be reviewed before treating a locale as fully localized marketing content; the current pipeline is machine translation for scalable first-pass coverage.

Google's current guidance says each language/region version should reference itself and its alternatives, alternate URLs should be fully qualified, and `x-default` can be used as a fallback. Google supports HTML or sitemap annotations; this implementation uses both because the generated HTML and sitemap are already part of the site's static build pipeline. citeturn0search0turn0search5

Quality rule:
- Do not add locale pages merely to create more indexed URLs.
- Localized pages must translate the main content, not only navigation.
- Keep country-specific wording/pricing/currency only when the product actually supports a meaningful regional variation.
- Measure each locale in Search Console before expanding the translation set.
## B10 — Search performance monitoring

Status: IMPLEMENTED — repeatable Search Console monitoring and offline report generation are now in place.

Implemented:
- Documented weekly and monthly Search Console review cadence.
- Defined current-vs-previous period KPIs: clicks, impressions, CTR and average position.
- Added monitoring for queries, landing pages, countries and devices.
- Added high-impression / low-CTR opportunity analysis with human review required before changing titles/descriptions/content.
- Added declining-page and new-query investigation rules.
- Added international locale/country monitoring aligned with B9.
- Added B8 Discover/multimodal monitoring guidance.
- Added scripts/search-performance-report.mjs for offline CSV analysis.
- Added npm run seo:performance.
- Documented Search Console aggregation, anonymization, export and preliminary-data limitations.
- Intentionally did not invent a live baseline or add a credential-dependent API integration.

Operational source of truth: Google Search Console. The local report is an analysis aid for exported data, not a replacement for Search Console.

## B11 — Conversion optimization

Status: IMPLEMENTED — the organic acquisition funnel now has reusable app CTAs, clearer value-to-CTA paths, trust context, conversion-ready placement attributes and an experiment/measurement framework.

Implemented:
- Added reusable \`app/conversion-cta.tsx\` for Google Play and download-page CTAs.
- Added above-the-fold Google Play CTA and trust context to the homepage.
- Added secondary conversion path around Safe-to-Spend.
- Added final homepage Google Play CTA.
- Reworked the download page around value → trust → Google Play CTA.
- Added conversion placement attributes for future analytics without adding a tracking dependency.
- Added \`docs/CONVERSION_OPTIMIZATION.md\` with funnel, KPIs, experiment backlog and guardrails.
- Intentionally did not invent conversion metrics or add analytics without a privacy-approved provider.


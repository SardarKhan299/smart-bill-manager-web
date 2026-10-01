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

Maintain:
- Representative social image.
- Descriptive image alt text.
- Useful screenshots where they clarify the product.
- Correct dimensions and efficient formats.
- No decorative image used as the main content.

Discover is not guaranteed. Treat it as an additional acquisition channel, not a traffic forecast.

## B9 — International SEO

Initial localization candidates:
- en-GB
- en-US
- en-CA
- en-AU
- nl-NL
- de-DE
- fr-FR

Do not blindly translate every page first. Prioritize pages after Search Console/query evidence and validate translated content for natural language and local terminology.

## B10 — Search performance monitoring

Monthly baseline dashboard:
- clicks
- impressions
- CTR
- average position
- top non-branded queries
- top landing pages
- top countries
- indexed pages
- new queries
- declining pages
- high-impression / low-CTR opportunities
- calculator/tool performance once launched

Use before/after comparisons when changing titles, descriptions or content.

## B11 — Conversion optimization

Track the funnel:

Search impression
-> organic click
-> landing page
-> Google Play click
-> install
-> activation
-> recurring usage
-> Pro conversion

Website changes should be evaluated against conversion signals, not just page views.

## B12 — Continuous iteration

Every iteration should have:
- hypothesis
- target page
- change
- date
- reason
- Search Console baseline
- result window
- decision: keep / revise / revert

Do not claim an SEO improvement unless measured data supports it.

## Implementation order

1. B1 access + baseline
2. B2 keyword/topic map
3. B3 upgrade commercial landing pages
4. B5 build calculators
5. B6/B7 strengthen content clusters and internal links
6. B4 expand factual comparisons
7. B8 image/Discover work
8. B9 localization
9. B10/B11 measurement + conversion optimization
10. B12 ongoing iteration

## Quality gate

Before each Phase B release:
- npm run build
- npm run seo:audit
- sitemap contains all production pages
- canonical URLs use workers.dev
- no old smartbillmanager.com references
- exactly one H1 per page
- metadata matches page intent
- internal links resolve
- calculator formulas have unit tests or deterministic test cases
- no unsupported financial claims
- no fabricated SEO metrics
- mobile layout checked

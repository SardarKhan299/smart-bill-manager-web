# B11 — Conversion Optimization

Status: **IMPLEMENTED**

## Goal

Turn organic visitors and calculator/guide users into qualified Google Play visitors without adding intrusive tracking or making unsupported conversion claims.

## Conversion funnel

\`\`\`
Search / Discover
    ↓
SEO landing page / guide / calculator
    ↓
Relevant product explanation
    ↓
Trust + privacy context
    ↓
Clear app CTA
    ↓
Google Play listing
    ↓
Play Store install intent
    ↓
App activation
\`\`\`

The website is responsible for making the product value and next step clear. Google Play is the source of truth for current store-listing interaction and acquisition metrics.

## Implemented website changes

### 1. Reusable conversion CTA

Added:
- \`app/conversion-cta.tsx\`

It provides:
- Direct Google Play CTA.
- Download-page CTA.
- Consistent CTA styling.
- \`data-conversion\` and \`data-conversion-placement\` attributes for future analytics.
- No third-party tracking dependency.

Current placement identifiers include:
- \`homepage-hero\`
- \`homepage-safe-to-spend\`
- \`homepage-final\`
- \`download-primary\`

These identifiers allow future analytics to distinguish CTA placements without changing the visible copy.

### 2. Homepage conversion path

The homepage now has:
- Primary Google Play CTA above the fold.
- Secondary "See how it works" path.
- Privacy/local-first trust context near the hero CTA.
- Product-feature path into Safe-to-Spend.
- Secondary app CTA after the Safe-to-Spend explanation.
- Final Google Play CTA.
- Clear Android/Google Play context.

The CTA copy remains factual and does not claim a guaranteed financial outcome.

### 3. Download page

The download page now:
- Leads with the user outcome rather than only "Get the app".
- Shows the core workflow before the primary CTA.
- Places the Google Play CTA directly after the feature/value explanation.
- Explains local-first storage and third-party service caveats.
- Provides secondary links for users who need more information before installing.

### 4. Conversion-ready styling

Added:
- \`.conversion-trust\`
- \`.conversion-panel\`
- \`.cta-note\`

The design keeps the CTA visible without intrusive popups, forced redirects or interstitials.

## Measurement plan

### Website

When analytics is available, measure:
- CTA impressions
- CTA clicks
- CTA click-through rate
- CTA placement
- Landing page
- Country
- Device
- Calculator completion
- Calculator-to-download-page clicks
- Download-page-to-Google-Play clicks

Do not add analytics merely to create a metric. Respect the site's privacy positioning and document any provider before enabling it.

### Google Play

Use Play Console as the authoritative source for store-listing conversion.

Current Play Console reporting provides store-listing visitors, unique install clicks, CTR, acquisitions and dimensions such as traffic source, country/region, language, search term, UTM source/campaign and store listing. Google changed the primary store-listing interaction reporting in 2026 to focus on unique clicks rather than the legacy acquisition-focused metric. citeturn0search0turn0search4

Do not combine website clicks, Play listing clicks and installs as if they were the same event.

## Experiment backlog

Run one meaningful change at a time where possible.

### Experiment 1 — Hero CTA wording

Control:
- Download on Google Play

Candidate:
- Get Smart Bill Manager

Measure:
- CTA click-through
- Play listing unique install clicks
- downstream acquisition

### Experiment 2 — Hero value proposition

Control:
- Know what you owe. Know what you can safely spend.

Candidate:
- Stay ahead of bills, subscriptions and everyday spending.

Measure:
- CTA click-through and Play listing performance.

### Experiment 3 — Calculator bridge

For calculator pages, compare:
- CTA immediately after result
- CTA after result explanation + related product feature

Do not assume which placement performs better before measurement.

### Experiment 4 — Localized conversion

Use country/language-specific messaging where the product and store listing genuinely support the localization.

Google Play supports default graphics experiments and localized listing experiments. Current Play Console experiments can test text/graphics and use unique user install clicks, open clicks or pre-registration clicks as target metrics. citeturn0search1

## Conversion principles

1. One primary action per high-intent page.
2. Match CTA to user intent.
3. Explain value before asking for installation.
4. Reduce uncertainty with accurate privacy/product information.
5. Keep secondary paths for users who are not ready.
6. Do not use fake urgency, fake reviews or unsupported claims.
7. Do not add intrusive interstitials.
8. Do not optimize for clicks at the expense of useful content.
9. Record experiments and their measurement windows.
10. Make changes based on measured data, not assumptions.

Google's current page-experience guidance emphasizes good Core Web Vitals, mobile usability, secure delivery, avoiding intrusive interstitials and keeping the main content easy to distinguish. citeturn0search2

Google also emphasizes people-first content and notes that interactive functionality can be part of a page's main content. This supports keeping the calculators useful in their own right rather than turning them into thin acquisition pages. citeturn0search6

## KPI hierarchy

Primary:
1. Google Play unique install clicks
2. Store-listing CTR
3. Store listing acquisitions
4. App activation

Secondary:
- Website Play CTA CTR
- Download-page CTA CTR
- Calculator completion
- Organic landing-page conversion
- Country/language conversion

Guardrails:
- Search clicks
- Search impressions
- Core Web Vitals/page experience
- Bounce/engagement metrics if analytics is enabled
- Support issues
- App retention

Do not optimize only for website CTA clicks if Play listing clicks or downstream acquisition decline.

## B11 completion criteria

- [x] Clear website conversion funnel documented.
- [x] Reusable Google Play CTA implemented.
- [x] Homepage above-fold CTA improved.
- [x] Homepage secondary conversion paths added.
- [x] Download page redesigned around value → trust → CTA.
- [x] Conversion placement attributes added for future measurement.
- [x] Experiment backlog documented.
- [x] Google Play measurement definitions documented.
- [x] Privacy/intrusive-UX guardrails documented.
- [x] No fabricated conversion baseline.
- [ ] Live analytics integration — intentionally deferred until a privacy-approved analytics setup is selected.

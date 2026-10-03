# Smart Bill Manager Website

Next.js static-export marketing and SEO website for Smart Bill Manager.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static production site is generated in `out/`.

## Website growth features

The site includes a resources hub at `/blog/`, six evergreen household-finance guides, an FAQ hub at `/faq/`, and factual workflow comparisons at `/compare/`. These pages are included in the XML sitemap and linked from the global navigation/footer.

## Cloudflare deployment

This project is intentionally deployed as a **static site**, not as a Next.js Worker/OpenNext application.

Cloudflare deployment configuration:

- Build command: `npm run build`
- Build output: `out`
- Deploy command: `npx wrangler deploy`

The repository contains `wrangler.jsonc` configured to publish `./out` as Cloudflare static assets.

Google Search Console verification is served from `public/google7587fd459982fd40.html`.

## Before production

1. Replace `public/app-ads.txt` with the exact AdMob authorized seller entry.
2. Add the real support contact.
3. Review privacy/legal text against the production app.
4. Replace illustrative product preview values with approved screenshots.
5. Verify `https://smartbillmanager.com/app-ads.txt` returns plain text.


## Internationalization

The production build includes a localization pipeline for the Google Play store-listing locale set documented by Google Play Console. The locale list is maintained in `scripts/locales.mjs`.

`npm run build` first creates the canonical static Next.js site and then runs `scripts/localize-site.mjs`.

To generate the localized HTML pages, configure the official Google Cloud Translation Basic API with a restricted API key and provide it as the `GOOGLE_TRANSLATE_API_KEY` environment variable. The build deliberately skips localization when the variable is absent so a normal English build remains deterministic.

For GitHub Actions, add a repository secret named `GOOGLE_TRANSLATE_API_KEY`. Do not commit the key to the repository.

The localization step:
- translates page HTML plus SEO title/description metadata;
- preserves scripts/structured data and the Smart Bill Manager brand name;
- rewrites internal links to the locale path;
- sets locale and RTL direction where applicable;
- adds `hreflang` and Google machine-translation source markup;
- regenerates the deployed sitemap with localized URLs.

Google requires machine-translated pages that are published unchanged to be identified as machine translated. Post-edit translations before treating them as final marketing/legal copy.

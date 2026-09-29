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

## Before production

1. Replace `public/app-ads.txt` with the exact AdMob authorized seller entry.
2. Add the real support contact.
3. Review privacy/legal text against the production app.
4. Replace illustrative product preview values with approved screenshots.
5. Verify `https://smartbillmanager.com/app-ads.txt` returns plain text.

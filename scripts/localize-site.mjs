import fs from "node:fs/promises";
import path from "node:path";
import { PLAY_STORE_LOCALES, RTL_LOCALES, SITE_URL } from "./locales.mjs";

const OUT_DIR = path.resolve("out");
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const SOURCE_LOCALE = "en";
const MAX_RETRIES = 4;

if (!API_KEY) {
  console.warn(
    "GOOGLE_TRANSLATE_API_KEY is not set. Skipping localized HTML generation. " +
      "The normal English build remains valid; run with the official Google Cloud Translation Basic API key to generate locale pages."
  );
  process.exit(0);
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateBatch(strings, target) {
  if (!strings.length) return [];
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(
        "https://translation.googleapis.com/language/translate/v2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
          },
          body: JSON.stringify({
            q: strings,
            source: SOURCE_LOCALE,
            target,
            format: "html",
          }),
        }
      );
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body?.error?.message || `Translation API HTTP \${response.status}`);
      }
      return (body?.data?.translations || []).map((item) => item.translatedText);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) await sleep(attempt * 1500);
    }
  }
  throw lastError;
}

async function listHtmlFiles(dir, relative = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = path.join(relative, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(full, rel));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(rel);
  }
  return files;
}

function protectScripts(html) {
  const scripts = [];
  const protectedHtml = html.replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    (block) => {
      const token = `__SBM_SCRIPT_\${scripts.length}__`;
      scripts.push(block);
      return `<div translate="no">\${token}</div>`;
    }
  );
  return { protectedHtml, scripts };
}

function restoreScripts(html, scripts) {
  return html.replace(
    /<div translate="no">(__SBM_SCRIPT_\d+__)<\/div>/g,
    (_, token) => scripts[Number(token.match(/\d+/)[0])] || ""
  );
}

function protectBrand(html) {
  return html.replaceAll("Smart Bill Manager", "__SBM_BRAND__");
}

function restoreBrand(html) {
  return html.replaceAll("__SBM_BRAND__", "Smart Bill Manager");
}

function extractMeta(html, attr, value) {
  const pattern = new RegExp(
    `<meta[^>]+\\b\${attr}=["']\${value}["'][^>]*\\bcontent=["']([^"']*)["'][^>]*>`,
    "i"
  );
  return html.match(pattern)?.[1] || "";
}

function replaceMeta(html, attr, value, translated) {
  if (!translated) return html;
  const pattern = new RegExp(
    `(<meta[^>]+\\b\${attr}=["']\${value}["'][^>]*\\bcontent=["'])[^"']*(["'][^>]*>)`,
    "i"
  );
  return html.replace(pattern, `$1\${translated.replaceAll('"', "&quot;")}$2`);
}

function localizeInternalLinks(html, locale) {
  return html.replace(/href=["'](\/[^"'#?]*)(\?[^"']*)?["']/g, (full, href, query = "") => {
    if (href.startsWith(`/\${locale}/`) || href.startsWith("/_next/")) return full;
    const localized = href === "/" ? `/\${locale}/` : `/\${locale}\${href}`;
    return `href="\${localized}\${query}"`;
  });
}

function localizedPath(sourceRelative, locale) {
  const withoutExt = sourceRelative.replace(/\.html$/, "");
  if (withoutExt === "index") return path.join(locale, "index.html");
  return path.join(locale, withoutExt, "index.html");
}

function publicUrlFromSource(sourceRelative) {
  const withoutExt = sourceRelative.replace(/\.html$/, "");
  return withoutExt === "index"
    ? `\${SITE_URL}/`
    : `\${SITE_URL}/\${withoutExt}/`;
}

function localizedUrl(sourceRelative, locale) {
  const withoutExt = sourceRelative.replace(/\.html$/, "");
  return withoutExt === "index"
    ? `\${SITE_URL}/\${locale}/`
    : `\${SITE_URL}/\${locale}/\${withoutExt}/`;
}

function originalUrlToRelative(url) {
  const relative = url.replace(`\${SITE_URL}/`, "");
  return relative.endsWith("/") ? (relative ? `\${relative}index.html` : "index.html") : relative;
}

function addLocalizationHead(html, sourceRelative, originalUrl) {
  const hreflang = PLAY_STORE_LOCALES
    .map(([code]) => {
      const href = code === "en-US" || code === "en-GB"
        ? originalUrl
        : localizedUrl(sourceRelative, code);
      return `<link rel="alternate" hreflang="\${code}" href="\${href}">`;
    })
    .join("");
  const head = `<link rel="alternate machine-translated-from" hreflang="en" href="\${originalUrl}">
<link rel="alternate" hreflang="x-default" href="\${originalUrl}">
\${hreflang}`;
  return html.replace(/<head>/i, `<head>\${head}`);
}

function setHtmlLangAndDir(html, locale) {
  const lang = `\${locale}-x-mtfrom-en`;
  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  return html.replace(/<html[^>]*>/i, `<html lang="\${lang}" dir="\${dir}">`);
}

function addMachineTranslationNotice(html, locale, translatedText) {
  const notice =
    `<div class="machine-translation-notice" lang="\${locale}-x-mtfrom-en">\${translatedText || "This page was machine translated for convenience. The English version is the official source."}</div>`;
  return html.replace(/<footer>/i, `\${notice}<footer>`);
}

async function writeLocalizedPage(sourceRelative, sourceHtml, locale, targetLanguage) {
  const { protectedHtml, scripts } = protectScripts(protectBrand(sourceHtml));

  const metadata = [
    extractMeta(sourceHtml, "name", "description"),
    extractMeta(sourceHtml, "property", "og:title"),
    extractMeta(sourceHtml, "property", "og:description"),
    extractMeta(sourceHtml, "name", "twitter:title"),
    extractMeta(sourceHtml, "name", "twitter:description"),
    "This page was machine translated for convenience. The English version is the official source.",
    "#SmartBillManager #BillTracker #Budgeting #PersonalFinance",
  ];

  const translatedHtml = (await translateBatch([protectedHtml], targetLanguage))[0];
  const translatedMeta = await translateBatch(metadata, targetLanguage);

  let html = restoreBrand(restoreScripts(translatedHtml, scripts));
  html = replaceMeta(html, "name", "description", translatedMeta[0]);
  html = replaceMeta(html, "property", "og:title", translatedMeta[1]);
  html = replaceMeta(html, "property", "og:description", translatedMeta[2]);
  html = replaceMeta(html, "name", "twitter:title", translatedMeta[3]);
  html = replaceMeta(html, "name", "twitter:description", translatedMeta[4]);
  html = html.replace(
    /(<link[^>]+rel=["']canonical["'][^>]+href=["'])[^"']+(["'][^>]*>)/i,
    `$1\${localizedUrl(sourceRelative, locale)}$2`
  );
  html = replaceMeta(html, "property", "og:url", localizedUrl(sourceRelative, locale));
  html = localizeInternalLinks(html, locale);
  html = setHtmlLangAndDir(html, locale);

  const translatedHashtags = translatedMeta[6]
    .split(/\s+/)
    .filter(Boolean)
    .map((tag) => tag.startsWith("#") ? tag : `#\${tag}`)
    .join(" ");
  html = html.replace(
    /<footer>/i,
    `<div class="social-hashtags" aria-label="Localized social hashtags">\${translatedHashtags}</div><footer>`
  );

  html = addMachineTranslationNotice(html, locale, translatedMeta[5]);
  const originalUrl = publicUrlFromSource(sourceRelative);
  html = addLocalizationHead(html, sourceRelative, originalUrl);

  const outputRelative = localizedPath(sourceRelative, locale);
  const outputPath = path.join(OUT_DIR, outputRelative);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
}

async function main() {
  const sourceFiles = (await listHtmlFiles(OUT_DIR))
    .filter((file) => !file.startsWith("sitemap") && !file.startsWith("robots"))
    .sort();

  console.log(`Localizing \${sourceFiles.length} generated pages into \${PLAY_STORE_LOCALES.length} Google Play locales.`);

  for (const [locale, targetLanguage] of PLAY_STORE_LOCALES) {
    if (locale === "en-US" || locale === "en-GB") {
      console.log(`Skipping \${locale}: canonical English content is already available.`);
      continue;
    }

    console.log(`\\n== \${locale} -> \${targetLanguage} ==`);
    for (const sourceFile of sourceFiles) {
      const sourcePath = path.join(OUT_DIR, sourceFile);
      const sourceHtml = await fs.readFile(sourcePath, "utf8");
      await writeLocalizedPage(sourceFile, sourceHtml, locale, targetLanguage);
      console.log(`  translated \${sourceFile}`);
    }
  }

  const urls = [`\${SITE_URL}/`];
  for (const sourceFile of sourceFiles) {
    const baseUrl = publicUrlFromSource(sourceFile);
    if (!urls.includes(baseUrl)) urls.push(baseUrl);
  }
  for (const [locale] of PLAY_STORE_LOCALES) {
    if (locale === "en-US" || locale === "en-GB") continue;
    for (const sourceFile of sourceFiles) urls.push(localizedUrl(sourceFile, locale));
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...Array.from(new Set(urls), (url) => `  <url><loc>\${url}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap, "utf8");
  console.log(`\\nDone. Generated \${new Set(urls).size} sitemap URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import fs from "node:fs/promises";
import path from "node:path";
import { SEO_LOCALES, RTL_LOCALES, SITE_URL } from "./locales.mjs";

const OUT_DIR = path.resolve("out");
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const SOURCE_LOCALE = "en";
const MAX_RETRIES = 4;

if (!API_KEY) {
  console.warn("GOOGLE_TRANSLATE_API_KEY is not set. Skipping localized HTML generation.");
  process.exit(0);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateBatch(strings, target) {
  if (!strings.length) return [];
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch("https://translation.googleapis.com/language/translate/v2", {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-Goog-Api-Key": API_KEY},
        body: JSON.stringify({q: strings, source: SOURCE_LOCALE, target, format: "html"}),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error?.message || `Translation API HTTP ${response.status}`);
      return (body?.data?.translations || []).map((item) => item.translatedText);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) await sleep(attempt * 1500);
    }
  }
  throw lastError;
}

async function listHtmlFiles(dir, relative = "") {
  const entries = await fs.readdir(dir, {withFileTypes: true});
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
  const protectedHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (block) => {
    const token = `__SBM_SCRIPT_${scripts.length}__`;
    scripts.push(block);
    return `<div translate="no">${token}</div>`;
  });
  return {protectedHtml, scripts};
}

function restoreScripts(html, scripts) {
  return html.replace(/<div translate="no">(__SBM_SCRIPT_\d+__)<\/div>/g, (_, token) =>
    scripts[Number(token.match(/\d+/)[0])] || ""
  );
}

const protectBrand = (html) => html.replaceAll("Smart Bill Manager", "__SBM_BRAND__");
const restoreBrand = (html) => html.replaceAll("__SBM_BRAND__", "Smart Bill Manager");

function extractMeta(html, attr, value) {
  const pattern = new RegExp(`<meta[^>]+\\b${attr}=["']${value}["'][^>]*\\bcontent=["']([^"']*)["'][^>]*>`, "i");
  return html.match(pattern)?.[1] || "";
}

function replaceMeta(html, attr, value, translated) {
  if (!translated) return html;
  const pattern = new RegExp(`(<meta[^>]+\\b${attr}=["']${value}["'][^>]*\\bcontent=["'])[^"']*(["'][^>]*>)`, "i");
  return html.replace(pattern, `$1${translated.replaceAll('"', "&quot;")}$2`);
}

function localizeInternalLinks(html, locale) {
  return html.replace(/href=["'](\/[^"'#?]*)(\?[^"']*)?["']/g, (full, href, query = "") => {
    if (href.startsWith(`/${locale}/`) || href.startsWith("/_next/") || href.startsWith("/images/") || href.startsWith("/icon")) return full;
    const localized = href === "/" ? `/${locale}/` : `/${locale}${href}`;
    return `href="${localized}${query}"`;
  });
}

function localizedPath(sourceRelative, locale) {
  const withoutExt = sourceRelative.replace(/\.html$/, "");
  return withoutExt === "index" ? path.join(locale, "index.html") : path.join(locale, withoutExt, "index.html");
}

function publicUrlFromSource(sourceRelative) {
  const withoutExt = sourceRelative.replace(/\.html$/, "");
  return withoutExt === "index" ? `${SITE_URL}/` : `${SITE_URL}/${withoutExt}/`;
}

function localizedUrl(sourceRelative, locale) {
  const withoutExt = sourceRelative.replace(/\.html$/, "");
  return withoutExt === "index" ? `${SITE_URL}/${locale}/` : `${SITE_URL}/${locale}/${withoutExt}/`;
}

function addLocalizationHead(html, sourceRelative, originalUrl) {
  const suffix = sourceRelative === "index.html" ? "" : sourceRelative.replace(/index\.html$/, "");
  const links = SEO_LOCALES.map(([code, , root]) => {
    const href = root === "/" ? originalUrl : `${SITE_URL}${root}${suffix}`;
    return `<link rel="alternate" hreflang="${code}" href="${href}">`;
  }).join("");
  return html.replace(/<head>/i, `<head><link rel="alternate" hreflang="x-default" href="${originalUrl}">${links}`);
}

function setHtmlLangAndDir(html, locale) {
  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  return html.replace(/<html[^>]*>/i, `<html lang="${locale}" dir="${dir}">`);
}

function addMachineTranslationNotice(html, locale, translatedText) {
  const notice = `<div class="machine-translation-notice" lang="${locale}">${translatedText || "This page was machine translated for convenience. The English version is the official source."}</div>`;
  return html.replace(/<footer>/i, `${notice}<footer>`);
}

async function writeLocalizedPage(sourceRelative, sourceHtml, locale, targetLanguage) {
  const {protectedHtml, scripts} = protectScripts(protectBrand(sourceHtml));
  const metadata = [
    extractMeta(sourceHtml, "name", "description"),
    extractMeta(sourceHtml, "property", "og:title"),
    extractMeta(sourceHtml, "property", "og:description"),
    extractMeta(sourceHtml, "name", "twitter:title"),
    extractMeta(sourceHtml, "name", "twitter:description"),
    "This page was machine translated for convenience. The English version is the official source.",
  ];
  const translatedHtml = (await translateBatch([protectedHtml], targetLanguage))[0];
  const translatedMeta = await translateBatch(metadata, targetLanguage);
  let html = restoreBrand(restoreScripts(translatedHtml, scripts));
  html = replaceMeta(html, "name", "description", translatedMeta[0]);
  html = replaceMeta(html, "property", "og:title", translatedMeta[1]);
  html = replaceMeta(html, "property", "og:description", translatedMeta[2]);
  html = replaceMeta(html, "name", "twitter:title", translatedMeta[3]);
  html = replaceMeta(html, "name", "twitter:description", translatedMeta[4]);
  html = html.replace(/(<link[^>]+rel=["']canonical["'][^>]+href=["'])[^"']+(["'][^>]*>)/i, `$1${localizedUrl(sourceRelative, locale)}$2`);
  html = replaceMeta(html, "property", "og:url", localizedUrl(sourceRelative, locale));
  html = localizeInternalLinks(html, locale);
  html = setHtmlLangAndDir(html, locale);
  html = addMachineTranslationNotice(html, locale, translatedMeta[5]);
  html = addLocalizationHead(html, sourceRelative, publicUrlFromSource(sourceRelative));
  const outputPath = path.join(OUT_DIR, localizedPath(sourceRelative, locale));
  await fs.mkdir(path.dirname(outputPath), {recursive: true});
  await fs.writeFile(outputPath, html, "utf8");
}

async function main() {
  const sourceFiles = (await listHtmlFiles(OUT_DIR)).filter((file) => !file.startsWith("sitemap") && !file.startsWith("robots")).sort();
  const localizedLocales = SEO_LOCALES.filter(([code]) => !["en-GB","en-US","en-AU","en-CA"].includes(code));
  console.log(`Localizing ${sourceFiles.length} generated pages into ${localizedLocales.length} focused SEO locales.`);

  for (const [locale, targetLanguage] of localizedLocales) {
    console.log(`\\n== ${locale} -> ${targetLanguage} ==`);
    for (const sourceFile of sourceFiles) {
      await writeLocalizedPage(sourceFile, await fs.readFile(path.join(OUT_DIR, sourceFile), "utf8"), locale, targetLanguage);
    }
  }

  for (const sourceFile of sourceFiles) {
    const sourcePath = path.join(OUT_DIR, sourceFile);
    const original = await fs.readFile(sourcePath, "utf8");
    await fs.writeFile(sourcePath, addLocalizationHead(original, sourceFile, publicUrlFromSource(sourceFile)), "utf8");
  }

  const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
  let sitemap = await fs.readFile(sitemapPath, "utf8");
  sitemap = sitemap.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  const localizedEntries = [];
  for (const sourceFile of sourceFiles) {
    const originalUrl = publicUrlFromSource(sourceFile);
    const suffix = sourceFile === "index.html" ? "" : sourceFile.replace(/index\.html$/, "");
    const variants = SEO_LOCALES.map(([code, , root]) => ({code, url: root === "/" ? originalUrl : `${SITE_URL}${root}${suffix}`}));
    const links = variants.map(({code,url}) => `<xhtml:link rel="alternate" hreflang="${code}" href="${url}"/>`).concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${originalUrl}"/>`).join("");
    const escaped = originalUrl.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&");
    const re = new RegExp(`<url><loc>${escaped}</loc>[\\s\\S]*?</url>`);
    const match = sitemap.match(re);
    if (match) sitemap = sitemap.replace(match[0], match[0].replace("</url>", `${links}</url>`));
    for (const item of variants) if (item.url !== originalUrl) localizedEntries.push(`  <url><loc>${item.url}</loc>${links}</url>`);
  }
  sitemap = sitemap.replace("</urlset>", `${localizedEntries.join("\\n")}\\n</urlset>`);
  await fs.writeFile(sitemapPath, sitemap, "utf8");
  console.log(`Done. Generated localized pages for ${localizedLocales.length} locales with reciprocal hreflang annotations.`);
}

main().catch((error) => { console.error(error); process.exit(1); });

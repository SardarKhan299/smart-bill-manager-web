import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const SITE_HOST = "smart-bill-manager-web.sardar-khan299.workers.dev";
const OG_IMAGE_URL = `https://${SITE_HOST}/og-image.svg`;
const seoLocales = ["en-GB","en-US","en-AU","en-CA","nl-NL","de-DE","fr-FR","fr-CA","es-ES","it-IT","pt-PT","ar","ur-PK","hi-IN","zh-CN"];


if (!fs.existsSync(OUT)) {
  console.error("SEO audit failed: out/ does not exist.");
  process.exit(1);
}

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? files(full) : [full];
  });
}

const htmlFiles = files(OUT).filter((file) => file.endsWith(".html") && !file.endsWith("404.html") && !file.endsWith("google7587fd459982fd40.html"));
const failures = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(OUT, file);
  if (rel.startsWith("404/")) continue;

  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(rel + ": missing title");
  if (!/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html)) failures.push(rel + ": missing meta description");
  if (!/<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/smart-bill-manager-web\.sardar-khan299\.workers\.dev\//i.test(html)) failures.push(rel + ": missing workers.dev canonical");
  if (!/<html[^>]+lang=["'][^"']+["']/i.test(html)) failures.push(rel + ": missing html lang");
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) failures.push(rel + ": missing viewport");
  const isBlogArticle = rel.startsWith("blog/") && rel !== "blog/index.html";
  if (!html.includes(`property="og:image"`)) failures.push(rel + ": missing og:image");
  else if (isBlogArticle && !html.includes("/images/discover/")) failures.push(rel + ": blog og:image is not a Discover image");
  else if (!isBlogArticle && !html.includes(OG_IMAGE_URL)) failures.push(rel + ": missing production og:image");
  if (!html.includes(`name="twitter:image"`)) failures.push(rel + ": missing twitter:image");
  else if (isBlogArticle && !html.includes("/images/discover/")) failures.push(rel + ": blog twitter:image is not a Discover image");
  else if (!isBlogArticle && !html.includes(OG_IMAGE_URL)) failures.push(rel + ": missing production twitter:image");

  const h1s = html.match(/<h1\b/gi) ?? [];
  if (h1s.length !== 1) failures.push(rel + ": expected exactly one h1, found " + h1s.length);
  if (html.includes("smartbillmanager.com")) failures.push(rel + ": contains old smartbillmanager.com domain");
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) failures.push(rel + ": contains noindex");
  const isLocalized = seoLocales.some((locale) => rel.startsWith(locale + "/"));
  if (!isLocalized) {
    const presentHreflang = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]);
    if (presentHreflang.length && !seoLocales.every((locale) => presentHreflang.includes(locale))) failures.push(rel + ": incomplete hreflang set");
    if (presentHreflang.length && !presentHreflang.includes("x-default")) failures.push(rel + ": missing x-default hreflang");
  }


  if (rel.startsWith("tools/")) {
    const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const breadcrumb = scripts.find((match) => /"@type":"BreadcrumbList"/.test(match[1]));
    if (!breadcrumb) failures.push(rel + ": missing BreadcrumbList JSON-LD");
  }

  if (rel.startsWith("blog/") && rel !== "blog/index.html") {
    const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const blogPosting = scripts.find((match) => /"@type":"BlogPosting"/.test(match[1]));
    if (!blogPosting) failures.push(rel + ": missing BlogPosting JSON-LD");
    else {
      if (!/"author":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing author");
      if (!/"image":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing image");
      if (!/"primaryImageOfPage":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing primaryImageOfPage");
      if (!/"headline":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing headline");
      const discoverImage = html.match(/<img[^>]+src=["']([^"']*\/images\/discover\/[^"']+)["'][^>]*alt=["']([^"']+)["']/i);
      if (!discoverImage) failures.push(rel + ": missing Discover article image");
      else if (!discoverImage[2].trim()) failures.push(rel + ": Discover article image missing alt text");
      const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
      if (!ogImage || !ogImage[1].includes("/images/discover/")) failures.push(rel + ": blog og:image is not a Discover article image");
    }
  }
}

for (const required of ["robots.txt", "sitemap.xml", "app-ads.txt", "og-image.svg"]) {
  if (!fs.existsSync(path.join(OUT, required))) failures.push("missing out/" + required);
}

const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
if (!sitemap.includes(SITE_HOST)) failures.push("sitemap.xml does not use the production workers.dev host");
if (sitemap.includes("smartbillmanager.com")) failures.push("sitemap.xml contains old domain");
if (sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
  for (const locale of seoLocales) if (!sitemap.includes(`hreflang="${locale}"`)) failures.push("sitemap.xml missing hreflang " + locale);
  if (!sitemap.includes('hreflang="x-default"')) failures.push("sitemap.xml missing x-default hreflang");
}


if (failures.length) {
  console.error("SEO audit failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}

console.log("SEO audit passed: " + htmlFiles.length + " HTML pages checked.");

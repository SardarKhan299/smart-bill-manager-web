import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const SITE_HOST = "smart-bill-manager-web.sardar-khan299.workers.dev";

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

const htmlFiles = files(OUT).filter((file) => file.endsWith(".html") && !file.endsWith("404.html"));
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
  if (!/<meta[^>]+property=["']og:image["'][^>]+content=["']https:\/\/smart-bill-manager-web\.sardar-khan299\.workers\.dev\/og-image\.svg["']/i.test(html)) failures.push(rel + ": missing production og:image");
  if (!/<meta[^>]+name=["']twitter:image["'][^>]+content=["']https:\/\/smart-bill-manager-web\.sardar-khan299\.workers\.dev\/og-image\.svg["']/i.test(html)) failures.push(rel + ": missing production twitter:image");
  const h1s = html.match(/<h1\b/gi) ?? [];
  if (h1s.length !== 1) failures.push(rel + ": expected exactly one h1, found " + h1s.length);
  if (html.includes("smartbillmanager.com")) failures.push(rel + ": contains old smartbillmanager.com domain");
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) failures.push(rel + ": contains noindex");

  if (rel.startsWith("blog/") && rel !== "blog/index.html") {
    const blogPosting = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\\s\\S]*?)<\/script>/i);
    if (!blogPosting || !/"@type":"BlogPosting"/.test(blogPosting[1])) failures.push(rel + ": missing BlogPosting JSON-LD");
    if (blogPosting && !/"author":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing author");
    if (blogPosting && !/"image":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing image");
    if (blogPosting && !/"headline":/.test(blogPosting[1])) failures.push(rel + ": BlogPosting missing headline");
  }
}

for (const required of ["robots.txt", "sitemap.xml", "app-ads.txt"]) {
  if (!fs.existsSync(path.join(OUT, required))) failures.push("missing out/" + required);
}

const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
if (!sitemap.includes(SITE_HOST)) failures.push("sitemap.xml does not use the production workers.dev host");
if (sitemap.includes("smartbillmanager.com")) failures.push("sitemap.xml contains old domain");

if (failures.length) {
  console.error("SEO audit failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}

if (!fs.existsSync(path.join(OUT, "og-image.svg"))) failures.push("missing out/og-image.svg");
if (failures.length) {
  console.error("SEO audit failed:");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}

console.log("SEO audit passed: " + htmlFiles.length + " HTML pages checked.");

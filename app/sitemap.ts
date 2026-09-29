import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://smartbillmanager.com";
  const paths = [
    "", "/how-it-works/", "/features/", "/pricing/", "/download/", "/privacy/", "/support/",
    "/bill-tracker/", "/subscription-tracker/", "/expense-tracker/", "/budget-planner/",
    "/safe-to-spend/", "/cash-flow-forecast/", "/receipt-manager/", "/recurring-expense-tracker/"
  ];
  return paths.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));
}
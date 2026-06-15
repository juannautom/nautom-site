import type { MetadataRoute } from "next";
import { getCasoSlugs } from "@/lib/casos";

/**
 * Sitemap (spec §6 PR-5 — capa-LLM). Lists the new live routes PR-1…PR-4 shipped, so
 * search engines and LLM crawlers (robots.txt points here) can discover them. The
 * deep-case URLs are read from the `casos` collection — single source of truth, can't
 * drift from what actually ships.
 */
const SITE = "https://nautom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/enfoque`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/trabajo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/nosotros`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contacto`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = getCasoSlugs().map((slug) => ({
    url: `${SITE}/trabajo/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...caseRoutes].map((entry) => ({
    ...entry,
    lastModified,
  }));
}

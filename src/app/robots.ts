import type { MetadataRoute } from "next";

/**
 * robots.txt (spec §2 / §6 PR-5 — capa-LLM).
 *
 * The site is built to be read and cited by LLMs, so the AI crawlers are allowed
 * explicitly alongside the search engines: ClaudeBot (Anthropic), GPTBot (OpenAI)
 * and PerplexityBot. A wildcard `*` already allows them, but they're named so the
 * intent is legible and the invariant is checkable. Server-rendered at /robots.txt.
 */
const SITE = "https://nautom.com";

const AI_BOTS = ["ClaudeBot", "GPTBot", "PerplexityBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

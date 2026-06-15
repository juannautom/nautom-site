import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Versioned content layer (spec §3, §6 PR-1).
 *
 * The source of truth for copy lives as markdown files under `content/`, NOT as
 * TS arrays. This is the infra that later feeds `llms.txt` (PR-5) and that proves
 * the site's thesis: the knowledge lives as versioned context. Files are read at
 * build time from a Server Component, so the copy ships inside the server-rendered
 * HTML (requisito de la capa-LLM, no optimización).
 *
 * Locale dimension is baked in now (`content/<locale>/<collection>/<slug>.md`) so
 * EN can be added additively later — but only ES is implemented (§4, ES-first).
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");
export const DEFAULT_LOCALE = "es";

/** Read one markdown section: typed frontmatter + trimmed body. */
export function readSection<T>(
  collection: string,
  slug: string,
  locale: string = DEFAULT_LOCALE,
): { data: T; body: string } {
  const file = path.join(CONTENT_ROOT, locale, collection, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data: data as T, body: content.trim() };
}

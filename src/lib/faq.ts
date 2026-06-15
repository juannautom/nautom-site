import { readSection } from "./content";

/**
 * FAQ content (spec §6 PR-5). Same versioned-markdown pattern as the rest of the
 * site: `content/<locale>/faq/index.md`. Feeds the `FAQPage` JSON-LD on Home and the
 * "Preguntas frecuentes" section of `llms-full.txt`. Copy v1 (§5.1), grounded in
 * existing site copy — no invented metrics (§4).
 */

export type FaqItem = { q: string; a: string };

type FaqFrontmatter = { items: FaqItem[] };

export const FAQ_COLLECTION = "faq";

export function getFaq(locale?: string): FaqItem[] {
  return readSection<FaqFrontmatter>(FAQ_COLLECTION, "index", locale).data.items;
}

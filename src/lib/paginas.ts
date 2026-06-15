import type { Cta } from "./home";
import { readSection } from "./content";

/**
 * Essay pages — Enfoque y Nosotros (spec §5.4, PR-3). Same versioned-markdown
 * pattern as Home/Casos: `content/<locale>/paginas/<slug>.md`. The load-bearing
 * copy (the §5.4 paragraphs) is read at build time → ships in the SSR HTML.
 *
 * These are copy v1 (Juancho edits voice later); the paragraphs are verbatim from
 * §5.4 and must not be rewritten here.
 */

export type EssayContent = {
  eyebrow: string;
  /** Page headline (chrome — not part of the §5.4 essay body). */
  title: string;
  /** Short description for <head> metadata. */
  summary: string;
  /** The essay, one paragraph per item. Load-bearing copy. */
  paragraphs: string[];
  /** Optional closing CTA block. */
  closing?: { title: string; ctas: Cta[] };
};

export const PAGINAS_COLLECTION = "paginas";

export function getPagina(slug: string, locale?: string): EssayContent {
  return readSection<EssayContent>(PAGINAS_COLLECTION, slug, locale).data;
}

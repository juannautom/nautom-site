import { listSlugs, readSection } from "./content";

/**
 * Deep case pages (spec §5.3, PR-2). Same versioned-markdown pattern as Home:
 * `content/<locale>/casos/<slug>.md`, frontmatter as an ordered list of sections
 * so one renderer serves both cases while each file controls its own order. Read
 * at build time → the load-bearing copy ships in the SSR HTML.
 */

/** A two-layer block — the blueprint-over-paper diagram of Caso A. */
export type LayerItem = { name: string; text: string };

export type Section =
  | { kind: "prose"; heading?: string; paragraphs: string[] }
  | { kind: "scale"; lead: string; items: string[] }
  | { kind: "layers"; heading?: string; intro?: string; items: LayerItem[] }
  | { kind: "invariant"; heading?: string; text: string; note?: string }
  | { kind: "payoff"; text: string };

export type Caso = {
  slug: string;
  label: string;
  title: string;
  /** One-line thesis shown under the title. */
  thesis: string;
  /** Short description for <head> metadata. */
  summary: string;
  sections: Section[];
};

export const CASOS_COLLECTION = "casos";

export function getCasoSlugs(locale?: string): string[] {
  return listSlugs(CASOS_COLLECTION, locale);
}

export function getCaso(slug: string, locale?: string): Caso {
  return readSection<Caso>(CASOS_COLLECTION, slug, locale).data;
}

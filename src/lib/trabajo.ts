import { getCaso, getCasoSlugs } from "./casos";
import { readSection } from "./content";

/**
 * Trabajo index (spec §2 / §5.3, PR-3). The 2 deep cases are read from the `casos`
 * collection (single source of truth, no duplicated copy) and the 4 light projects
 * live in `content/<locale>/trabajo/index.md`. Read at build time → the
 * load-bearing copy (case theses + the 4 lines) ships in the SSR HTML.
 */

/** A light project: logo + one line, no page of its own (§5.3). */
export type LightProject = {
  name: string;
  /** Logo asset; absent → the name is rendered as a text fallback. */
  logo?: string;
  /** Optical nudge to balance logos with different aspect ratios (default 1). */
  scale?: number;
  line: string;
};

/** A deep case, as shown in the index — derived from the `casos` collection. */
export type TrabajoCase = {
  slug: string;
  label: string;
  title: string;
  thesis: string;
  href: string;
};

export type TrabajoIndex = {
  eyebrow: string;
  title: string;
  intro: string;
  casesHeading: string;
  lightHeading: string;
  cases: TrabajoCase[];
  light: LightProject[];
};

type TrabajoFrontmatter = Omit<TrabajoIndex, "cases">;

export const TRABAJO_COLLECTION = "trabajo";

export function getTrabajoIndex(locale?: string): TrabajoIndex {
  const fm = readSection<TrabajoFrontmatter>(
    TRABAJO_COLLECTION,
    "index",
    locale,
  ).data;

  // Slugs sort alphabetically → dos-verdades (A) before tener-todo-a-la-vista (B).
  const cases: TrabajoCase[] = getCasoSlugs(locale).map((slug) => {
    const caso = getCaso(slug, locale);
    return {
      slug,
      label: caso.label,
      title: caso.title,
      thesis: caso.thesis,
      href: `/trabajo/${slug}`,
    };
  });

  return { ...fm, cases };
}

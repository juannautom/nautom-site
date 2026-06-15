import { readSection } from "./content";

/** A call-to-action button. `variant` selects the visual treatment. */
export type Cta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctas: Cta[];
};

/**
 * A breadth-proof logo. `src` is optional: a logo we don't have the asset for yet
 * is marked `pending` and rendered as a placeholder slot (so the full grid can be
 * tested at its real count). `scale` is an optical nudge (default 1) to balance
 * logos with very different aspect ratios inside identical grid cells.
 */
export type Logo = {
  name: string;
  src?: string;
  scale?: number;
  pending?: boolean;
};

export type ProofContent = {
  heading: string;
  logos: Logo[];
};

export type ChangeBlock = { label: string; text: string };

export type ChangeContent = {
  label: string;
  before: ChangeBlock;
  after: ChangeBlock;
};

export type CaseTeaserContent = {
  order: number;
  label: string;
  title: string;
  lead: string;
  href: string;
  cta: string;
  context?: string;
  scale?: string[];
};

export type ClosingCtaContent = {
  title: string;
  subtitle: string;
  ctas: Cta[];
};

export type HomeContent = {
  hero: HeroContent;
  proof: ProofContent;
  change: ChangeContent;
  cases: CaseTeaserContent[];
  closing: ClosingCtaContent;
};

/**
 * Assemble the full Home content from the markdown layer. The five scroll pieces
 * (hero → logos → antes/después → 2 teasers → CTA) each map to one file under
 * `content/<locale>/home/`. Read at build time → ships in the SSR HTML.
 */
export function getHomeContent(locale?: string): HomeContent {
  const hero = readSection<HeroContent>("home", "hero", locale).data;
  const proof = readSection<ProofContent>("home", "proof", locale).data;
  const change = readSection<ChangeContent>("home", "change", locale).data;
  const closing = readSection<ClosingCtaContent>("home", "cta", locale).data;

  const cases = [
    readSection<CaseTeaserContent>("home", "case-a", locale).data,
    readSection<CaseTeaserContent>("home", "case-b", locale).data,
  ].sort((a, b) => a.order - b.order);

  return { hero, proof, change, cases, closing };
}

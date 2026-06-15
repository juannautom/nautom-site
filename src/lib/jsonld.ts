import type { Caso } from "./casos";
import type { FaqItem } from "./faq";
import { plainText } from "./text";

/**
 * JSON-LD builders (spec §2 / §6 PR-5 — capa-LLM).
 *
 * Structured data for search engines and LLMs: an `Organization` (global, in the
 * layout), one `CreativeWork` per deep case, and a `FAQPage` (Home). All of it is
 * derived from the same versioned markdown the pages render from, and emitted into
 * the server-rendered HTML (`<JsonLd>`), never injected by JS — same SSR requirement
 * as the rest of the capa-LLM (§3).
 *
 * Builders return plain JSON-serializable objects; `JsonLd` stringifies them.
 */

export const SITE_URL = "https://nautom.com";
export const ORG_NAME = "Nautom";

export type JsonLdObject = Record<string, unknown>;

/** Global Organization. The description/slogan stay in lockstep with the site copy. */
export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/nautom-icon.svg`,
    description:
      "Estudio de software AI-first para PyMEs argentinas. Construimos software que se hace cargo de las reglas de tu negocio: el conocimiento deja de vivir en la cabeza de unas pocas personas y pasa a estar en el sistema.",
    slogan:
      "Que el conocimiento de tu empresa viva en el sistema, no en las personas.",
    areaServed: { "@type": "Country", name: "Argentina" },
    knowsLanguage: "es",
    sameAs: ["https://www.linkedin.com/company/nautom"],
  };
}

/**
 * One CreativeWork per deep case (A and B). Describes the case study itself; the
 * thesis is the headline, the summary the description. `about` carries the concept
 * so an LLM can see what the case is "about" without parsing prose.
 */
export function creativeWorkJsonLd(caso: Caso): JsonLdObject {
  const url = `${SITE_URL}/trabajo/${caso.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caso.title,
    headline: plainText(caso.thesis),
    description: caso.summary,
    url,
    inLanguage: "es",
    about: plainText(caso.thesis),
    author: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    isPartOf: { "@type": "WebSite", name: ORG_NAME, url: SITE_URL },
  };
}

/** FAQPage from the versioned FAQ content. */
export function faqPageJsonLd(items: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

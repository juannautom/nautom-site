/**
 * Deterministic builder for `llms.txt` / `llms-full.txt` (spec §2 / §6 PR-5).
 *
 * Reads the markdown content layer DIRECTLY (gray-matter), the same precedent as
 * `check-ssr-presence.mjs` — so the output is derived from the content, never
 * hardcoded. `generate-llms.mjs` writes it to `public/`; `check-llms.mjs` regenerates
 * here and diffs against the committed files (drift = fail; a hardcoded edit can't
 * survive). Pure: no dates, no randomness → byte-stable regeneration.
 *
 * `plainText` is imported from the app's self-contained `text.ts` (Node strips the TS
 * types at runtime) so emphasis-stripping has a single source of truth.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { plainText } from "../../src/lib/text.ts";

export const SITE_URL = "https://nautom.com";
const CONTENT = path.join(process.cwd(), "content", "es");

function fm(...segments) {
  const file = path.join(CONTENT, ...segments) + ".md";
  return matter(fs.readFileSync(file, "utf8")).data;
}

/** Deep-case slugs, sorted (→ dos-verdades before tener-todo-a-la-vista), like the loader. */
function casoSlugs() {
  return fs
    .readdirSync(path.join(CONTENT, "casos"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

/** Render one deep-case section to plain markdown text (for llms-full.txt). */
function sectionToText(section) {
  switch (section.kind) {
    case "prose":
      return [section.heading ? `### ${section.heading}` : null, ...section.paragraphs]
        .filter(Boolean)
        .join("\n\n");
    case "scale":
      return [section.lead, ...section.items.map((i) => `- ${i}`)].join("\n");
    case "layers":
      return [
        section.heading ? `### ${section.heading}` : null,
        section.intro ?? null,
        ...section.items.map((l) => `- **${l.name}:** ${l.text}`),
      ]
        .filter(Boolean)
        .join("\n\n");
    case "invariant":
      return [
        section.heading ? `### ${section.heading}` : null,
        section.text,
        section.note ?? null,
      ]
        .filter(Boolean)
        .join("\n\n");
    case "payoff":
      return section.text;
    default:
      return "";
  }
}

/** llms.txt site summary — pulled from a content field, not free-typed. */
function siteSummary() {
  return fm("paginas", "enfoque").summary;
}

/**
 * `llms.txt` — the curated index (llmstxt.org shape): H1, blockquote summary, and
 * sectioned link lists with a one-line description per page, each from the markdown.
 */
export function buildLlmsTxt() {
  const hero = fm("home", "hero");
  const closing = fm("home", "cta");
  const enfoque = fm("paginas", "enfoque");
  const nosotros = fm("paginas", "nosotros");
  const trabajo = fm("trabajo", "index");

  const lines = [];
  lines.push("# Nautom");
  lines.push("");
  lines.push(`> ${siteSummary()}`);
  lines.push("");
  lines.push("## Páginas");
  lines.push("");
  lines.push(`- [Inicio](${SITE_URL}/): ${plainText(hero.subtitle)}`);
  lines.push(`- [Enfoque](${SITE_URL}/enfoque): ${enfoque.summary}`);
  lines.push(`- [Trabajo](${SITE_URL}/trabajo): ${trabajo.intro}`);
  lines.push(`- [Nosotros](${SITE_URL}/nosotros): ${nosotros.summary}`);
  lines.push(`- [Contacto](${SITE_URL}/contacto): ${closing.subtitle}`);
  lines.push("");
  lines.push("## Casos");
  lines.push("");
  for (const slug of casoSlugs()) {
    const caso = fm("casos", slug);
    lines.push(
      `- [${caso.title}](${SITE_URL}/trabajo/${slug}): ${plainText(caso.thesis)}`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

/**
 * `llms-full.txt` — the whole site as one plain-markdown document: every page and
 * case in full, plus the FAQ. What an LLM ingests for complete context, not the index.
 */
export function buildLlmsFullTxt() {
  const hero = fm("home", "hero");
  const change = fm("home", "change");
  const enfoque = fm("paginas", "enfoque");
  const nosotros = fm("paginas", "nosotros");
  const trabajo = fm("trabajo", "index");
  const faq = fm("faq", "index");

  const blocks = [];

  blocks.push(`# Nautom\n\n> ${siteSummary()}`);

  // Home
  blocks.push(
    [
      "## Inicio",
      plainText(hero.title),
      plainText(hero.subtitle),
      "### El cambio",
      `**${change.before.label}:** ${change.before.text}`,
      `**${change.after.label}:** ${change.after.text}`,
    ].join("\n\n"),
  );

  // Enfoque
  blocks.push(["## Enfoque", plainText(enfoque.title), ...enfoque.paragraphs].join("\n\n"));

  // Nosotros
  blocks.push(["## Nosotros", plainText(nosotros.title), ...nosotros.paragraphs].join("\n\n"));

  // Trabajo index
  blocks.push(
    [
      "## Trabajo",
      trabajo.intro,
      ...trabajo.light.map((p) => `- **${p.name}:** ${p.line}`),
    ].join("\n\n"),
  );

  // Deep cases, in full
  for (const slug of casoSlugs()) {
    const caso = fm("casos", slug);
    blocks.push(
      [
        `## Caso: ${caso.title}`,
        `**${plainText(caso.thesis)}**`,
        caso.summary,
        ...caso.sections.map(sectionToText),
      ].join("\n\n"),
    );
  }

  // FAQ
  const faqLines = ["## Preguntas frecuentes"];
  for (const item of faq.items) {
    faqLines.push(`### ${item.q}`);
    faqLines.push(item.a);
  }
  blocks.push(faqLines.join("\n\n"));

  return blocks.join("\n\n---\n\n") + "\n";
}

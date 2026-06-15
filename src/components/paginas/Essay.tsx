import type { EssayContent } from "@/lib/paginas";
import CtaButtons from "@/components/home/CtaButtons";

/**
 * Essay page renderer — Enfoque y Nosotros (§5.4). Server Component: the §5.4
 * paragraphs are load-bearing copy and ship in the SSR HTML (§3). One renderer
 * serves both pages; each markdown file controls its own copy and CTA.
 */
export default function Essay({ content }: { content: EssayContent }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <header className="max-w-2xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {content.eyebrow}
        </p>
        <h1 className="font-display text-4xl leading-[1.08] text-ink md:text-5xl">
          {content.title}
        </h1>
      </header>

      <div className="mt-12 max-w-2xl space-y-6 md:mt-16">
        {content.paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink-2">
            {p}
          </p>
        ))}
      </div>

      {content.closing && (
        <footer className="mt-16 border-t border-hairline pt-12 md:mt-24">
          <h2 className="max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
            {content.closing.title}
          </h2>
          <div className="mt-8">
            <CtaButtons ctas={content.closing.ctas} />
          </div>
        </footer>
      )}
    </article>
  );
}

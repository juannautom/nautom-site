import Link from "next/link";
import type { CaseTeaserContent } from "@/lib/home";

/**
 * The two case teasers (§5.3). Anonymized by concept — no client name. Each leads
 * with the thesis; Caso B adds real scale data (§4), never an invented result
 * metric. Deep pages arrive in PR-2.
 */
export default function CaseTeasers({ cases }: { cases: CaseTeaserContent[] }) {
  return (
    <section className="border-t border-hairline bg-paper-2">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {cases.map((c) => (
            <article key={c.href} className="flex flex-col">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-5">
                {c.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink">
                {c.title}
              </h2>
              <p className="mt-5 text-lg text-ink-2 leading-relaxed">{c.lead}</p>

              {c.context && (
                <p className="mt-5 text-base text-ink-3 leading-relaxed">
                  {c.context}
                </p>
              )}

              {c.scale && c.scale.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {c.scale.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs text-ink-2 tracking-tight"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={c.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-ink transition-colors"
              >
                {c.cta}
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

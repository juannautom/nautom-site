import Link from "next/link";
import type {
  LightProject,
  TrabajoCase,
  TrabajoIndex as TrabajoIndexContent,
} from "@/lib/trabajo";

/** A deep case card — links to its page under /trabajo/<slug> (PR-2). */
function CaseCard({ caso }: { caso: TrabajoCase }) {
  return (
    <Link href={caso.href} className="group block">
      <article className="flex h-full flex-col rounded-2xl border border-hairline bg-paper p-8 transition-colors hover:border-ink/25 md:p-10">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {caso.label}
        </p>
        <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">
          {caso.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{caso.thesis}</p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors group-hover:text-accent-ink">
          Ver el caso
          <span aria-hidden>→</span>
        </span>
      </article>
    </Link>
  );
}

/**
 * A light project: logo + one line, no page of its own (§5.3). The logo is
 * flattened to an ink silhouette like the proof bar; without an asset, the name is
 * rendered as a text fallback so the row still reads.
 */
function LightRow({ project }: { project: LightProject }) {
  return (
    <li className="flex items-center gap-6 py-6">
      <div className="flex h-10 w-28 shrink-0 items-center md:w-32">
        {project.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.logo}
            alt={project.name}
            style={
              project.scale ? { transform: `scale(${project.scale})` } : undefined
            }
            className="h-7 w-auto object-contain object-left opacity-60 [filter:brightness(0)] md:h-8"
          />
        ) : (
          <span className="font-display text-lg text-ink">{project.name}</span>
        )}
      </div>
      <p className="text-base leading-relaxed text-ink-2 md:text-lg">
        {project.line}
      </p>
    </li>
  );
}

/**
 * Trabajo index (§2 / §5.3). Server Component: the case theses and the 4 light
 * lines are load-bearing copy and ship in the SSR HTML (§3). The 2 deep cases link
 * to their pages; the 4 light projects are logo + line, no link.
 */
export default function TrabajoIndex({
  content,
}: {
  content: TrabajoIndexContent;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <header className="max-w-2xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {content.eyebrow}
        </p>
        <h1 className="font-display text-4xl leading-[1.08] text-ink md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-2">{content.intro}</p>
      </header>

      <section className="mt-16 md:mt-20">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
          {content.casesHeading}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {content.cases.map((caso) => (
            <CaseCard key={caso.slug} caso={caso} />
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
          {content.lightHeading}
        </h2>
        <ul className="divide-y divide-hairline border-t border-hairline">
          {content.light.map((project) => (
            <LightRow key={project.name} project={project} />
          ))}
        </ul>
      </section>
    </div>
  );
}

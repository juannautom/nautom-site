import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaso, getCasoSlugs } from "@/lib/casos";
import CaseSections from "@/components/casos/CaseSections";
import AgentSession from "@/components/casos/AgentSession";

// Deep case pages (PR-2). Static route under /trabajo/* so the PR-5 301 map
// (/trabajo/<slug>) doesn't have to rewrite it. Server Component reading the
// markdown content layer → load-bearing copy ships in the SSR HTML.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCasoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getCasoSlugs().includes(slug)) return {};
  const caso = getCaso(slug);
  return {
    title: `${caso.title} — Nautom`,
    description: caso.summary,
  };
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getCasoSlugs().includes(slug)) notFound();
  const caso = getCaso(slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <header className="max-w-2xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {caso.label}
        </p>
        <h1 className="font-display text-4xl leading-[1.05] text-ink md:text-6xl">
          {caso.title}
        </h1>
        <p className="mt-8 font-display text-xl leading-snug text-ink-2 md:text-2xl">
          {caso.thesis}
        </p>
      </header>

      <div className="mt-16 md:mt-24">
        <CaseSections sections={caso.sections} />
      </div>

      {/* Caso A's interactive piece (PR-4). Progressive enhancement: it only adds —
          the load-bearing case copy above stays server-rendered. Caso A only. */}
      {slug === "dos-verdades" && (
        <div className="mt-16 md:mt-24">
          <AgentSession />
        </div>
      )}

      <footer className="mt-20 border-t border-hairline pt-10 md:mt-28">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/contacto"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-ink"
          >
            Conversemos tu caso
          </Link>
          <Link
            href="/trabajo"
            className="text-sm text-ink-2 transition-colors hover:text-ink"
          >
            Ver todos los casos
          </Link>
        </div>
      </footer>
    </article>
  );
}

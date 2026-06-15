import Link from "next/link";

// PR-0 — foundation shell only. PR-1 replaces this with the real Home
// (hero → barra de logos → antes/después → 2 teasers de caso → CTA).
export default function Home() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3 mb-8">
        Nautom
      </p>
      <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-ink">
        Que el conocimiento de tu empresa viva en el{" "}
        <span className="italic text-accent">sistema</span>, no en las personas.
      </h1>
      <p className="mt-8 text-lg md:text-xl text-ink-2 leading-relaxed max-w-2xl">
        Las reglas de tu negocio dejan de estar en la cabeza de alguien y pasan
        a estar en el software. La operación no se frena cuando esa persona no
        está.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/contacto"
          className="text-sm font-medium bg-accent text-paper hover:bg-accent-ink px-6 py-3 rounded-full transition-colors"
        >
          Conversemos tu caso
        </Link>
        <Link
          href="/enfoque"
          className="text-sm font-medium text-ink border border-hairline hover:border-ink px-6 py-3 rounded-full transition-colors"
        >
          Ver cómo funciona
        </Link>
      </div>
    </section>
  );
}

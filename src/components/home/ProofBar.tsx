import type { Logo, ProofContent } from "@/lib/home";

/** One logo, flattened to a muted ink silhouette over paper. */
function LogoItem({ logo, hidden }: { logo: Logo; hidden?: boolean }) {
  return (
    <li
      className="mx-8 flex h-12 shrink-0 items-center justify-center md:mx-12"
      aria-hidden={hidden}
    >
      {logo.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt={hidden ? "" : logo.name}
          style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
          // Definite height so SVGs without width/height attrs resolve their
          // width from the viewBox ratio (a max-height alone leaves them sizeless).
          className="h-8 w-auto object-contain opacity-50 transition-opacity hover:opacity-75 md:h-9 [filter:brightness(0)]"
        />
      ) : (
        <span className="flex h-full items-center justify-center rounded-md border border-dashed border-hairline px-3 text-center font-mono text-[10px] uppercase leading-tight tracking-wider text-ink-3/60">
          {logo.name}
        </span>
      )}
    </li>
  );
}

/**
 * Breadth-proof logo bar (§5.3 / §5.5).
 *
 * A single row that rotates: a CSS-only marquee. Two identical copies of the logo
 * track scroll by -50% for a seamless loop — CSS-only so the logos stay in the
 * server-rendered HTML (no JS, capa-LLM §3), pause on hover, and hold still under
 * `prefers-reduced-motion`. Every logo is flattened to a uniform ink silhouette;
 * `scale` is a per-logo optical nudge to even out aspect ratios.
 */
export default function ProofBar({ content }: { content: ProofContent }) {
  return (
    <section className="border-y border-hairline bg-paper-2">
      <div className="mx-auto max-w-5xl px-6 pt-14 md:pt-20">
        <p className="mb-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
          {content.heading}
        </p>
      </div>
      {/* Full-bleed marquee with soft edge fades. */}
      <div className="marquee group relative overflow-hidden pb-14 md:pb-20 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="marquee-track flex w-max items-center">
          {content.logos.map((logo) => (
            <LogoItem key={logo.name} logo={logo} />
          ))}
          {/* Second identical copy for the seamless loop. */}
          {content.logos.map((logo) => (
            <LogoItem key={`dup-${logo.name}`} logo={logo} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}

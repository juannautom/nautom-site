import type { ProofContent } from "@/lib/home";

/**
 * Breadth-proof logo bar (§5.3 / §5.5).
 *
 * Uniformity strategy: every logo lives in an identical grid cell (5×2) and is
 * bounded by both height and width via `object-contain`, so no single wordmark can
 * dominate (the failure mode of an equal-height-only row). All logos are flattened
 * to a muted ink silhouette over paper (`brightness(0)` — the source assets are
 * white/colored from the old theme), giving uniform "form". `scale` is a per-logo
 * optical nudge to even out very different aspect ratios.
 *
 * Logos without an asset yet render as a "pendiente" slot so the full grid can be
 * tested at its real count.
 */
export default function ProofBar({ content }: { content: ProofContent }) {
  return (
    <section className="border-y border-hairline bg-paper-2">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3 text-center mb-12">
          {content.heading}
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 md:gap-y-12 items-center">
          {content.logos.map((logo) => (
            <li
              key={logo.name}
              className="flex items-center justify-center h-12 md:h-14"
            >
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={
                    logo.scale ? { transform: `scale(${logo.scale})` } : undefined
                  }
                  className="max-h-full max-w-[80%] w-auto object-contain opacity-50 hover:opacity-75 transition-opacity [filter:brightness(0)]"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-hairline px-2 text-center font-mono text-[10px] uppercase leading-tight tracking-wider text-ink-3/60">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

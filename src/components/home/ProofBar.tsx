import type { ProofContent } from "@/lib/home";

/**
 * Breadth-proof logo bar (§5.3 / §5.5). Real client logos from public/, replacing
 * Design's invented placeholders. The source SVGs are drawn in white (old dark
 * theme), so they're flattened to a muted ink silhouette via `brightness(0)` over
 * paper — the calm "trusted by" treatment, no earned accent spent here.
 */
export default function ProofBar({ content }: { content: ProofContent }) {
  return (
    <section className="border-y border-hairline bg-paper-2">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3 text-center mb-8">
          {content.heading}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {content.logos.map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-6 md:h-7 w-auto object-contain opacity-45 hover:opacity-70 transition-opacity [filter:brightness(0)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

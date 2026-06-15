import type { HeroContent } from "@/lib/home";
import { renderEmphasis } from "@/lib/markdown";
import CtaButtons from "./CtaButtons";

/** Hero — opens the single-scroll Home. Copy from §5.3, rendered server-side. */
export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3 mb-8">
        {content.eyebrow}
      </p>
      <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-ink">
        {renderEmphasis(content.title, "italic text-accent")}
      </h1>
      <p className="mt-8 text-lg md:text-xl text-ink-2 leading-relaxed max-w-2xl">
        {content.subtitle}
      </p>
      <div className="mt-10">
        <CtaButtons ctas={content.ctas} />
      </div>
    </section>
  );
}

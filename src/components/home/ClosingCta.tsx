import type { ClosingCtaContent } from "@/lib/home";
import CtaButtons from "./CtaButtons";

/** Closing CTA — ends the scroll. Primary → /contacto (§5.3). */
export default function ClosingCta({ content }: { content: ClosingCtaContent }) {
  return (
    <section className="border-t border-hairline">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <h2 className="font-display text-3xl md:text-5xl leading-tight text-ink">
          {content.title}
        </h2>
        <p className="mt-6 text-lg text-ink-2 leading-relaxed max-w-xl mx-auto">
          {content.subtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <CtaButtons ctas={content.ctas} />
        </div>
      </div>
    </section>
  );
}

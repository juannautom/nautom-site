import type { ChangeContent } from "@/lib/home";

/** El cambio (antes/después). Load-bearing copy from §5.3, server-rendered. */
export default function Change({ content }: { content: ChangeContent }) {
  const blocks = [content.before, content.after];
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3 mb-12">
        {content.label}
      </p>
      <div className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden">
        {blocks.map((block, i) => (
          <div
            key={block.label}
            className={`p-8 md:p-12 ${i === 0 ? "bg-paper-2" : "bg-paper"}`}
          >
            <p
              className={`font-mono text-xs uppercase tracking-[0.2em] mb-5 ${
                i === 0 ? "text-ink-3" : "text-accent"
              }`}
            >
              {block.label}
            </p>
            <p
              className={`font-display text-2xl md:text-3xl leading-snug ${
                i === 0 ? "text-ink-2" : "text-ink"
              }`}
            >
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

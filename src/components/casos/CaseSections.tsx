import type { Section } from "@/lib/casos";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
      {children}
    </p>
  );
}

function Prose({
  heading,
  paragraphs,
}: {
  heading?: string;
  paragraphs: string[];
}) {
  return (
    <section className="max-w-2xl">
      {heading && <Eyebrow>{heading}</Eyebrow>}
      <div className="space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink-2">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function Scale({ lead, items }: { lead: string; items: string[] }) {
  return (
    <section className="max-w-2xl">
      <p className="text-lg leading-relaxed text-ink-2">{lead}</p>
      <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="bg-paper px-6 py-8 text-center">
            <dd className="font-display text-2xl leading-tight text-ink md:text-3xl">
              {item}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Blueprint-over-paper diagram: the two layers, with operación feeding contabilidad. */
function Layers({
  heading,
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: { name: string; text: string }[];
}) {
  return (
    <section className="max-w-3xl">
      {heading && <Eyebrow>{heading}</Eyebrow>}
      {intro && (
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-ink-2">
          {intro}
        </p>
      )}
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {items.map((layer, i) => (
          <div key={layer.name} className="contents">
            <div className="rounded-xl border border-hairline bg-paper-2 p-6 md:p-8 [background-image:repeating-linear-gradient(0deg,transparent,transparent_15px,var(--color-hairline)_15px,var(--color-hairline)_16px),repeating-linear-gradient(90deg,transparent,transparent_15px,var(--color-hairline)_15px,var(--color-hairline)_16px)]">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {layer.name}
              </p>
              <p className="leading-relaxed text-ink">{layer.text}</p>
            </div>
            {/* Flow marker between the two layers (operación → contabilidad). */}
            {i === 0 && items.length > 1 && (
              <div
                className="flex items-center justify-center font-mono text-ink-3"
                aria-hidden
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Invariant({
  heading,
  text,
  note,
}: {
  heading?: string;
  text: string;
  note?: string;
}) {
  return (
    <section className="max-w-2xl border-l-2 border-accent pl-6 md:pl-8">
      {heading && <Eyebrow>{heading}</Eyebrow>}
      <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
        {text}
      </p>
      {note && <p className="mt-4 leading-relaxed text-ink-2">{note}</p>}
    </section>
  );
}

function Payoff({ text }: { text: string }) {
  return (
    <section className="max-w-2xl">
      <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
        {text}
      </p>
    </section>
  );
}

/** Render an ordered list of case sections — one renderer for both cases. */
export default function CaseSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {sections.map((section, i) => {
        switch (section.kind) {
          case "prose":
            return (
              <Prose
                key={i}
                heading={section.heading}
                paragraphs={section.paragraphs}
              />
            );
          case "scale":
            return <Scale key={i} lead={section.lead} items={section.items} />;
          case "layers":
            return (
              <Layers
                key={i}
                heading={section.heading}
                intro={section.intro}
                items={section.items}
              />
            );
          case "invariant":
            return (
              <Invariant
                key={i}
                heading={section.heading}
                text={section.text}
                note={section.note}
              />
            );
          case "payoff":
            return <Payoff key={i} text={section.text} />;
        }
      })}
    </div>
  );
}

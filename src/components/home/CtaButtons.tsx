import Link from "next/link";
import type { Cta } from "@/lib/home";

const styles: Record<Cta["variant"], string> = {
  primary:
    "bg-accent text-paper hover:bg-accent-ink px-6 py-3 rounded-full transition-colors",
  secondary:
    "text-ink border border-hairline hover:border-ink px-6 py-3 rounded-full transition-colors",
};

/** The hero/closing CTA pair. Primary leads to /contacto; never "demo" (§5.3). */
export default function CtaButtons({ ctas }: { ctas: Cta[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {ctas.map((cta) => (
        <Link
          key={cta.href}
          href={cta.href}
          className={`text-sm font-medium ${styles[cta.variant]}`}
        >
          {cta.label}
        </Link>
      ))}
    </div>
  );
}

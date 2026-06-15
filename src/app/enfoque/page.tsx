import type { Metadata } from "next";
import { getPagina } from "@/lib/paginas";
import Essay from "@/components/paginas/Essay";

// Enfoque — el ensayo del concepto (§5.4, PR-3). Server Component reading the
// markdown content layer → load-bearing copy ships in the SSR HTML (§3).
const enfoque = getPagina("enfoque");

export const metadata: Metadata = {
  title: `${enfoque.eyebrow} — Nautom`,
  description: enfoque.summary,
  alternates: { canonical: "/enfoque" },
};

export default function EnfoquePage() {
  return <Essay content={enfoque} />;
}

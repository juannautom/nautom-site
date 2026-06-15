import type { Metadata } from "next";
import { getPagina } from "@/lib/paginas";
import Essay from "@/components/paginas/Essay";

// Nosotros — el modelo operativo como prueba (§5.4, PR-3). Server Component reading
// the markdown content layer → load-bearing copy ships in the SSR HTML (§3). The
// old /about route was removed; the 301 /about→/nosotros is added in PR-5.
const nosotros = getPagina("nosotros");

export const metadata: Metadata = {
  title: `${nosotros.eyebrow} — Nautom`,
  description: nosotros.summary,
};

export default function NosotrosPage() {
  return <Essay content={nosotros} />;
}

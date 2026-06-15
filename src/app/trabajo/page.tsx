import type { Metadata } from "next";
import { getTrabajoIndex } from "@/lib/trabajo";
import TrabajoIndex from "@/components/trabajo/TrabajoIndex";

// Trabajo — índice (§2 / §5.3, PR-3): 2 casos profundos linkeables + 4 proyectos
// livianos (logo + línea, sin página). Server Component reading the markdown
// content layer → load-bearing copy ships in the SSR HTML (§3).
const trabajo = getTrabajoIndex();

export const metadata: Metadata = {
  title: "Trabajo — Nautom",
  description: trabajo.intro,
  alternates: { canonical: "/trabajo" },
};

export default function TrabajoPage() {
  return <TrabajoIndex content={trabajo} />;
}

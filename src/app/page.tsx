import { getHomeContent } from "@/lib/home";
import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import Change from "@/components/home/Change";
import CaseTeasers from "@/components/home/CaseTeasers";
import ClosingCta from "@/components/home/ClosingCta";

// Home — un solo scroll, alimentado por la capa de contenido markdown
// (content/es/home/*). Server Component: el copy se lee en build y viaja en el
// HTML server-rendered (hero → logos → antes/después → 2 teasers → CTA).
export default function Home() {
  const { hero, proof, change, cases, closing } = getHomeContent();

  return (
    <>
      <Hero content={hero} />
      <ProofBar content={proof} />
      <Change content={change} />
      <CaseTeasers cases={cases} />
      <ClosingCta content={closing} />
    </>
  );
}

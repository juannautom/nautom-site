import type { Metadata } from "next";
import { getHomeContent } from "@/lib/home";
import { getFaq } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import Change from "@/components/home/Change";
import CaseTeasers from "@/components/home/CaseTeasers";
import ClosingCta from "@/components/home/ClosingCta";

// Canonical for the Home route, server-rendered in <head> (PR-5).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Home — un solo scroll, alimentado por la capa de contenido markdown
// (content/es/home/*). Server Component: el copy se lee en build y viaja en el
// HTML server-rendered (hero → logos → antes/después → 2 teasers → CTA).
export default function Home() {
  const { hero, proof, change, cases, closing } = getHomeContent();

  return (
    <>
      {/* FAQPage structured data (PR-5) — Home is the most-cited surface. */}
      <JsonLd data={faqPageJsonLd(getFaq())} />
      <Hero content={hero} />
      <ProofBar content={proof} />
      <Change content={change} />
      <CaseTeasers cases={cases} />
      <ClosingCta content={closing} />
    </>
  );
}

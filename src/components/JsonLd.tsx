import type { JsonLdObject } from "@/lib/jsonld";

/**
 * Renders a JSON-LD block into the server-rendered HTML (spec §6 PR-5). Server
 * Component → the structured data ships in the initial HTML, never injected by JS,
 * same SSR requirement as the rest of the capa-LLM (§3).
 *
 * `<` is escaped to `<` so a value can never close the <script> early.
 */
export default function JsonLd({ data }: { data: JsonLdObject }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

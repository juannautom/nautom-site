/**
 * 301 map of the OLD site's live URLs → their new home (spec §6 PR-5).
 *
 * This is the single source of truth: `next.config.ts` wires it into the server's
 * `redirects()` and `scripts/check-redirects.mjs` walks it to assert every old URL
 * resolves 301 → new. A missing or mis-pointed redirect = a dead inbound URL = SEO
 * lost, so the inventory is treated as exhaustive, not "the ones I remember".
 *
 * Inventory source (cross-checked, two sources agree):
 *   - the OLD sitemap (`main:src/app/sitemap.ts`) listed `/`, `/about`, `/contact`;
 *   - the OLD app routes (`main:src/app/**`) were `/`, `/about`, `/contact`
 *     (+ the `/api/contact` POST endpoint, not a navigable URL → no 301).
 *   `/` exists in both old and new → it stays (no redirect). The other two old URLs
 *   no longer exist in the new app, so without a 301 they 404.
 *
 * Status code is an explicit **301** (not Next's `permanent: true`, which emits 308)
 * because the acceptance criterion and the check assert 301.
 */
export type Redirect = {
  /** Old path that must keep resolving (301) for inbound links / SEO. */
  from: string;
  /** New path it lands on. */
  to: string;
};

export const REDIRECTS: readonly Redirect[] = [
  // The old "Nosotros" lived at /about; the revamp moved it to /nosotros (§5.5, CONTEXT).
  { from: "/about", to: "/nosotros" },
  // The old contact route was English-cased /contact; the revamp uses /contacto.
  { from: "/contact", to: "/contacto" },
];

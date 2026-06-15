import type { NextConfig } from "next";
import { REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  // 301 map of the old site's live URLs → their new home (spec §6 PR-5). Single
  // source of truth in src/lib/redirects.ts; `scripts/check-redirects.mjs` walks the
  // same map against the running server. `statusCode: 301` (not `permanent: true`,
  // which would emit 308) because the acceptance criterion asserts 301.
  async redirects() {
    return REDIRECTS.map(({ from, to }) => ({
      source: from,
      destination: to,
      statusCode: 301,
    }));
  },
};

export default nextConfig;

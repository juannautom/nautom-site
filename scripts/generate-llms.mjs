#!/usr/bin/env node
/**
 * Generate `public/llms.txt` and `public/llms-full.txt` from the markdown content
 * layer (spec §6 PR-5). Deterministic: the builders live in `src/lib/llms.ts` and
 * read the same loaders the pages render from — so the files are derived, never
 * hardcoded. Node strips the TS types at runtime (same trick as the smoke check).
 *
 *   node scripts/generate-llms.mjs
 *
 * Run this whenever the content changes; commit the result. `npm run check:llms`
 * regenerates in memory and fails on any drift.
 */
import fs from "node:fs";
import path from "node:path";
import { buildLlmsTxt, buildLlmsFullTxt } from "./lib/llms-content.mjs";

const PUBLIC = path.join(process.cwd(), "public");

const outputs = [
  { name: "llms.txt", content: buildLlmsTxt() },
  { name: "llms-full.txt", content: buildLlmsFullTxt() },
];

for (const { name, content } of outputs) {
  const file = path.join(PUBLIC, name);
  fs.writeFileSync(file, content);
  console.log(`✓ wrote ${name} (${content.length} bytes)`);
}

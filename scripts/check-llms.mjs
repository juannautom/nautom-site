#!/usr/bin/env node
/**
 * Invariant: `llms.txt` / `llms-full.txt` are DERIVED from the markdown, not hardcoded
 * (spec §6 — "llms.txt deriva del contenido").
 *
 * Regenerates both files in memory from `src/lib/llms.ts` (the same builders the
 * generator uses) and diffs byte-for-byte against the committed `public/` files.
 * Drift = fail. It knows how to fail two ways:
 *   - someone edits `public/llms.txt` by hand (hardcodes) → bytes differ → exit 1;
 *   - someone changes the content markdown but forgets to regenerate → bytes differ → exit 1.
 * The fix in both cases is `npm run llms:gen` (and committing the result).
 *
 *   node scripts/check-llms.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { buildLlmsTxt, buildLlmsFullTxt } from "./lib/llms-content.mjs";

const PUBLIC = path.join(process.cwd(), "public");

const targets = [
  { name: "llms.txt", expected: buildLlmsTxt() },
  { name: "llms-full.txt", expected: buildLlmsFullTxt() },
];

function firstDiff(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) {
      const ctx = (s) => JSON.stringify(s.slice(Math.max(0, i - 30), i + 30));
      return `byte ${i}: committed ${ctx(a)} vs regenerated ${ctx(b)}`;
    }
  }
  return `length differs: committed ${a.length} vs regenerated ${b.length}`;
}

let failed = false;
for (const { name, expected } of targets) {
  const file = path.join(PUBLIC, name);
  if (!fs.existsSync(file)) {
    console.error(`✗ ${name} missing from public/ — run: npm run llms:gen`);
    failed = true;
    continue;
  }
  const committed = fs.readFileSync(file, "utf8");
  if (committed !== expected) {
    console.error(`✗ ${name} drifted from the markdown (hardcoded or stale).`);
    console.error(`  ${firstDiff(committed, expected)}`);
    console.error(`  fix: npm run llms:gen`);
    failed = true;
  } else {
    console.log(`✓ ${name} matches the markdown (${committed.length} bytes, no drift)`);
  }
}

if (failed) {
  console.error("\n✗ llms.txt derivation check FAILED");
  process.exit(1);
}
console.log("\n✓ llms.txt/llms-full.txt derive from the markdown — no drift.");

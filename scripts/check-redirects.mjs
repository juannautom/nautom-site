#!/usr/bin/env node
/**
 * Invariant: every old URL resolves 301 → its new home (spec §6 — "Redirects").
 *
 * Starts the production server (`next start`, requires a prior `next build`) and walks
 * the 301 map (`src/lib/redirects.ts` — the same map next.config.ts wires in), fetching
 * each old URL with `redirect: "manual"`. For each it asserts:
 *   - HTTP status is exactly 301, and
 *   - the `Location` header points at the expected new path.
 * It knows how to fail: a missing redirect returns 200/404 (not 301), and a
 * mis-pointed one returns the wrong Location → exit 1, naming the offender.
 *
 *   node scripts/check-redirects.mjs
 */
import { spawn } from "node:child_process";
import { REDIRECTS } from "../src/lib/redirects.ts";

const PORT = Number(process.env.REDIRECT_CHECK_PORT ?? 4188);
const ORIGIN = `http://127.0.0.1:${PORT}`;

function fail(msg) {
  console.error(`\n✗ Redirects FAILED: ${msg}`);
  process.exit(1);
}

async function waitForReady(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN + "/", { cache: "no-store" });
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server did not become ready on ${ORIGIN} in time`);
}

/** Resolve a Location header (absolute or relative) down to a pathname. */
function locationPath(location, requestUrl) {
  if (!location) return null;
  try {
    return new URL(location, requestUrl).pathname;
  } catch {
    return location;
  }
}

async function main() {
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  let serverLog = "";
  server.stdout.on("data", (d) => (serverLog += d));
  server.stderr.on("data", (d) => (serverLog += d));

  const cleanup = () => {
    if (!server.killed) server.kill("SIGTERM");
  };
  process.on("exit", cleanup);

  try {
    await waitForReady();

    const problems = [];
    for (const { from, to } of REDIRECTS) {
      const url = ORIGIN + from;
      const res = await fetch(url, { redirect: "manual", cache: "no-store" });
      const loc = locationPath(res.headers.get("location"), url);
      if (res.status !== 301) {
        problems.push(`${from}: expected 301, got ${res.status}`);
      } else if (loc !== to) {
        problems.push(`${from}: 301 → "${loc}", expected "${to}"`);
      } else {
        console.log(`  ✓ ${from} → 301 → ${to}`);
      }
    }

    if (problems.length > 0) {
      for (const p of problems) console.error(`  · ${p}`);
      cleanup();
      fail(`${problems.length} redirect(s) missing or mis-pointed`);
    }

    console.log(
      `\n✓ Redirects OK: ${REDIRECTS.length} old URL(s) resolve 301 → new.`,
    );
    cleanup();
    process.exit(0);
  } catch (err) {
    console.error(serverLog);
    cleanup();
    fail(err instanceof Error ? err.message : String(err));
  }
}

main();

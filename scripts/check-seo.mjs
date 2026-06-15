#!/usr/bin/env node
/**
 * Invariant: canonicals + JSON-LD are present and valid in the SERVER-rendered HTML
 * (spec §6 PR-5 — capa-LLM). Both are head-level SEO that the spec requires server-
 * rendered, never JS-injected, so the check reads the raw HTML at fetch time.
 *
 * Starts the production server (`next start`, requires a prior `next build`) and for
 * each route asserts:
 *   - a <link rel="canonical"> pointing at the route's absolute URL, and
 *   - the expected JSON-LD blocks: every <script type="application/ld+json"> parses,
 *     uses @context https://schema.org, and the required @type(s) are present and
 *     structurally well-formed — Organization (global), CreativeWork (×2, one per
 *     deep case), FAQPage (Home).
 * It knows how to fail: a missing/typo'd canonical, a type that drops to client
 * rendering (vanishes from the initial HTML), unparseable JSON, or a malformed
 * type → exit 1, naming the offender.
 *
 *   node scripts/check-seo.mjs
 */
import { spawn } from "node:child_process";

const PORT = Number(process.env.SEO_CHECK_PORT ?? 4189);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const SITE = "https://nautom.com";

const ROUTES = [
  // Next normalizes canonical "/" against metadataBase to the bare origin (no slash).
  { path: "/", canonical: `${SITE}`, types: ["Organization", "FAQPage"] },
  { path: "/enfoque", canonical: `${SITE}/enfoque`, types: ["Organization"] },
  { path: "/nosotros", canonical: `${SITE}/nosotros`, types: ["Organization"] },
  { path: "/trabajo", canonical: `${SITE}/trabajo`, types: ["Organization"] },
  {
    path: "/trabajo/dos-verdades",
    canonical: `${SITE}/trabajo/dos-verdades`,
    types: ["Organization", "CreativeWork"],
  },
  {
    path: "/trabajo/tener-todo-a-la-vista",
    canonical: `${SITE}/trabajo/tener-todo-a-la-vista`,
    types: ["Organization", "CreativeWork"],
  },
  { path: "/contacto", canonical: `${SITE}/contacto`, types: ["Organization"] },
];

function fail(msg) {
  console.error(`\n✗ SEO (canonicals + JSON-LD) FAILED: ${msg}`);
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

function extractCanonical(html) {
  const tag = html.match(/<link[^>]*rel="canonical"[^>]*>/i);
  if (!tag) return null;
  const href = tag[0].match(/href="([^"]*)"/i);
  return href ? href[1] : null;
}

function extractJsonLd(html) {
  const blocks = [];
  const re =
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) blocks.push(m[1]);
  return blocks;
}

/** Validate the structural shape of one schema.org object. Returns an error string or null. */
function validateType(obj) {
  if (obj["@context"] !== "https://schema.org") {
    return `@context must be "https://schema.org", got ${JSON.stringify(obj["@context"])}`;
  }
  const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;
  switch (obj["@type"]) {
    case "Organization":
      if (!nonEmpty(obj.name) || !nonEmpty(obj.url))
        return "Organization needs non-empty name + url";
      return null;
    case "CreativeWork":
      if (!nonEmpty(obj.name) || !nonEmpty(obj.headline) || !nonEmpty(obj.url))
        return "CreativeWork needs non-empty name + headline + url";
      return null;
    case "FAQPage": {
      if (!Array.isArray(obj.mainEntity) || obj.mainEntity.length === 0)
        return "FAQPage needs a non-empty mainEntity array";
      for (const q of obj.mainEntity) {
        if (q["@type"] !== "Question" || !nonEmpty(q.name))
          return "each FAQ entry must be a Question with a name";
        const a = q.acceptedAnswer;
        if (!a || a["@type"] !== "Answer" || !nonEmpty(a.text))
          return "each Question needs an acceptedAnswer Answer with text";
      }
      return null;
    }
    default:
      return null; // unknown types aren't asserted against
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
    const creativeWorkUrls = new Set();
    let canonicalsOk = 0;
    let typesOk = 0;

    for (const route of ROUTES) {
      const html = await (
        await fetch(ORIGIN + route.path, { cache: "no-store" })
      ).text();

      // Canonical
      const canonical = extractCanonical(html);
      if (canonical !== route.canonical) {
        problems.push(
          `${route.path}: canonical "${canonical}", expected "${route.canonical}"`,
        );
      } else {
        canonicalsOk += 1;
      }

      // JSON-LD: parse every block, index by @type
      const byType = new Map();
      for (const raw of extractJsonLd(html)) {
        let obj;
        try {
          obj = JSON.parse(raw);
        } catch (e) {
          problems.push(`${route.path}: unparseable JSON-LD (${e.message})`);
          continue;
        }
        const err = validateType(obj);
        if (err) {
          problems.push(`${route.path}: invalid ${obj["@type"]} — ${err}`);
          continue;
        }
        byType.set(obj["@type"], obj);
        if (obj["@type"] === "CreativeWork") creativeWorkUrls.add(obj.url);
      }

      for (const t of route.types) {
        if (!byType.has(t)) {
          problems.push(`${route.path}: missing valid ${t} JSON-LD`);
        } else {
          typesOk += 1;
        }
      }
    }

    // CreativeWork ×2: two distinct case studies.
    if (creativeWorkUrls.size < 2) {
      problems.push(
        `expected 2 distinct CreativeWork (one per deep case), found ${creativeWorkUrls.size}`,
      );
    }

    if (problems.length > 0) {
      for (const p of problems) console.error(`  · ${p}`);
      cleanup();
      fail(`${problems.length} problem(s)`);
    }

    console.log(
      `\n✓ SEO OK: ${canonicalsOk} canonical(s) + ${typesOk} JSON-LD type(s) valid in SSR HTML ` +
        `across ${ROUTES.length} route(s); ${creativeWorkUrls.size} distinct CreativeWork.`,
    );
    for (const r of ROUTES) console.log(`    · ${r.path}`);
    cleanup();
    process.exit(0);
  } catch (err) {
    console.error(serverLog);
    cleanup();
    fail(err instanceof Error ? err.message : String(err));
  }
}

main();

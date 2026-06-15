#!/usr/bin/env node
/**
 * SSR-presence check (spec §6 — "Invariantes").
 *
 * Starts the production server (`next start`, requires a prior `next build`),
 * fetches the raw HTML of `/`, and asserts the load-bearing copy — the hero and
 * the antes/después — is present in the server-rendered markup WITHOUT executing
 * any JS. This is a requirement of the capa-LLM, not an optimization (§3).
 *
 * The expected phrases are read from the SAME markdown content layer the page
 * renders from, so the check tracks the content and cannot drift. It knows how to
 * fail: if a section moves to client-side rendering (copy injected by JS), the
 * phrases vanish from the initial HTML and this exits non-zero.
 *
 *   node scripts/check-ssr-presence.mjs
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PORT = Number(process.env.SSR_CHECK_PORT ?? 4187);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const HOME = path.join(process.cwd(), "content", "es", "home");

/** Read frontmatter for a Home section. */
function section(slug) {
  return matter(fs.readFileSync(path.join(HOME, `${slug}.md`), "utf8")).data;
}

/**
 * Build the list of contiguous text fragments that MUST appear in the HTML.
 * The hero title is split on `*emphasis*` because the emphasized word renders
 * inside its own <em>, breaking the surrounding text into separate nodes — same
 * split renderEmphasis() does. Each non-trivial fragment must survive into HTML.
 */
function expectedPhrases() {
  const hero = section("hero");
  const change = section("change");

  const titleFragments = hero.title
    .split(/\*([^*]+)\*/g)
    .map((s) => s.trim())
    .filter((s) => s.length >= 4);

  return [
    { where: "hero.title", phrases: titleFragments },
    { where: "hero.subtitle", phrases: [hero.subtitle] },
    { where: "change.before", phrases: [change.before.text] },
    { where: "change.after", phrases: [change.after.text] },
  ];
}

function fail(msg) {
  console.error(`\n✗ SSR-presence FAILED: ${msg}`);
  process.exit(1);
}

async function waitForReady(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN + "/", { cache: "no-store" });
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server did not become ready on ${ORIGIN} in time`);
}

async function main() {
  const expected = expectedPhrases();

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
    const raw = await (await fetch(ORIGIN + "/", { cache: "no-store" })).text();

    // Strip <script> blocks before searching. Next serializes client-component
    // props into the RSC flight payload (`self.__next_f.push(...)`) inside
    // <script> tags — so a string can appear there even when the visible DOM
    // renders it client-side only. We require the copy in the actual rendered
    // markup, so the check fails if a section moves to client rendering.
    const html = raw.replace(/<script[\s\S]*?<\/script>/gi, "");

    const missing = [];
    for (const { where, phrases } of expected) {
      for (const phrase of phrases) {
        if (!html.includes(phrase)) missing.push({ where, phrase });
      }
    }

    if (missing.length > 0) {
      for (const m of missing) {
        console.error(`  · missing [${m.where}]: "${m.phrase}"`);
      }
      cleanup();
      fail(
        `${missing.length} load-bearing phrase(s) not found in server-rendered HTML of /`,
      );
    }

    const checked = expected.reduce((n, e) => n + e.phrases.length, 0);
    console.log(
      `\n✓ SSR-presence OK: ${checked} load-bearing phrase(s) present in server-rendered HTML of / (no JS).`,
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

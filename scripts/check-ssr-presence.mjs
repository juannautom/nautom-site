#!/usr/bin/env node
/**
 * SSR-presence check (spec §6 — "Invariantes").
 *
 * Starts the production server (`next start`, requires a prior `next build`),
 * fetches the raw HTML of each route, and asserts the load-bearing copy is present
 * in the server-rendered markup WITHOUT executing any JS. This is a requirement of
 * the capa-LLM, not an optimization (§3).
 *
 * Covered routes:
 *   /                                  hero + antes/después (PR-1)
 *   /trabajo/dos-verdades              tesis, dos capas, invariante, payoff (PR-2)
 *   /trabajo/tener-todo-a-la-vista     tesis, datos de escala, hilos, payoff (PR-2)
 *   /enfoque                           el ensayo del concepto, §5.4 (PR-3)
 *   /nosotros                          el modelo operativo, §5.4 (PR-3)
 *   /trabajo                           intro + tesis de los 2 casos + 4 líneas (PR-3)
 *
 * Expected phrases are read from the SAME markdown content layer the pages render
 * from, so the check tracks the content and cannot drift. It knows how to fail: if
 * a section moves to client-side rendering (copy injected by JS), the phrases vanish
 * from the initial HTML and this exits non-zero.
 *
 *   node scripts/check-ssr-presence.mjs
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PORT = Number(process.env.SSR_CHECK_PORT ?? 4187);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const CONTENT = path.join(process.cwd(), "content", "es");

function frontmatter(...segments) {
  const file = path.join(CONTENT, ...segments) + ".md";
  return matter(fs.readFileSync(file, "utf8")).data;
}

/**
 * Home (`/`). The hero title is split on `*emphasis*` because the emphasized word
 * renders inside its own <em>, breaking the surrounding text into separate nodes —
 * same split renderEmphasis() does. Each non-trivial fragment must survive to HTML.
 */
function homeRoute() {
  const hero = frontmatter("home", "hero");
  const change = frontmatter("home", "change");
  const titleFragments = hero.title
    .split(/\*([^*]+)\*/g)
    .map((s) => s.trim())
    .filter((s) => s.length >= 4);
  return {
    path: "/",
    checks: [
      { where: "hero.title", phrases: titleFragments },
      { where: "hero.subtitle", phrases: [hero.subtitle] },
      { where: "change.before", phrases: [change.before.text] },
      { where: "change.after", phrases: [change.after.text] },
    ],
  };
}

/** A deep case route: thesis + the load-bearing copy of every section. */
function casoRoute(slug) {
  const caso = frontmatter("casos", slug);
  const phrases = [caso.thesis];
  for (const s of caso.sections) {
    if (s.kind === "prose") phrases.push(s.paragraphs[0]);
    if (s.kind === "scale") phrases.push(...s.items);
    if (s.kind === "layers") for (const l of s.items) phrases.push(l.text);
    if (s.kind === "invariant") phrases.push(s.text);
    if (s.kind === "payoff") phrases.push(s.text);
  }
  return {
    path: `/trabajo/${slug}`,
    checks: [{ where: `caso:${slug}`, phrases }],
  };
}

/** An essay page (Enfoque / Nosotros): every §5.4 paragraph is load-bearing. */
function paginaRoute(slug) {
  const pagina = frontmatter("paginas", slug);
  return {
    path: `/${slug}`,
    checks: [{ where: `pagina:${slug}`, phrases: pagina.paragraphs }],
  };
}

/**
 * Trabajo index (`/trabajo`). The intro, the thesis of each deep case (pulled from
 * the `casos` collection, the index's single source of truth) and the 4 light-project
 * lines must all survive to the server-rendered HTML.
 */
function trabajoIndexRoute() {
  const index = frontmatter("trabajo", "index");
  const phrases = [index.intro];
  for (const slug of ["dos-verdades", "tener-todo-a-la-vista"]) {
    phrases.push(frontmatter("casos", slug).thesis);
  }
  for (const project of index.light) phrases.push(project.line);
  return {
    path: "/trabajo",
    checks: [{ where: "trabajo:index", phrases }],
  };
}

const ROUTES = [
  homeRoute(),
  casoRoute("dos-verdades"),
  casoRoute("tener-todo-a-la-vista"),
  paginaRoute("enfoque"),
  paginaRoute("nosotros"),
  trabajoIndexRoute(),
];

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

/**
 * Strip <script> blocks before searching. Next serializes client-component props
 * into the RSC flight payload (`self.__next_f.push(...)`) inside <script> tags — so
 * a string can appear there even when the visible DOM renders it client-side only.
 * We require the copy in the actual rendered markup, so the check fails if a section
 * moves to client rendering.
 */
async function fetchRenderedMarkup(routePath) {
  const raw = await (
    await fetch(ORIGIN + routePath, { cache: "no-store" })
  ).text();
  return raw.replace(/<script[\s\S]*?<\/script>/gi, "");
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

    const missing = [];
    let checked = 0;
    for (const route of ROUTES) {
      const html = await fetchRenderedMarkup(route.path);
      for (const { where, phrases } of route.checks) {
        for (const phrase of phrases) {
          checked += 1;
          if (!html.includes(phrase)) {
            missing.push({ route: route.path, where, phrase });
          }
        }
      }
    }

    if (missing.length > 0) {
      for (const m of missing) {
        console.error(`  · missing [${m.route} ${m.where}]: "${m.phrase}"`);
      }
      cleanup();
      fail(
        `${missing.length} load-bearing phrase(s) not found in server-rendered HTML`,
      );
    }

    console.log(
      `\n✓ SSR-presence OK: ${checked} load-bearing phrase(s) present in the server-rendered HTML of ${ROUTES.length} route(s) (no JS).`,
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

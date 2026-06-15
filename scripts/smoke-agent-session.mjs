#!/usr/bin/env node
/**
 * Smoke check for the "Sesión del agente" widget (PR-4, spec §6).
 *
 * Drives the SAME state machine the React component uses (`src/lib/agentSession.ts`,
 * imported directly — Node strips the TS types at runtime) through every step, with
 * no DOM. It asserts two things the acceptance criteria call out:
 *
 *   1. The machine mounts and advances ALL its steps without throwing. It knows how
 *      to fail: `stepAt` throws on a bad index, the walk is bounded, and any thrown
 *      step or malformed transition exits non-zero.
 *
 *   2. No step violates the voice rule (§5.1): no `§`, no math notation (∀, subscripts),
 *      no English guard names, no logs. This is the surface where §5.1 is easiest to
 *      break, so the check is deliberately strict and prints what it rejected.
 *
 *   node scripts/smoke-agent-session.mjs
 */
import {
  FIRST_STEP,
  STEP_COUNT,
  isLastStep,
  nextStep,
  stepAt,
} from "../src/lib/agentSession.ts";

function fail(msg) {
  console.error(`\n✗ smoke FAILED: ${msg}`);
  process.exit(1);
}

// §5.1 voice rule. Anything matching here means the technical layer leaked onto a
// sales surface — exactly the failure mode the spec flags as load-bearing.
const FORBIDDEN = [
  { re: /§/, why: "símbolo § (no va en superficies de entrada)" },
  { re: /[∀∃⇒≠⇐∈]/, why: "notación matemática" },
  { re: /[₀-₉]/, why: "subíndices tipo m₁ / m₂" },
  {
    re: /\b(state[\s-]?machine|ledger|guard|invariant|immutable|cross[\s-]?currency|op-state)\b/i,
    why: "nombre técnico / de regla en inglés",
  },
  { re: /§?\d{2}\s+(LEE|CONSTRUYE|VALIDA)/, why: "log tipo §00 LEE" },
  { re: /`[^`]+`/, why: "identificador entre backticks (parece código)" },
];

function checkVoice(where, text) {
  for (const { re, why } of FORBIDDEN) {
    if (re.test(text)) {
      fail(`${where} viola §5.1 (${why}): "${text}"`);
    }
  }
}

// The order the cycle must follow: propone mal → frena → corrige → listo.
const EXPECTED_STATUSES = [
  "intro",
  "propuesta",
  "frenado",
  "correccion",
  "listo",
];

function main() {
  console.log("• Sesión del agente — smoke check\n");

  if (STEP_COUNT < 3) {
    fail(`el ciclo necesita al menos 3 pasos (propone → frena → corrige); hay ${STEP_COUNT}`);
  }

  const seenStatuses = [];
  let index = FIRST_STEP;
  let guard = 0;

  // Walk from the first step to the last, advancing exactly as the component does.
  while (true) {
    if (guard++ > STEP_COUNT + 2) {
      fail("la máquina no terminó: nextStep no converge al último paso");
    }

    let step;
    try {
      step = stepAt(index); // throws on an out-of-range index
    } catch (err) {
      fail(`stepAt(${index}) tiró: ${err instanceof Error ? err.message : err}`);
    }

    // Every step must read as plain language.
    checkVoice(`paso ${index + 1} (tag)`, step.tag);
    checkVoice(`paso ${index + 1} (línea)`, step.line);
    if (!step.line || step.line.trim().length === 0) {
      fail(`paso ${index + 1} no tiene línea visible`);
    }

    const last = isLastStep(index);
    // Only the last step has no advance action; the rest must offer one.
    if (last && step.action !== null) {
      fail(`el último paso no debería tener botón de avance (action="${step.action}")`);
    }
    if (!last && (!step.action || step.action.trim().length === 0)) {
      fail(`el paso ${index + 1} no es el último y no tiene botón de avance`);
    }

    seenStatuses.push(step.status);
    console.log(`  ✓ paso ${index + 1}/${STEP_COUNT} · ${step.status.padEnd(11)} · ${step.line}`);

    if (last) break;
    index = nextStep(index);
  }

  // The whole cycle ran, in the right order.
  if (seenStatuses.length !== STEP_COUNT) {
    fail(`se recorrieron ${seenStatuses.length} pasos, se esperaban ${STEP_COUNT}`);
  }
  if (seenStatuses.join(",") !== EXPECTED_STATUSES.join(",")) {
    fail(
      `el orden del ciclo no es el esperado.\n  esperado: ${EXPECTED_STATUSES.join(" → ")}\n  obtenido: ${seenStatuses.join(" → ")}`,
    );
  }

  console.log(
    `\n✓ smoke OK: la máquina montó y avanzó sus ${STEP_COUNT} pasos sin error, ` +
      `en idioma plano (§5.1) y en el orden propone → frena → corrige → listo.`,
  );
  process.exit(0);
}

main();

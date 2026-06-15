/**
 * "Sesión del agente" — state machine (PR-4, spec §4 + §6).
 *
 * The one interactive piece of the revamp. It lives on the Caso A page and shows,
 * in plain language, the cycle that makes the system trustworthy:
 *   el agente propone algo mal → el sistema lo frena → lo corrige.
 *
 * Treatment is the "panel de validación en vivo" (variant B of Design's exploration),
 * simplified to advance one step at a time.
 *
 * Two things are load-bearing here:
 *
 *  1. Voice (§5.1). This is where the rule is easiest to break. Every line reads the
 *     way you'd say it to a PyME owner. NO English guard names, NO `§`, NO notation
 *     (`∀ / m₁`), NO logs (`§00 LEE · §01 CONSTRUYE`). The smoke check enforces this.
 *
 *  2. This module is pure and framework-agnostic on purpose — it carries the machine
 *     logic adapted from Design's bundle, with no React. The component is a thin shell
 *     over it, and the smoke check drives the same machine without a DOM.
 *
 * Note: Design's original JS asset (referenced in the spec) was not present in this
 * workspace (searched the repo, every branch, git history and sibling workspaces).
 * This machine reconstructs the documented behavior; see CONTEXT.md / spec §6.
 */

/** Where the panel is in the cycle. Drives the visual treatment, never shown raw. */
export type StepStatus =
  | "intro"
  | "propuesta"
  | "frenado"
  | "correccion"
  | "listo";

export type AgentStep = {
  status: StepStatus;
  /** Small label for the panel header — plain Spanish, no notation. */
  tag: string;
  /** The plain-language line the reader sees. One idea, short (§5.1). */
  line: string;
  /** Label for the button that advances to the next step (`null` on the last). */
  action: string | null;
};

/**
 * The cycle, in order. The example is Caso A's own rule (the cross-currency one from
 * §5.1), told plainly: a peso debt can't be settled with a dollar credit, and the
 * system holds that line on its own — so the last step lands back on the case's thesis.
 */
export const AGENT_SESSION_STEPS: AgentStep[] = [
  {
    status: "intro",
    tag: "Sesión del agente",
    line: "El agente está por registrar un movimiento en el sistema. Mirá lo que pasa cuando se equivoca.",
    action: "Empezar",
  },
  {
    status: "propuesta",
    tag: "El agente propone",
    line: "Quiere saldar una deuda en pesos usando un crédito en dólares.",
    action: "Ver qué hace el sistema",
  },
  {
    status: "frenado",
    tag: "El sistema lo frena",
    line: "Una deuda en pesos no se salda con un crédito en dólares. El sistema no lo deja, aunque el agente insista.",
    action: "Ver cómo sigue",
  },
  {
    status: "correccion",
    tag: "El agente corrige",
    line: "Vuelve atrás y salda la deuda con un pago en la misma moneda. Esta vez la regla se cumple.",
    action: "Ver el resultado",
  },
  {
    status: "listo",
    tag: "Listo",
    line: "El movimiento queda registrado y la contabilidad sigue sana. Nadie tuvo que acordarse de la regla: el sistema la sostiene solo.",
    action: null,
  },
];

/** Index of the first step. The machine always starts here. */
export const FIRST_STEP = 0;

/** Total number of steps in the cycle. */
export const STEP_COUNT = AGENT_SESSION_STEPS.length;

/** True once `index` is the final step (no further `action`). */
export function isLastStep(index: number): boolean {
  return index >= STEP_COUNT - 1;
}

/** The next index, clamped so it never runs past the last step. */
export function nextStep(index: number): number {
  return Math.min(index + 1, STEP_COUNT - 1);
}

/** The step at `index`. Throws on an out-of-range index (the smoke check relies on this). */
export function stepAt(index: number): AgentStep {
  const step = AGENT_SESSION_STEPS[index];
  if (!step) {
    throw new RangeError(`agentSession: no hay un paso en la posición ${index}`);
  }
  return step;
}

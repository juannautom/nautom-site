"use client";

import { useState } from "react";
import {
  AGENT_SESSION_STEPS,
  FIRST_STEP,
  STEP_COUNT,
  isLastStep,
  nextStep,
  stepAt,
} from "@/lib/agentSession";

/**
 * Caso A's interactive piece (PR-4). Progressive enhancement over the server-rendered
 * case copy: the page's load-bearing copy (thesis, invariante, dos capas) stays in the
 * SSR HTML — this widget only *adds*. See spec §4 and the SSR-presence check.
 *
 * It's a thin shell over the pure machine in `@/lib/agentSession`. The "panel de
 * validación en vivo" treatment: a single panel that advances through the cycle
 * "el agente propone algo mal → el sistema lo frena → lo corrige". All copy is plain
 * language (§5.1) and comes from the machine — there are no rule names, notation or
 * logs anywhere on this surface.
 */
export default function AgentSession() {
  const [index, setIndex] = useState(FIRST_STEP);
  const step = stepAt(index);
  const onLast = isLastStep(index);

  /** The status the system shows in the panel, in plain words. */
  const statusLabel =
    step.status === "frenado"
      ? "Frenado por el sistema"
      : step.status === "listo"
        ? "Movimiento registrado"
        : "En curso";

  // The "frenado" step is the one moment the accent earns its place: the system
  // catching the mistake. Everything else stays calm ink-on-paper.
  const blocked = step.status === "frenado";
  const done = step.status === "listo";

  return (
    <section className="max-w-2xl" aria-labelledby="agent-session-heading">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
        Cómo lo hace cumplir
      </p>
      <h2
        id="agent-session-heading"
        className="font-display text-2xl leading-snug text-ink md:text-3xl"
      >
        El sistema no depende de que alguien se acuerde de la regla.
      </h2>
      <p className="mt-4 leading-relaxed text-ink-2">
        Seguí, paso a paso, qué pasa cuando un agente intenta hacer algo que
        rompería la contabilidad.
      </p>

      <div
        className={`mt-8 rounded-2xl border bg-paper-2 p-6 transition-colors duration-300 md:p-8 ${
          blocked ? "border-accent" : "border-hairline"
        }`}
      >
        {/* Panel header: the plain-language tag + the live status. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            className={`font-mono text-xs uppercase tracking-[0.2em] ${
              blocked ? "text-accent" : "text-ink-3"
            }`}
          >
            {step.tag}
          </p>
          <span
            className={`rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] transition-colors duration-300 ${
              blocked
                ? "bg-accent text-paper"
                : done
                  ? "bg-ink text-paper"
                  : "border border-hairline text-ink-3"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        {/* The step line. aria-live so the change is announced when advancing. */}
        <p
          aria-live="polite"
          className="mt-5 min-h-[3.5rem] text-lg leading-relaxed text-ink"
        >
          {step.line}
        </p>

        {/* Progress dots + advance / restart. */}
        <div className="mt-7 flex items-center justify-between gap-4">
          <ol className="flex items-center gap-2" aria-hidden>
            {AGENT_SESSION_STEPS.map((_, i) => (
              <li
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i <= index ? "bg-ink" : "bg-hairline"
                }`}
              />
            ))}
          </ol>

          {onLast ? (
            <button
              type="button"
              onClick={() => setIndex(FIRST_STEP)}
              className="rounded-full border border-hairline px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              Empezar de nuevo
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((i) => nextStep(i))}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-ink"
            >
              {step.action}
            </button>
          )}
        </div>

        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink-3">
          Paso {index + 1} de {STEP_COUNT}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const cases = [
  {
    client: "El Jumillano",
    logo: "/images/logos/ivess-logo-footer.svg",
    badge: "Agente de IA",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    stat: "+40 hs/mes",
    statLabel: "devueltas al equipo",
    narrative:
      "Trabajamos con El Jumillano para digitalizar la trazabilidad de su operación de distribución diaria y optimizar la gestión de +600 empleados. Un agente de IA analiza la asistencia cada mañana y genera reportes inteligentes, mientras un sistema dedicado consolida automáticamente las 190 rutas diarias con toda su lógica de asignaciones. Más visibilidad, menos carga operativa.",
    stack: "Python · Railway · Claude API · Glide · Google Apps Script",
  },
  {
    client: "Impacto Positivo",
    logo: "/images/logos/Impacto%20Positivo_IsoLogotipo-02.png",
    badge: "Automatización",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    stat: "0",
    statLabel: "intervención manual en facturación mensual",
    narrative:
      "Diseñamos un motor de facturación recurrente que gestiona todo el ciclo de suscripciones de forma automática: desde el cobro mensual hasta el seguimiento de vencimientos y la baja de cuentas morosas. Sin intervención manual, sin errores.",
    stack: "Airtable · Webhooks · pagoTIC API",
  },
  {
    client: "KeepSmiling",
    logo: "/images/logos/keepsmiling.svg",
    badge: "Transformación digital",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    stat: "100%",
    statLabel: "de la operación migrada",
    narrative:
      "KeepSmiling manejaba su operación entera con procesos manuales y herramientas desconectadas. Migramos todo a un sistema digital a medida: aplicación de escritorio para el equipo, automatizaciones de negocio integradas, y datos centralizados para tomar decisiones en tiempo real.",
    stack: "Xano · NoLoco · Automatizaciones",
  },
];

const AUTO_ROTATE_MS = 8000;
const RESUME_DELAY_MS = 20000;

export default function CaseTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progressKey, setProgressKey] = useState(0);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, []);

  const startAutoRotate = useCallback(() => {
    clearTimers();
    setPaused(false);
    setProgressKey((k) => k + 1);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % cases.length);
      setProgressKey((k) => k + 1);
    }, AUTO_ROTATE_MS);
  }, [clearTimers]);

  useEffect(() => {
    startAutoRotate();
    return clearTimers;
  }, [startAutoRotate, clearTimers]);

  const handleTabClick = (i: number) => {
    setActive(i);
    clearTimers();
    setPaused(true);
    setProgressKey((k) => k + 1);
    resumeRef.current = setTimeout(startAutoRotate, RESUME_DELAY_MS);
  };

  const activeCase = cases[active];

  return (
    <div>
      {/* Tab buttons — above content */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {cases.map((c, i) => (
          <button
            key={c.client}
            onClick={() => handleTabClick(i)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all border ${
              i === active
                ? "bg-primary/10 border-primary text-white"
                : "bg-card border-card-border text-muted hover:border-primary/50"
            }`}
          >
            {c.client}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex justify-center gap-2 mb-10">
        {cases.map((_, i) => (
          <div key={i} className="w-16 h-1 rounded-full bg-card-border overflow-hidden">
            {i === active && !paused && (
              <motion.div
                key={progressKey}
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_ROTATE_MS / 1000, ease: "linear" }}
              />
            )}
            {i === active && paused && (
              <div className="h-full bg-primary rounded-full w-full" />
            )}
          </div>
        ))}
      </div>

      {/* Case content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Left column - Stat */}
          <div>
            {/* Client logo + badge */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={activeCase.logo}
                alt={activeCase.client}
                width={120}
                height={32}
                className="h-7 w-auto object-contain opacity-70"
              />
              <span
                className={`text-xs px-3 py-1 rounded-full border font-medium ${activeCase.badgeColor}`}
              >
                {activeCase.badge}
              </span>
            </div>

            {/* Result stat */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-6xl md:text-7xl font-mono font-bold text-primary mb-2"
            >
              {activeCase.stat}
            </motion.div>
            <p className="text-muted text-lg mb-8">{activeCase.statLabel}</p>
          </div>

          {/* Right column - Narrative */}
          <div className="flex flex-col justify-center">
            <p className="text-muted leading-relaxed">
              {activeCase.narrative}
            </p>
            <p className="text-muted/50 text-xs mt-4">
              {activeCase.stack}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

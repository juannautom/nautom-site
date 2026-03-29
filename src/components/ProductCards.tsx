"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* ── Illustrated mockups for each product ────────────────────────────────── */

/** Gestión Financiera — light dashboard with table + chart */
function GestionFinancieraMockup() {
  return (
    <div className="absolute inset-0 top-8 bg-gradient-to-br from-white to-slate-50 p-3 flex flex-col gap-2 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-blue-900 flex items-center justify-center">
            <span className="text-[6px] font-bold text-white">Q</span>
          </div>
          <span className="text-[7px] font-bold text-slate-700">Gestión Financiera</span>
        </div>
        <div className="flex gap-1">
          {["Dashboard", "Asientos", "Reportes"].map((t) => (
            <span
              key={t}
              className={`text-[6px] px-1.5 py-0.5 rounded ${
                t === "Dashboard"
                  ? "bg-blue-900 text-white"
                  : "text-slate-400"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="flex gap-1.5">
        {[
          { label: "Ingresos", value: "$4.2M", color: "text-emerald-600" },
          { label: "Egresos", value: "$2.8M", color: "text-red-500" },
          { label: "Resultado", value: "$1.4M", color: "text-blue-900" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="flex-1 bg-white rounded border border-slate-200 p-1.5"
          >
            <span className="text-[5px] text-slate-400 block">{kpi.label}</span>
            <span className={`text-[9px] font-bold ${kpi.color}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="flex-1 bg-white rounded border border-slate-200 p-2 flex items-end gap-[3px]">
        {[40, 55, 35, 65, 50, 70, 45, 60, 75, 50, 80, 65].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-[1px] justify-end h-full">
            <div
              className="w-full rounded-t bg-blue-900/80"
              style={{ height: `${h}%` }}
            />
            <div
              className="w-full rounded-t bg-blue-200"
              style={{ height: `${h * 0.6}%` }}
            />
          </div>
        ))}
      </div>

      {/* Mini table */}
      <div className="bg-white rounded border border-slate-200 p-1.5">
        <div className="flex gap-2 mb-1 border-b border-slate-100 pb-1">
          {["Fecha", "Concepto", "Debe", "Haber"].map((col) => (
            <span key={col} className="text-[5px] text-slate-400 flex-1 font-medium">
              {col}
            </span>
          ))}
        </div>
        {[
          ["15/03", "Venta mercadería", "$120.000", "—"],
          ["14/03", "Pago proveedor", "—", "$85.000"],
          ["13/03", "Cobro clientes", "$95.000", "—"],
        ].map(([date, concept, debe, haber], i) => (
          <div key={i} className="flex gap-2 py-0.5">
            <span className="text-[5px] text-slate-500 flex-1">{date}</span>
            <span className="text-[5px] text-slate-700 flex-1">{concept}</span>
            <span className="text-[5px] text-emerald-600 flex-1">{debe}</span>
            <span className="text-[5px] text-red-400 flex-1">{haber}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The Padel App — dark calendar with green neon slots */
function PadelAppMockup() {
  const days = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
  const hours = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

  // Availability grid: 1 = available, 0 = taken, 2 = selected
  const grid = [
    [1, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 2, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1],
  ];

  return (
    <div className="absolute inset-0 top-8 bg-gradient-to-br from-gray-950 to-gray-900 p-3 flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#00FF7F]/20 flex items-center justify-center">
            <span className="text-[6px] text-[#00FF7F] font-bold">P</span>
          </div>
          <span className="text-[7px] font-bold text-white">Encontrá tu cancha</span>
        </div>
        <div className="flex gap-1">
          <span className="text-[5px] px-1.5 py-0.5 rounded bg-[#00FF7F]/10 text-[#00FF7F] border border-[#00FF7F]/20">
            Buenos Aires
          </span>
          <span className="text-[5px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
            90 min
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 bg-gray-900/50 rounded-lg border border-white/5 p-1.5 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-8 gap-[2px] mb-1">
          <div /> {/* empty corner */}
          {days.map((d) => (
            <span key={d} className="text-[5px] text-gray-500 text-center font-medium">
              {d}
            </span>
          ))}
        </div>

        {/* Hour rows */}
        {hours.map((hour, hi) => (
          <div key={hour} className="grid grid-cols-8 gap-[2px] mb-[2px]">
            <span className="text-[4px] text-gray-600 flex items-center">{hour}</span>
            {grid[hi].map((slot, di) => (
              <div
                key={di}
                className={`h-3 rounded-sm transition-all ${
                  slot === 2
                    ? "bg-[#00FF7F] shadow-[0_0_6px_rgba(0,255,127,0.4)]"
                    : slot === 1
                    ? "bg-[#00FF7F]/15 border border-[#00FF7F]/20"
                    : "bg-white/5 border border-white/5"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-[#00FF7F]/15 border border-[#00FF7F]/20" />
            <span className="text-[5px] text-gray-500">Disponible</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-white/5" />
            <span className="text-[5px] text-gray-500">Ocupado</span>
          </div>
        </div>
        <span className="text-[6px] px-2 py-0.5 rounded-full bg-[#00FF7F] text-gray-900 font-bold">
          Reservar
        </span>
      </div>
    </div>
  );
}

/** Nautom Suites — property listing with horizontal card carousel */
function SuitesMockup() {
  const properties = [
    { name: "CENTRO LOFTS II", price: "Desde $52.000", info: "2 dorm. | 1 baño", gradient: "from-amber-800/60 via-stone-600/50 to-amber-900/60" },
    { name: "VISTA PARK I", price: "Desde $68.000", info: "3 dorm. | 2 baños", gradient: "from-slate-500/50 via-stone-400/40 to-slate-600/50" },
    { name: "CENTRO LOFTS I", price: "Desde $45.000", info: "1 dorm. | 1 baño", gradient: "from-stone-500/50 via-amber-700/40 to-stone-600/50" },
    { name: "VISTA PARK II", price: "Desde $74.000", info: "3 dorm. | 2 baños", gradient: "from-slate-600/50 via-zinc-500/40 to-slate-500/50" },
  ];

  return (
    <div className="absolute inset-0 top-8 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#1a1a2e]" />

      <div className="relative flex flex-col h-full">
        {/* Browser bar */}
        <div className="flex items-center gap-1 px-2 py-1 bg-[#2a2a3e] border-b border-white/5">
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-red-400/70" />
            <div className="w-1 h-1 rounded-full bg-yellow-400/70" />
            <div className="w-1 h-1 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-1 bg-[#1a1a2e] rounded px-1.5 py-0.5">
            <span className="text-[4.5px] text-white/40">suites.nautom.com</span>
          </div>
        </div>

        {/* Navbar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1a2e] border-b border-white/5">
          <span className="text-[7px] font-bold text-white tracking-wide">Nautom</span>
          <div className="bg-[#D4854A] rounded px-2 py-0.5">
            <span className="text-[5px] text-white font-medium">Ver disponibilidad</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-3 px-3 pt-2 pb-1">
          <div className="flex flex-col items-center">
            <span className="text-[6px] text-white font-medium">Todos</span>
            <div className="w-full h-[1.5px] bg-[#D4854A] rounded-full mt-0.5" />
          </div>
          <span className="text-[6px] text-white/40">Centro Lofts</span>
          <span className="text-[6px] text-white/40">Vista Park</span>
        </div>

        {/* Property cards carousel */}
        <div className="flex-1 px-1 pt-1 pb-2">
          <div className="flex gap-1.5 h-full" style={{ marginLeft: "-8px", marginRight: "-8px" }}>
            {properties.map((prop, i) => (
              <div
                key={prop.name}
                className="flex-shrink-0 rounded-lg overflow-hidden flex flex-col"
                style={{
                  width: "38%",
                  opacity: i === 0 || i === 3 ? 0.6 : 1,
                  marginLeft: i === 0 ? "4px" : undefined,
                }}
              >
                {/* Photo area — warm architectural gradients */}
                <div className={`h-14 bg-gradient-to-br ${prop.gradient} relative`}>
                  {/* Subtle texture overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                </div>
                {/* Card info */}
                <div className="bg-[#2a2a3e] p-1.5 flex-1 flex flex-col gap-0.5">
                  <span className="text-[5.5px] font-bold text-white tracking-wider">{prop.name}</span>
                  <span className="text-[6.5px] font-bold text-[#D4854A]">{prop.price}</span>
                  <span className="text-[4.5px] text-white/40">{prop.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#1a1a2e] border-t border-white/5">
          <span className="text-[5px] text-white/30 font-medium">Nautom</span>
          <span className="text-[4.5px] text-white/20">Córdoba, Argentina</span>
        </div>
      </div>
    </div>
  );
}

/* ── Product data ────────────────────────────────────────────────────────── */

const products = [
  {
    name: "Gestión Financiera para PyMEs",
    tagline: "La gestión financiera que tu empresa necesita",
    description:
      "Plataforma de contabilidad de partida doble automatizada, flujo de fondos en tiempo real, reportes ejecutivos y conciliación bancaria. Diseñada para PyMEs argentinas.",
    differentiators: ["Datos encriptados", "Setup en 72hs", "Partida doble automática"],
    url: "https://gestion.nautom.com",
    cobranded: "Nautom × Quanta",
    badgeColor: "bg-blue-900/10 text-blue-300 border-blue-500/20",
    Mockup: GestionFinancieraMockup,
  },
  {
    name: "Gestión de Canchas",
    tagline: "Encontrá tu cancha en segundos",
    description:
      "Plataforma para buscar clubes, comparar disponibilidad y reservar canchas de padel. Calendario semanal, filtros por provincia, duración y franja horaria.",
    differentiators: ["Reserva instantánea", "Calendario semanal", "Filtros inteligentes"],
    url: "https://the-padel.app",
    cobranded: "The Padel App",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Mockup: PadelAppMockup,
  },
  {
    name: "Gestión de Departamentos",
    tagline: "Reservas simples para complejos temporarios",
    description:
      "Sistema de reservas para complejos de departamentos temporarios. Buscador con filtros de complejo, fechas, cantidad de huéspedes. Experiencia estilo Airbnb.",
    differentiators: ["Buscador avanzado", "Gestión de huéspedes", "Dashboard de reservas"],
    url: "https://suites.nautom.com",
    cobranded: "Nautom Suites",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Mockup: SuitesMockup,
  },
];

export default function ProductCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <motion.a
          key={product.name}
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          whileHover={{ y: -6 }}
          className="group relative rounded-2xl border border-card-border overflow-hidden bg-card transition-all duration-300 hover:border-primary/30 flex flex-col"
        >
          {/* Browser mockup with illustrated UI */}
          <div className="relative h-56 overflow-hidden">
            {/* Browser chrome */}
            <div className="absolute inset-x-0 top-0 h-8 bg-[#1a1a2e] flex items-center gap-1.5 px-3 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-3 text-[9px] text-white/30 font-mono truncate">
                {product.url.replace("https://", "")}
              </span>
            </div>
            {/* Product-specific mockup */}
            <product.Mockup />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <span className="text-xs font-medium text-gray-900">Visitar</span>
                <ExternalLink className="w-3 h-3 text-gray-700" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            {/* Co-brand badge */}
            <span
              className={`inline-block self-start text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border mb-3 ${product.badgeColor}`}
            >
              {product.cobranded}
            </span>

            <h3 className="text-lg font-bold text-white mb-1 font-mono">
              {product.name}
            </h3>
            <p className="text-primary text-sm mb-3 italic">{product.tagline}</p>
            <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
              {product.description}
            </p>

            {/* Differentiators */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {product.differentiators.map((d) => (
                <span
                  key={d}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-card-border text-muted"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

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

/** Nautom Padel — timeline view with court rows and orange accent */
function PadelAppMockup() {
  const days = [
    { day: "Jue", num: 2, selected: true },
    { day: "Vie", num: 3 },
    { day: "Sáb", num: 4 },
    { day: "Dom", num: 5, highlight: true },
    { day: "Lun", num: 6 },
    { day: "Mar", num: 7 },
  ];

  const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];

  // Court timeline: 0 = free, 1 = occupied, 2 = your reservation
  const courts = [
    { name: "Cancha 1", price: "$90.000", slots: [0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 2, 2] },
    { name: "Cancha 2", price: "$90.000", slots: [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0] },
    { name: "Cancha 3", price: "$90.000", slots: [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0] },
    { name: "Cancha 4", price: "$90.000", slots: [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1] },
  ];

  return (
    <div className="absolute inset-0 top-8 bg-[#0C1B33] p-2 flex flex-col gap-1.5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[7px] font-bold text-[#D4804A] italic">Nautom Padel</span>
        <div className="flex gap-1">
          <span className="text-[5px] px-1.5 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
            Iniciar sesión
          </span>
          <span className="text-[5px] px-1.5 py-0.5 rounded bg-[#D4804A] text-white font-medium">
            Registrarse
          </span>
        </div>
      </div>

      {/* Day selector pills */}
      <div className="flex gap-1">
        {days.map((d) => (
          <div
            key={d.num}
            className={`flex flex-col items-center px-1.5 py-0.5 rounded ${
              d.selected
                ? "bg-[#D4804A]"
                : d.highlight
                ? "bg-[#E8994A]/20"
                : "bg-white/5"
            }`}
          >
            <span className={`text-[4px] ${d.selected || d.highlight ? "text-white" : "text-[#94A3B8]"}`}>{d.day}</span>
            <span className={`text-[6px] font-bold ${d.selected ? "text-white" : d.highlight ? "text-[#E8994A]" : "text-white"}`}>{d.num}</span>
          </div>
        ))}
      </div>

      {/* View tabs + duration */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <span className="text-[5px] text-[#94A3B8] px-1 py-0.5 rounded bg-white/5">Grilla</span>
          <span className="text-[5px] text-white px-1 py-0.5 rounded bg-[#D4804A]/30 border border-[#D4804A]/40 font-medium">Timeline</span>
        </div>
        <div className="flex gap-0.5">
          <span className="text-[5px] text-white px-1 py-0.5 rounded bg-[#D4804A] font-medium">90&apos;</span>
          <span className="text-[5px] text-[#94A3B8] px-1 py-0.5 rounded bg-white/5">120&apos;</span>
        </div>
      </div>

      {/* Timeline grid */}
      <div className="flex-1 bg-[#0C1B33]/50 rounded border border-white/5 p-1 overflow-hidden">
        {/* Hour headers */}
        <div className="flex mb-0.5">
          <div className="w-12 flex-shrink-0" />
          {hours.map((h) => (
            <span key={h} className="flex-1 text-[3.5px] text-[#94A3B8] text-center">{h}:00</span>
          ))}
        </div>

        {/* Court rows */}
        {courts.map((court) => (
          <div key={court.name} className="flex items-center mb-[2px]">
            <div className="w-12 flex-shrink-0 pr-1">
              <span className="text-[4.5px] text-white block leading-tight">{court.name}</span>
              <span className="text-[3.5px] text-[#94A3B8]">{court.price}</span>
            </div>
            <div className="flex-1 flex gap-[1px]">
              {court.slots.map((slot, si) => (
                <div
                  key={si}
                  className={`flex-1 h-3.5 rounded-sm ${
                    slot === 2
                      ? "bg-[#D4804A]/20 border border-[#D4804A]"
                      : slot === 1
                      ? "bg-[rgba(148,163,184,0.25)]"
                      : "bg-white/5"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-[rgba(148,163,184,0.25)]" />
          <span className="text-[5px] text-[#94A3B8]">No disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-[#D4804A]/20 border border-[#D4804A]" />
          <span className="text-[5px] text-[#94A3B8]">Tu reserva</span>
        </div>
      </div>
    </div>
  );
}

/** Nautom Suites — Airbnb-style property marketplace with real photos (light theme) */
function SuitesMockup() {
  const properties = [
    { name: "Centro Lofts I", zone: "Centro", price: "$48.000", info: "1 dorm. · 1 baño · hasta 2 huésp.", img: "/images/suites/a1.webp" },
    { name: "Vista Park I", zone: "Nueva Córdoba", price: "$55.000", info: "2 dorm. · 1 baño · hasta 4 huésp.", img: "/images/suites/a2.webp" },
    { name: "Centro Lofts II", zone: "Centro", price: "$52.000", info: "1 dorm. · 1 baño · hasta 2 huésp.", img: "/images/suites/a3.webp" },
  ];

  return (
    <div className="absolute inset-0 top-8 overflow-hidden">
      {/* Light background */}
      <div className="absolute inset-0 bg-[#F8FAFC]" />

      <div className="relative flex flex-col h-full">
        {/* Navbar — dark navy */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#0C1B33]">
          <span className="text-[7px] font-bold text-white tracking-wide">Nautom</span>
          <div className="bg-[#D4804A] rounded px-2 py-0.5">
            <span className="text-[5px] text-white font-medium">Ver disponibilidad</span>
          </div>
        </div>

        {/* Search bar — Airbnb-style horizontal filters */}
        <div className="px-2 pt-2 pb-1.5">
          <div className="flex items-center bg-white rounded-md border border-[#E2E8F0] overflow-hidden">
            <div className="flex-1 flex items-center">
              <span className="text-[4.5px] text-[#64748B] px-2">Complejo</span>
              <span className="text-[4.5px] text-[#64748B]/40 px-1.5">·</span>
              <span className="text-[4.5px] text-[#64748B] px-1.5">Llegada</span>
              <span className="text-[4.5px] text-[#64748B]/40 px-1.5">·</span>
              <span className="text-[4.5px] text-[#64748B] px-1.5">Salida</span>
              <span className="text-[4.5px] text-[#64748B]/40 px-1.5">·</span>
              <span className="text-[4.5px] text-[#64748B] px-1.5">Huéspedes</span>
            </div>
            <div className="bg-[#1E293B] px-2 py-1 mr-0.5 rounded">
              <span className="text-[4.5px] text-white font-medium">Buscar</span>
            </div>
          </div>
        </div>

        {/* Property cards grid — marketplace style with real photos */}
        <div className="flex-1 px-2 pb-1.5 overflow-hidden">
          <div className="grid grid-cols-3 gap-1.5 h-full">
            {properties.map((prop) => (
              <div
                key={prop.name}
                className="rounded-lg overflow-hidden flex flex-col bg-white border border-[#E2E8F0]"
              >
                {/* Real photo */}
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={prop.img}
                    alt={prop.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {/* Card info */}
                <div className="p-1.5 flex-1 flex flex-col gap-[2px]">
                  <span className="text-[5.5px] font-bold text-[#1E293B] leading-tight">{prop.name}</span>
                  <span className="text-[4px] text-[#64748B] leading-tight">{prop.zone}</span>
                  <span className="text-[4px] text-[#64748B] leading-tight">{prop.info}</span>
                  <span className="text-[6px] font-bold text-[#D4804A] mt-auto leading-tight">{prop.price} <span className="text-[4px] font-normal text-[#64748B]">/ noche</span></span>
                </div>
              </div>
            ))}
          </div>
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
    url: "https://padel.nautom.com",
    cobranded: "Nautom Padel",
    badgeColor: "bg-[#D4804A]/10 text-[#D4804A] border-[#D4804A]/20",
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

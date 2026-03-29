"use client";

import { motion } from "framer-motion";

/* ── Fragment shape helpers ─────────────────────────────────── */

function DashboardFragment() {
  return (
    <div className="w-[280px] h-[200px] bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="h-8 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center gap-2 px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4854A] opacity-60" />
        <div className="w-14 h-2 rounded bg-[#D4854A] opacity-25" />
        <div className="ml-auto w-8 h-2 rounded bg-white opacity-[0.06]" />
      </div>
      {/* Table rows */}
      <div className="p-3 space-y-2.5">
        {[0.35, 0.22, 0.18, 0.28, 0.4, 0.15].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-10 h-2 rounded bg-white" style={{ opacity: 0.08 }} />
            <div className="h-2 rounded bg-white" style={{ width: `${w * 100}%`, opacity: 0.06 }} />
            <div className="ml-auto w-12 h-2 rounded" style={{
              backgroundColor: i === 2 ? "#D4854A" : "#fff",
              opacity: i === 2 ? 0.45 : 0.05,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarFragment() {
  const cells = Array.from({ length: 28 });
  const highlighted = [5, 12, 19, 20];
  return (
    <div className="w-[190px] h-[150px] bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
      <div className="h-7 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center gap-1.5 px-3">
        <div className="w-2 h-2 rounded-full bg-[#22c55e] opacity-60" />
        <div className="w-10 h-2 rounded bg-[#22c55e] opacity-20" />
      </div>
      <div className="p-2.5">
        <div className="grid grid-cols-7 gap-1">
          {cells.map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: highlighted.includes(i) ? "#22c55e" : "#fff",
                opacity: highlighted.includes(i) ? 0.35 : 0.05,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartFragment() {
  return (
    <div className="w-[200px] h-[145px] bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
      <div className="h-7 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-3">
        <div className="w-14 h-2 rounded bg-white opacity-10" />
      </div>
      <div className="p-3 flex items-center gap-3">
        {/* Donut chart */}
        <svg width="60" height="60" viewBox="0 0 60 60" className="shrink-0">
          <circle cx="30" cy="30" r="22" fill="none" stroke="#D4854A" strokeWidth="6"
            strokeDasharray="50 88" strokeDashoffset="0" opacity="0.5" strokeLinecap="round" />
          <circle cx="30" cy="30" r="22" fill="none" stroke="#3b82f6" strokeWidth="6"
            strokeDasharray="30 108" strokeDashoffset="-52" opacity="0.45" strokeLinecap="round" />
          <circle cx="30" cy="30" r="22" fill="none" stroke="#ffffff" strokeWidth="6"
            strokeDasharray="20 118" strokeDashoffset="-84" opacity="0.2" strokeLinecap="round" />
        </svg>
        {/* Metric lines */}
        <div className="space-y-2 flex-1">
          <div className="w-full h-2 rounded bg-white opacity-[0.07]" />
          <div className="w-3/4 h-2 rounded bg-white opacity-[0.05]" />
          <div className="w-1/2 h-2 rounded bg-white opacity-[0.07]" />
          <div className="w-2/3 h-2 rounded bg-white opacity-[0.05]" />
        </div>
      </div>
    </div>
  );
}

function SearchFragment() {
  return (
    <div className="w-[130px] h-[90px] bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl">
      <div className="h-6 bg-[#D4854A]/20 border-b border-[#2a2a2a] flex items-center gap-1.5 px-2.5">
        <div className="w-12 h-1.5 rounded bg-[#D4854A] opacity-30" />
      </div>
      <div className="p-2 space-y-1.5">
        <div className="w-full h-4 rounded bg-white opacity-[0.04] border border-white/[0.06]" />
        <div className="flex gap-1">
          <div className="flex-1 h-4 rounded bg-white opacity-[0.04] border border-white/[0.06]" />
          <div className="flex-1 h-4 rounded bg-white opacity-[0.04] border border-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

/* ── Layer config ────────────────────────────────────────────── */
/*
  Layers:
  - foreground (fg): large, opaque, fast float, close to viewer
  - midground (mg): medium size, medium opacity, medium float
  - background (bg): small, transparent, slow float, far away

  Positions use right/top percentages so they distribute across the
  full hero height and bleed past the right edge of the viewport.
*/

const fragments: {
  id: string;
  rotate: number;
  right: string;
  top: string;
  opacity: number;
  scale: number;
  layer: "fg" | "mg" | "bg";
  delay: number;
  Component: React.ComponentType;
}[] = [
  // Foreground — dashboard, large, bleeds right edge
  { id: "dashboard", rotate: -14, right: "-6%", top: "18%", opacity: 0.9, scale: 1, layer: "fg", delay: 0, Component: DashboardFragment },
  // Midground — calendar, middle-right area
  { id: "calendar", rotate: 8, right: "8%", top: "58%", opacity: 0.65, scale: 0.85, layer: "mg", delay: 0.2, Component: CalendarFragment },
  // Midground — chart, closer to text
  { id: "chart", rotate: -6, right: "28%", top: "10%", opacity: 0.6, scale: 0.8, layer: "mg", delay: 0.35, Component: ChartFragment },
  // Background — search, small, top-right
  { id: "search", rotate: 15, right: "2%", top: "2%", opacity: 0.35, scale: 0.75, layer: "bg", delay: 0.5, Component: SearchFragment },
  // Background — second small silhouette near bottom-right
  { id: "search2", rotate: -10, right: "22%", top: "72%", opacity: 0.3, scale: 0.7, layer: "bg", delay: 0.6, Component: SearchFragment },
];

const floatClass = { fg: "animate-float-fg", mg: "animate-float-mg", bg: "animate-float-bg" };
const zIndex = { fg: 3, mg: 2, bg: 1 };

export default function FloatingUIFragments() {
  return (
    <div className="absolute inset-0">
      {fragments.map(({ id, rotate, right, top, opacity, scale, layer, delay, Component }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{
            right,
            top,
            zIndex: zIndex[layer],
            rotate: `${rotate}deg`,
            scale,
            opacity: 0,
          }}
          animate={{ opacity }}
          transition={{ duration: 0.8, delay: 0.4 + delay, ease: "easeOut" }}
        >
          <div
            className={floatClass[layer]}
            style={{ animationDelay: `${delay}s` }}
          >
            <Component />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

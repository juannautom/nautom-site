"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, Shield } from "lucide-react";

/* ── Inline SVG logos (reused from HeroAnimation) ────────────────────────── */

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
    <path d="M16.098 10.268l-4.914 8.483-2.088-3.606 4.914-8.483 2.088 3.606z" fill="#D97757" />
    <path d="M7.9 14.145l2.088 3.606H5.074L2.986 14.145h4.914z" fill="#D97757" />
    <path d="M14.01 6.662l-4.914 8.483L7.008 11.54l4.914-8.484 2.088 3.606z" fill="#D97757" />
    <path d="M21.014 14.145l-2.088 3.606h-4.914l2.088-3.606h4.914z" fill="#D97757" />
  </svg>
);

const VercelLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
    <path d="M12 2L2 19.5h20L12 2z" />
  </svg>
);

const SupabaseLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7">
    <path d="M13.7 21.888c-.413.544-1.283.16-1.283-.566V13.5h8.3c.758 0 1.164.876.666 1.436L13.7 21.888z" fill="#3ECF8E" />
    <path d="M10.3 2.112c.413-.544 1.283-.16 1.283.566V10.5H3.283c-.758 0-1.164-.876-.666-1.436L10.3 2.112z" fill="#3ECF8E" />
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const NextJSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
    <path d="M11.572 0c-.176.001-.215.002-.372.005C7.326.12 3.72 2.257 1.724 5.64.534 7.671-.051 9.98.003 12.3c.064 2.75 1.057 5.284 2.853 7.3a11.855 11.855 0 004.72 3.427c.364.152.676.006.755-.346a.597.597 0 00.012-.12l-.002-1.725c0-.612 0-1.131.002-1.686V18.12l-.074.052a3.762 3.762 0 01-1.812.519c-1.078 0-1.553-.666-1.826-1.201a3.076 3.076 0 00-.672-1.01c-.295-.18-.582-.36-.168-.444.87-.178 1.544.977 1.875 1.373.58.693 1.282.822 1.625.732.063-.377.218-.73.46-1.023-1.843-.266-3.262-1.186-3.262-3.155a3.408 3.408 0 01.927-2.378c-.15-.451-.29-1.26.09-2.113 0 0 .934-.035 2.223.893a7.73 7.73 0 014.015 0c1.28-.922 2.213-.893 2.213-.893.383.853.244 1.662.094 2.113.58.626.93 1.421.928 2.378 0 1.98-1.43 2.888-3.277 3.15.316.38.483.882.467 1.396v3.37c-.001.1.004.17.02.243.074.348.388.499.755.348a11.89 11.89 0 006.37-7.502c2.39-8.625-3.256-14.054-8.324-14.396a13.893 13.893 0 00-.428-.006z" />
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#38BDF8">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const tools = [
  { name: "Claude", Logo: ClaudeLogo },
  { name: "Next.js", Logo: NextJSLogo },
  { name: "Supabase", Logo: SupabaseLogo },
  { name: "Vercel", Logo: VercelLogo },
  { name: "Tailwind", Logo: TailwindLogo },
  { name: "GitHub", Logo: GitHubLogo },
];

const differentiators = [
  {
    icon: <Zap className="w-5 h-5 text-primary" />,
    title: "Velocidad",
    description:
      "Nuestro workflow AI-first con Claude Code nos permite entregar en semanas lo que tradicionalmente toma meses.",
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Calidad",
    description:
      "Stack moderno y probado. Cada proyecto se construye con las mejores prácticas desde el día uno.",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-primary" />,
    title: "Costo accesible",
    description:
      "La eficiencia de nuestro proceso nos permite ofrecer soluciones de primer nivel a una fracción del costo de las grandes consultoras.",
  },
];

export default function HowWeWork() {
  return (
    <div className="space-y-16">
      {/* Stack grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">
          Usamos IA no solo en los productos que entregamos, sino en nuestro
          propio proceso de desarrollo. Claude Code es nuestro copilot principal,
          lo que nos permite movernos más rápido y con más inteligencia que el
          desarrollo tradicional.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-card-border bg-card hover:border-primary/30 transition-colors"
            >
              <tool.Logo />
              <span className="text-xs text-muted font-mono">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Differentiators */}
      <div className="grid md:grid-cols-3 gap-6">
        {differentiators.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-xl border border-card-border bg-card"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-white font-bold mb-2">{item.title}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

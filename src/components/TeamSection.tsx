"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

const team = [
  {
    name: "Juan Gómez Naar",
    role: "Co-founder",
    bio: "Desarrollo de producto, arquitectura técnica y relación con clientes. Obsesionado con encontrar la solución más simple al problema más complejo.",
  },
  {
    name: "Ignacio Ramognino",
    role: "Co-founder",
    bio: "Ingeniería, automatización e infraestructura. Convierte ideas en sistemas robustos que funcionan sin intervención manual.",
  },
];

export default function TeamSection() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-muted text-lg leading-relaxed mb-6">
          Nautom es un estudio de tecnología fundado por dos ingenieros
          industriales de la UCA con un enfoque AI-first. Construimos productos propios y proyectos a medida
          para clientes, combinando inteligencia artificial y código para
          entregar soluciones rápidas, robustas y a una fracción del costo
          de las grandes consultoras.
        </p>
        <p className="text-muted text-lg leading-relaxed">
          Trabajamos con pocos clientes a la vez, con dedicación real. Nos
          integramos con tu equipo, entendemos tu operación y construimos
          exactamente lo que necesitás. No somos una software factory — somos
          un equipo chico que prioriza la calidad del resultado.
        </p>
      </motion.div>

      {/* Team cards */}
      <div className="space-y-6">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex items-start gap-5 p-6 rounded-xl border border-card-border bg-card"
          >
            {/* Photo placeholder */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-card-border flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-primary/60" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">
                {member.role}
              </p>
              <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

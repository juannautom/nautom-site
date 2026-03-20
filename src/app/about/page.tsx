"use client";

import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.5 },
};

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="py-10 md:py-28 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.h1
              {...fadeIn}
              className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold leading-tight text-white"
            >
              Tecnología e IA al servicio de tu empresa.
            </motion.h1>
            <motion.p
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted text-lg leading-relaxed"
            >
              Nautom es una agencia boutique de inteligencia artificial y
              automatización para PyMEs argentinas. Fundada por Juan y Nacho,
              trabajamos con un enfoque AI-first: usamos tecnología de punta
              para crear soluciones a medida sin los costos de las grandes
              consultoras. Trabajamos con empresas de entre 50 y 600 empleados
              que necesitan tecnología real integrada a su operación del día
              a día.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Nuestra Mision */}
      <section className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeIn}>
              <div className="pipe-copper">
                <h2 className="text-3xl md:text-4xl font-mono font-bold text-white">
                  Nuestra misión
                </h2>
              </div>
            </motion.div>
            <motion.p
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted text-lg leading-relaxed"
            >
              Hacer que la inteligencia artificial y la automatización sean
              accesibles para las PyMEs argentinas. Creemos que cualquier
              empresa, sin importar su tamaño, merece acceso a tecnología de
              primer nivel. Combinamos inteligencia artificial, código y
              automatización para entregar soluciones rápidas, robustas y a
              una fracción del costo tradicional.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Como trabajamos */}
      <section className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeIn}>
              <div className="pipe-copper">
                <h2 className="text-3xl md:text-4xl font-mono font-bold text-white">
                  Cómo trabajamos
                </h2>
              </div>
            </motion.div>
            <motion.p
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted text-lg leading-relaxed"
            >
              No somos una software factory. Somos un equipo chico que trabaja
              con pocos clientes a la vez, con dedicación real. Nos integramos
              con tu equipo, entendemos tu operación y construimos exactamente
              lo que necesitás. Usamos IA no solo en los productos que
              entregamos, sino en nuestro propio proceso de desarrollo — lo que
              nos permite movernos más rápido y con más inteligencia que el
              desarrollo tradicional.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="mb-12">
            <div className="pipe-copper">
              <h2 className="text-3xl md:text-4xl font-mono font-bold text-white">
                Lo que nos define
              </h2>
            </div>
          </motion.div>

          <div className="space-y-12 max-w-3xl">
            <motion.div {...fadeIn}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Foco y dedicación
              </h3>
              <p className="text-muted text-lg leading-relaxed">
                Elegimos trabajar con pocos clientes para darle a cada proyecto
                la atención que merece. No escalamos por escalar — priorizamos
                la calidad del resultado y la relación con cada equipo. Nos
                movemos rápido, pero nunca a costa de hacer las cosas bien.
              </p>
            </motion.div>

            <motion.div {...fadeIn}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                Resultados concretos
              </h3>
              <p className="text-muted text-lg leading-relaxed">
                Cada línea de código, cada agente de IA, cada automatización que
                construimos tiene un objetivo claro: generar impacto medible en
                tu operación. No vendemos tecnología por la tecnología misma —
                construimos herramientas que resuelven problemas reales y
                ahorran tiempo todos los días.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

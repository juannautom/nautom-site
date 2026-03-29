"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ClientLogos from "@/components/ClientLogos";
import ProductCards from "@/components/ProductCards";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CaseTabs from "@/components/CaseTabs";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";
import TeamSection from "@/components/TeamSection";
import HowWeWork from "@/components/HowWeWork";

export default function Home() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-36 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold leading-tight text-white">
              Construimos productos propios.{" "}
              <span className="text-primary">
                Creamos soluciones a medida.
              </span>
            </h1>
            <p className="mt-4 md:mt-6 text-muted text-base md:text-xl max-w-2xl">
              Nautom es un estudio de tecnología AI-first. Desarrollamos
              plataformas propias y proyectos a medida para empresas que
              necesitan moverse rápido y con inteligencia.
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
              <Link
                href="#products"
                className="bg-primary hover:bg-primary-light text-white font-medium px-8 py-3 rounded-full transition-colors"
              >
                Ver productos
              </Link>
              <Link
                href="/contact"
                className="border border-card-border hover:border-primary text-white font-medium px-8 py-3 rounded-full transition-colors"
              >
                Empezar un proyecto
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Client Logos ───────────────────────────────────────── */}
      <section className="py-10 md:py-16 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted mb-10 text-sm uppercase tracking-widest"
          >
            Ya confían en nosotros
          </motion.p>
          <ClientLogos />
        </div>
      </section>

      {/* ── 3. Products (NEW — highlight section) ────────────────── */}
      <section id="products" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Nuestros productos"
            subtitle="Plataformas que construimos, operamos y evolucionamos"
            className="mb-12"
          />
          <ProductCards />
        </div>
      </section>

      {/* ── 4. Services / Cases (RENOVATED) ──────────────────────── */}
      <section id="cases" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionTitle
              title="Proyectos a medida"
              subtitle="Lo que construimos para nuestros clientes — resultados reales con soluciones potenciadas por IA"
            />
            <Link
              href="/contact"
              className="hidden md:block bg-gradient-to-r from-primary to-primary-light text-white font-medium px-8 py-3 rounded-full transition-opacity hover:opacity-90 text-center whitespace-nowrap"
            >
              Contáctanos
            </Link>
          </div>
          <CaseTabs />
        </div>
      </section>

      {/* ── 5. Testimonials ──────────────────────────────────────── */}
      <section className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionTitle
              title="Lo que dicen nuestros clientes"
              subtitle="Equipos que confiaron en nosotros para automatizar y escalar sus operaciones"
            />
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── 6. Nosotros ──────────────────────────────────────────── */}
      <section id="about" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Quiénes somos"
            subtitle="Dos personas, un estudio, enfoque AI-first"
            className="mb-12"
          />
          <TeamSection />
        </div>
      </section>

      {/* ── 7. Cómo trabajamos ───────────────────────────────────── */}
      <section id="how" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Cómo trabajamos"
            subtitle="Stack moderno, enfoque AI-first, entrega rápida"
            className="mb-12"
          />
          <HowWeWork />
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Preguntas frecuentes"
            subtitle="Respuestas claras sobre cómo trabajamos"
            className="mb-12"
          />
          <FAQAccordion
            items={[
              {
                q: "\u00BFQué es un agente de IA y cómo puede ayudar a mi empresa?",
                a: "Un agente de IA es un sistema inteligente que monitorea datos, toma decisiones y ejecuta tareas de forma autónoma. Por ejemplo, podemos crear un agente que detecte anomalías en la asistencia de tu equipo, genere reportes automáticos o procese facturas sin intervención manual.",
              },
              {
                q: "\u00BFCuánto cuesta automatizar procesos en una PyME?",
                a: "Depende del alcance, pero trabajamos con modelos de fee mensual fijo que se adaptan al tamaño de tu operación. Nuestro foco es que el retorno de inversión sea claro desde el primer mes — automatizar una tarea que consume 1 hora diaria puede representar un ahorro de más de 20 horas mensuales.",
              },
              {
                q: "\u00BFTrabajan solo con empresas grandes?",
                a: "No. Nos especializamos en PyMEs argentinas de entre 50 y 600 empleados. Empresas que ya tienen operaciones establecidas pero necesitan tecnología para escalar sin multiplicar costos.",
              },
              {
                q: "\u00BFQué tecnologías usan?",
                a: "Trabajamos con un stack moderno y AI-first: Claude Code, Next.js, Supabase, Vercel, Tailwind, GitHub y más. Elegimos la herramienta correcta para cada problema, priorizando siempre soluciones potenciadas por IA.",
              },
              {
                q: "\u00BFCuánto tiempo toma implementar una solución?",
                a: "Un agente de IA o una automatización básica puede estar funcionando en 1-2 semanas. Proyectos más complejos como aplicaciones internas completas pueden tomar 4-8 semanas. Nuestro approach AI-first nos permite entregar mucho más rápido que el desarrollo tradicional.",
              },
              {
                q: "\u00BFQué diferencia a Nautom de una software factory tradicional?",
                a: "Somos un estudio boutique, no una fábrica. Construimos productos propios y proyectos a medida con un equipo chico y dedicado. Usamos IA no solo como producto sino como herramienta de desarrollo — lo que nos permite entregar más rápido, con menos costo y más inteligencia incorporada en cada solución.",
              },
            ]}
          />
        </div>
      </section>

      {/* ── 9. CTA final ─────────────────────────────────────────── */}
      <section className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-4xl font-mono font-bold text-white mb-4">
              ¿Listo para automatizar tu operación?
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Hablemos sobre cómo podemos ayudar a tu equipo
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-light text-white font-medium px-10 py-4 rounded-full text-lg transition-colors"
            >
              Empezar un proyecto
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Workflow,
  Monitor,
  FileText,
  Puzzle,
  Rocket,
} from "lucide-react";
import HeroAnimation from "@/components/HeroAnimation";
import ClientLogos from "@/components/ClientLogos";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ServiceCard from "@/components/ServiceCard";
import CaseTabs from "@/components/CaseTabs";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";

const services = [
  {
    title: "Agentes de IA",
    description:
      "Agentes inteligentes que monitorean, analizan y actúan sobre los datos de tu empresa. Desde control de asistencia hasta reportes automáticos con análisis de IA.",
    icon: <Brain className="w-7 h-7 text-primary" />,
  },
  {
    title: "Automatización de procesos",
    description:
      "Eliminamos el trabajo manual repetitivo con pipelines de automatización. Conectamos tus herramientas existentes y creamos flujos que ahorran horas cada día.",
    icon: <Workflow className="w-7 h-7 text-primary" />,
  },
  {
    title: "Aplicaciones internas",
    description:
      "Apps a medida para las necesidades específicas de tu equipo. Dashboards, sistemas de gestión y herramientas operativas — rápidas de implementar y listas para escalar.",
    icon: <Monitor className="w-7 h-7 text-primary" />,
  },
  {
    title: "Facturación y datos",
    description:
      "Motores de facturación automática, integraciones con procesadores de pago y pipelines de sincronización de datos que mantienen tu operación funcionando sin fricción.",
    icon: <FileText className="w-7 h-7 text-primary" />,
  },
  {
    title: "Integraciones inteligentes",
    description:
      "Conectamos todo tu stack — CRMs, planillas, bases de datos, plataformas de mensajería — con integraciones que mantienen tus datos sincronizados y accesibles.",
    icon: <Puzzle className="w-7 h-7 text-primary" />,
  },
  {
    title: "MVPs y prototipos",
    description:
      "Validá tus ideas rápido. Construimos prototipos funcionales con arquitectura AI-native, listos para escalar desde el día uno.",
    icon: <Rocket className="w-7 h-7 text-primary" />,
  },
];

export default function Home() {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="py-10 md:py-32 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-mono font-bold leading-tight">
                Sistemas inteligentes{" "}
                <span className="text-primary">que trabajan para tu empresa</span>
              </h1>
              <p className="mt-3 md:mt-6 text-muted text-base md:text-xl max-w-lg">
                Creamos agentes de IA, automatizamos operaciones y desarrollamos
                herramientas internas a medida para PyMEs argentinas.
              </p>
              <div className="mt-6 md:mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary-light text-white font-medium px-8 py-3 rounded-full transition-colors"
                >
                  Empezar un proyecto
                </Link>
                <Link
                  href="/#cases"
                  className="border border-card-border hover:border-primary text-white font-medium px-8 py-3 rounded-full transition-colors"
                >
                  Ver nuestro trabajo
                </Link>
              </div>
            </motion.div>

            {/* Right - Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center w-full"
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
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

      {/* Testimonials Section */}
      <section className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionTitle
              title="Lo que dicen nuestros clientes"
              subtitle="Equipos que confiaron en nosotros para automatizar y escalar sus operaciones"
            />
            <Link
              href="/contact"
              className="hidden md:block bg-gradient-to-r from-primary to-primary-light text-white font-medium px-8 py-3 rounded-full transition-opacity hover:opacity-90 text-center whitespace-nowrap"
            >
              Contáctanos
            </Link>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Lo que construimos"
            subtitle="Soluciones de IA diseñadas para cómo funciona tu empresa en la realidad"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={i >= 3 && !showAllServices ? "hidden md:block" : ""}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={i}
                />
              </div>
            ))}
          </div>
          {!showAllServices && (
            <div className="mt-6 text-center md:hidden">
              <button
                onClick={() => setShowAllServices(true)}
                className="text-primary text-sm font-medium border border-primary/30 px-6 py-2.5 rounded-full hover:bg-primary/10 transition-colors"
              >
                Ver más servicios
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-10 md:py-20 border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionTitle
              title="Nuestro trabajo"
              subtitle="Resultados reales con soluciones potenciadas por IA"
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

      {/* FAQ Section — optimizada para GEO / LLM discovery */}
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
                a: "Trabajamos con un stack moderno y AI-first: Claude Code, Python, Vercel, Supabase, Railway, GitHub, Airtable y Google Apps Script. Elegimos la herramienta correcta para cada problema, priorizando siempre soluciones potenciadas por IA.",
              },
              {
                q: "\u00BFCuánto tiempo toma implementar una solución?",
                a: "Un agente de IA o una automatización básica puede estar funcionando en 1-2 semanas. Proyectos más complejos como aplicaciones internas completas pueden tomar 4-8 semanas. Nuestro approach AI-first nos permite entregar mucho más rápido que el desarrollo tradicional.",
              },
              {
                q: "\u00BFQué diferencia a Nautom de una software factory tradicional?",
                a: "Somos una agencia boutique, no una fábrica. Trabajamos con pocos clientes a la vez, con dedicación real. Usamos IA no solo como producto sino como herramienta de desarrollo — lo que nos permite entregar más rápido, con menos costo y más inteligencia incorporada en cada solución.",
              },
            ]}
          />
        </div>
      </section>

      {/* Pre-footer CTA */}
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-10 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-accent-700 transition-colors inline-flex"
            aria-label="Volver"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-white"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white">
              Hablemos de tu proyecto
            </h1>
          </div>
          <p className="text-muted text-lg">
            Contanos tu desafío, nosotros tenemos la solución
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Perez"
                required
                className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ejemplo@email.com"
                required
                className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm text-muted mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+54 11 1234-5678"
                className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm text-muted mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Tu empresa"
                className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm text-muted mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Contanos sobre tu proyecto o desafío..."
              rows={5}
              required
              className="w-full bg-card border border-card-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-primary text-white font-medium px-10 py-3 rounded-full hover:bg-accent-700 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>

          {/* Status messages */}
          {status === "sent" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-400"
            >
              Mensaje enviado con éxito. Te respondemos pronto.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-400"
            >
              Algo salió mal. Por favor, intentá de nuevo.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

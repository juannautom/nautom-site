"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full bg-paper-2 border border-hairline rounded-lg px-3 py-2 text-ink placeholder:text-ink-3 focus:outline-none focus:border-accent transition-colors";

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
    <section className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-ink-2 hover:text-ink transition-colors"
          >
            ← Volver
          </Link>
          <h1 className="font-display text-3xl md:text-4xl text-ink mt-6">
            Hablemos de tu operación
          </h1>
          <p className="text-ink-2 text-lg mt-3">
            Contanos qué te frena hoy. Te respondemos pronto.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm text-ink-2 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-ink-2 mb-1">
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
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm text-ink-2 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+54 11 1234-5678"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm text-ink-2 mb-1">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Tu empresa"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-ink-2 mb-1">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Contanos sobre tu operación o desafío..."
              rows={4}
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="text-sm font-medium bg-accent text-paper hover:bg-accent-ink px-8 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>

          {status === "sent" && (
            <p className="text-sm text-accent-ink">
              Mensaje enviado. Te respondemos pronto.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-accent-ink">
              Algo salió mal. Por favor, intentá de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

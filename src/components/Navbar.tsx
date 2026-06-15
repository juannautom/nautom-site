"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/enfoque", label: "Cómo funciona" },
  { href: "/trabajo", label: "Casos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-sm border-b border-hairline">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-2xl leading-none text-ink"
          aria-label="Nautom — inicio"
        >
          nautom
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-ink ${
                pathname === link.href ? "text-ink" : "text-ink-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="text-sm font-medium text-accent border border-accent/40 hover:bg-accent hover:text-paper px-4 py-2 rounded-full transition-colors"
          >
            Conversemos tu caso
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-3 min-w-[44px] min-h-[44px] items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-px bg-ink transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-b border-hairline">
          <div className="px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2 min-h-[44px] flex items-center transition-colors ${
                  pathname === link.href ? "text-ink" : "text-ink-2"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-accent border border-accent/40 px-4 py-2 rounded-full text-center mt-2"
            >
              Conversemos tu caso
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

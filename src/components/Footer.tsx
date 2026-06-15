import Link from "next/link";

const footerLinks = [
  { href: "/enfoque", label: "Cómo funciona" },
  { href: "/trabajo", label: "Casos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-xl leading-none text-ink"
            aria-label="Nautom — inicio"
          >
            nautom
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-2 hover:text-ink transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/nautom"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center text-ink-2 hover:text-accent hover:border-accent/40 transition-colors"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-hairline text-center">
          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} Nautom · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}

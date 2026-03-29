import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import GridOverlay from "@/components/GridOverlay";
import FloatingCTA from "@/components/FloatingCTA";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nautom.com"),
  title: "Nautom — Estudio de tecnología AI-first | Productos y proyectos a medida",
  description:
    "Estudio de tecnología que construye productos propios y proyectos a medida con enfoque AI-first. Gestión financiera, reservas, automatización y más para PyMEs argentinas.",
  keywords: [
    "estudio tecnología Argentina",
    "productos digitales PyMEs",
    "proyectos a medida",
    "AI-first development",
    "agentes de IA Argentina",
    "automatización PyMEs",
    "gestión financiera PyMEs",
    "Nautom",
    "Next.js Supabase",
  ],
  icons: {
    icon: [
      { url: "/favicon-32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/favicon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: "/favicon-512.svg",
  },
  openGraph: {
    title: "Nautom — Estudio de tecnología AI-first",
    description:
      "Construimos productos propios y proyectos a medida con enfoque AI-first para PyMEs argentinas.",
    url: "https://nautom.com",
    siteName: "Nautom",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nautom — Estudio de tecnología AI-first",
    description:
      "Construimos productos propios y proyectos a medida con enfoque AI-first para PyMEs argentinas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nautom",
              url: "https://nautom.com",
              description:
                "Estudio de tecnología AI-first que construye productos propios y proyectos a medida para PyMEs argentinas. Gestión financiera, reservas, automatización y agentes de IA.",
              foundingDate: "2023",
              founders: [
                { "@type": "Person", name: "Juan" },
                { "@type": "Person", name: "Nacho" },
              ],
              areaServed: {
                "@type": "Country",
                name: "Argentina",
              },
              knowsAbout: [
                "Inteligencia artificial para empresas",
                "Agentes de IA",
                "Automatización de procesos",
                "Desarrollo de aplicaciones internas",
                "Sistemas de gestión para PyMEs",
                "AI agents",
                "Business automation",
                "Python",
                "Vercel",
                "Supabase",
                "Railway",
              ],
              serviceType: [
                "Productos digitales propios",
                "Proyectos a medida",
                "Agentes de inteligencia artificial",
                "Automatización de procesos empresariales",
                "Desarrollo de aplicaciones internas",
                "Gestión financiera para PyMEs",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "\u00bfQu\u00e9 es un agente de IA y c\u00f3mo puede ayudar a mi empresa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Un agente de IA es un sistema inteligente que monitorea datos, toma decisiones y ejecuta tareas de forma aut\u00f3noma. Por ejemplo, podemos crear un agente que detecte anomal\u00edas en la asistencia de tu equipo, genere reportes autom\u00e1ticos o procese facturas sin intervenci\u00f3n manual.",
                  },
                },
                {
                  "@type": "Question",
                  name: "\u00bfCu\u00e1nto cuesta automatizar procesos en una PyME?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Depende del alcance, pero trabajamos con modelos de fee mensual fijo que se adaptan al tama\u00f1o de tu operaci\u00f3n. Nuestro foco es que el retorno de inversi\u00f3n sea claro desde el primer mes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "\u00bfTrabajan solo con empresas grandes?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Nos especializamos en PyMEs argentinas de entre 50 y 600 empleados.",
                  },
                },
                {
                  "@type": "Question",
                  name: "\u00bfQu\u00e9 tecnolog\u00edas usan?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Trabajamos con un stack moderno y AI-first: Claude Code, Python, Vercel, Supabase, Railway, GitHub, Airtable y Google Apps Script.",
                  },
                },
                {
                  "@type": "Question",
                  name: "\u00bfCu\u00e1nto tiempo toma implementar una soluci\u00f3n?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Un agente de IA o una automatizaci\u00f3n b\u00e1sica puede estar funcionando en 1-2 semanas. Proyectos m\u00e1s complejos como aplicaciones internas completas pueden tomar 4-8 semanas.",
                  },
                },
                {
                  "@type": "Question",
                  name: "\u00bfQu\u00e9 diferencia a Nautom de una software factory tradicional?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Somos una agencia boutique, no una f\u00e1brica. Trabajamos con pocos clientes a la vez, con dedicaci\u00f3n real. Usamos IA no solo como producto sino como herramienta de desarrollo.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-background text-foreground antialiased min-h-screen font-sans">
        <GridOverlay />
        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <FloatingCTA />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

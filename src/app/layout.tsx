import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nautom.com"),
  title: "Nautom — El conocimiento de tu empresa vive en el sistema",
  description:
    "Construimos software que se hace cargo de las reglas de tu negocio. El conocimiento deja de vivir en la cabeza de unas pocas personas y pasa a estar en el sistema: la operación no se frena cuando alguien falta.",
  icons: {
    icon: [
      { url: "/favicon-32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/favicon-512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: "/favicon-512.svg",
  },
  openGraph: {
    title: "Nautom — El conocimiento de tu empresa vive en el sistema",
    description:
      "Software que se hace cargo de las reglas de tu negocio, para que la operación no dependa de una persona.",
    url: "https://nautom.com",
    siteName: "Nautom",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nautom — El conocimiento de tu empresa vive en el sistema",
    description:
      "Software que se hace cargo de las reglas de tu negocio, para que la operación no dependa de una persona.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased min-h-screen font-sans">
        {/* Global Organization structured data (PR-5), server-rendered for LLMs. */}
        <JsonLd data={organizationJsonLd()} />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

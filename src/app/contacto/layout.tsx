import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Nautom",
  description:
    "Contanos qué frena hoy tu operación. Construimos software que se hace cargo de las reglas de tu negocio.",
  alternates: { canonical: "/contacto" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

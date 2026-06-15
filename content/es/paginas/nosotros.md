---
eyebrow: "Nosotros"
title: "Somos la prueba de lo que vendemos."
summary: "Nautom es un estudio de software AI-first. El contexto de cada proyecto vive en el sistema, no en la cabeza de quien lo armó — la misma idea que vendemos, aplicada a nosotros."
paragraphs:
  - "Nautom es un estudio de software AI-first. Somos chicos a propósito: construimos sistemas a medida para PyMEs argentinas, con un método donde la IA hace gran parte de la construcción y nosotros dirigimos."
  - "Eso no es un truco de productividad. Es la misma idea que vendemos, aplicada a nosotros: el contexto de cada proyecto vive en el sistema, no en la cabeza de quien lo armó. Por eso construimos rápido, y por eso el conocimiento de tu proyecto queda tuyo y operable — no dependés de una persona puntual, ni siquiera de la nuestra."
closing:
  title: "Construyamos el tuyo."
  ctas:
    - label: "Conversemos tu caso"
      href: "/contacto"
      variant: "primary"
    - label: "Ver cómo funciona"
      href: "/enfoque"
      variant: "secondary"
---

Página Nosotros (§5.4, copy v1 — Juancho edita voz). El modelo operativo como prueba:
los párrafos son **verbatim** de §5.4 del spec — no se reescriben acá. El `title` es
headline v1 (editable), derivado de §5.4 ("la misma idea que vendemos, aplicada a
nosotros"). El cierre (`closing`) es el CTA que §5.4 deja indicado ("Contacto / CTA").

Copy load-bearing: los párrafos viajan en el HTML server-rendered (§3) y el check de
SSR-presence los verifica. El Nosotros nuevo vive en `/nosotros` (la ruta `/about`
vieja se eliminó; el 301 lo agrega PR-5).

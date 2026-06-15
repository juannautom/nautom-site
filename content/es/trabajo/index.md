---
eyebrow: "Trabajo"
title: "Lo que construimos."
intro: "Dos casos en profundidad sobre cómo pensamos el software, y una muestra de proyectos en los que el conocimiento ya vive en el sistema."
casesHeading: "En profundidad"
lightHeading: "Otros proyectos"
light:
  - name: "Integra"
    logo: "/images/logos/integra.png"
    scale: 1.25
    line: "App de gestión + portal de inversores para ver la cartera."
  - name: "Lecker"
    logo: "/images/logos/lecker.svg"
    scale: 1.15
    line: "Saben qué producto les conviene vender, con alertas y proyección."
  - name: "Padel"
    line: "Gestión + turnera de reservas de canchas."
  - name: "Peerforum"
    logo: "/images/logos/peerforum.png"
    scale: 1.05
    line: "Inteligencia de comunidad: convierten datos dispersos en decisiones."
---

Índice de Trabajo (§2 / §5.3, PR-3). Estructura:

- **2 casos profundos** (linkean a sus páginas de PR-2): se leen desde la colección
  `casos` (`getCaso`/`getCasoSlugs`) — fuente única, sin duplicar copy. Orden por slug:
  `dos-verdades` (A) → `tener-todo-a-la-vista` (B).
- **4 proyectos livianos** (logo + una línea, sin página): cierran la Abierta de §5.3.
  Las 4 líneas son las **confirmadas** (ver decisión del PR / spec §5.3). El índice
  **no** los abre — logo + línea, nada más. Padel no tiene asset de logo todavía → se
  renderiza el nombre como fallback (mismo patrón `pending` que la barra de logos).

NO se usa la línea "cuatro operaciones, un mismo invariante" (§5.5): no es verdad de
los cuatro proyectos (dominios distintos), así que se saca — no se fuerza.

Copy load-bearing: las 4 líneas y las tesis de los casos viajan en el HTML
server-rendered (§3); el check de SSR-presence las verifica.

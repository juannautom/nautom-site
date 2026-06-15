# CONTEXT — nautom.com

Estado del repo durante el revamp. Fuente de verdad del plan: `specs/web-revamp/spec.md`.
Se actualiza al cerrar cada PR del breakdown (§6 del spec).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 (tokens en `@theme`, sin `tailwind.config`) · TS strict · npm · Vercel.

## Estado del breakdown

- [x] **PR-0 — Fundación**. Fixes base + sistema visual nuevo. Deja el shell listo para construir páginas encima. **No** toca contenido de páginas (es PR-1+).
- [x] **PR-1 — Capa de contenido (markdown) + Home**. Home real en un scroll, alimentada por markdown versionado.
- [x] **PR-2 — Caso A + Caso B**. Dos páginas de caso profundo sobre `/trabajo/<slug>`.
- [x] **PR-3 — Enfoque + Nosotros + Trabajo** (este). Ensayo + modelo operativo + índice de Trabajo.
- [x] **PR-4 — Sesión del agente** (en Caso A). Widget interactivo de validación en vivo.
- [x] **PR-5 — Capa-LLM/SEO** (esta). robots.txt (bots de IA), llms.txt/llms-full.txt
  autogenerados del markdown, JSON-LD (Organization/CreativeWork×2/FAQPage), canonicals
  SSR y mapa de 301. Última fila antes del go-live (#13 lo mergea Juancho aparte).

## Sistema visual (PR-0) — locked, ver spec §5.2

Tokens en `src/app/globals.css` (`@theme`), todo en oklch — sin hex de marca vieja:

- **Paper** (fondos): `--color-paper` `.986` / `--color-paper-2` `.968` / `--color-paper-3` `.948`
- **Ink** (texto): `--color-ink` `.225` / `--color-ink-2` `.44` / `--color-ink-3` `.62`
- **Oxide** (acento, se gana): `--color-accent` `.555` / `--color-accent-ink` `.46`
- **Hairline**: `--color-hairline` (ink @ 12%) para las reglas de 1px.
- `--color-background`/`--color-foreground` quedan como alias de paper/ink.

Utilidades Tailwind resultantes: `bg-paper`, `text-ink`, `text-ink-2`, `bg-accent`, `border-hairline`, etc.

**Tipografías** (next/font/google, en `layout.tsx`):
- Display serif **Newsreader** → `font-display` (h1/h2/h3 por defecto)
- Cuerpo **IBM Plex Sans** → `font-sans`
- **IBM Plex Mono** → `font-mono` (solo etiquetas chiquitas)

Sin dark mode, sin gradientes, sin glassmorphism.

## Capa de contenido (PR-1) — markdown versionado

El copy load-bearing vive como markdown versionado, **no** como arrays TS. Es la
infra que después alimenta `llms.txt` (PR-5) y la que demuestra la tesis del site.

- **Archivos:** `content/<locale>/<colección>/<slug>.md`. La Home son 6 archivos en
  `content/es/home/` (`hero`, `proof`, `change`, `case-a`, `case-b`, `cta`).
  Frontmatter YAML con los campos estructurados; el cuerpo lleva notas de autoría.
- **Dimensión locale** baked-in (`es` por default) para sumar EN aditivo después.
  **EN no se implementa** (ES-first, §4).
- **Loader:** `src/lib/content.ts` (`readSection`, parsea con `gray-matter`) +
  `src/lib/home.ts` (tipos + `getHomeContent()`). Se lee en build desde un Server
  Component → el copy viaja en el HTML server-rendered (sin JS).
- **Énfasis inline:** `src/lib/markdown.tsx` (`renderEmphasis`) soporta `*x*` →
  `<em>` (el hero enfatiza *sistema*). No es un pipeline MDX completo, a propósito.
- **Componentes:** `src/components/home/*` (`Hero`, `ProofBar`, `Change`,
  `CaseTeasers`, `ClosingCta`, `CtaButtons`). Todos Server Components.
- **Dep nueva:** `gray-matter`.

### Decisiones de PR-1 (registradas también en spec §5.5)
- **Barra de logos:** lista/orden definidos por Juancho — 9 logos en `content/es/home/proof.md`
  (Peerforum, IVESS El Jumillano, Altis Viajes, Integra Groupe, Impacto Positivo, Quanta,
  YPF Gas, KeepSmiling, Lecker Argentina). Kova se eliminó. **Display: marquee de una sola
  fila** (CSS puro, `nautom-marquee` en `globals.css`; pausa en hover; respeta
  `prefers-reduced-motion`; logos en el HTML SSR). Todos se aplanan a silueta tinta con
  `filter:brightness(0)`. Sizing: altura **definida** (`h-8`/`h-9`) — los SVG no traen
  width/height, con `max-h` solos quedan sin tamaño. `scale` por logo = ajuste óptico.
- **Teasers anonimizados por concepto**, sin nombre de cliente. Caso A lidera con la
  tesis (no hay dato de escala medido → no se inventa). Caso B lidera con datos de
  escala de §4 — **flag para review**: confirmar que corresponden a esa distribuidora.
- **Rutas de los casos** (las consume el teaser ahora; las páginas llegan en PR-2):
  `/trabajo/dos-verdades` y `/trabajo/tener-todo-a-la-vista`.

## Casos profundos (PR-2)

- **Contenido:** `content/es/casos/<slug>.md` — mismo patrón que PR-1. Frontmatter con
  una lista ordenada de `sections` (kinds: `prose`, `scale`, `layers`, `invariant`,
  `payoff`), así un solo renderer sirve ambos casos y cada archivo controla su orden.
  Slugs: `dos-verdades` (A) y `tener-todo-a-la-vista` (B).
- **Loader:** `src/lib/casos.ts` (`getCaso`, `getCasoSlugs`) sobre `readSection`/
  `listSlugs` de `content.ts`.
- **Ruta:** `src/app/trabajo/[slug]/page.tsx` — SSG (`generateStaticParams` +
  `dynamicParams=false`), Server Component → copy en el HTML SSR. `params` se await-ea
  (Next 16). `/trabajo` (índice) llega en PR-3; los links a `/trabajo` 404ean hasta entonces.
- **Renderer:** `src/components/casos/CaseSections.tsx`. El `kind: "layers"` es el
  diagrama blueprint-sobre-papel (dos paneles hairline con grilla técnica sutil + flecha
  operación→contabilidad). El invariante (kind `invariant`) se muestra en idioma plano.
- **IDs de asiento:** se decidió NO mostrar numeración de asientos en las páginas de
  caso (§5.1 lo prohíbe en superficies de entrada) → resuelve el fix §5.5 sin que ningún
  ID signifique dos cosas.

## Enfoque + Nosotros + Trabajo (PR-3)

- **Enfoque / Nosotros (ensayos):** `content/es/paginas/<slug>.md` — mismo patrón que
  PR-1/PR-2. Frontmatter con `eyebrow`, `title`, `summary`, `paragraphs` (el ensayo,
  load-bearing) y un `closing` (CTA) opcional. Copy de los párrafos = **verbatim de
  §5.4** (copy v1 — Juancho edita voz). Loader `src/lib/paginas.ts` (`getPagina`),
  renderer `src/components/paginas/Essay.tsx` (un Server Component sirve ambas).
  Rutas `src/app/enfoque/page.tsx` y `src/app/nosotros/page.tsx` (estáticas).
- **Trabajo (índice):** `content/es/trabajo/index.md` (intro + 4 proyectos livianos) +
  loader `src/lib/trabajo.ts` (`getTrabajoIndex`) que **lee los 2 casos de la colección
  `casos`** (fuente única, sin duplicar copy; orden por slug → A, B). Los 2 casos
  linkean a `/trabajo/<slug>`; los 4 livianos son **logo + línea, sin página** (Padel
  no tiene asset → fallback al nombre, mismo patrón `pending` que la barra de logos).
  Renderer `src/components/trabajo/TrabajoIndex.tsx`, ruta `src/app/trabajo/page.tsx`.
  Cierra la Abierta de §5.3 (líneas confirmadas en `spec.md`). La línea "cuatro
  operaciones, un mismo invariante" **no se usa** (§5.5): no es verdad de los cuatro.
- El grid de 6 servicios **no** revive en Enfoque (§4): el alcance se cuenta en prosa,
  no en una grilla.

## Sesión del agente (PR-4)

La única pieza interactiva del revamp. Vive en la página de **Caso A**
(`/trabajo/dos-verdades`), no en Home (§4): es lo más diferenciador pero exige
atención, así que va donde el lector ya está enganchado.

- **Máquina de estados:** `src/lib/agentSession.ts` — módulo **puro, sin React**.
  Lleva los pasos del ciclo (`propone mal → el sistema lo frena → lo corrige → listo`)
  y las funciones `nextStep`/`isLastStep`/`stepAt`. Toda la micro-copy vive acá, en
  **idioma plano (§5.1)**: sin nombres de guarda en inglés, sin `§`, sin notación
  `∀/m₁`, sin logs. El ejemplo es la regla del propio Caso A (una deuda en pesos no
  se salda con un crédito en dólares) → el último paso aterriza en la tesis del caso.
- **Componente:** `src/components/casos/AgentSession.tsx` (`"use client"`) — shell
  fino sobre la máquina. Tratamiento "panel de validación en vivo" simplificado:
  un panel que avanza paso a paso, dots de progreso, estado en palabras
  ("Frenado por el sistema" / "Movimiento registrado"), `aria-live` en la línea,
  el acento (óxido) **se gana** solo en el paso "frenado". Sin animación pesada.
- **Enhancement progresivo, no reemplazo:** se monta sólo para `dos-verdades`,
  **después** de `CaseSections`. El copy load-bearing de Caso A (tesis, invariante,
  dos capas) **no se movió al cliente** → Caso A sigue pasando SSR-presence (el widget
  agrega; no refactoriza el contenido hacia JS).
- **Smoke check:** `scripts/smoke-agent-session.mjs` (`npm run smoke:agent`) importa
  la **misma** máquina (Node 24 stripea los tipos del `.ts` en runtime) y la recorre
  entera sin DOM: monta, avanza los 5 pasos, y **sabe fallar** si un paso tira
  (`stepAt` rompe en índice inválido, el walk está acotado) o si una línea viola §5.1
  (escanea `§`, notación matemática, nombres técnicos en inglés, logs).
- **Nota de discovery:** el asset JS de la máquina del bundle de Design (referido en
  el spec) **no estaba en este workspace** — se buscó en el repo, todas las ramas, el
  historial de git y los workspaces hermanos. La máquina reconstruye la conducta
  documentada (§4 + §5.1), que está completa; no se reescribió una lógica existente,
  se reconstruyó una ausente. Si el asset aparece, conviene reconciliar.

## Capa-LLM / SEO (PR-5)

La fila que hace el site legible y citable por LLMs, más los redirects. Todo va en el
HTML **server-rendered** (§3), nada inyectado por JS.

- **`robots.txt`:** `src/app/robots.ts` (`MetadataRoute.Robots`). Permite los bots de
  IA explícitamente —**ClaudeBot, GPTBot, PerplexityBot**— además del `*`, y apunta a
  `/sitemap.xml`. Nombrarlos hace legible la intención y chequeable el invariante.
- **`llms.txt` + `llms-full.txt` autogenerados del markdown:** se sirven desde
  `public/` (accesibles en `/llms.txt` y `/llms-full.txt`). **No se hardcodean:** el
  builder `scripts/lib/llms-content.mjs` lee el mismo markdown que renderizan las
  páginas (gray-matter, idéntico precedente que `check-ssr-presence.mjs`) y arma los
  dos archivos de forma **determinística** (sin fechas). `npm run llms:gen` los escribe;
  `npm run check:llms` regenera en memoria y **diffea byte a byte** contra lo commiteado
  → drift = fallo. Sabe fallar de dos formas: edición a mano de `public/llms.txt`
  (hardcode) o cambio de contenido sin regenerar. `llms.txt` = índice curado
  (forma llmstxt.org: H1 + blockquote + listas de links con una línea por página);
  `llms-full.txt` = el site entero como un markdown (páginas + casos completos + FAQ).
- **JSON-LD** (`src/lib/jsonld.ts` + `<JsonLd>` server component, escapa `<`):
  `Organization` global (en `layout.tsx`), un `CreativeWork` por caso (en
  `/trabajo/[slug]`), y `FAQPage` en la Home. La FAQ vive como contenido versionado
  (`content/es/faq/index.md`, loader `src/lib/faq.ts`) — copy v1 en idioma comprador
  (§5.1), respuestas apoyadas en copy ya presente del site, **sin métricas inventadas**
  (§4). No hay página `/faq` visible (decisión registrada en el .md).
- **Canonicals:** `metadata.alternates.canonical` por ruta (Home, Enfoque, Nosotros,
  Trabajo, Contacto y cada caso) → Next los renderiza en el `<head>` server-side. Next
  normaliza el canonical de `/` al origen pelado (`https://nautom.com`, sin barra).
- **Mapa de 301** (`src/lib/redirects.ts`, fuente única): `/about`→`/nosotros` y
  `/contact`→`/contacto`. **Inventario cruzado de dos fuentes** que coinciden: el
  sitemap viejo (`main:src/app/sitemap.ts` listaba `/`, `/about`, `/contact`) y las
  rutas reales viejas (`main:src/app/**` = `/`, `/about`, `/contact` + el endpoint
  `/api/contact`, no navegable). `/` existe en viejo y nuevo → no se redirige. Se usa
  **`statusCode: 301`** explícito en `next.config.ts` (no `permanent: true`, que
  emitiría 308). El descubrimiento del segundo redirect (`/contact`→`/contacto`, no
  nombrado en §6, que solo citaba `/about`) quedó registrado en `spec.md` §5.5/§6.
- **`sitemap.ts`** actualizado: ahora lista las rutas nuevas (Enfoque, Trabajo,
  Nosotros, Contacto + los 2 casos leídos de la colección `casos`, fuente única).
- **`src/lib/text.ts`:** helper `plainText` (saca `*énfasis*`) extraído de
  `markdown.tsx` a un módulo **sin JSX**, para que el generador de llms pueda
  importarlo bajo el type-stripping de Node (que no compila JSX).

### Checks de PR-5 (mecánicos, "saben fallar")
- `npm run check:llms` — regenera del markdown y diffea contra `public/` (drift = exit 1).
- `npm run check:redirects` — `next start` + recorre el mapa: cada viejo→nuevo debe dar
  **301** con el `Location` correcto; un 200/404 o un destino mal → exit 1.
- `npm run check:seo` — `next start` + por ruta: `<link rel="canonical">` esperado +
  todo `<script type="application/ld+json">` parsea, usa `@context schema.org` y los
  `@type` requeridos están y bien formados (Organization, CreativeWork×2, FAQPage).

## SSR-presence check (PR-1, extendido en PR-2 y PR-3)

`scripts/check-ssr-presence.mjs` (`npm run check:ssr`). Levanta `next start` y hace
fetch del HTML de **6 rutas** (`/`, `/trabajo/dos-verdades`, `/trabajo/tener-todo-a-la-vista`,
`/enfoque`, `/nosotros`, `/trabajo`), verificando que el copy clave está en el **markup
renderizado** (no en el flight payload). Para `/trabajo` chequea la intro, las tesis de
los 2 casos (leídas de `casos`) y las 4 líneas livianas. Lee las frases esperadas del
mismo markdown, así no driftea. **Sabe fallar:** quita los `<script>` antes de buscar,
de modo que si una sección pasa a render client-side (copy inyectado por JS) el copy
desaparece del HTML y el check sale con exit ≠ 0 (validado en PR-1, PR-2 y PR-3 con una
violación deliberada — en PR-3, omitir un párrafo de Essay del render server → exit 1 en
`/enfoque` y `/nosotros`).

## Shell

- `layout.tsx`: fuentes, metadata nueva (sin taglines viejos), `<Navbar>` + `<main>` + `<Footer>`. El JSON-LD viejo se removió; **PR-5** emite el `Organization` nuevo acá (global, server-rendered).
- `components/Navbar.tsx`: wordmark `nautom` + "Cómo funciona" (`/enfoque`) · "Casos" (`/trabajo`) · CTA primario "Conversemos tu caso" (`/contacto`). El verbo es conversacional, nunca "demo" (vendemos servicio a medida, no SaaS). Las rutas `/enfoque` y `/trabajo` aún no existen (llegan en PR-3).
- `components/Footer.tsx`: wordmark + links (Enfoque/Trabajo/Nosotros/Contacto) + LinkedIn.

## Notas / deuda conocida

- **Resend**: init lazy dentro del handler (`src/app/api/contact/route.ts`). El build pasa sin `RESEND_API_KEY`; si falta en runtime, el endpoint responde 503.
- **OG**: un solo generador, `src/app/opengraph-image.tsx` (file-based, lo reusa `twitter-image.tsx`), en el sistema nuevo. Se eliminó el segundo generador (`scripts/generate-og.mjs`) y su salida `public/og-image.png`. Fuentes para el OG vendoreadas en `src/app/fonts/*.woff`.
- **Contacto**: página re-estilada al sistema nuevo, reusa el pipeline Resend. Contenido fino es de PRs posteriores.
- **`/about`** y **`/contact`**: rutas viejas **eliminadas**. El Nosotros nuevo va en
  `/nosotros` y el contacto en `/contacto`. Los 301 (`/about`→`/nosotros`,
  `/contact`→`/contacto`) los agregó **PR-5** (`src/lib/redirects.ts`).
- **`framer-motion`** quedó como dep sin uso tras limpiar los componentes viejos. No se removió (probable uso en PR-1/PR-4).
- **Assets sin usar en `public/`**: logos copper viejos (`logo-white-copper.svg`, etc.). No los referencia nada en código; se reemplazan cuando exista el logo nuevo.

## Gate (mecánico — no cubre calidad visual/editorial)

```
npm run type-check   # tsc --noEmit
npm run lint         # eslint . (flat config nativa de eslint-config-next 16)
RESEND_API_KEY unset; npm run build   # debe pasar sin la env var
npm run check:ssr       # SSR-presence (requiere build previo); ver arriba
npm run smoke:agent     # monta la máquina del widget de Caso A y avanza sus pasos (PR-4)
npm run check:llms      # llms.txt/llms-full.txt derivan del markdown — drift = fallo (PR-5)
npm run check:redirects # cada 301 viejo→nuevo resuelve (requiere build previo) (PR-5)
npm run check:seo       # canonicals + JSON-LD válidos en el HTML SSR (requiere build) (PR-5)
```

Si cambia el contenido markdown, regenerá los archivos de LLM y commiteá:
`npm run llms:gen` (si no, `check:llms` falla por drift).

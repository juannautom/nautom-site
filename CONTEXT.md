# CONTEXT — nautom.com

Estado del repo durante el revamp. Fuente de verdad del plan: `specs/web-revamp/spec.md`.
Se actualiza al cerrar cada PR del breakdown (§6 del spec).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 (tokens en `@theme`, sin `tailwind.config`) · TS strict · npm · Vercel.

## Estado del breakdown

- [x] **PR-0 — Fundación**. Fixes base + sistema visual nuevo. Deja el shell listo para construir páginas encima. **No** toca contenido de páginas (es PR-1+).
- [x] **PR-1 — Capa de contenido (markdown) + Home**. Home real en un scroll, alimentada por markdown versionado.
- [x] **PR-2 — Caso A + Caso B** (este). Dos páginas de caso profundo sobre `/trabajo/<slug>`.
- [ ] PR-3 — Enfoque + Nosotros + Trabajo.
- [ ] PR-4 — Sesión del agente (en Caso A).
- [ ] PR-5 — Capa-LLM/SEO: robots.txt, llms.txt, JSON-LD, canonicals, redirects 301.

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

## SSR-presence check (PR-1, extendido en PR-2)

`scripts/check-ssr-presence.mjs` (`npm run check:ssr`). Levanta `next start` y hace
fetch del HTML de **3 rutas** (`/`, `/trabajo/dos-verdades`, `/trabajo/tener-todo-a-la-vista`),
verificando que el copy clave está en el **markup renderizado** (no en el flight payload).
Lee las frases esperadas del mismo markdown, así no driftea. **Sabe fallar:** quita los
`<script>` antes de buscar, de modo que si una sección pasa a render client-side (copy
inyectado por JS) el copy desaparece del HTML y el check sale con exit ≠ 0 (validado en
PR-1 y PR-2 con una violación deliberada).

## Shell

- `layout.tsx`: fuentes, metadata nueva (sin taglines viejos), `<Navbar>` + `<main>` + `<Footer>`. El JSON-LD viejo se removió (lo rehace PR-5 con la narrativa nueva).
- `components/Navbar.tsx`: wordmark `nautom` + "Cómo funciona" (`/enfoque`) · "Casos" (`/trabajo`) · CTA primario "Conversemos tu caso" (`/contacto`). El verbo es conversacional, nunca "demo" (vendemos servicio a medida, no SaaS). Las rutas `/enfoque` y `/trabajo` aún no existen (llegan en PR-3).
- `components/Footer.tsx`: wordmark + links (Enfoque/Trabajo/Nosotros/Contacto) + LinkedIn.

## Notas / deuda conocida

- **Resend**: init lazy dentro del handler (`src/app/api/contact/route.ts`). El build pasa sin `RESEND_API_KEY`; si falta en runtime, el endpoint responde 503.
- **OG**: un solo generador, `src/app/opengraph-image.tsx` (file-based, lo reusa `twitter-image.tsx`), en el sistema nuevo. Se eliminó el segundo generador (`scripts/generate-og.mjs`) y su salida `public/og-image.png`. Fuentes para el OG vendoreadas en `src/app/fonts/*.woff`.
- **Contacto**: página re-estilada al sistema nuevo, reusa el pipeline Resend. Contenido fino es de PRs posteriores.
- **`/about`**: ruta vieja **eliminada**. El Nosotros nuevo va en `/nosotros` (PR-3) y el 301 `/about`→`/nosotros` lo agrega PR-5.
- **`framer-motion`** quedó como dep sin uso tras limpiar los componentes viejos. No se removió (probable uso en PR-1/PR-4).
- **Assets sin usar en `public/`**: logos copper viejos (`logo-white-copper.svg`, etc.). No los referencia nada en código; se reemplazan cuando exista el logo nuevo.

## Gate (mecánico — no cubre calidad visual/editorial)

```
npm run type-check   # tsc --noEmit
npm run lint         # eslint . (flat config nativa de eslint-config-next 16)
RESEND_API_KEY unset; npm run build   # debe pasar sin la env var
npm run check:ssr    # SSR-presence de / (requiere build previo); ver arriba
```

# CONTEXT — nautom.com

Estado del repo durante el revamp. Fuente de verdad del plan: `specs/web-revamp/spec.md`.
Se actualiza al cerrar cada PR del breakdown (§6 del spec).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 (tokens en `@theme`, sin `tailwind.config`) · TS strict · npm · Vercel.

## Estado del breakdown

- [x] **PR-0 — Fundación** (este). Fixes base + sistema visual nuevo. Deja el shell listo para construir páginas encima. **No** toca contenido de páginas (es PR-1+).
- [ ] PR-1 — Capa de contenido (markdown/MDX) + Home real.
- [ ] PR-2 — Caso A + Caso B.
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
```

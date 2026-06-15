# [PR-0] Revamp web — fundación: fixes base + tokens visuales

## Contexto
Arranca el revamp de `nautom.com`. El plan completo vive en `specs/web-revamp/spec.md` (leelo entero antes de empezar; el discovery que lo fundamenta está en `.context/analisis-revamp-website.md`). Este es el PR-0 del breakdown: deja el repo listo para construir páginas encima. No toca contenido de páginas todavía.

## Decisiones tomadas (del spec — no reabrir)
- Revamp in-place, rama nueva, preview deploys como staging.
- Stack: Next 16 App Router, React 19, Tailwind v4 (`@theme`, sin `tailwind.config`), TS strict, npm, Vercel.
- Sistema visual nuevo bloqueado (tokens abajo). Supersede la marca vieja (Navy/Copper/Inter).

## Alcance de este PR
1. **Fix del build sin secret.** Hoy `new Resend()` corre a nivel de módulo y rompe el build sin `RESEND_API_KEY`. Pasarlo a init lazy (instanciar dentro del handler, no en import). El build tiene que pasar sin la env var.
2. **ESLint.** No hay config de lint en el repo. Agregar una config estándar para Next 16 + TS y dejar `npm run lint` funcionando.
3. **Tokens en `@theme`** (Tailwind v4). Instalar:
   - Papel: `oklch(.986 .006 78)` / `.968` / `.948`. Tinta: `oklch(.225 .010 56)` / `.44` / `.62`. Óxido (acento): `oklch(.555 .145 46)`, ink `.46`.
   - Fuentes: display **Newsreader** (serif), cuerpo **IBM Plex Sans**, **IBM Plex Mono** para etiquetas chiquitas. Cargar bien (next/font o equivalente), sin FOUT.
   - Espaciado base 8, hairline 1px.
4. **Layout base nuevo:** nav (logo `nautom` + Cómo funciona / Casos / Conversemos tu caso) y footer, en el sistema visual nuevo. Sin contenido de páginas — solo el shell que envuelve todo.
5. **Borrar la marca vieja:** colores Navy/Copper, tipografía Inter, taglines viejos. Y **consolidar los dos generadores de OG en uno** (el discovery encontró dos con taglines opuestos) — dejar uno solo con el mensaje nuevo.

## Fuera de alcance
- Contenido de Home/casos/Enfoque/Nosotros (son PR-1 en adelante).
- Capa-LLM, redirects, JSON-LD (PR-5).
- No tocar el pipeline de contacto Resend más allá del fix lazy.

## Criterios de aceptación
- `npm run build` pasa **sin** `RESEND_API_KEY` seteada.
- `npm run type-check` y `npm run lint` limpios.
- Los tokens están en `@theme` y el nav/footer nuevos renderizan con ellos.
- No queda rastro de la marca vieja (grep de Navy/Copper/Inter/taglines viejos → vacío); un solo generador de OG.

---

*Antes de empezar: leé `CLAUDE.md`, `CONTEXT.md` y `specs/web-revamp/spec.md`. Al terminar, actualizá `CONTEXT.md` con el estado nuevo. No avances a PR-1 — Juancho revisa el preview de PR-0 primero.*

`/goal npm run build pasa sin RESEND_API_KEY (con la salida en el transcript), npm run type-check y npm run lint limpios, o stop after 15 turns`

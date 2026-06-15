# spec.md — Revamp web Nautom

> Fuente de verdad del rediseño de `nautom.com`. Vive en `specs/web-revamp/`.
> Discovery que lo fundamenta: `.context/analisis-revamp-website.md` (ya producido por Claudio).
> Se edita cuando cambia una decisión, en el mismo PR que la cambia.

---

## 1. Outcome

Reposicionar el site público de Nautom de "agentes de IA y automatización para PyMEs" (commodity, narrativa vieja) a **"hacemos que el conocimiento de tu empresa viva en el sistema, no en las personas"**. El site debe leerse en idioma de dueño de PyME (no técnico), verse como el producto que vendemos (ordenado, preciso, sin ruido), y estar optimizado para ser leído y citado por LLMs.

## 2. Scope

**In (este revamp):**
- Home (un scroll: hero → barra de prueba → el cambio/antes-después → 2 casos teaser → CTA).
- Página Enfoque (ensayo del concepto).
- Página Trabajo (índice: 2 casos profundos + 4 proyectos livianos).
- 2 páginas de caso profundas: "Dos verdades" (A) y "Tener todo a la vista" (B).
- Página Nosotros (modelo operativo).
- Contacto (reusar pipeline Resend existente).
- Capa-LLM: SSR real, `robots.txt`, `llms.txt`/`llms-full.txt`, JSON-LD, canonicals.
- Redirects 301 de las URLs viejas.
- Pieza interactiva: sesión del agente (ver Abiertas → resuelta).

**Out (no en este revamp):**
- i18n/EN (capa de contenido queda lista para sumarlo aditivo; no se implementa).
- Blog / contenido nuevo más allá de lo especificado.
- Cualquier backend nuevo (el site es estático + form de contacto).
- Performance fina / Core Web Vitals (fase posterior).

## 3. Constraints (cerradas en discovery — no reabrir sin flag)

- **Revamp in-place, rama nueva.** No repo nuevo (evita re-apuntar dominio / downtime). Preview deploys de Vercel = staging.
- **Stack confirmado:** Next.js 16.1.6 (App Router, Turbopack), React 19.2.3, Tailwind v4 (tokens en `@theme`, sin `tailwind.config`), TS strict, **npm**, Vercel.
- **Contenido como markdown/MDX versionado**, no arrays TS hardcodeados. Es la capa que alimenta `llms.txt` y demuestra la tesis (el conocimiento vive como contexto versionado).
- **SSR/SSG real**: el contenido va en el HTML al fetch. Es requisito de la capa-LLM, no optimización.
- **Sistema visual bloqueado** (validado en Design, ver §5.2). No reabrir la paleta ni las tipografías.

## 4. Decisiones tomadas / Abiertas

### Decisiones tomadas
- IA = Home / Enfoque / Trabajo / Caso A / Caso B / Nosotros / Contacto.
- Audiencia = dueño/gerente de PyME, NO técnico. Idioma comprador (ver §5.1).
- Logos de clientes: sobreviven como prueba de amplitud. Testimonios viejos: **discontinuados** (contradicen el posicionamiento).
- Grid de 6 servicios: **eliminado**. Sobrevive como una línea dentro de Enfoque.
- ES-first, sin EN. Capa de contenido estructurada para EN aditivo futuro.
- 4 proyectos livianos (logo + línea, sin abrir): Integra, Lecker, Padel, Peerforum.
- 2 casos profundos sin nombrar cliente, por concepto.

### Decisiones tomadas con default mío (Juancho puede revertir)
- **Sesión del agente → SÍ va al site, en la página de Caso A, NO en Home, y en idioma plano.** Razón: es la pieza más diferenciadora pero exige atención; va donde el lector ya está enganchado, no en la entrada. Versión plana: "el agente propone algo mal → el sistema lo frena → lo corrige". Sin nombres de guarda en inglés, sin `§`, sin notación `∀/m₁`. El tratamiento "panel de validación en vivo" (B de la exploración) es el elegido, simplificado. La lógica JS de la máquina de estados ya existe en el bundle de Design (asset de texto) — Claudio la adapta, no la reescribe de cero.
- **Enfoque y Nosotros: copy v1 redactado abajo (§5.4).** Juancho edita voz/detalle. No bloquea el build de las otras páginas.

### Abiertas
*(Ninguna bloqueante. Todas cerradas — ver abajo.)*

### Regla de números (load-bearing — el modo de falla del site viejo)
- **Nunca inventar una métrica.** El site viejo publicó "+40 hs/mes" para Jumillano y las notas internas decían "+300" — dato fabricado, incoherente, erosiona confianza. No se reusa.
- Distinguir dos tipos: **dato de escala** (descripción verdadera de lo que el sistema maneja — "190 rutas diarias", "~600 empleados", "~170K clientes") = se usa libremente; **métrica de resultado** (afirmación de impacto — horas ahorradas, %) = solo si fue **medida** con el cliente. No se redacta sin medición.
- Caso B (y los casos en general) **lideran con datos de escala reales**, no con resultados inventados. Una métrica de resultado se suma después, instrumentándola con el cliente (tarea aparte, no bloquea build).

## 5. Modelo de contenido + sistema + copy

### 5.1 Reglas de voz (load-bearing — el modo de falla de todo el proyecto fue violar esto)
- Idioma de dueño de PyME. Si una frase necesita que el lector sea programador, está mal.
- Menos texto. Una idea por bloque. Frases cortas. Mucho aire.
- Traducción obligatoria de lo técnico:
  - ❌ `∀ deuda(m₁), crédito(m₂): m₁≠m₂ ⇒ no compensa` → ✅ "Una deuda en pesos no se tapa con un crédito en dólares. El sistema no te deja hacerlo."
  - ❌ `op-state-machine · ledger-immutable · no-cross-currency` → ✅ "El sistema conoce las reglas de tu negocio y las hace cumplir solo."
  - ❌ logs `§00 LEE · §01 CONSTRUYE` → ✅ (no mostrar logs/notación en superficies de venta)
- Sin notación matemática, sin nombres internos de reglas en inglés, sin `§`/"expediente"/numeración de asientos en superficies de entrada.

### 5.2 Tokens visuales FIJOS (validados en Design)
- **Fondo (papel):** `oklch(.986 .006 78)` · `.968` · `.948`
- **Tinta:** `oklch(.225 .010 56)` · sec `.44` · ter `.62`
- **Acento (óxido):** `oklch(.555 .145 46)` · ink `.46` — se gana, no se reparte.
- **Tipografías:** display serif **Newsreader**; cuerpo **IBM Plex Sans**; **IBM Plex Mono** SOLO para etiquetas chiquitas de sección (con mesura).
- **Espaciado** base 8, hairline 1px, mucho blanco.
- Sin dark/terminal, sin gradientes, sin glassmorphism, sin grilla decorativa de fondo.
- ⚠️ Esto **supersede** la marca vieja en `nautom-stack` (Navy Deep/Warm Copper/Inter/"Tu equipo de tecnología AI-first"). Actualizar esa skill aparte.

### 5.3 Copy cerrado (de la conversación)
**Hero:** "Que el conocimiento de tu empresa viva en el *sistema*, no en las personas." Sub: "Las reglas de tu negocio dejan de estar en la cabeza de alguien y pasan a estar en el software. La operación no se frena cuando esa persona no está." CTA primario "Conversemos tu caso" (a `/contacto`), secundario "Ver cómo funciona". (Nunca "demo": vendemos servicio a medida, no un SaaS — el verbo es conversacional y se unifica en todo el site: nav, hero y cualquier CTA.)

**El cambio (antes/después):**
- Antes — "El conocimiento vive en una persona. Si esa persona no está, te frenás. Si se va, el conocimiento se va con ella."
- Después — "El conocimiento vive en el sistema. Las reglas del negocio están en el software y se cumplen solas. La persona decide mejor, con todo a la vista."

**Caso A — "Dos verdades":** (texto en §-anterior del proyecto; tesis "La operación y la contabilidad son dos verdades distintas. El software que las mezcla corrompe las dos." → problema → dos capas → invariante en idioma plano → payoff "construís rápido sin miedo: el sistema no te deja romper la contabilidad aunque te equivoques.") Diagrama blueprint-sobre-papel. Invariante mostrado en idioma comprador, NO como predicado formal.

**Caso B — "Tener todo a la vista":** tesis "Las mejores decisiones no las toma quien más recuerda. Las toma quien tiene todo a la vista." Estructura de **dos hilos, a propósito**: (a) **cuerpo** = el hilo del cliente, anonimizado — una distribuidora dejó de depender de la memoria de su encargado; la carga invisible → el sistema toma la carga → la persona decide con todo delante; (b) **remate** = dogfooding — "y nosotros tampoco dependemos de una persona; el conocimiento del proyecto vive en el sistema". **Nunca un nombre propio** (es el concepto, no la persona). Lidera con datos de escala reales, no métrica de resultado inventada. Sin metáfora de capas ni rieles. Payoff "gente que decide mejor; una operación que no se frena cuando alguien falta".

**Proyectos livianos (cerrado — PR-3):** logo + una línea en el índice de Trabajo, sin
página propia. Líneas confirmadas (idioma comprador, §5.1):
- Integra — "App de gestión + portal de inversores para ver la cartera."
- Lecker — "Saben qué producto les conviene vender, con alertas y proyección."
- Padel — "Gestión + turnera de reservas de canchas."
- Peerforum — "Inteligencia de comunidad: convierten datos dispersos en decisiones."

### 5.4 Copy v1 — Enfoque y Nosotros (Juancho edita)

**ENFOQUE** (ensayo, idioma comprador):
- Apertura: "Toda empresa funciona con reglas. Cómo se cotiza, qué se puede prometer, qué nunca hay que hacer. El problema es dónde viven esas reglas: casi siempre, en la cabeza de unas pocas personas."
- "Cuando el conocimiento vive en personas, la empresa depende de que estén. Una se enferma, otra se va, y con ella se va el cómo se hacían las cosas. Cada decisión importante necesita a la persona que sabe."
- "Nosotros construimos software que se hace cargo de esas reglas. No un sistema que solo guarda datos — un sistema que conoce los límites del negocio y no deja cruzarlos, aunque alguien se equivoque."
- "Sobre esa base, construir lo nuevo es rápido y seguro. Y la IA tiene de qué agarrarse: puede operar y proponer porque las reglas están escritas y se hacen cumplir, no porque adivina."
- Cierre (timing, sin colgarse de Nadella): "La industria empieza a nombrar esto: el valor no está en qué modelo de IA usás, sino en si el conocimiento de tu empresa está ordenado y operable. El que lo tiene, aprovecha la IA de verdad. El que lo tiene en la cabeza de unos pocos, queda atrás."

**NOSOTROS** (modelo operativo como prueba):
- "Nautom es un estudio de software AI-first. Somos chicos a propósito: construimos sistemas a medida para PyMEs argentinas, con un método donde la IA hace gran parte de la construcción y nosotros dirigimos."
- "Eso no es un truco de productividad. Es la misma idea que vendemos, aplicada a nosotros: el contexto de cada proyecto vive en el sistema, no en la cabeza de quien lo armó. Por eso construimos rápido, y por eso el conocimiento de tu proyecto queda tuyo y operable — no dependés de una persona puntual, ni siquiera de la nuestra."
- (Contacto / CTA.)

### 5.5 Fixes de contenido (QA — no son diseño)
- **Clientes reales:** reemplazar los placeholders inventados de Design (Meridia/Cobalto/Astra/Nodo) por los reales (Integra/Lecker/Padel/Peerforum) o el framing anonimizado acordado. Y la línea "cuatro operaciones, un mismo invariante" solo si es verdad de los cuatro — si no, generalizarla o sacarla.
  - **[PR-1, resuelto en Home]** La barra de logos usa 9 logos (lista/orden de Juancho): Peerforum, IVESS El Jumillano, Altis Viajes, Integra Groupe, Impacto Positivo, Quanta, YPF Gas, KeepSmiling, Lecker Argentina. Kova se eliminó. Display = **marquee de una sola fila** (CSS puro). La línea "cuatro operaciones, un mismo invariante" no se usó en Home.
  - **[PR-1]** Rutas de los casos profundas que consumen los teasers de Home (páginas en PR-2): `/trabajo/dos-verdades` (Caso A) y `/trabajo/tener-todo-a-la-vista` (Caso B).
  - **[PR-3, resuelto]** El índice de Trabajo (`/trabajo`) muestra los 4 proyectos
    livianos como logo + línea (sin página), con las líneas confirmadas de §5.3. La
    línea **"cuatro operaciones, un mismo invariante" NO se usa**: no es verdad de los
    cuatro (dominios distintos) → se saca, no se fuerza. Cierra la Abierta de §5.3.
  - **[PR-1]** El teaser de Caso B lidera con los datos de escala de §4 ("190 rutas diarias", "~600 empleados", "~170K clientes") → **flag para review**: confirmar que corresponden a esa distribuidora antes de go-live. El teaser de Caso A no incluye dato de escala (no hay uno medido; no se inventa, §4).
- **IDs de asiento coherentes** entre Caso A y Caso B: hoy reusan `·0001`/`·0003` con significados distintos. Hilar un solo ledger ficticio coherente, o desacoplar los IDs.
  - **[PR-2, resuelto]** Se decidió **no mostrar numeración de asientos** en las páginas de caso: §5.1 prohíbe `§`/"expediente"/numeración de asientos en superficies de entrada, y las dos páginas de caso son superficie de venta. Sin IDs, ninguno puede significar dos cosas → el fix queda cerrado por la vía de sacarlos, no de hilarlos. Si más adelante se quiere un ledger ficticio visible, reabrir acá.

## 6. Breakdown de PRs + verificación

> Secuencial. Acoplamiento real: PR-0 (tokens) sostiene todo; PR-1 (capa contenido) sostiene cases/enfoque; PR-5 (LLM) lee el contenido de todos.
> **Nota honesta sobre auto-despacho:** la mayoría de estas filas tienen riesgo = *juicio visual/editorial* (¿se ve bien?, ¿se lee en idioma comprador?). Eso NO lo cubre un gate → **NO son auto-despachables**, requieren el ojo de Juancho en el preview deploy. El gate (type+lint+build, SSR-presence, redirects) cubre la correctitud mecánica, no la calidad. Por diseño: acá Juancho mira pantallas, no aprueba verdes a ciegas.

| PR | Entrega | Check que cubre el riesgo (gate) | Riesgo que queda a review humano |
|----|---------|----------------------------------|----------------------------------|
| **PR-0** | Fixes base + tokens. Resend lazy-init (hoy rompe build sin key); agregar config ESLint; instalar paleta oklch + fuentes + espaciado en `@theme`; layout base (nav/footer nuevos); borrar marca vieja. | `npm run build` pasa **sin** `RESEND_API_KEY`; `type-check` y `lint` clean. | Que nav/footer se vean correctos. |
| **PR-1** | Capa de contenido (markdown/MDX) + Home (hero, barra logos, antes/después, 2 teasers de caso, CTA). | build clean; el texto del hero y del antes/después aparece en el **HTML server-rendered** (no inyectado por JS). | ¿Idioma comprador? ¿Calma/aire? ¿Entra en un scroll? |
| **PR-2** | Caso A ("Dos verdades" + diagrama blueprint-sobre-papel) y Caso B ("Tener todo a la vista"). Invariante en idioma plano. | build clean; contenido de ambos casos en HTML SSR. | ¿El diagrama se lee sin ser técnico? ¿Caso B respira sin la metáfora forzada? |
| **PR-3** | Enfoque + Nosotros + Trabajo (índice: 2 casos + 4 livianos con logo+línea). | build clean; contenido en SSR. | Copy de Enfoque/Nosotros (Juancho ya editó el v1). |
| **PR-4** | Sesión del agente (idioma plano, tratamiento panel) en página de Caso A. Adaptar la lógica JS del bundle de Design. | build clean; el componente monta y avanza los pasos sin error en consola. | ¿Se entiende sin jerga? ¿Aporta o distrae? |
| **PR-5** | Capa-LLM/SEO: `robots.txt` (permitir ClaudeBot/GPTBot/PerplexityBot); `llms.txt` + `llms-full.txt` **autogenerados del markdown**; JSON-LD (`Organization` global, `CreativeWork` por caso, `FAQPage`); canonicals; mapa de **301** (`/about`→`/nosotros`, nuevas `/enfoque`, `/trabajo/*`). | build clean; `llms.txt` accesible y su contenido deriva del markdown (no hardcode); cada redirect viejo→nuevo resuelve 301; JSON-LD valida. | Que `llms.txt` represente bien el site. |

### Invariantes (checks ejecutables, adaptados a site de contenido)
- **SSR-presence:** un check que hace fetch del HTML de cada ruta y verifica que el copy clave está en el markup (no requiere JS). Sabe fallar si una página pasa a render client-side.
- **Redirects:** un check que recorre el mapa 301 y confirma viejo→nuevo. Sabe fallar si un redirect falta o apunta mal.
- **llms.txt deriva del contenido:** check que regenera `llms.txt` del markdown y compara contra el commiteado (drift = fallo). Sabe fallar si alguien hardcodea.
- **Build sin secrets:** `npm run build` pasa sin `RESEND_API_KEY` (regresión del bug actual).
- Gate del repo (a definir en CI, este repo no tiene DB): `type-check && lint && build` + los checks de arriba, bloquea merge sobre la rama del PR.

---

## Notas para Claudio
- Leé el `CLAUDE.md` y `CONTEXT.md` del repo si existen, y el discovery en `.context/`.
- Empezá por PR-0. No avances a PR-1 sin que Juancho mire el preview de PR-0.
- Si una decisión Abierta bloquea una fila, FRENÁ y pedila — no la cierres solo.
- Si resolvés una Abierta o cambiás una decisión, actualizá este `spec.md` en el mismo PR.

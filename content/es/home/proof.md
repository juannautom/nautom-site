---
heading: "Empresas que ya construyeron con nosotros."
logos:
  - name: "Peerforum"
    src: "/images/logos/peerforum.png"
    scale: 1.15
  - name: "IVESS El Jumillano"
    src: "/images/logos/ivess-logo-footer.svg"
    scale: 0.9
  - name: "Altis Viajes"
    pending: true
  - name: "Integra Groupe"
    src: "/images/logos/integra.png"
    scale: 1.1
  - name: "Impacto Positivo"
    src: "/images/logos/Impacto Positivo_IsoLogotipo-02.png"
    scale: 0.9
  - name: "Quanta"
    pending: true
  - name: "Kova"
    pending: true
  - name: "YPF Gas"
    src: "/images/logos/ypf-gas2.png"
    scale: 1
  - name: "KeepSmiling"
    src: "/images/logos/keepsmiling.svg"
    scale: 1.05
  - name: "Lecker Argentina"
    pending: true
---

Barra de prueba de amplitud (§5.3 / §5.5). Lista y orden definidos por Juancho.

UNIFORMIDAD: grid de celdas iguales (5×2). Cada logo se acota por alto y ancho con
`object-contain` (mismo footprint) y se aplana a silueta tinta monocroma sobre papel
(`filter:brightness(0)` — los assets vienen en blanco/color del tema viejo). `scale`
es un ajuste óptico por logo (default 1) para compensar aspect ratios dispares: un
wordmark muy ancho queda corto a igual ancho, así que se sube; un logo alto se baja.

FALTAN ASSETS (render como slot "pendiente", flag para Juancho): Altis Viajes, Quanta,
Kova, Lecker Argentina. No hay archivo en `public/images/logos/`. Pasámelos (SVG ideal,
o PNG con fondo transparente) y los enchufo.

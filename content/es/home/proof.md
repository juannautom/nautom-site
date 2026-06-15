---
heading: "Empresas que ya construyeron con nosotros."
logos:
  - name: "Peerforum"
    src: "/images/logos/peerforum.png"
    scale: 1.05
  - name: "IVESS El Jumillano"
    src: "/images/logos/ivess-logo-footer.svg"
    scale: 0.9
  - name: "Altis Viajes"
    src: "/images/logos/altis.png"
    scale: 1.15
  - name: "Integra Groupe"
    src: "/images/logos/integra.png"
    scale: 1.25
  - name: "Impacto Positivo"
    src: "/images/logos/Impacto Positivo_IsoLogotipo-02.png"
    scale: 0.9
  - name: "Quanta"
    src: "/images/logos/quanta.svg"
    scale: 1.0
  - name: "YPF Gas"
    src: "/images/logos/ypf-gas2.png"
    scale: 1.1
  - name: "KeepSmiling"
    src: "/images/logos/keepsmiling.svg"
    scale: 1.05
  - name: "Lecker Argentina"
    src: "/images/logos/lecker.svg"
    scale: 1.15
---

Barra de prueba de amplitud (§5.3 / §5.5). Lista y orden definidos por Juancho.
Kova se eliminó (no había asset y se decidió sacarlo).

DISPLAY: una sola fila que rota (marquee CSS, ver `globals.css` → `nautom-marquee`).
CSS puro: los logos quedan en el HTML server-rendered (sin JS, §3), pausa en hover y
respeta `prefers-reduced-motion`. Cada logo se aplana a silueta tinta monocroma sobre
papel (`filter:brightness(0)` — los assets vienen en blanco/color), con altura acotada
uniforme. `scale` es el ajuste óptico por logo (default 1) para emparejar aspect ratios.

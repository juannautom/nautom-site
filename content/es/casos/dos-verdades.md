---
slug: "dos-verdades"
label: "Caso"
title: "Dos verdades"
thesis: "La operación y la contabilidad son dos verdades distintas. El software que las mezcla corrompe las dos."
summary: "Un sistema que separa la operación de la contabilidad: el equipo construye rápido y el sistema no deja romper los números, aunque alguien se equivoque."
sections:
  - kind: "prose"
    heading: "El problema"
    paragraphs:
      - "Casi todos los sistemas guardan una sola versión de los hechos. La venta, el stock y el asiento contable viven en la misma tabla. Entonces un ajuste cualquiera de la operación —corregir una entrega, mover una fecha, rehacer un pedido— toca la contabilidad sin que nadie lo haya decidido."
      - "El día que cierra el balance, los números no cuadran y nadie sabe por qué. La empresa empieza a tenerle miedo a su propio sistema: cada cambio puede romper algo lejos."
  - kind: "layers"
    heading: "Dos capas, a propósito"
    intro: "Por eso separamos el sistema en dos capas que se hablan, pero no se pisan."
    items:
      - name: "Operación"
        text: "Donde el equipo trabaja todos los días: pedidos, entregas, ajustes. Rápida y flexible — acá se puede cambiar y corregir sin miedo."
      - name: "Contabilidad"
        text: "El registro de lo que realmente pasó. No se reescribe. La operación la alimenta; nunca la sobrescribe."
  - kind: "invariant"
    heading: "La regla que el sistema hace cumplir solo"
    text: "Una deuda en pesos no se tapa con un crédito en dólares. Aunque alguien lo intente, el sistema no lo deja."
    note: "El sistema conoce los límites del negocio y los sostiene, sin depender de que una persona se acuerde de respetarlos."
  - kind: "payoff"
    text: "Construís rápido sin miedo: el sistema no te deja romper la contabilidad aunque te equivoques."
---

Caso A (§5.3). Tesis y payoff son copy cerrado del spec (verbatim). El problema, las
dos capas y el invariante están redactados en idioma comprador (§5.1) a partir de la
estructura del spec. El invariante se muestra en idioma plano, NO como predicado
formal (sin ∀/m₁, sin § ni nombres de regla en inglés).

Sin numeración de asientos en la superficie (§5.1): se decidió NO mostrar IDs de
asiento en las páginas de caso → resuelve el fix §5.5 (no hay ID que signifique dos
cosas). Ver nota en spec §5.5.

ANCLA PR-4: la sesión del agente vivirá en esta página (no se construye en PR-2).

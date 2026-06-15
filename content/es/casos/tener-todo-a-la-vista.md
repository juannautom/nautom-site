---
slug: "tener-todo-a-la-vista"
label: "Caso"
title: "Tener todo a la vista"
thesis: "Las mejores decisiones no las toma quien más recuerda. Las toma quien tiene todo a la vista."
summary: "Una distribuidora dejó de depender de la memoria de su encargado: el conocimiento de la operación pasó a estar a la vista de todos, y la operación ya no se frena cuando alguien falta."
sections:
  - kind: "scale"
    lead: "Una distribuidora que mueve esto todos los días:"
    items:
      - "190 rutas diarias"
      - "~600 empleados"
      - "~170.000 clientes"
  - kind: "prose"
    heading: "La carga invisible"
    paragraphs:
      - "Durante años, gran parte de esa operación vivía en la cabeza de una persona: el encargado. Qué cliente paga a treinta días, qué repartos conviene juntar, a quién mejor no fiarle. Conocimiento real, pero invisible: no estaba en ningún lado más que en su memoria."
      - "El problema no era esa persona. Era que la operación dependía de que estuviera. Si faltaba, las decisiones se frenaban o se tomaban a ciegas."
  - kind: "prose"
    heading: "El sistema toma la carga"
    paragraphs:
      - "Construimos un sistema que se hace cargo de eso: junta lo que antes estaba disperso y lo pone delante. La información de cada cliente, cada ruta y cada cuenta deja de vivir en una cabeza y pasa a estar a la vista de todos."
      - "Ahora el encargado no tiene que recordar: decide. Y cuando no está, la operación sigue, porque lo que sabía dejó de irse con él."
  - kind: "prose"
    heading: "Y nosotros igual"
    paragraphs:
      - "Funcionamos con la misma idea aplicada a nosotros. El conocimiento de cada proyecto que construimos no vive en la cabeza de quien lo armó: vive en el sistema. Por eso avanzamos rápido, y por eso lo que construimos para vos queda tuyo y operable — sin depender de una persona puntual, ni siquiera de la nuestra."
  - kind: "payoff"
    text: "Gente que decide mejor. Una operación que no se frena cuando alguien falta."
---

Caso B (§5.3). Tesis y payoff son copy cerrado del spec. Estructura de dos hilos a
propósito: el cuerpo es el hilo del cliente anonimizado (carga invisible → el sistema
toma la carga → la persona decide con todo delante); el remate "Y nosotros igual" es
el dogfooding. NUNCA un nombre propio (ni del cliente, ni en el remate). Sin metáfora
de capas ni rieles.

Lidera con datos de escala reales (§4), no con métricas de resultado inventadas.
FLAG REVIEW (Juancho): los números (190 rutas / ~600 empleados / ~170K clientes) vienen
de §4 del spec; confirmá que corresponden a esta distribuidora antes de go-live.

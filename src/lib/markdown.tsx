import { Fragment, type ReactNode } from "react";

/**
 * Minimal inline-emphasis renderer for the content layer.
 *
 * Supports markdown `*emphasis*` only — enough for the hero, where "sistema" is
 * emphasized. Plain text is returned as-is and React escapes it, so this is safe
 * against injection. Anything richer belongs in a real MDX pipeline, not here.
 */
export function renderEmphasis(text: string, emClassName?: string): ReactNode {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className={emClassName}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * Pure text helpers usable from both React (JSX) surfaces and plain Node scripts.
 *
 * Kept JSX-free (separate from `markdown.tsx`) so the `llms.txt` generator/check can
 * import it under Node's TS type-stripping, which can't compile JSX.
 */

/**
 * Strip the `*emphasis*` markers, leaving the words. For surfaces that take plain
 * text rather than React nodes — JSON-LD values, `llms.txt` — so the hero's
 * `*sistema*` reads as `sistema`, not `*sistema*`.
 */
export function plainText(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1");
}

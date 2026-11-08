/**
 * A script that runs during HTML parsing, before first paint.
 * Rendered as text/plain on the client so React never re-executes it and
 * does not warn about script tags during client rendering.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

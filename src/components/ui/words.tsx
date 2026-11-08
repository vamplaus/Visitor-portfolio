/**
 * Text split into words, each in its own mask, so a heading can rise word by
 * word (see "Reveals" in globals.css). Screen readers get the sentence intact.
 *
 * Put `data-reveal="words"` (on scroll) or `data-enter="words"` (on render)
 * on the parent element. `from` offsets the stagger when a sentence is split
 * across several <Words> (e.g. a lead and its tail in another colour).
 */
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  const parts = text.split(/(\s+)/);
  let index = from;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {parts.map((part, i) =>
          /^\s+$/.test(part) || part === "" ? (
            part
          ) : (
            <span key={i} className="word">
              <span className="word-in" style={{ ["--i" as string]: index++ } as React.CSSProperties}>
                {part}
              </span>
            </span>
          ),
        )}
      </span>
    </>
  );
}

/** Number of words in a string: lets a following <Words> continue the stagger. */
export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

import type { CodeSpecimen as Specimen } from "@/content/types";

/**
 * A code excerpt, set like a listing in a printed book: monochrome, comments
 * in italic, keywords in a heavier weight. Tokenised on the server, so no
 * highlighter ships to the browser.
 */

const KEYWORDS = new Set([
  "export", "function", "const", "let", "return", "interface", "type", "import", "from",
  "if", "else", "for", "of", "new", "as", "async", "await", "def", "class", "in",
]);

type Token = { kind: "comment" | "string" | "keyword" | "number" | "text"; value: string };

const TOKEN = /(\/\*.*?\*\/|\/\/.*$|#.*$)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_$][\w$]*)\b/g;

function tokenize(line: string, language: Specimen["language"]): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN)) {
    const [whole, comment, string, number, word] = match;
    const index = match.index ?? 0;
    if (comment?.startsWith("#") && language !== "py" && language !== "sh") continue;
    if (index > last) tokens.push({ kind: "text", value: line.slice(last, index) });
    if (comment) tokens.push({ kind: "comment", value: whole });
    else if (string) tokens.push({ kind: "string", value: whole });
    else if (number) tokens.push({ kind: "number", value: whole });
    else if (word) tokens.push({ kind: KEYWORDS.has(word) ? "keyword" : "text", value: whole });
    last = index + whole.length;
  }
  if (last < line.length) tokens.push({ kind: "text", value: line.slice(last) });
  return tokens;
}

const style: Record<Token["kind"], string> = {
  comment: "text-ash italic",
  string: "text-paper",
  keyword: "font-medium text-paper",
  number: "text-paper",
  text: "text-paper/90",
};

export function CodeSpecimen({
  specimen,
  caption,
  linesLabel,
  regionLabel,
}: {
  specimen: Specimen;
  caption: string;
  linesLabel: string;
  regionLabel: string;
}) {
  const lines = specimen.code.split("\n");
  const width = String(lines.length).length;

  return (
    <figure>
      <div className="border border-line">
        <div className="meta flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 text-ash">
          <span className="truncate text-paper">{specimen.file}</span>
          <span className="shrink-0">
            {specimen.language} · {lines.length} {linesLabel}
          </span>
        </div>
        <pre
          tabIndex={0}
          aria-label={`${regionLabel}: ${specimen.file}`}
          className="overflow-x-auto bg-surface/60 py-4 font-mono text-[0.8125rem] leading-[1.7]"
        >
          <code>
            {lines.map((line, i) => (
              <span key={i} className="flex">
                <span aria-hidden className="sticky left-0 inline-block shrink-0 bg-surface pr-4 pl-4 text-right text-dust select-none">
                  {String(i + 1).padStart(width, "0")}
                </span>
                <span className="pr-6 whitespace-pre">
                  {tokenize(line, specimen.language).map((token, j) => (
                    <span key={j} className={style[token.kind]}>
                      {token.value}
                    </span>
                  ))}
                  {line.length === 0 ? " " : null}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      <figcaption className="mt-3 max-w-2xl text-sm text-ash">{caption}</figcaption>
    </figure>
  );
}

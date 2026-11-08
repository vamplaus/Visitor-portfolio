"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { useLive } from "./use-live";

/**
 * Dürer's magic square (Melencolia I, 1514). Rows, columns, diagonals,
 * quarters and the centre all sum to 34; the middle of the bottom row reads
 * 15 14 — the year of the engraving. The square walks through its lines by
 * itself; the visitor can pick a kind of line and step through it.
 */

const SQUARE = [
  [16, 3, 2, 13],
  [5, 10, 11, 8],
  [9, 6, 7, 12],
  [4, 15, 14, 1],
];

type Kind = "rows" | "cols" | "diags" | "quarters" | "centre";
type Cell = readonly [number, number];

const LINES: Record<Kind, Cell[][]> = {
  rows: [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => [r, c] as const)),
  cols: [0, 1, 2, 3].map((c) => [0, 1, 2, 3].map((r) => [r, c] as const)),
  diags: [
    [0, 1, 2, 3].map((i) => [i, i] as const),
    [0, 1, 2, 3].map((i) => [i, 3 - i] as const),
  ],
  quarters: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ].map(([r, c]) => [
    [r, c] as const,
    [r, c + 1] as const,
    [r + 1, c] as const,
    [r + 1, c + 1] as const,
  ]),
  centre: [
    [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ] as Cell[],
  ],
};

const ORDER: Kind[] = ["rows", "cols", "diags", "quarters", "centre"];

export interface SquareLabels {
  kinds: Record<Kind, string>;
  year: string;
}

export function MagicSquare({ labels, label }: { labels: SquareLabels; label: string }) {
  const { ref, live } = useLive<HTMLDivElement>();
  const [{ kind, index }, setPos] = useState<{ kind: Kind; index: number }>({ kind: "rows", index: 0 });
  const [manual, setManual] = useState(0);

  // Walk through every line of every kind.
  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      if (performance.now() - manual < 5000) return;
      setPos((p) =>
        p.index + 1 < LINES[p.kind].length
          ? { ...p, index: p.index + 1 }
          : { kind: ORDER[(ORDER.indexOf(p.kind) + 1) % ORDER.length], index: 0 },
      );
    }, 1500);
    return () => window.clearInterval(id);
  }, [live, manual]);

  const line = LINES[kind][index] ?? LINES[kind][0];
  const on = useMemo(() => new Set(line.map(([r, c]) => `${r}-${c}`)), [line]);
  const values = line.map(([r, c]) => SQUARE[r][c]);
  const sum = values.reduce((a, b) => a + b, 0);

  const choose = (k: Kind, at: number) => {
    setManual(at);
    setPos((p) => (p.kind === k ? { kind: k, index: (p.index + 1) % LINES[k].length } : { kind: k, index: 0 }));
  };

  return (
    <div ref={ref} className="flex size-full flex-col items-center justify-center gap-4 p-4">
      <table aria-label={label} className="border-collapse font-display">
        <tbody>
          {SQUARE.map((row, r) => (
            <tr key={r}>
              {row.map((n, c) => {
                const active = on.has(`${r}-${c}`);
                const year = r === 3 && (c === 1 || c === 2);
                return (
                  <td
                    key={c}
                    className={cn(
                      "relative size-11 border text-center text-2xl font-light tabular-nums transition-[color,background-color,border-color] duration-500 md:size-14 md:text-3xl",
                      active ? "border-ember bg-surface text-paper" : "border-line text-ash",
                    )}
                  >
                    {n}
                    {year ? <span aria-hidden className="absolute inset-x-1.5 bottom-1 h-px bg-oxblood" /> : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <p aria-live="polite" className="font-mono text-sm text-ash tabular-nums">
        {values.join(" + ")} = <span className="text-paper">{sum}</span>
      </p>

      <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-1.5">
        {ORDER.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={k === kind}
            onClick={(e) => choose(k, e.timeStamp)}
            className={cn(
              "meta border px-2 py-1 transition-colors",
              k === kind ? "border-paper text-paper" : "border-line text-ash hover:text-paper",
            )}
          >
            {labels.kinds[k]}
          </button>
        ))}
      </div>
      <p className="meta text-ash">
        <span className="mr-1.5 inline-block h-px w-4 translate-y-[-3px] bg-oxblood" />
        {labels.year}
      </p>
    </div>
  );
}

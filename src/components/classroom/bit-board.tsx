"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Eight bits — an interactive board for positional notation.
 * Each bit is a toggle button (aria-pressed). The same value is shown in
 * decimal, hexadecimal and binary, and as a sum of the weights that are on.
 * A polite live region announces the value and solved practice numbers.
 */

export interface BitBoardLabels {
  board: string;
  weight: string;
  bit: string;
  on: string;
  off: string;
  decimal: string;
  hex: string;
  binary: string;
  decimalShort: string;
  hexShort: string;
  binaryShort: string;
  reset: string;
  practice: string;
  build: string;
  solved: string;
  value: string;
  allDone: string;
}

const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];
const TARGETS = [5, 42, 128, 255];

export function BitBoard({ labels, id = "bit-board" }: { labels: BitBoardLabels; id?: string }) {
  const [value, setValue] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [announcement, setAnnouncement] = useState("");

  function toggle(weight: number) {
    const next = value ^ weight;
    setValue(next);
    if (TARGETS.includes(next) && !solved.includes(next)) {
      const nowSolved = [...solved, next];
      setSolved(nowSolved);
      setAnnouncement(
        `${labels.solved}: ${next}.` + (nowSolved.length === TARGETS.length ? ` ${labels.allDone}` : ""),
      );
    } else {
      setAnnouncement(`${labels.value}: ${next}`);
    }
  }

  function reset() {
    setValue(0);
    setSolved([]);
    setAnnouncement(`${labels.value}: 0`);
  }

  const on = WEIGHTS.filter((w) => value & w);
  const binary = value.toString(2).padStart(8, "0");

  return (
    <section aria-labelledby={`${id}-title`} className="border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 md:px-5">
        <h3 id={`${id}-title`} className="meta text-paper">
          {labels.board}
        </h3>
        <button
          type="button"
          onClick={reset}
          className="meta -mr-2 inline-flex items-center gap-2 px-2 py-2 text-ash transition-colors hover:text-paper"
        >
          <RotateCcw aria-hidden className="size-3.5" strokeWidth={1.25} />
          {labels.reset}
        </button>
      </div>

      {/* The bits */}
      <div className="px-3 pt-5 pb-4 md:px-5 md:pt-7">
        <div className="grid grid-cols-8 gap-1.5 md:gap-2.5">
          {WEIGHTS.map((weight, i) => {
            const isOn = (value & weight) !== 0;
            return (
              <div key={weight} className="flex flex-col items-center gap-2">
                <span aria-hidden className="meta text-ash tabular-nums">
                  {weight}
                </span>
                <button
                  type="button"
                  aria-pressed={isOn}
                  aria-label={`${labels.bit} ${7 - i}, ${labels.weight.toLowerCase()} ${weight}`}
                  onClick={() => toggle(weight)}
                  className={cn(
                    "grid aspect-[3/4] w-full place-items-center border font-mono text-2xl transition-colors duration-300 md:text-4xl",
                    isOn
                      ? "border-paper bg-paper text-void"
                      : "border-line-strong text-ash hover:border-ash hover:text-paper",
                  )}
                >
                  {isOn ? 1 : 0}
                </button>
                <span aria-hidden className="font-mono text-xs text-ash">
                  2<sup className="ml-px text-[0.7em]">{7 - i}</sup>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Readouts */}
      <dl className="grid grid-cols-3 border-t border-line">
        <div className="border-r border-line px-3 py-3 md:px-5">
          <dt className="meta text-ash">
            <span className="sm:hidden">{labels.decimalShort}</span>
            <span className="hidden sm:inline">{labels.decimal}</span>
          </dt>
          <dd className="mt-1 font-mono text-xl text-paper tabular-nums md:text-3xl">{value}</dd>
        </div>
        <div className="border-r border-line px-3 py-3 md:px-5">
          <dt className="meta text-ash">
            <span className="sm:hidden">{labels.hexShort}</span>
            <span className="hidden sm:inline">{labels.hex}</span>
          </dt>
          <dd className="mt-1 font-mono text-xl text-paper md:text-3xl">
            0x{value.toString(16).toUpperCase().padStart(2, "0")}
          </dd>
        </div>
        <div className="px-3 py-3 md:px-5">
          <dt className="meta text-ash">
            <span className="sm:hidden">{labels.binaryShort}</span>
            <span className="hidden sm:inline">{labels.binary}</span>
          </dt>
          <dd className="mt-1 font-mono text-base text-paper md:text-3xl">
            {binary.slice(0, 4)}
            <span className="text-ash"> </span>
            {binary.slice(4)}
          </dd>
        </div>
      </dl>

      {/* The sum of weights: the idea itself */}
      <p className="border-t border-line px-4 py-3 font-mono text-sm text-ash md:px-5" aria-hidden>
        <span className="text-paper">{value}</span> = {on.length ? on.join(" + ") : "0"}
      </p>

      {/* Practice */}
      <div className="border-t border-line px-4 py-4 md:px-5">
        <p className="meta text-ash">{labels.practice}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TARGETS.map((target) => {
            const done = solved.includes(target);
            return (
              <li
                key={target}
                className={cn(
                  "flex items-center justify-between gap-2 border px-3 py-2",
                  done ? "border-oxblood" : "border-line",
                )}
              >
                <span className="text-sm text-ash">
                  {labels.build} <span className="font-mono text-paper">{target}</span>
                </span>
                <span className={cn("meta", done ? "text-ember" : "text-ash")}>{done ? labels.solved : "—"}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}

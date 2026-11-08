"use client";

import { useEffect, useState } from "react";
import { useLive } from "./use-live";

/**
 * A shell session in the archive. The commands are real commands and the
 * answers are true of this archive. Typed out while on screen; with motion off
 * (or without JavaScript) the whole transcript is simply there.
 */

export interface ShellLine {
  cmd: string;
  out: string[];
}

const PROMPT_USER = "vamplaus@archive";

export function TerminalSpecimen({ lines, label }: { lines: ShellLine[]; label: string }) {
  const { ref, live } = useLive<HTMLDivElement>();
  // step = how far the session has got: [line index, characters typed, output shown]
  const [typed, setStep] = useState<{ line: number; chars: number; out: boolean } | null>(null);
  // Off screen or with motion off, the whole transcript is shown.
  const step = live ? typed : null;

  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    let timer = 0;
    let state = { line: 0, chars: 0, out: false };
    const advance = () => {
      if (cancelled) return;
      const current = lines[state.line];
      let delay = 38 + Math.random() * 55;
      if (!current) {
        state = { line: 0, chars: 0, out: false };
        delay = 400;
      } else if (state.chars < current.cmd.length) {
        state = { ...state, chars: state.chars + 1 };
      } else if (!state.out) {
        state = { ...state, out: true };
        delay = 260;
      } else {
        state = { line: state.line + 1, chars: 0, out: false };
        delay = state.line >= lines.length ? 3800 : 650;
      }
      setStep(state);
      timer = window.setTimeout(advance, delay);
    };
    timer = window.setTimeout(advance, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [live, lines]);

  return (
    <div ref={ref} className="flex size-full flex-col bg-void">
      <div aria-hidden className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="size-2 border border-line-strong" />
        <span className="size-2 border border-line-strong" />
        <span className="size-2 bg-oxblood" />
        <span className="meta ml-2 truncate text-ash">{PROMPT_USER}: ~</span>
      </div>
      <pre
        aria-label={label}
        className="min-h-0 flex-1 overflow-hidden px-3 py-3 font-mono text-[0.72rem] leading-[1.65] whitespace-pre-wrap text-paper md:text-[0.8rem]"
      >
        {lines.map((line, i) => {
          if (step && i > step.line) return null;
          const typing = step && i === step.line;
          const cmd = typing ? line.cmd.slice(0, step.chars) : line.cmd;
          const showOut = !step || i < step.line || (typing && step.out);
          return (
            <span key={i} className="block">
              <span className="text-ember">{PROMPT_USER}</span>
              <span className="text-ash">:~$ </span>
              {cmd}
              {typing && !step.out ? <span aria-hidden className="term-caret" /> : null}
              {showOut ? line.out.map((o, j) => <span key={j} className="block text-ash">{o}</span>) : null}
            </span>
          );
        })}
        {step && step.line >= lines.length ? (
          <span className="block">
            <span className="text-ember">{PROMPT_USER}</span>
            <span className="text-ash">:~$ </span>
            <span aria-hidden className="term-caret" />
          </span>
        ) : null}
      </pre>
    </div>
  );
}

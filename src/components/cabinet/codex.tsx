"use client";

import { useLive } from "./use-live";

/**
 * An open codex: the archive's preface set as a manuscript, with an
 * illuminated initial, a manicule and a note in the margin, folio numbers,
 * the shadow of the gutter — and, now and then, a leaf turning over.
 */
export function Codex({
  left,
  right,
  note,
  label,
}: {
  left: string;
  right: string;
  note: string;
  label: string;
}) {
  const { ref, live } = useLive<HTMLDivElement>();
  const initial = left.charAt(0);
  const rest = left.slice(1);

  return (
    <div
      ref={ref}
      data-live={live ? "" : undefined}
      role="img"
      aria-label={label}
      className="flex size-full items-center justify-center p-3 md:p-5"
    >
      <div aria-hidden className="relative grid w-full max-w-[36rem] grid-cols-2 [aspect-ratio:3/2] [perspective:1600px]">
        {/* Verso */}
        <div className="relative overflow-hidden border border-line-strong bg-surface/50 py-4 pr-4 pl-6 md:pl-8">
          <span className="absolute top-5 left-1.5 font-mono text-[0.7rem] text-ember md:left-2.5">☞</span>
          <p className="font-display text-[0.62rem] leading-[1.42] text-paper [hyphens:auto] [text-align:justify] md:text-[0.8rem]">
            <svg viewBox="0 0 40 40" className="float-left mt-0.5 mr-1.5 size-9 md:size-11">
              <rect x="0.5" y="0.5" width="39" height="39" fill="url(#hatch-seal)" className="stroke-oxblood" />
              <rect x="4" y="4" width="32" height="32" className="fill-void stroke-ember" strokeWidth="0.6" />
              <text x="20" y="21" textAnchor="middle" dominantBaseline="central" className="fill-paper font-display" fontSize="28">
                {initial}
              </text>
            </svg>
            {rest}
          </p>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[0.55rem] text-ash">f. 1v</span>
        </div>

        {/* Recto */}
        <div className="relative overflow-hidden border border-l-0 border-line-strong bg-surface/50 py-4 pr-6 pl-4 md:pr-8">
          <p className="font-display text-[0.62rem] leading-[1.42] text-ash [hyphens:auto] [text-align:justify] md:text-[0.8rem]">
            {right}
          </p>
          <span className="absolute top-6 right-1 w-5 font-mono text-[0.5rem] leading-tight text-ember [writing-mode:vertical-rl] md:right-2">
            {note}
          </span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[0.55rem] text-ash">f. 2r</span>
        </div>

        {/* Gutter shadow, engraved */}
        <svg viewBox="0 0 12 100" preserveAspectRatio="none" className="absolute inset-y-0 left-1/2 h-full w-3 -translate-x-1/2">
          <rect width="12" height="100" fill="url(#hatch-2)" />
          <line x1="6" y1="0" x2="6" y2="100" className="stroke-line-strong" strokeWidth="0.6" />
        </svg>

        {/* A leaf turning over */}
        <div className="codex-leaf absolute inset-y-0 left-1/2 w-1/2 origin-left [transform-style:preserve-3d]">
          <div className="absolute inset-0 border border-line-strong bg-raised [backface-visibility:hidden] [background-image:repeating-linear-gradient(to_bottom,transparent_0_11px,var(--color-line)_11px_12px)]" />
          <div className="absolute inset-0 border border-line-strong bg-raised [backface-visibility:hidden] [transform:rotateY(180deg)] [background-image:repeating-linear-gradient(to_bottom,transparent_0_11px,var(--color-line)_11px_12px)]" />
        </div>
      </div>
    </div>
  );
}

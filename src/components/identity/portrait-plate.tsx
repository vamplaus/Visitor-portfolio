"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CropMarks } from "@/components/ui/crop-marks";
import { archivoltPath } from "@/lib/gothic";
import { cn } from "@/lib/cn";

/**
 * Plate I.1 — the archivist's image. Two slots, switchable by the visitor:
 *  - Portrait: a photograph, set in a lancet niche (the Identity emblem).
 *  - Avatar: the author's digital persona, set in a roundel.
 * An empty slot shows its frame and says what it is waiting for.
 */

export interface PlateImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

type Mode = "photo" | "avatar";

export interface PlateLabels {
  label: string;
  switchLabel: string;
  photo: string;
  avatar: string;
  photoEmpty: string;
  avatarEmpty: string;
  note: string;
  placeholder: string;
}

// Niche geometry in a 300 × 400 plate: an equilateral lancet on two jambs.
const NICHE = archivoltPath(36, 264, 222, 372);
const NICHE_INNER = archivoltPath(52, 248, 222, 372);
const nicheMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' preserveAspectRatio='none'><path d='${NICHE_INNER}Z' fill='black'/></svg>`,
)}")`;

export function PortraitPlate({
  initial,
  photo,
  avatar,
  labels,
}: {
  initial: Mode;
  photo: PlateImage | null;
  avatar: PlateImage | null;
  labels: PlateLabels;
}) {
  const [mode, setMode] = useState<Mode>(initial);
  const refs = useRef<Record<Mode, HTMLButtonElement | null>>({ photo: null, avatar: null });
  const image = mode === "photo" ? photo : avatar;
  const modes: Mode[] = ["photo", "avatar"];

  function onKeyDown(event: React.KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const next: Mode = mode === "photo" ? "avatar" : "photo";
    setMode(next);
    refs.current[next]?.focus();
  }

  return (
    <figure className="w-full max-w-sm">
      <div className="relative aspect-[3/4] w-full border border-line">
        <CropMarks inset="0.5rem" />

        {/* Frame */}
        <svg
          viewBox="0 0 300 400"
          aria-hidden
          data-reveal="draw"
          className="absolute inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
        >
          {mode === "photo" ? (
            <g className="stroke-line-strong" strokeWidth={1} vectorEffect="non-scaling-stroke">
              <path d={NICHE} pathLength={1} vectorEffect="non-scaling-stroke" />
              <path d={NICHE_INNER} pathLength={1} vectorEffect="non-scaling-stroke" className="stroke-line" />
              <path d="M20 372H280" pathLength={1} vectorEffect="non-scaling-stroke" />
            </g>
          ) : (
            <g className="stroke-line-strong" strokeWidth={1}>
              <circle cx="150" cy="190" r="118" pathLength={1} vectorEffect="non-scaling-stroke" />
              <circle cx="150" cy="190" r="104" pathLength={1} vectorEffect="non-scaling-stroke" className="stroke-line" />
              <path d="M20 372H280" pathLength={1} vectorEffect="non-scaling-stroke" />
            </g>
          )}
        </svg>

        {/* Image, or the empty slot */}
        <div key={mode} className="absolute inset-0 animate-[fade-in_500ms_ease]">
          {image ? (
            mode === "photo" ? (
              <div
                className="absolute inset-0"
                style={{ maskImage: nicheMask, WebkitMaskImage: nicheMask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
              >
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 24rem, 90vw" className="object-cover" />
              </div>
            ) : (
              <div className="absolute top-[47.5%] left-1/2 aspect-square w-[69%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 17rem, 62vw" className="object-cover" />
              </div>
            )
          ) : (
            <p className="absolute inset-x-0 top-[50%] -translate-y-1/2 px-10 text-center">
              <span className="meta block text-ember">{labels.placeholder}</span>
              <span className="meta mt-2 block text-ash">
                [ {mode === "photo" ? labels.photoEmpty : labels.avatarEmpty} ]
              </span>
            </p>
          )}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="meta text-ash">
          {labels.label} <span className="text-dust">—</span>{" "}
          <span className="text-paper">{mode === "photo" ? labels.photo : labels.avatar}</span>
        </span>
        <span role="radiogroup" aria-label={labels.switchLabel} onKeyDown={onKeyDown} className="meta flex border border-line">
          {modes.map((m) => (
            <button
              key={m}
              ref={(el) => {
                refs.current[m] = el;
              }}
              type="button"
              role="radio"
              aria-checked={mode === m}
              tabIndex={mode === m ? 0 : -1}
              onClick={() => setMode(m)}
              className={cn(
                "px-3 py-2 uppercase transition-colors",
                mode === m ? "bg-paper text-void" : "text-ash hover:text-paper",
              )}
            >
              {m === "photo" ? labels.photo : labels.avatar}
            </button>
          ))}
        </span>
      </figcaption>
      {!photo || !avatar ? <p className="mt-3 max-w-sm text-sm text-ash">{labels.note}</p> : null}
    </figure>
  );
}

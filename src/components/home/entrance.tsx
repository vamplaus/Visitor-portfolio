import { ArrowDown } from "lucide-react";
import { fonds } from "@/content/fonds";
import { site } from "@/content/site";
import { CropMarks } from "@/components/ui/crop-marks";
import { IntroController } from "@/components/system/intro-controller";
import { toRoman } from "@/lib/roman";
import { ArchPortal } from "./arch-portal";

const delay = (ms: number) => ({ ["--intro-delay" as string]: `${ms}ms` }) as React.CSSProperties;

/**
 * Fond 0 — the Vestibule. The name passes through a Gothic window.
 * Server-rendered and complete without JavaScript; the entrance sequence is
 * pure CSS layered on top (see "Entrance sequence" in globals.css).
 */
export function Entrance() {
  const letters = site.name.split("");

  return (
    <section
      aria-labelledby="entrance-title"
      className="relative isolate flex min-h-[calc(100svh-3rem)] flex-col overflow-hidden"
    >
      <ArchPortal className="absolute bottom-0 left-1/2 -z-10 h-full w-auto max-w-none -translate-x-1/2" />
      <CropMarks inset="1rem" />

      <div className="frame relative flex flex-1 flex-col py-8 md:py-10">
        {/* Running head */}
        <div className="intro-fade meta flex items-start justify-between gap-6 text-ash" style={delay(1900)}>
          <p>
            <span className="text-paper">Fond 0</span>
            <span aria-hidden className="mx-2 text-dust">—</span>
            Vestibule
          </p>
          <p className="text-right">
            Index of {toRoman(fonds.length)} fonds
            <span className="hidden sm:inline">
              <span aria-hidden className="mx-2 text-dust">·</span>
              Archivum {toRoman(site.opened)}
            </span>
          </p>
        </div>

        {/* Title */}
        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <h1
            id="entrance-title"
            className="font-display text-display-xl font-light tracking-[0.02em] text-paper uppercase"
          >
            <span className="sr-only">{site.name}</span>
            <span aria-hidden className="inline-block whitespace-nowrap">
              {letters.map((letter, i) => (
                <span key={i} className="intro-letter" style={{ ["--i" as string]: i } as React.CSSProperties}>
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="intro-rise mt-7 font-display text-lede font-light text-paper italic md:mt-9"
            style={delay(1500)}
          >
            {site.tagline.before}{" "}
            <span className="font-mono text-[0.6em] tracking-[0.18em] text-ash uppercase not-italic">
              {site.tagline.logic}
            </span>{" "}
            {site.tagline.joint} {site.tagline.imagination}
          </p>
        </div>

        {/* Foot */}
        <div
          className="intro-fade flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          style={delay(2200)}
        >
          <p className="max-w-xs text-sm text-ash">{site.description}</p>
          <a
            href="#catalogue"
            className="group meta inline-flex items-center gap-4 self-start border border-line-strong bg-void px-5 py-3.5 text-paper transition-colors duration-500 hover:border-oxblood hover:bg-oxblood md:self-auto"
          >
            Enter the archive
            <ArrowDown
              aria-hidden
              className="size-4 transition-transform duration-500 ease-archive group-hover:translate-y-0.5"
              strokeWidth={1.25}
            />
          </a>
        </div>
      </div>

      <IntroController />
    </section>
  );
}

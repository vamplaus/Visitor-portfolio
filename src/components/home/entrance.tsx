import { ArrowDown } from "lucide-react";
import { fonds } from "@/content/fonds";
import { site } from "@/content/site";
import { getI18n } from "@/i18n/server";
import { CropMarks } from "@/components/ui/crop-marks";
import { IntroController } from "@/components/system/intro-controller";
import { toRoman } from "@/lib/roman";
import { ArchPortal } from "./arch-portal";
import { HeroStage } from "./hero-stage";

const PORTAL_POSITION =
  "absolute top-0 left-1/2 h-[calc(33svh*640/430)] min-h-[calc(12rem*640/430)] w-auto max-w-none -translate-x-1/2 md:top-auto md:bottom-0 md:h-full md:min-h-0";

const delay = (ms: number) => ({ ["--intro-delay" as string]: `${ms}ms` }) as React.CSSProperties;

/**
 * Fond 0 — the Vestibule. The name passes through a Gothic window.
 *
 * Phones: the window stands above the name as its own band, cut at the sill,
 * so no line ever crosses running text. Wider screens: the window rises
 * behind the name, which passes through it.
 *
 * Server-rendered and complete without JavaScript; the entrance sequence is
 * pure CSS layered on top (see "Entrance sequence" in globals.css).
 */
export async function Entrance() {
  const { dict } = await getI18n();
  const letters = site.name.split("");

  return (
    <HeroStage
      labelledBy="entrance-title"
      className="relative isolate flex min-h-[calc(100svh-3rem)] flex-col overflow-hidden"
    >
      <CropMarks inset="1rem" />

      {/* Running head */}
      <div
        className="intro-fade hero-content frame meta relative flex items-start justify-between gap-6 pt-7 text-ash md:pt-10"
        style={delay(1900)}
      >
        <p>
          <span className="text-paper">{dict.home.fond0}</span>
          <span aria-hidden className="mx-2 text-dust">
            —
          </span>
          {dict.home.vestibule}
        </p>
        <p className="text-right">
          {dict.home.indexOf} {toRoman(fonds.length)} {dict.home.fondsWord}
          <span className="hidden sm:inline">
            <span aria-hidden className="mx-2 text-dust">
              ·
            </span>
            {dict.home.archivum} {toRoman(site.opened)}
          </span>
        </p>
      </div>

      {/* The window: a band on phones, the backdrop from md up. The lantern
          reveals a lit copy of the same drawing wherever the light falls. */}
      <div
        aria-hidden
        className="relative mt-5 h-[33svh] min-h-48 w-full shrink-0 overflow-hidden border-b border-line md:absolute md:inset-0 md:-z-10 md:mt-0 md:h-auto md:border-b-0"
      >
        <div className="portal-stage absolute inset-0">
          <div className="lantern-pool absolute inset-0" />
          <ArchPortal className={PORTAL_POSITION} />
          <div data-lantern className="portal-lantern absolute inset-0">
            <ArchPortal lit className={PORTAL_POSITION} />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="frame flex flex-1 flex-col items-center justify-center pt-7 pb-8 text-center md:py-16">
        <h1
          id="entrance-title"
          className="hero-title font-display text-display-xl font-light tracking-[0.02em] text-paper uppercase"
        >
          <span className="sr-only">{site.name}</span>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {letters.map((letter, i) => (
              <span key={i} className="intro-letter hero-letter" style={{ ["--i" as string]: i } as React.CSSProperties}>
                {letter}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="intro-rise hero-content mt-5 font-display text-lede font-light text-paper italic md:mt-9"
          style={delay(1500)}
        >
          {dict.tagline.before}{" "}
          <span className="font-mono text-[0.6em] tracking-[0.18em] text-ash uppercase not-italic">
            {dict.tagline.logic}
          </span>{" "}
          {dict.tagline.joint} {dict.tagline.imagination}
        </p>
      </div>

      {/* Foot */}
      <div
        className="intro-fade hero-content frame flex flex-col gap-5 pb-7 md:flex-row md:items-end md:justify-between md:pb-10"
        style={delay(2200)}
      >
        <p className="max-w-xs text-sm text-ash">{dict.meta.description}</p>
        <a
          href="#catalogue"
          data-cursor={dict.cursor.enter}
          className="group ink-fill meta inline-flex items-center gap-4 self-start border border-line-strong bg-void px-5 py-3.5 text-paper transition-colors duration-500 hover:border-oxblood md:self-auto"
        >
          {dict.home.enter}
          <ArrowDown
            aria-hidden
            className="size-4 transition-transform duration-500 ease-archive group-hover:translate-y-0.5"
            strokeWidth={1.25}
          />
        </a>
      </div>

      <IntroController />
    </HeroStage>
  );
}

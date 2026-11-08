"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import type { Locale } from "@/i18n/config";
import { Seal } from "@/components/ui/seal";
import { Clock } from "./clock";
import { IndexDialog } from "./index-dialog";
import { LangSwitch, LangSwitchLive } from "./lang-switch";
import type { BarLabels, IndexLabels, NavEntry } from "./nav-types";

/**
 * The system bar: the archive's fixed point of reference.
 * Mark (home) · current path · language · local time · index.
 * It stays still during page transitions (view-transition-name: status-bar).
 * Parts that read the URL sit in <Suspense> so every route can prerender.
 */
export function StatusBar({
  lang,
  labels,
  indexLabels,
  entries,
}: {
  lang: Locale;
  labels: BarLabels;
  indexLabels: IndexLabels;
  entries: NavEntry[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        style={{ viewTransitionName: "status-bar", ["--intro-delay" as string]: "2300ms" }}
        className="intro-fade fixed inset-x-0 top-0 z-40 border-b border-line bg-void"
      >
        <div className="frame flex h-12 items-center justify-between gap-4">
          <Link href={`/${lang}`} className="group -ml-1 flex items-center gap-3 p-1" aria-label={labels.home}>
            <Seal />
            <span className="meta text-paper">Vamplaus</span>
            <span aria-hidden className="meta hidden text-ash md:inline">
              / {labels.subtitle}
            </span>
          </Link>

          <p className="meta hidden text-ash lg:block">
            <span className="sr-only">{labels.location} </span>
            ~/archive
            <Suspense fallback={null}>
              <CurrentPath />
            </Suspense>
            <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-ash" />
          </p>

          <div className="flex items-center gap-3 sm:gap-5">
            <Suspense fallback={<LangSwitch lang={lang} label={labels.language} />}>
              <LangSwitchLive lang={lang} label={labels.language} />
            </Suspense>
            <Clock className="meta hidden text-paper sm:inline" suffix={labels.localTime} />
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="archive-index"
              onClick={() => setOpen(true)}
              className="group meta -mr-2 flex items-center gap-2.5 px-2 py-2 text-paper"
            >
              {labels.index}
              <span aria-hidden className="flex w-4 flex-col gap-[3px]">
                <span className="h-px w-full bg-paper transition-transform duration-500 ease-archive group-hover:scale-x-75" />
                <span className="h-px w-full bg-paper" />
                <span className="h-px w-full bg-oxblood transition-transform duration-500 ease-archive group-hover:scale-x-50" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <Suspense fallback={null}>
        <IndexDialog open={open} onClose={() => setOpen(false)} labels={indexLabels} entries={entries} />
      </Suspense>
    </>
  );
}

function CurrentPath() {
  const segments = usePathname().split("/").filter(Boolean);
  const rest = segments.slice(1);
  return <span className="text-paper">/{rest.length ? rest.join("/") : "index"}</span>;
}

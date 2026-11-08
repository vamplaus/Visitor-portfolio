"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { fondForPath } from "@/content/fonds";
import { Seal } from "@/components/ui/seal";
import { Clock } from "./clock";
import { IndexDialog } from "./index-dialog";

/**
 * The system bar: the archive's fixed point of reference.
 * Mark (home) · current path · local time · index.
 * It stays still during page transitions (view-transition-name: status-bar).
 */
export function StatusBar() {
  const pathname = usePathname();
  const fond = fondForPath(pathname);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        style={{ viewTransitionName: "status-bar", ["--intro-delay" as string]: "2300ms" }}
        className="intro-fade fixed inset-x-0 top-0 z-40 border-b border-line bg-void"
      >
        <div className="frame flex h-12 items-center justify-between gap-4">
          <Link
            href="/"
            className="group -ml-1 flex items-center gap-3 p-1"
            aria-label="VAMPLAUS — The Digital Archive, home"
          >
            <Seal />
            <span className="meta text-paper">Vamplaus</span>
            <span aria-hidden className="meta hidden text-ash sm:inline">
              / Digital Archive
            </span>
          </Link>

          <p className="meta hidden text-ash lg:block">
            <span className="sr-only">Current location: </span>
            ~/archive
            <span className="text-paper">/{fond ? fond.id : pathname === "/" ? "index" : "unlisted"}</span>
            <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-ash" />
          </p>

          <div className="flex items-center gap-5">
            <Clock className="meta hidden text-paper sm:inline" />
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="archive-index"
              onClick={() => setOpen(true)}
              className="group meta -mr-2 flex items-center gap-2.5 px-2 py-2 text-paper"
            >
              Index
              <span aria-hidden className="flex w-4 flex-col gap-[3px]">
                <span className="h-px w-full bg-paper transition-transform duration-500 ease-archive group-hover:scale-x-75" />
                <span className="h-px w-full bg-paper" />
                <span className="h-px w-full bg-oxblood transition-transform duration-500 ease-archive group-hover:scale-x-50" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <IndexDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

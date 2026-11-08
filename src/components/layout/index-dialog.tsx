"use client";

import { m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Emblem } from "@/components/ui/emblem";
import { cn } from "@/lib/cn";
import { MotionToggle } from "./motion-toggle";
import type { IndexLabels, NavEntry } from "./nav-types";

/**
 * The archive index: a full-screen table of contents.
 * Built on the native <dialog> — focus is trapped, Escape closes it and focus
 * returns to the button that opened it, all without custom key handling.
 */

const list = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 48, rotate: 1.5 },
  shown: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.9 } },
};

export function IndexDialog({
  open,
  onClose,
  labels,
  motionLabels,
  entries,
}: {
  open: boolean;
  onClose: () => void;
  labels: IndexLabels;
  motionLabels: { label: string; on: string; off: string };
  entries: NavEntry[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const home = entries[0]?.href;

  return (
    <dialog
      ref={ref}
      id="archive-index"
      aria-labelledby="archive-index-title"
      onClose={onClose}
      className="index-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-void p-0 text-paper"
    >
      {/* The numeral of the entry under the pointer, drawn huge behind the list */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {entries.map((entry) => (
          <span
            key={entry.href}
            data-active={active === entry.href ? "" : undefined}
            className="index-numeral absolute right-[-0.04em] bottom-[-0.18em] font-display text-[clamp(14rem,42vw,40rem)] leading-none font-light text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)]"
          >
            {entry.numeral}
          </span>
        ))}
      </div>

      <div className="frame relative flex h-full flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-line">
          <h2 id="archive-index-title" className="meta text-ash">
            {labels.title} <span className="text-dust">/</span> {labels.fondsCount}
          </h2>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="meta -mr-2 flex items-center gap-2 px-2 py-2 text-paper transition-colors hover:text-ember"
          >
            {labels.close}
            <X aria-hidden className="size-4" strokeWidth={1.25} />
          </button>
        </div>

        <nav aria-label={labels.nav} className="grid-archive min-h-0 flex-1 overflow-y-auto py-6 md:py-12">
          <m.ol
            className="col-span-full lg:col-span-8"
            variants={list}
            initial="hidden"
            animate={open ? "shown" : "hidden"}
          >
            {entries.map((entry) => {
              const current = entry.href === home ? pathname === home : pathname.startsWith(entry.href);
              return (
                <m.li key={entry.href} variants={item} className="border-b border-line first:border-t">
                  <Link
                    href={entry.href}
                    onNavigate={onClose}
                    onPointerEnter={() => setActive(entry.href)}
                    onFocus={() => setActive(entry.href)}
                    data-cursor={entry.numeral}
                    aria-current={current ? "page" : undefined}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-3.5 md:grid-cols-[5rem_1fr_auto] md:py-5"
                  >
                    <span className={cn("meta", current ? "text-ember" : "text-ash")}>{entry.numeral}</span>
                    <span className="min-w-0">
                      <span className="block font-display text-display-s font-light text-paper transition-transform duration-700 ease-archive group-hover:translate-x-2 md:text-display-m">
                        {entry.title}
                      </span>
                      <span className="mt-1 block text-sm text-ash">{entry.kicker}</span>
                    </span>
                    {entry.emblem ? (
                      <Emblem
                        id={entry.emblem}
                        lit={current}
                        className="size-7 self-center text-ash transition-colors group-hover:text-paper group-hover:[--emblem-seal:var(--color-ember)] md:size-9"
                      />
                    ) : (
                      <span aria-hidden className="size-7 md:size-9" />
                    )}
                  </Link>
                </m.li>
              );
            })}
          </m.ol>

          <aside className="col-span-full mt-10 space-y-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <div className="hidden md:block">
              <p className="meta text-ash">{labels.keys}</p>
              <dl className="meta mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-paper">
                <dt>Tab</dt>
                <dd className="text-ash">{labels.keyTab}</dd>
                <dt>Enter</dt>
                <dd className="text-ash">{labels.keyEnter}</dd>
                <dt>Esc</dt>
                <dd className="text-ash">{labels.keyEsc}</dd>
              </dl>
            </div>
            <div>
              <MotionToggle {...motionLabels} />
            </div>
            <div>
              <p className="meta text-ash">{labels.archive}</p>
              <p className="mt-3 font-display text-lede text-paper italic">{labels.tagline}</p>
              <p className="meta mt-3 text-ash">{labels.version}</p>
            </div>
          </aside>
        </nav>
      </div>
    </dialog>
  );
}

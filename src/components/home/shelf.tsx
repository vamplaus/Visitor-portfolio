import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fonds } from "@/content/fonds";
import { localizedPath, tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { Emblem } from "@/components/ui/emblem";
import { cn } from "@/lib/cn";

/**
 * The catalogue as a shelf of spines.
 *  - Wide screens with a pointer: vertical spines; the hovered or focused one
 *    is pulled out and opens (CSS only — see "The shelf" in globals.css).
 *  - Touch and narrow screens: a plain table of contents.
 * Every spine is one link, reachable by Tab, opened by Enter.
 */

// Books on a real shelf are never the same height.
const heights = [1, 0.93, 0.97, 0.89, 1, 0.95, 0.91];

export async function Shelf() {
  const { lang, dict } = await getI18n();

  return (
    <ol data-reveal="shelf" className="shelf border-t border-line shelf:border-t-0">
      {fonds.map((fond, i) => {
        const title = tr(fond.title, lang);
        const kicker = tr(fond.kicker, lang);
        const open = fond.status === "open";
        return (
          <li
            key={fond.id}
            className="shelf-item border-b border-line shelf:border-b-0"
            style={{ ["--h" as string]: heights[i % heights.length], ["--i" as string]: i } as React.CSSProperties}
          >
            <Link
              href={localizedPath(lang, fond.href)}
              aria-label={`${fond.numeral}. ${title} — ${kicker}`}
              data-cursor={`${dict.cursor.open} · ${fond.numeral}`}
              className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 py-5 md:grid-cols-[4.5rem_1fr_auto] md:py-8 shelf:flex shelf:h-full shelf:flex-col shelf:items-stretch shelf:gap-0 shelf:overflow-hidden shelf:px-5 shelf:py-5"
            >
              {/* Head of the spine: numeral and emblem */}
              <span className="flex items-center justify-between">
                <span className="meta text-ash">{fond.numeral}</span>
                <Emblem id={fond.emblem} className="hidden size-6 shrink-0 shelf:block" />
              </span>

              {/* Body: vertical title, and the page that opens beside it */}
              <span className="min-w-0 shelf:flex shelf:min-h-0 shelf:flex-1 shelf:gap-7 shelf:pt-10">
                <span className="spine-title block font-display text-display-s font-light shelf:spine-text shelf:text-[clamp(2.1rem,2.7vw,3.3rem)] shelf:leading-none">
                  {title}
                </span>
                <span className="mt-1.5 flex items-center gap-2 text-sm text-ash shelf:hidden">
                  {kicker}
                  {open ? null : <span className="meta">· {dict.common.fondStatus["in-preparation"]}</span>}
                </span>

                <span className="spine-detail hidden shelf:flex shelf:w-[clamp(13rem,21vw,20rem)] shelf:shrink-0 shelf:flex-col">
                  <span className="font-display text-2xl leading-tight font-light text-paper italic">{kicker}</span>
                  <span className="mt-4 text-sm leading-relaxed text-ash">{tr(fond.description, lang)}</span>
                  <span className="mt-auto pt-6">
                    <span className="meta block text-ash">{dict.common.holdings}</span>
                    <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-paper">
                      {tr(fond.holdings, lang).map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </span>
                    <span className="meta mt-5 flex items-center justify-between border-t border-line pt-3 text-paper">
                      <span className="flex items-center gap-2">
                        <span aria-hidden className={cn("size-1.5", open ? "bg-oxblood" : "border border-ash")} />
                        {dict.common.fondStatus[fond.status]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        {dict.common.openFond}
                        <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.25} />
                      </span>
                    </span>
                  </span>
                </span>
              </span>

              {/* Foot of the spine */}
              <span className="meta hidden pt-5 text-ash shelf:block">{fond.code}</span>

              {/* Narrow screens: emblem at the end of the row */}
              <Emblem
                id={fond.emblem}
                className="size-8 text-ash transition-colors group-hover:text-paper group-hover:[--emblem-seal:var(--color-ember)] shelf:hidden"
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

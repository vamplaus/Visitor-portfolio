import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNeighbours } from "@/content/fonds";
import type { Fond, FondId } from "@/content/types";
import { localizedPath, tr, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/cn";

/** Previous / next volume on the shelf. */
export async function FondPager({ id }: { id: FondId }) {
  const { lang, dict } = await getI18n();
  const { prev, next } = getNeighbours(id);
  return (
    <nav aria-label={dict.common.neighbours} className="border-t border-line">
      <div className="frame grid md:grid-cols-2">
        <PagerLink fond={prev} lang={lang} label={dict.common.previousFond} direction="prev" />
        <PagerLink fond={next} lang={lang} label={dict.common.nextFond} direction="next" />
      </div>
    </nav>
  );
}

function PagerLink({
  fond,
  lang,
  label,
  direction,
}: {
  fond: Fond | null;
  lang: Locale;
  label: string;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  if (!fond) {
    return <span aria-hidden className={cn("hidden md:block", isNext && "md:border-l md:border-line")} />;
  }
  const Icon = isNext ? ArrowRight : ArrowLeft;
  return (
    <Link
      href={localizedPath(lang, fond.href)}
      rel={direction}
      className={cn(
        "group flex flex-col gap-3 py-8 md:py-14",
        isNext ? "border-t border-line md:items-end md:border-t-0 md:border-l md:pl-10 md:text-right" : "md:pr-10",
      )}
    >
      <span className="meta flex items-center gap-2 text-ash">
        {!isNext && <Icon aria-hidden className="size-3.5" strokeWidth={1.25} />}
        {label}
        {isNext && <Icon aria-hidden className="size-3.5" strokeWidth={1.25} />}
      </span>
      <span className="font-display text-display-s font-light text-paper">
        <span className="meta mr-3 align-middle text-ash">{fond.numeral}</span>
        <span className="ink-link">{tr(fond.title, lang)}</span>
      </span>
    </Link>
  );
}

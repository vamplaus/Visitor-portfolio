import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Fond } from "@/content/types";
import { cn } from "@/lib/cn";

/** Previous / next volume on the shelf. */
export function FondPager({ prev, next }: { prev: Fond | null; next: Fond | null }) {
  return (
    <nav aria-label="Neighbouring fonds" className="border-t border-line">
      <div className="frame grid md:grid-cols-2">
        <PagerLink fond={prev} direction="prev" />
        <PagerLink fond={next} direction="next" />
      </div>
    </nav>
  );
}

function PagerLink({ fond, direction }: { fond: Fond | null; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  if (!fond) {
    return <span aria-hidden className={cn("hidden md:block", isNext && "md:border-l md:border-line")} />;
  }
  const Icon = isNext ? ArrowRight : ArrowLeft;
  return (
    <Link
      href={fond.href}
      rel={direction}
      className={cn(
        "group flex flex-col gap-3 py-10 md:py-14",
        isNext ? "border-t border-line md:items-end md:border-t-0 md:border-l md:pl-10 md:text-right" : "md:pr-10",
      )}
    >
      <span className="meta flex items-center gap-2 text-ash">
        {!isNext && <Icon aria-hidden className="size-3.5" strokeWidth={1.25} />}
        {isNext ? "Next fond" : "Previous fond"}
        {isNext && <Icon aria-hidden className="size-3.5" strokeWidth={1.25} />}
      </span>
      <span className="font-display text-display-s font-light text-paper">
        <span className="meta mr-3 align-middle text-ash">{fond.numeral}</span>
        <span className="ink-link">{fond.title}</span>
      </span>
    </Link>
  );
}

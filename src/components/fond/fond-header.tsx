import type { Fond } from "@/content/types";
import { tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { Emblem } from "@/components/ui/emblem";
import { SectionLabel } from "@/components/ui/section-label";

/** Page-unique ids: Next.js keeps recently visited pages in the DOM (hidden),
 * so ids are prefixed by the page they belong to. */
export const fondTitleId = (id: string) => `${id}-title`;

/**
 * The title page of a fond. Compact on phones: label and emblem share one
 * row, and the content starts right under the description.
 */
export async function FondHeader({ fond, children }: { fond: Fond; children?: React.ReactNode }) {
  const { lang, dict } = await getI18n();

  return (
    <header className="frame grid-archive gap-y-6 pt-8 pb-10 md:gap-y-10 md:pt-20 md:pb-20">
      <div className="col-span-full flex items-center justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-start lg:gap-12">
        <SectionLabel mark={`${dict.common.fond} ${fond.numeral}`}>{fond.code}</SectionLabel>
        <Emblem id={fond.emblem} lit className="size-11 shrink-0 text-paper md:size-20 lg:size-24" />
      </div>
      <div className="col-span-full lg:col-span-9 lg:col-start-4">
        <h1 id={fondTitleId(fond.id)} className="font-display text-display-l font-light text-paper">
          {tr(fond.title, lang)}
        </h1>
        <p className="mt-4 font-display text-lede font-light text-paper italic md:mt-7">{tr(fond.kicker, lang)}</p>
        <p className="mt-4 max-w-2xl text-ash md:mt-5">{tr(fond.description, lang)}</p>
        {children}
      </div>
    </header>
  );
}

/** A numbered block inside a fond page: label in the left column, body on the right. */
export function FondSection({
  mark,
  label,
  id,
  children,
  className,
}: {
  mark: string;
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={className ?? "border-t border-line"}>
      <div className="frame grid-archive gap-y-6 py-10 md:gap-y-8 md:py-20">
        <div className="col-span-full lg:col-span-3">
          <SectionLabel mark={mark} as="h2" id={id}>
            {label}
          </SectionLabel>
        </div>
        <div className="col-span-full lg:col-span-9 lg:col-start-4">{children}</div>
      </div>
    </section>
  );
}

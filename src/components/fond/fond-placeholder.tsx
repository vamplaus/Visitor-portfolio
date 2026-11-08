import { getFond } from "@/content/fonds";
import type { FondId } from "@/content/types";
import { tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { PlaceholderBlock, PlaceholderInline } from "@/components/ui/placeholder";
import { SectionLabel } from "@/components/ui/section-label";
import { PageTransition } from "@/components/system/page-transition";
import { FondHeader, fondTitleId } from "./fond-header";
import { FondPager } from "./fond-pager";

/**
 * A fond that is not open yet. Shows what it will hold — categories only —
 * and states plainly that there are no entries.
 */
export async function FondPlaceholder({ id }: { id: FondId }) {
  const { lang, dict } = await getI18n();
  const fond = getFond(id);

  return (
    <PageTransition>
      <article aria-labelledby={fondTitleId(id)}>
        <FondHeader fond={fond} />

        <section aria-labelledby={`${id}-holdings`} className="border-t border-line">
          <div className="frame grid-archive gap-y-8 py-10 md:py-20">
            <div className="col-span-full lg:col-span-3">
              <SectionLabel mark="§" as="h2" id={`${id}-holdings`}>
                {dict.pendingFond.label}
              </SectionLabel>
              <dl className="mt-6 grid grid-cols-2 gap-5 text-sm md:mt-8 lg:grid-cols-1">
                <div>
                  <dt className="meta text-ash">{dict.common.status}</dt>
                  <dd className="mt-1 flex items-center gap-2 text-paper">
                    <span aria-hidden className="size-1.5 border border-ash" />
                    {dict.common.fondStatus[fond.status]}
                  </dd>
                </div>
                <div>
                  <dt className="meta text-ash">{dict.common.character}</dt>
                  <dd className="mt-1 max-w-xs text-paper">{tr(fond.character, lang)}</dd>
                </div>
              </dl>
            </div>

            <div className="col-span-full lg:col-span-9 lg:col-start-4">
              <ol className="grid border-t border-l border-line sm:grid-cols-2">
                {tr(fond.holdings, lang).map((holding, i) => (
                  <li
                    key={holding}
                    className="flex min-h-32 flex-col justify-between gap-6 border-r border-b border-line p-5 md:min-h-44 md:p-6"
                  >
                    <span className="meta text-ash">
                      {fond.numeral}.{i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-display-s font-light text-paper">{holding}</span>
                      <span className="mt-3 block">
                        <PlaceholderInline label={dict.common.noEntries} srPrefix={dict.common.placeholder} />
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <PlaceholderBlock
                className="mt-6 md:mt-8"
                kicker={dict.common.placeholder}
                label={dict.pendingFond.opensLater}
                note={dict.pendingFond.note}
              />
            </div>
          </div>
        </section>

        <FondPager id={id} />
      </article>
    </PageTransition>
  );
}

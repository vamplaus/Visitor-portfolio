import { getFond, getNeighbours } from "@/content/fonds";
import type { FondId } from "@/content/types";
import { Emblem } from "@/components/ui/emblem";
import { PlaceholderBlock, PlaceholderInline } from "@/components/ui/placeholder";
import { SectionLabel } from "@/components/ui/section-label";
import { PageTransition } from "@/components/system/page-transition";
import { FondPager } from "./fond-pager";

/**
 * A fond that is not open yet. Shows what it will hold — categories only —
 * and states plainly that there are no entries. Replaced fond by fond in Stage 2.
 */
export function FondPlaceholder({ id }: { id: FondId }) {
  const fond = getFond(id);
  const { prev, next } = getNeighbours(id);

  return (
    <PageTransition>
      <article aria-labelledby="fond-title">
        <header className="frame grid-archive gap-y-10 pt-14 pb-20 md:pt-24 md:pb-28">
          <div className="col-span-full flex items-start justify-between gap-6 lg:col-span-3 lg:flex-col lg:justify-start lg:gap-12">
            <SectionLabel mark={`Fond ${fond.numeral}`}>{fond.code}</SectionLabel>
            <Emblem id={fond.emblem} lit className="size-16 text-paper md:size-24" />
          </div>
          <div className="col-span-full lg:col-span-9 lg:col-start-4">
            <h1 id="fond-title" className="font-display text-display-l font-light text-paper">
              {fond.title}
            </h1>
            <p className="mt-6 font-display text-lede font-light text-paper italic md:mt-8">{fond.kicker}</p>
            <p className="mt-5 max-w-2xl text-ash">{fond.description}</p>
          </div>
        </header>

        <section aria-labelledby="holdings-title" className="border-t border-line">
          <div className="frame grid-archive gap-y-10 py-16 md:py-24">
            <div className="col-span-full lg:col-span-3">
              <SectionLabel mark="§" as="h2" id="holdings-title">
                Planned holdings
              </SectionLabel>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="meta text-ash">Status</dt>
                  <dd className="mt-1 flex items-center gap-2 text-paper">
                    <span aria-hidden className="size-1.5 bg-oxblood" />
                    In preparation
                  </dd>
                </div>
                <div>
                  <dt className="meta text-ash">Character</dt>
                  <dd className="mt-1 max-w-xs text-paper">{fond.character}</dd>
                </div>
              </dl>
            </div>

            <div className="col-span-full lg:col-span-9 lg:col-start-4">
              <ol className="grid border-t border-l border-line sm:grid-cols-2">
                {fond.holdings.map((holding, i) => (
                  <li key={holding} className="flex min-h-44 flex-col justify-between gap-8 border-r border-b border-line p-5 md:p-6">
                    <span className="meta text-ash">
                      {fond.numeral}.{i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-display-s font-light text-paper">{holding}</span>
                      <span className="mt-3 block">
                        <PlaceholderInline label="No entries yet" />
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <PlaceholderBlock
                className="mt-8"
                label="This fond opens in Stage 2."
                note="Its entries will be read from structured content files. Nothing is invented in the meantime."
              />
            </div>
          </div>
        </section>

        <FondPager prev={prev} next={next} />
      </article>
    </PageTransition>
  );
}

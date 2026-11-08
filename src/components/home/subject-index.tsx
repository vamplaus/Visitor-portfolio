import Link from "next/link";
import { getFond } from "@/content/fonds";
import { subjects } from "@/content/subjects";
import type { Subject } from "@/content/types";
import { SectionLabel } from "@/components/ui/section-label";

/** Group subjects under their initial, as in a printed index. */
function groupByInitial(list: readonly Subject[]) {
  const sorted = [...list].sort((a, b) => a.term.localeCompare(b.term, "en"));
  const groups = new Map<string, Subject[]>();
  for (const subject of sorted) {
    const first = subject.term[0]?.toUpperCase() ?? "#";
    const key = /\d/.test(first) ? "0–9" : first;
    groups.set(key, [...(groups.get(key) ?? []), subject]);
  }
  return [...groups.entries()];
}

export function SubjectIndex() {
  const groups = groupByInitial(subjects);

  return (
    <section aria-labelledby="subjects-title" className="border-t border-line py-24 md:py-36">
      <div className="frame grid-archive gap-y-12">
        <div className="col-span-full md:col-span-3 lg:col-span-3">
          <SectionLabel mark="§ 03">Index</SectionLabel>
          <h2 id="subjects-title" className="mt-8 font-display text-display-m font-light text-paper">
            Index of subjects
          </h2>
          <p className="mt-5 max-w-xs text-sm text-ash">
            Set like the index at the back of a book. Numerals point to the fonds where a subject is kept.
          </p>
        </div>

        <div className="col-span-full gap-x-14 sm:columns-2 md:col-span-5 lg:col-span-8 lg:col-start-5">
          {groups.map(([initial, items]) => (
            <div key={initial} className="mb-9 break-inside-avoid">
              <p aria-hidden className="font-display text-3xl font-light text-ash">
                {initial}
              </p>
              <ul className="mt-2">
                {items.map((subject) => (
                  <li key={subject.term} className="flex items-baseline gap-3 border-b border-line/60 py-1.5">
                    <span className="text-paper">{subject.term}</span>
                    <span aria-hidden className="leader" />
                    <span className="flex gap-1">
                      {subject.fonds.map((id) => {
                        const fond = getFond(id);
                        return (
                          <Link
                            key={id}
                            href={fond.href}
                            aria-label={`${subject.term}: ${fond.title}`}
                            className="meta inline-grid min-h-6 min-w-6 place-items-center px-1 text-ash transition-colors hover:text-ember"
                          >
                            {fond.numeral}
                          </Link>
                        );
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

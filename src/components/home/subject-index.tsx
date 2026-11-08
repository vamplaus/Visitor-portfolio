import Link from "next/link";
import { getFond } from "@/content/fonds";
import { subjects } from "@/content/subjects";
import { localizedPath, localeLabels, tr, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { SectionLabel } from "@/components/ui/section-label";
import { Words } from "@/components/ui/words";

/** Group subjects under their initial, as in a printed index. */
function groupByInitial(lang: Locale, digits: string) {
  const collator = new Intl.Collator(localeLabels[lang].htmlLang);
  const sorted = [...subjects].sort((a, b) => collator.compare(tr(a.term, lang), tr(b.term, lang)));
  const groups = new Map<string, typeof sorted>();
  for (const subject of sorted) {
    const first = tr(subject.term, lang)[0]?.toLocaleUpperCase(localeLabels[lang].htmlLang) ?? "#";
    const key = /\d/.test(first) ? digits : first;
    groups.set(key, [...(groups.get(key) ?? []), subject]);
  }
  return [...groups.entries()];
}

export async function SubjectIndex() {
  const { lang, dict } = await getI18n();
  const t = dict.home.subjects;
  const groups = groupByInitial(lang, t.digits);

  return (
    <section aria-labelledby="subjects-title" className="border-t border-line py-20 md:py-36">
      <div className="frame grid-archive gap-y-10">
        <div className="col-span-full md:col-span-3 lg:col-span-3">
          <SectionLabel mark="§ 03">{t.label}</SectionLabel>
          <h2 id="subjects-title" data-reveal="words" className="mt-6 font-display text-display-m font-light text-paper md:mt-8">
            <Words text={t.title} />
          </h2>
          <p className="mt-5 max-w-xs text-sm text-ash">{t.intro}</p>
        </div>

        <div className="col-span-full gap-x-14 sm:columns-2 md:col-span-5 lg:col-span-8 lg:col-start-5">
          {groups.map(([initial, items]) => (
            <div key={initial} data-reveal="rise" className="mb-8 break-inside-avoid">
              <p aria-hidden className="font-display text-3xl font-light text-ash">
                {initial}
              </p>
              <ul className="mt-2">
                {items.map((subject) => {
                  const term = tr(subject.term, lang);
                  return (
                    <li key={term} className="flex items-baseline gap-3 border-b border-line/60 py-1.5">
                      <span className="text-paper">{term}</span>
                      <span aria-hidden className="leader" />
                      <span className="flex gap-1">
                        {subject.fonds.map((id) => {
                          const fond = getFond(id);
                          return (
                            <Link
                              key={id}
                              href={localizedPath(lang, fond.href)}
                              aria-label={`${term}: ${tr(fond.title, lang)}`}
                              className="meta inline-grid min-h-6 min-w-6 place-items-center px-1 text-ash transition-colors hover:text-ember"
                            >
                              {fond.numeral}
                            </Link>
                          );
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

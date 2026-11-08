import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { classroomEntries, classroomSections } from "@/content/classroom";
import { localizedPath, tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

/**
 * The working notebook: one ruled page, four headings in the teacher's order.
 * Section numbers sit in the margin, left of the red line; text sits on the rules.
 */
export async function Notebook() {
  const { lang, dict } = await getI18n();
  const t = dict.classroom;

  return (
    <div data-reveal="notebook" className="notebook border border-line py-[var(--rule)]">
      {classroomSections.map((section, i) => {
        const entries = classroomEntries.filter((e) => e.section === section);
        return (
          <section key={section} aria-labelledby={`classroom-nb-${section}`} className="pb-[var(--rule)]">
            <span aria-hidden className="margin-note meta text-ash">
              {i + 1}.
            </span>
            <h3 id={`classroom-nb-${section}`} className="font-display text-2xl leading-[var(--rule)] text-paper italic">
              {t.sections[section]}
            </h3>

            {entries.length === 0 ? (
              <p className="text-sm leading-[var(--rule)] text-ash">
                {t.emptyPage} <span className="text-dust">—</span> {t.emptyNote}
              </p>
            ) : (
              <ol>
                {entries.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={localizedPath(lang, `/classroom/${entry.slug}`)}
                      data-cursor={dict.cursor.open}
                      className="group block"
                    >
                      <span className="meta flex flex-wrap items-center gap-x-3 leading-[var(--rule)] text-ash">
                        {entry.code}
                        {entry.specimen ? (
                          <span className="border border-dashed border-line-strong px-1.5 leading-normal">{t.specimen}</span>
                        ) : null}
                      </span>
                      <span className="block font-display text-[1.6rem] leading-[var(--rule)] text-paper">
                        <span className="ink-link">{tr(entry.title, lang)}</span>
                        <ArrowUpRight aria-hidden className="ml-2 inline size-4 text-ash" strokeWidth={1.25} />
                      </span>
                      <span className="block max-w-2xl leading-[var(--rule)] text-ash">{tr(entry.summary, lang)}</span>
                      <span className="meta block leading-[var(--rule)] text-ash">
                        {tr(entry.topic, lang)} · {tr(entry.level, lang)} · {tr(entry.format, lang)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}

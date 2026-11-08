import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { classroomEntries, getClassroomEntry } from "@/content/classroom";
import type { ClassroomEntry } from "@/content/types";
import { hasLocale, localizedPath, tr } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { BitBoard } from "@/components/classroom/bit-board";
import { PlaceholderBlock } from "@/components/ui/placeholder";
import { SectionLabel } from "@/components/ui/section-label";
import { PageTransition } from "@/components/system/page-transition";

export async function generateStaticParams() {
  return classroomEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/classroom/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const entry = getClassroomEntry(slug);
  if (!hasLocale(lang) || !entry) return {};
  return pageMetadata({
    lang,
    path: `/classroom/${entry.slug}`,
    title: `${entry.code} · ${tr(entry.title, lang)}`,
    description: tr(entry.summary, lang),
  });
}

/**
 * Known entries are prerendered at build time; an unknown slug renders the
 * localized "Not in the catalogue" page (marked noindex by Next.js).
 *
 * The slug is read at the top of the page, not inside <Suspense>: measured on
 * the lesson page, a Suspense boundary here delays hydration of the
 * interactive parts from ~0.23 s to ~0.86 s on a direct visit. `instant = false`
 * records that choice: navigating into an entry may wait for its (static,
 * prerendered) payload instead of showing a shell first.
 */
export const instant = false;

export default async function ClassroomEntryPage({ params }: PageProps<"/[lang]/classroom/[slug]">) {
  return <Resolve params={params} />;
}

async function Resolve({ params }: Pick<PageProps<"/[lang]/classroom/[slug]">, "params">) {
  const { slug } = await params;
  const entry = getClassroomEntry(slug);
  if (!entry) notFound();
  return <Lesson entry={entry} />;
}

/** A classroom material, laid out as a page of the working notebook. */
async function Lesson({ entry }: { entry: ClassroomEntry }) {

  const { lang, dict } = await getI18n();
  const t = dict.classroom;
  const meta = [
    { label: t.lesson.topic, value: tr(entry.topic, lang) },
    { label: t.lesson.level, value: tr(entry.level, lang) },
    { label: t.lesson.format, value: tr(entry.format, lang) },
  ];

  return (
    <PageTransition>
      <article aria-labelledby={`${entry.slug}-title`}>
        <header className="frame grid-archive gap-y-6 pt-8 pb-10 md:gap-y-10 md:pt-20 md:pb-16">
          <div className="col-span-full flex flex-col gap-4 lg:col-span-3">
            <Link
              href={localizedPath(lang, "/classroom")}
              className="meta inline-flex items-center gap-2 self-start text-ash transition-colors hover:text-paper"
            >
              <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.25} />
              {t.lesson.back}
            </Link>
            <SectionLabel mark={entry.code}>{t.sections[entry.section]}</SectionLabel>
          </div>
          <div className="col-span-full lg:col-span-9 lg:col-start-4">
            <h1 id={`${entry.slug}-title`} className="font-display text-display-l font-light text-paper">
              {tr(entry.title, lang)}
            </h1>
            <p className="mt-4 max-w-2xl text-ash md:mt-6">{tr(entry.summary, lang)}</p>
            <dl className="mt-6 grid grid-cols-3 border-t border-l border-line md:mt-8">
              {meta.map((row) => (
                <div key={row.label} className="border-r border-b border-line p-3 md:p-4">
                  <dt className="meta text-ash">{row.label}</dt>
                  <dd className="mt-1 text-sm text-paper md:text-base">{row.value}</dd>
                </div>
              ))}
            </dl>
            {entry.specimen ? (
              <PlaceholderBlock className="mt-6" kicker={t.specimen} label={t.specimenNote} />
            ) : null}
          </div>
        </header>

        <div className="border-t border-line">
          <div className="frame grid-archive gap-y-10 py-10 md:py-16">
            {/* Goal and steps, written in the notebook */}
            <div className="col-span-full lg:col-span-9 lg:col-start-4">
              <div className="notebook border border-line py-[var(--rule)]">
                <span aria-hidden className="margin-note meta text-ash">
                  §
                </span>
                <h2 className="font-display text-2xl leading-[var(--rule)] text-paper italic">{t.lesson.goal}</h2>
                <p className="max-w-2xl text-paper">{tr(entry.goal, lang)}</p>
                <h2 className="mt-[var(--rule)] font-display text-2xl leading-[var(--rule)] text-paper italic">
                  {t.lesson.steps}
                </h2>
                <ol>
                  {tr(entry.steps, lang).map((step, i) => (
                    <li key={step} className="max-w-2xl text-paper">
                      <span aria-hidden className="margin-note meta text-ember">
                        {i + 1}
                      </span>
                      <span className="sr-only">{i + 1}. </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* The board */}
            {entry.interactive === "bit-board" && (
              <div className="col-span-full lg:col-span-9 lg:col-start-4">
                <h2 className="sr-only">{t.lesson.practice}</h2>
                <BitBoard labels={t.bits} id={`${entry.slug}-board`} />
              </div>
            )}

            {/* Questions */}
            {entry.questions && (
              <div className="col-span-full lg:col-span-9 lg:col-start-4">
                <div className="notebook border border-line py-[var(--rule)]">
                  <span aria-hidden className="margin-note meta text-ash">
                    ?
                  </span>
                  <h2 className="font-display text-2xl leading-[var(--rule)] text-paper italic">
                    {t.lesson.questions}
                  </h2>
                  <ol>
                    {tr(entry.questions, lang).map((q, i) => (
                      <li key={q} className="max-w-2xl text-paper">
                        <span aria-hidden className="margin-note meta text-ash">
                          {String.fromCharCode(97 + i)})
                        </span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-line">
          <div className="frame py-8 md:py-12">
            <Link
              href={localizedPath(lang, "/classroom")}
              className="meta inline-flex items-center gap-2 text-paper transition-colors hover:text-ember"
            >
              <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.25} />
              {t.lesson.back}
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}

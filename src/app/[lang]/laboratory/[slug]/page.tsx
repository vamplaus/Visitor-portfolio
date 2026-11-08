import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getLabEntry, labEntries } from "@/content/laboratory";
import { isPlaceholder, type LabEntry } from "@/content/types";
import { hasLocale, localizedPath, tr } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { getI18n } from "@/i18n/server";
import { FondSection } from "@/components/fond/fond-header";
import { ArchivePipeline } from "@/components/laboratory/archive-pipeline";
import { CodeSpecimen } from "@/components/laboratory/code-specimen";
import { StatusMark } from "@/components/laboratory/status-mark";
import { PlaceholderInline } from "@/components/ui/placeholder";
import { SectionLabel } from "@/components/ui/section-label";
import { PageTransition } from "@/components/system/page-transition";

export async function generateStaticParams() {
  return labEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/laboratory/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const entry = getLabEntry(slug);
  if (!hasLocale(lang) || !entry) return {};
  return pageMetadata({
    lang,
    path: `/laboratory/${entry.slug}`,
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

export default async function LabEntryPage({ params }: PageProps<"/[lang]/laboratory/[slug]">) {
  return <Resolve params={params} />;
}

async function Resolve({ params }: Pick<PageProps<"/[lang]/laboratory/[slug]">, "params">) {
  const { slug } = await params;
  const entry = getLabEntry(slug);
  if (!entry) notFound();
  return <SpecSheet entry={entry} />;
}

/** A laboratory entry, set as a specification sheet. */
async function SpecSheet({ entry }: { entry: LabEntry }) {

  const { lang, dict } = await getI18n();
  const t = dict.laboratory;
  const s = t.sheet;
  let n = 0;
  const mark = () => `${String(++n).padStart(2, "0")}`;

  const spec = [
    { label: dict.common.status, value: <StatusMark status={entry.status} label={t.statuses[entry.status]} /> },
    { label: s.since, value: isPlaceholder(entry.since) ? "—" : entry.since },
    { label: t.columns.domains, value: entry.domains.map((d) => t.domains[d]).join(" · ") },
    { label: s.stack, value: entry.stack.join(" · ") },
  ];

  return (
    <PageTransition>
      <article aria-labelledby={`${entry.slug}-title`}>
        <header className="frame grid-archive gap-y-6 pt-8 pb-10 md:gap-y-10 md:pt-20 md:pb-20">
          <div className="col-span-full flex flex-col gap-4 lg:col-span-3">
            <Link
              href={localizedPath(lang, "/laboratory")}
              className="meta inline-flex items-center gap-2 self-start text-ash transition-colors hover:text-paper"
            >
              <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.25} />
              {s.back}
            </Link>
            <SectionLabel mark={entry.code}>{s.label}</SectionLabel>
          </div>
          <div className="col-span-full lg:col-span-9 lg:col-start-4">
            <h1 id={`${entry.slug}-title`} className="font-display text-display-l font-light text-paper">
              {tr(entry.title, lang)}
            </h1>
            <p className="mt-4 max-w-2xl font-display text-lede font-light text-paper italic md:mt-6">
              {tr(entry.summary, lang)}
            </p>
            <dl className="mt-8 grid grid-cols-2 border-t border-l border-line md:mt-10 md:grid-cols-4">
              {spec.map((row) => (
                <div key={row.label} className="border-r border-b border-line p-3 md:p-4">
                  <dt className="meta text-ash">{row.label}</dt>
                  <dd className="meta mt-1.5 text-paper normal-case">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <FondSection mark={mark()} label={s.objective} id={`${entry.slug}-objective`}>
          <p className="max-w-3xl font-display text-lede text-paper">{tr(entry.objective, lang)}</p>
        </FondSection>

        <FondSection mark={mark()} label={s.protocol} id={`${entry.slug}-protocol`}>
          <ol className="max-w-3xl border-t border-line">
            {tr(entry.protocol, lang).map((step, i) => (
              <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-4">
                <span className="meta pt-1 text-ash">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-paper">{step}</span>
              </li>
            ))}
          </ol>
        </FondSection>

        {entry.schema === "archive-pipeline" && (
          <FondSection mark={mark()} label={s.schema} id={`${entry.slug}-schema`}>
            <ArchivePipeline lang={lang} figure={`${s.schema} ${entry.code}.1`} />
          </FondSection>
        )}

        {entry.specimen && (
          <FondSection mark={mark()} label={s.specimen} id={`${entry.slug}-specimen`}>
            <CodeSpecimen
              specimen={entry.specimen}
              caption={tr(entry.specimen.caption, lang)}
              linesLabel={s.lines}
              regionLabel={s.specimen}
            />
          </FondSection>
        )}

        {entry.observations && (
          <FondSection mark={mark()} label={s.observations} id={`${entry.slug}-observations`}>
            <ul className="max-w-3xl space-y-4">
              {tr(entry.observations, lang).map((o) => (
                <li key={o} className="grid grid-cols-[1.5rem_1fr] gap-3 text-paper">
                  <span aria-hidden className="text-ash">—</span>
                  {o}
                </li>
              ))}
            </ul>
          </FondSection>
        )}

        <FondSection mark={mark()} label={s.links} id={`${entry.slug}-links`}>
          <ul className="max-w-3xl border-t border-line">
            {entry.links.map((link) => (
              <li key={tr(link.label, lang)} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-4">
                <span className="text-paper">{tr(link.label, lang)}</span>
                {isPlaceholder(link.href) ? (
                  <PlaceholderInline label={tr(link.href.label, lang)} srPrefix={dict.common.placeholder} />
                ) : (
                  <a href={link.href} className="meta inline-flex items-center gap-1.5 text-paper hover:text-ember">
                    {link.href.replace(/^https?:\/\//, "")}
                    <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.25} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </FondSection>

        <div className="border-t border-line">
          <div className="frame py-8 md:py-12">
            <Link
              href={localizedPath(lang, "/laboratory")}
              className="meta inline-flex items-center gap-2 text-paper transition-colors hover:text-ember"
            >
              <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.25} />
              {s.back}
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}

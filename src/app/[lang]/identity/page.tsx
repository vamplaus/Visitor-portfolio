import Link from "next/link";
import { getFond } from "@/content/fonds";
import { identity } from "@/content/identity";
import { site } from "@/content/site";
import { subjects } from "@/content/subjects";
import { isPlaceholder, type ImageRef, type Maybe, type Subject } from "@/content/types";
import { localizedPath, tr, type Locale } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { FondHeader, FondSection, fondTitleId } from "@/components/fond/fond-header";
import { FondPager } from "@/components/fond/fond-pager";
import { fondMetadata } from "@/components/fond/metadata";
import { PortraitPlate, type PlateImage } from "@/components/identity/portrait-plate";
import { PlaceholderBlock, PlaceholderInline } from "@/components/ui/placeholder";
import { PageTransition } from "@/components/system/page-transition";
import { Words } from "@/components/ui/words";

export const generateMetadata = fondMetadata("identity");

function plateImage(value: Maybe<ImageRef>, lang: Locale): PlateImage | null {
  return isPlaceholder(value) ? null : { ...value, alt: tr(value.alt, lang) };
}

/** Fond I — Identity: the archivist's dossier. Only stated facts; the rest are labelled gaps. */
export default async function IdentityPage() {
  const { lang, dict } = await getI18n();
  const t = dict.identity;
  const fond = getFond("identity");
  const { archivist } = site;

  const dossier: { label: string; value: React.ReactNode }[] = [
    { label: t.fields.handle, value: archivist.handle },
    { label: t.fields.role, value: tr(archivist.role, lang) },
    {
      label: t.fields.name,
      value: isPlaceholder(archivist.name) ? (
        <PlaceholderInline label={tr(archivist.name.label, lang)} srPrefix={dict.common.placeholder} />
      ) : (
        archivist.name
      ),
    },
    {
      label: t.fields.location,
      value: isPlaceholder(archivist.location) ? (
        <PlaceholderInline label={tr(archivist.location.label, lang)} srPrefix={dict.common.placeholder} />
      ) : (
        tr(archivist.location, lang)
      ),
    },
  ];

  return (
    <PageTransition>
      <article aria-labelledby={fondTitleId("identity")}>
        <FondHeader fond={fond} />

        {/* § 01 Dossier */}
        <FondSection mark="§ 01" label={t.dossier} id="identity-dossier">
          <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
            <PortraitPlate
              initial={identity.plate.initial}
              photo={plateImage(identity.plate.photo, lang)}
              avatar={plateImage(identity.plate.avatar, lang)}
              labels={{ ...t.plate, placeholder: dict.common.placeholder }}
            />
            <dl data-reveal="stagger" className="self-start border-t border-line">
              {dossier.map((row, i) => (
                <div key={row.label} style={{ ["--i" as string]: i } as React.CSSProperties} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-line py-4 md:grid-cols-[9rem_1fr]">
                  <dt className="meta text-ash">{row.label}</dt>
                  <dd className="font-display text-xl text-paper md:text-2xl">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FondSection>

        {/* § 02 Two hemispheres */}
        <FondSection mark="§ 02" label={t.hemispheres.label} id="identity-hemispheres">
          <h3 data-reveal="words" className="font-display text-display-m font-light text-paper">
            <Words text={t.hemispheres.title} />
          </h3>
          <p data-reveal="rise" style={{ ["--d" as string]: "250ms" } as React.CSSProperties} className="mt-4 max-w-2xl text-ash">
            {t.hemispheres.intro}
          </p>
          <div className="mt-8 grid border-t border-line md:mt-10 md:grid-cols-2">
            <Hemisphere
              lang={lang}
              items={subjects.filter((s) => s.side === "logic")}
              heading={
                <span className="font-mono text-sm tracking-[0.18em] text-ash uppercase">{t.hemispheres.logic}</span>
              }
              className="md:border-r md:border-line md:pr-10"
              reveal="from-left"
            />
            <Hemisphere
              lang={lang}
              items={subjects.filter((s) => s.side === "imagination")}
              heading={<span className="font-display text-2xl text-paper italic">{t.hemispheres.imagination}</span>}
              className="border-t border-line md:border-t-0 md:pl-10"
              reveal="from-right"
            />
          </div>
        </FondSection>

        {/* § 03 Biography */}
        <FondSection mark="§ 03" label={t.biography.label} id="identity-biography">
          {isPlaceholder(identity.biography) ? (
            <PlaceholderBlock kicker={dict.common.placeholder} label={t.biography.empty} note={t.biography.note} />
          ) : (
            <div className="max-w-2xl space-y-5 font-display text-lede text-paper">
              {tr(identity.biography, lang).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
        </FondSection>

        {/* § 04–05 Principles and timeline */}
        <section aria-label={`${t.principles.label}, ${t.timeline.label}`} className="border-t border-line">
          <div className="frame grid-archive gap-y-8 py-10 md:py-20">
            <div className="col-span-full grid gap-8 md:grid-cols-2 lg:col-span-9 lg:col-start-4">
              <div>
                <h2 className="meta flex items-center gap-3 text-ash">
                  <span className="text-paper">§ 04</span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  {t.principles.label}
                </h2>
                {isPlaceholder(identity.principles) ? (
                  <PlaceholderBlock className="mt-6" kicker={dict.common.placeholder} label={t.principles.empty} />
                ) : (
                  <ol className="mt-6 space-y-3 text-paper">
                    {tr(identity.principles, lang).map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ol>
                )}
              </div>
              <div>
                <h2 className="meta flex items-center gap-3 text-ash">
                  <span className="text-paper">§ 05</span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  {t.timeline.label}
                </h2>
                {isPlaceholder(identity.timeline) ? (
                  <PlaceholderBlock className="mt-6" kicker={dict.common.placeholder} label={t.timeline.empty} />
                ) : (
                  <ol className="mt-6 border-t border-line">
                    {identity.timeline.map((e) => (
                      <li key={`${e.year}-${tr(e.event, lang)}`} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-line py-3">
                        <span className="meta text-ash">{e.year}</span>
                        <span className="text-paper">{tr(e.event, lang)}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </section>

        <FondPager id="identity" />
      </article>
    </PageTransition>
  );
}

function Hemisphere({
  lang,
  items,
  heading,
  className,
  reveal,
}: {
  lang: Locale;
  items: readonly Subject[];
  heading: React.ReactNode;
  className?: string;
  reveal: "from-left" | "from-right";
}) {
  return (
    <div data-reveal={reveal} style={{ ["--d" as string]: "300ms" } as React.CSSProperties} className={className}>
      <p className="pt-6 pb-3">{heading}</p>
      <ul>
        {items.map((subject) => {
          const term = tr(subject.term, lang);
          const fond = getFond(subject.fonds[0]);
          return (
            <li key={term} className="border-b border-line/60 last:border-b-0">
              <Link href={localizedPath(lang, fond.href)} className="group flex items-baseline gap-3 py-2.5">
                <span className="text-paper transition-colors group-hover:text-ember">{term}</span>
                <span aria-hidden className="leader" />
                <span className="meta text-ash">
                  {fond.numeral} <span className="sr-only">— {tr(fond.title, lang)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

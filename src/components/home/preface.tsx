import { getI18n } from "@/i18n/server";
import { SectionLabel } from "@/components/ui/section-label";

/** What this place is — stated plainly, from facts the archivist has given. */
export async function Preface() {
  const { dict } = await getI18n();
  const t = dict.home.preface;

  return (
    <section aria-labelledby="preface-title" className="border-t border-line">
      <div className="frame grid-archive gap-y-8 py-20 md:py-36">
        <div className="col-span-full lg:col-span-3">
          <SectionLabel mark="§ 01" as="h2" id="preface-title">
            {t.label}
          </SectionLabel>
        </div>

        <div className="col-span-full md:col-span-7 lg:col-span-8 lg:col-start-5">
          <p className="font-display text-[clamp(1.85rem,1.2rem+2.4vw,3.1rem)] leading-[1.12] font-light text-paper">
            {t.lead}
            <span className="text-ash">{t.leadTail}</span>
          </p>

          <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 md:mt-14 md:grid-cols-2">
            <p className="text-ash">{t.body1}</p>
            <p className="text-ash">{t.body2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

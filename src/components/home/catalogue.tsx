import { fonds } from "@/content/fonds";
import { getI18n } from "@/i18n/server";
import { SectionLabel } from "@/components/ui/section-label";
import { toRoman } from "@/lib/roman";
import { Shelf } from "./shelf";

export async function Catalogue() {
  const { dict } = await getI18n();
  const t = dict.home.catalogue;

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="border-t border-line py-20 md:py-36">
      <div className="frame grid-archive items-end gap-y-6">
        <div className="col-span-full lg:col-span-7">
          <SectionLabel mark="§ 02">{t.label}</SectionLabel>
          <h2 id="catalogue-title" className="mt-6 font-display text-display-l font-light text-paper md:mt-8">
            {toRoman(fonds.length)} {t.title}
          </h2>
        </div>
        <p className="col-span-full max-w-md text-ash md:col-span-5 lg:col-span-4 lg:col-start-9">{t.intro}</p>
      </div>

      <div className="frame mt-10 md:mt-20">
        <Shelf />
      </div>
    </section>
  );
}

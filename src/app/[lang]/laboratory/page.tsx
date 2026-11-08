import { getFond } from "@/content/fonds";
import { getI18n } from "@/i18n/server";
import { FondHeader, FondSection, fondTitleId } from "@/components/fond/fond-header";
import { FondPager } from "@/components/fond/fond-pager";
import { fondMetadata } from "@/components/fond/metadata";
import { Readout } from "@/components/laboratory/readout";
import { FondSpecimens } from "@/components/cabinet/cabinet";
import { Register } from "@/components/laboratory/register";
import { PageTransition } from "@/components/system/page-transition";
import { Words } from "@/components/ui/words";

export const generateMetadata = fondMetadata("laboratory");

/** Fond II — Laboratory: an instrument panel and the register of entries. */
export default async function LaboratoryPage() {
  const { dict } = await getI18n();
  const t = dict.laboratory;

  return (
    <PageTransition>
      <article aria-labelledby={fondTitleId("laboratory")}>
        <FondHeader fond={getFond("laboratory")}>
          <Readout />
        </FondHeader>

        <FondSpecimens ids={["neural", "terminal"]} numbers={[2, 3]} />

        <FondSection mark="§ 01" label={t.registerLabel} id="laboratory-register">
          <h3 data-reveal="words" className="font-display text-display-m font-light text-paper">
            <Words text={t.registerTitle} />
          </h3>
          <p data-reveal="rise" style={{ ["--d" as string]: "250ms" } as React.CSSProperties} className="mt-4 max-w-2xl text-ash">
            {t.registerIntro}
          </p>
          <div className="mt-8 md:mt-10">
            <Register />
          </div>
        </FondSection>

        <FondPager id="laboratory" />
      </article>
    </PageTransition>
  );
}

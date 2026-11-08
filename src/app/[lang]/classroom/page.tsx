import { getFond } from "@/content/fonds";
import { getI18n } from "@/i18n/server";
import { Notebook } from "@/components/classroom/notebook";
import { FondHeader, FondSection, fondTitleId } from "@/components/fond/fond-header";
import { FondPager } from "@/components/fond/fond-pager";
import { fondMetadata } from "@/components/fond/metadata";
import { PageTransition } from "@/components/system/page-transition";

export const generateMetadata = fondMetadata("classroom");

/** Fond III — Classroom: the teacher's working notebook. */
export default async function ClassroomPage() {
  const { dict } = await getI18n();

  return (
    <PageTransition>
      <article aria-labelledby={fondTitleId("classroom")}>
        <FondHeader fond={getFond("classroom")} />
        <FondSection mark="§ 01" label={dict.classroom.notebookLabel} id="classroom-notebook">
          <Notebook />
        </FondSection>
        <FondPager id="classroom" />
      </article>
    </PageTransition>
  );
}

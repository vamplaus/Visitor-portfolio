import { Catalogue } from "@/components/home/catalogue";
import { Entrance } from "@/components/home/entrance";
import { Preface } from "@/components/home/preface";
import { SubjectIndex } from "@/components/home/subject-index";
import { PageTransition } from "@/components/system/page-transition";

/** Fond 0 — the Vestibule: entrance, preface, catalogue, index of subjects. */
export default function HomePage() {
  return (
    <PageTransition>
      <div>
        <Entrance />
        <Preface />
        <Catalogue />
        <SubjectIndex />
      </div>
    </PageTransition>
  );
}

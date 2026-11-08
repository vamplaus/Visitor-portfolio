import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";

/** What this place is — stated plainly, from facts the archivist has given. */
export function Preface() {
  return (
    <section aria-labelledby="preface-title" className="border-t border-line">
      <div className="frame grid-archive gap-y-10 py-24 md:py-36">
        <div className="col-span-full lg:col-span-3">
          <SectionLabel mark="§ 01" as="h2" id="preface-title">
            Preface
          </SectionLabel>
        </div>

        <div className="col-span-full md:col-span-7 lg:col-span-8 lg:col-start-5">
          <p className="font-display text-[clamp(1.85rem,1.2rem+2.4vw,3.1rem)] leading-[1.12] font-light text-paper">
            A working archive. Code, lessons, games and ideas are catalogued side by side
            <span className="text-ash"> — the way a library shelves a treatise on logic next to a book of poems.</span>
          </p>

          <div className="mt-14 grid gap-x-10 gap-y-6 border-t border-line pt-8 md:grid-cols-2">
            <p className="text-ash">
              Kept by a {site.archivist.role.toLowerCase()}. Its holdings span artificial intelligence, Python and
              Linux; game development and 3D modelling; history, philosophy, literature and visual art.
            </p>
            <p className="text-ash">
              Seven fonds, one system. Each fond keeps its own character — a laboratory, a classroom, a forge, a
              library — while sharing the same grid, the same type and the same single colour.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

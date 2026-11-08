import { fonds } from "@/content/fonds";
import { SectionLabel } from "@/components/ui/section-label";
import { toRoman } from "@/lib/roman";
import { Shelf } from "./shelf";

export function Catalogue() {
  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="border-t border-line py-24 md:py-36">
      <div className="frame grid-archive items-end gap-y-8">
        <div className="col-span-full lg:col-span-7">
          <SectionLabel mark="§ 02">Catalogue</SectionLabel>
          <h2 id="catalogue-title" className="mt-8 font-display text-display-l font-light text-paper">
            {toRoman(fonds.length)} fonds
          </h2>
        </div>
        <p className="col-span-full max-w-md text-ash md:col-span-5 lg:col-span-4 lg:col-start-9">
          Each fond is a section of the archive with a character of its own. Choose a volume to open it — or open
          the index from the bar above at any time.
        </p>
      </div>

      <div className="frame mt-14 md:mt-20">
        <Shelf />
      </div>
    </section>
  );
}

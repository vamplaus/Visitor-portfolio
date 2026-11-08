import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { PageTransition } from "@/components/system/page-transition";

export default function NotFound() {
  return (
    <PageTransition>
      <section aria-labelledby="nf-title" className="frame grid-archive min-h-[70svh] content-center gap-y-10 py-24">
        <div className="col-span-full lg:col-span-3">
          <SectionLabel mark="ERR 404">Unlisted</SectionLabel>
        </div>
        <div className="col-span-full lg:col-span-8 lg:col-start-5">
          <h1 id="nf-title" className="font-display text-display-l font-light text-paper">
            Not in the catalogue
          </h1>
          <p className="mt-6 max-w-xl text-ash">
            The record you asked for was never filed here, or has been moved. The catalogue lists everything the
            archive holds.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="meta inline-flex items-center gap-3 border border-line-strong px-5 py-3.5 text-paper transition-colors duration-500 hover:border-oxblood hover:bg-oxblood"
            >
              Return to the vestibule
            </Link>
            <Link
              href="/#catalogue"
              className="meta inline-flex items-center gap-2 px-1 py-3.5 text-ash transition-colors hover:text-paper"
            >
              Open the catalogue
              <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.25} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

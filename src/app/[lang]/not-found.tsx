import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedPath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { SectionLabel } from "@/components/ui/section-label";
import { PageTransition } from "@/components/system/page-transition";

/** Shown when a page inside a locale calls notFound() — e.g. an unknown entry. */
export default async function NotFound() {
  const { lang, dict } = await getI18n();
  const t = dict.notFound;

  return (
    <PageTransition>
      <section aria-labelledby="nf-title" className="frame grid-archive min-h-[70svh] content-center gap-y-8 py-16 md:py-24">
        <div className="col-span-full lg:col-span-3">
          <SectionLabel mark={t.mark}>{t.label}</SectionLabel>
        </div>
        <div className="col-span-full lg:col-span-8 lg:col-start-5">
          <h1 id="nf-title" className="font-display text-display-l font-light text-paper">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-ash">{t.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={localizedPath(lang, "/")}
              className="meta inline-flex items-center gap-3 border border-line-strong px-5 py-3.5 text-paper transition-colors duration-500 hover:border-oxblood hover:bg-oxblood"
            >
              {t.home}
            </Link>
            <Link
              href={localizedPath(lang, "/#catalogue")}
              className="meta inline-flex items-center gap-2 px-1 py-3.5 text-ash transition-colors hover:text-paper"
            >
              {t.catalogue}
              <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.25} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

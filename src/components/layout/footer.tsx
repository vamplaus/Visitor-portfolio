import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { fonds } from "@/content/fonds";
import { site } from "@/content/site";
import { localizedPath, tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { Seal } from "@/components/ui/seal";
import { Words } from "@/components/ui/words";

/** The colophon: what the archive is, where everything is, how it was made. */
export async function Footer() {
  const { lang, dict } = await getI18n();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="frame grid-archive gap-y-12 py-14 md:py-20">
        <div className="col-span-full md:col-span-4 lg:col-span-4">
          <div className="flex items-center gap-3">
            <Seal />
            <p className="meta text-paper">{dict.meta.title}</p>
          </div>
          <p data-reveal="words" className="mt-6 max-w-sm font-display text-display-s font-light text-paper italic">
            <Words text={dict.tagline.text} />
          </p>
        </div>

        <nav aria-label={dict.footer.fonds} className="col-span-full md:col-span-4 lg:col-span-4 lg:col-start-6">
          <p className="meta text-ash">{dict.footer.fonds}</p>
          <ol data-reveal="stagger" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {fonds.map((fond, i) => (
              <li key={fond.id} style={{ ["--i" as string]: i } as React.CSSProperties}>
                <Link href={localizedPath(lang, fond.href)} className="group inline-flex items-baseline gap-3 text-paper">
                  <span className="meta w-7 text-ash">{fond.numeral}</span>
                  <span className="ink-link">{tr(fond.title, lang)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="col-span-full md:col-span-8 lg:col-span-3 lg:col-start-10">
          <p className="meta text-ash">{dict.footer.colophon}</p>
          <p className="mt-4 text-sm leading-relaxed text-ash">{dict.footer.colophonText}</p>
          <p className="meta mt-4 text-ash">
            v{site.version} <span className="text-dust">·</span> {dict.stage}
          </p>
        </div>
      </div>

      <div className="frame">
        <div className="meta flex items-center justify-between border-t border-line py-5 text-ash">
          <p>
            © {site.opened} {site.name}
          </p>
          <a href="#top" className="flex items-center gap-2 text-paper transition-colors hover:text-ember">
            {dict.footer.backToTop}
            <ArrowUp aria-hidden className="size-3.5" strokeWidth={1.25} />
          </a>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { fonds } from "@/content/fonds";
import { site } from "@/content/site";
import { Seal } from "@/components/ui/seal";

/** The colophon: what the archive is, where everything is, how it was made. */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="frame grid-archive gap-y-12 py-16 md:py-20">
        <div className="col-span-full md:col-span-4 lg:col-span-4">
          <div className="flex items-center gap-3">
            <Seal />
            <p className="meta text-paper">{site.title}</p>
          </div>
          <p className="mt-6 max-w-sm font-display text-display-s font-light italic text-paper">
            {site.taglineText}
          </p>
        </div>

        <nav aria-label="Fonds" className="col-span-full md:col-span-4 lg:col-span-4 lg:col-start-6">
          <p className="meta text-ash">Fonds</p>
          <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {fonds.map((fond) => (
              <li key={fond.id}>
                <Link href={fond.href} className="group inline-flex items-baseline gap-3 text-paper">
                  <span className="meta w-7 text-ash">{fond.numeral}</span>
                  <span className="ink-link">{fond.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="col-span-full md:col-span-8 lg:col-span-3 lg:col-start-10">
          <p className="meta text-ash">Colophon</p>
          <p className="mt-4 text-sm leading-relaxed text-ash">
            Set in Cormorant Garamond, IBM Plex Sans and IBM Plex Mono. Built with Next.js, Tailwind CSS and
            Motion. No trackers, no paid services.
          </p>
          <p className="meta mt-4 text-ash">
            v{site.version} <span className="text-dust">·</span> {site.stage}
          </p>
        </div>
      </div>

      <div className="frame">
        <div className="meta flex items-center justify-between border-t border-line py-5 text-ash">
          <p>
            © {site.opened} {site.name}
          </p>
          <a href="#top" className="flex items-center gap-2 text-paper transition-colors hover:text-ember">
            Back to top
            <ArrowUp aria-hidden className="size-3.5" strokeWidth={1.25} />
          </a>
        </div>
      </div>
    </footer>
  );
}

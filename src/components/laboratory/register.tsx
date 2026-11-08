import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { labEntries, labSlots } from "@/content/laboratory";
import { isPlaceholder } from "@/content/types";
import { localizedPath, tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { StatusMark } from "./status-mark";

/**
 * The register: every filed entry, then the reserved slots.
 * A table on wide screens, a stack of index cards on phones.
 */
export async function Register() {
  const { lang, dict } = await getI18n();
  const t = dict.laboratory;
  const href = (slug: string) => localizedPath(lang, `/laboratory/${slug}`);
  const domainList = (ds: readonly (keyof typeof t.domains)[]) => ds.map((d) => t.domains[d]).join(" · ");

  return (
    <>
      {/* Wide screens: a ruled register */}
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">{t.registerTitle}</caption>
        <thead>
          <tr className="meta border-y border-line-strong text-ash">
            <th scope="col" className="py-3 pr-4 font-normal">{t.columns.code}</th>
            <th scope="col" className="py-3 pr-4 font-normal">{t.columns.title}</th>
            <th scope="col" className="py-3 pr-4 font-normal">{t.columns.domains}</th>
            <th scope="col" className="py-3 pr-4 font-normal">{t.columns.status}</th>
            <th scope="col" className="py-3 font-normal">{t.columns.since}</th>
          </tr>
        </thead>
        <tbody>
          {labEntries.map((entry) => (
            <tr key={entry.slug} className="group border-b border-line align-top transition-colors hover:bg-surface">
              <td className="meta py-5 pr-4 whitespace-nowrap text-paper">{entry.code}</td>
              <td className="py-5 pr-4">
                <Link href={href(entry.slug)} className="font-display text-2xl text-paper">
                  <span className="ink-link">{tr(entry.title, lang)}</span>
                  <ArrowUpRight aria-hidden className="ml-2 inline size-4 text-ash" strokeWidth={1.25} />
                </Link>
                <p className="mt-1 max-w-xl text-sm text-ash">{tr(entry.summary, lang)}</p>
              </td>
              <td className="meta py-5 pr-4 text-ash">{domainList(entry.domains)}</td>
              <td className="meta py-5 pr-4 whitespace-nowrap text-paper">
                <StatusMark status={entry.status} label={t.statuses[entry.status]} />
              </td>
              <td className="meta py-5 text-ash">{isPlaceholder(entry.since) ? "—" : entry.since}</td>
            </tr>
          ))}
          {labSlots.map((slot) => (
            <tr key={slot.code} className="border-b border-dashed border-line align-top text-ash">
              <td className="meta py-4 pr-4 whitespace-nowrap">{slot.code}</td>
              <td className="py-4 pr-4">
                <span className="font-display text-xl text-ash">{tr(slot.title, lang)}</span>
                <span className="meta ml-3 border border-dashed border-line-strong px-1.5 py-0.5">{t.reserved}</span>
              </td>
              <td className="meta py-4 pr-4">{domainList(slot.domains)}</td>
              <td className="meta py-4 pr-4">{t.awaiting}</td>
              <td className="meta py-4">—</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phones: index cards */}
      <ol className="border-t border-line md:hidden" aria-label={t.registerTitle}>
        {labEntries.map((entry) => (
          <li key={entry.slug} className="border-b border-line">
            <Link href={href(entry.slug)} className="block py-5">
              <span className="meta flex items-center justify-between text-paper">
                {entry.code}
                <StatusMark status={entry.status} label={t.statuses[entry.status]} />
              </span>
              <span className="mt-2 block font-display text-2xl text-paper">{tr(entry.title, lang)}</span>
              <span className="mt-1 block text-sm text-ash">{tr(entry.summary, lang)}</span>
              <span className="meta mt-3 block text-ash">
                {domainList(entry.domains)} · {isPlaceholder(entry.since) ? "—" : entry.since}
              </span>
            </Link>
          </li>
        ))}
        {labSlots.map((slot) => (
          <li key={slot.code} className="border-b border-dashed border-line py-4 text-ash">
            <span className="meta flex justify-between">
              {slot.code}
              <span>{t.awaiting}</span>
            </span>
            <span className="mt-1.5 block font-display text-xl">{tr(slot.title, lang)}</span>
            <span className="meta mt-2 inline-block border border-dashed border-line-strong px-1.5 py-0.5">
              {t.reserved}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

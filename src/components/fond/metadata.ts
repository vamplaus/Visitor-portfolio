import type { Metadata } from "next";
import { getFond } from "@/content/fonds";
import type { FondId } from "@/content/types";
import { hasLocale, tr } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";

/** generateMetadata for a fond page, read from the registry. */
export function fondMetadata(id: FondId) {
  return async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const fond = getFond(id);
    return pageMetadata({
      lang,
      path: fond.href,
      title: `${fond.numeral}. ${tr(fond.title, lang)}`,
      description: tr(fond.description, lang),
    });
  };
}

import type { Metadata } from "next";
import { defaultLocale, localeLabels, localizedPath, locales, type Locale } from "./config";

/** hreflang alternates for a locale-free path. */
export function alternatesFor(path: string, lang: Locale): Metadata["alternates"] {
  return {
    canonical: localizedPath(lang, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, localizedPath(l, path)])),
      "x-default": localizedPath(defaultLocale, path),
    },
  };
}

/** Metadata for a page: title, description, canonical URL and language alternates. */
export function pageMetadata({
  lang,
  path,
  title,
  description,
}: {
  lang: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: alternatesFor(path, lang),
    openGraph: {
      ...(title ? { title: `${title} — VAMPLAUS` } : {}),
      description,
      url: localizedPath(lang, path),
      locale: localeLabels[lang].ogLocale,
    },
  };
}

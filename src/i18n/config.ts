/**
 * Locales of the archive. Every route lives under /[lang]/…
 * The proxy (src/proxy.ts) sends "/" and any unprefixed path to the visitor's
 * language: an explicit choice (cookie) first, then Accept-Language, then the
 * default below.
 */
export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers an explicit choice made with the language switch. */
export const localeCookie = "vmp-lang";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; ogLocale: string }> = {
  ru: { short: "RU", name: "Русский", htmlLang: "ru", ogLocale: "ru_RU" },
  en: { short: "EN", name: "English", htmlLang: "en", ogLocale: "en_GB" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** "/laboratory" + "en" → "/en/laboratory"; "/" + "ru" → "/ru". */
export function localizedPath(lang: Locale, path: string): string {
  if (path === "/" || path === "") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Swap the locale prefix of a pathname: "/ru/forge" → "/en/forge". */
export function switchLocalePath(pathname: string, to: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = hasLocale(first ?? "") ? rest : [first, ...rest].filter(Boolean);
  return localizedPath(to, `/${tail.join("/")}`);
}

/** Localized value: one entry per locale, checked by the compiler. */
export type L<T = string> = Readonly<Record<Locale, T>>;

export function tr<T>(value: L<T>, lang: Locale): T {
  return value[lang];
}

/** Plural form selection: 1 запись, 2 записи, 5 записей / 1 entry, 2 entries. */
export function plural(lang: Locale, n: number, forms: Partial<Record<Intl.LDMLPluralRule, string>>): string {
  const rule = new Intl.PluralRules(localeLabels[lang].htmlLang).select(n);
  return forms[rule] ?? forms.other ?? "";
}

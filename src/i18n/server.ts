import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";

/**
 * Server-side locale access. The locale is a root parameter (app/[lang]),
 * so any Server Component can read it without prop drilling.
 * Dictionaries are plain modules: they never reach the client bundle unless a
 * slice of them is passed to a Client Component as props.
 */

const dictionaries: Record<Locale, Dictionary> = { en, ru };

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export function dictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export async function getI18n(): Promise<{ lang: Locale; dict: Dictionary }> {
  const locale = await getLocale();
  return { lang: locale, dict: dictionaries[locale] };
}

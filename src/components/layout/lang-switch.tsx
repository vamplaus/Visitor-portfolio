"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { localeCookie, localeLabels, locales, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * RU / EN. Keeps the visitor on the same page in the other language and
 * remembers the choice in a cookie, so "/" opens in that language next time.
 * A plain <a>: switching language swaps the root layout (html lang, metadata),
 * so a full document load is the honest navigation here.
 */
export function LangSwitch({ lang, label, pathname }: { lang: Locale; label: string; pathname?: string }) {
  return (
    <nav aria-label={label} className="meta flex items-center">
      {locales.map((locale, i) => (
        <Fragment key={locale}>
          {i > 0 && (
            <span aria-hidden className="text-dust">
              /
            </span>
          )}
          {locale === lang ? (
            <span aria-current="true" className="px-1.5 py-2 text-paper">
              {localeLabels[locale].short}
            </span>
          ) : (
            <a
              href={switchLocalePath(pathname ?? `/${lang}`, locale)}
              hrefLang={locale}
              lang={locale}
              aria-label={`${localeLabels[locale].name} (${localeLabels[locale].short})`}
              onClick={() => {
                document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
              }}
              className={cn("px-1.5 py-2 text-ash transition-colors hover:text-paper")}
            >
              {localeLabels[locale].short}
            </a>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

/** Same switch, reading the current path. Must sit inside <Suspense>. */
export function LangSwitchLive(props: { lang: Locale; label: string }) {
  const pathname = usePathname();
  return <LangSwitch {...props} pathname={pathname} />;
}

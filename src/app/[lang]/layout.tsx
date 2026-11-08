import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fonds } from "@/content/fonds";
import { site } from "@/content/site";
import { hasLocale, localeLabels, localizedPath, locales, tr } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { dictionaryFor } from "@/i18n/server";
import { display, mono, sans } from "@/lib/fonts";
import { toRoman } from "@/lib/roman";
import { Footer } from "@/components/layout/footer";
import type { NavEntry } from "@/components/layout/nav-types";
import { SkipLink } from "@/components/layout/skip-link";
import { StatusBar } from "@/components/layout/status-bar";
import { InlineScript } from "@/components/system/inline-script";
import { introDecisionScript } from "@/components/system/intro";
import { MotionProvider } from "@/components/system/motion-provider";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = dictionaryFor(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    description: dict.meta.description,
    applicationName: dict.meta.title,
    keywords: [...site.keywords],
    authors: [{ name: site.archivist.handle }],
    alternates: alternatesFor("/", lang),
    openGraph: {
      type: "website",
      siteName: dict.meta.title,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeLabels[lang].ogLocale,
    },
    twitter: { card: "summary", title: dict.meta.title, description: dict.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = dictionaryFor(lang);

  const entries: NavEntry[] = [
    {
      id: "vestibule",
      numeral: "0",
      title: dict.index.vestibule,
      kicker: dict.index.vestibuleKicker,
      href: `/${lang}`,
      emblem: null,
    },
    ...fonds.map((fond) => ({
      id: fond.id,
      numeral: fond.numeral,
      title: tr(fond.title, lang),
      kicker: tr(fond.kicker, lang),
      href: localizedPath(lang, fond.href),
      emblem: fond.emblem,
    })),
  ];

  return (
    <html
      lang={localeLabels[lang].htmlLang}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      // The intro script sets data-intro on <html> before hydration.
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={introDecisionScript} />
      </head>
      <body id="top" className="flex min-h-svh flex-col">
        <SkipLink label={dict.common.skip} />
        <MotionProvider>
          <StatusBar
            lang={lang}
            labels={dict.bar}
            entries={entries}
            indexLabels={{
              ...dict.index,
              fondsCount: `${toRoman(fonds.length)} ${dict.index.fonds}`,
              tagline: dict.tagline.text,
              version: `v${site.version} · ${dict.stage}`,
            }}
          />
          <main id="main" tabIndex={-1} className="flex-1 pt-12 focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

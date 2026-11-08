import type { Metadata } from "next";
import "./globals.css";
import { display, mono, sans } from "@/lib/fonts";
import { en } from "@/i18n/dictionaries/en";
import { ru } from "@/i18n/dictionaries/ru";
import { Seal } from "@/components/ui/seal";

/**
 * 404 for URLs that match no route at all. It bypasses the [lang] layout, so
 * the language is unknown: the catalogue card is printed in both.
 */
export const metadata: Metadata = {
  title: "404 — VAMPLAUS",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-svh flex-col">
        <header className="border-b border-line">
          <div className="frame flex h-12 items-center gap-3">
            <Seal />
            <span className="meta text-paper">Vamplaus</span>
          </div>
        </header>
        <main className="frame grid-archive flex-1 content-center gap-y-12 py-16">
          {[
            { dict: ru, lang: "ru", href: "/ru" },
            { dict: en, lang: "en", href: "/en" },
          ].map(({ dict, lang, href }) => (
            <section key={lang} lang={lang} className="col-span-full md:col-span-4 lg:col-span-5 lg:even:col-start-7">
              <p className="meta text-ash">
                <span className="text-paper">{dict.notFound.mark}</span> — {dict.notFound.label}
              </p>
              <h1 className="mt-6 font-display text-display-m font-light text-paper">{dict.notFound.title}</h1>
              <p className="mt-5 max-w-md text-ash">{dict.notFound.body}</p>
              <a
                href={href}
                className="meta mt-8 inline-flex border border-line-strong px-5 py-3.5 text-paper transition-colors duration-500 hover:border-oxblood hover:bg-oxblood"
              >
                {dict.notFound.home}
              </a>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { dictionaryFor } from "@/i18n/server";
import { Cabinet } from "@/components/cabinet/cabinet";
import { Catalogue } from "@/components/home/catalogue";
import { Entrance } from "@/components/home/entrance";
import { Preface } from "@/components/home/preface";
import { SubjectIndex } from "@/components/home/subject-index";
import { PageTransition } from "@/components/system/page-transition";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata({ lang, path: "/", description: dictionaryFor(lang).meta.description });
}

/** Fond 0 — the Vestibule: entrance, preface, cabinet of curiosities, catalogue, index of subjects. */
export default function HomePage() {
  return (
    <PageTransition>
      <div>
        <Entrance />
        <Preface />
        <Cabinet />
        <Catalogue />
        <SubjectIndex />
      </div>
    </PageTransition>
  );
}

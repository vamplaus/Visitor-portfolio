import type { Metadata } from "next";
import { getFond } from "@/content/fonds";
import type { FondId } from "@/content/types";

/** Page metadata for a fond, read from the registry. */
export function fondMetadata(id: FondId): Metadata {
  const fond = getFond(id);
  return {
    title: `${fond.numeral}. ${fond.title}`,
    description: fond.description,
    alternates: { canonical: fond.href },
    openGraph: { title: `${fond.title} — VAMPLAUS`, description: fond.description, url: fond.href },
  };
}

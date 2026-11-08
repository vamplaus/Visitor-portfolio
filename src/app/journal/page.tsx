import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("journal");

/** Fond: Journal. Placeholder until this fond opens in Stage 2. */
export default function JournalPage() {
  return <FondPlaceholder id="journal" />;
}

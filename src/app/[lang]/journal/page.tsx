import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const generateMetadata = fondMetadata("journal");

/** Fond: Journal. In preparation — opens in a later stage. */
export default function JournalPage() {
  return <FondPlaceholder id="journal" />;
}

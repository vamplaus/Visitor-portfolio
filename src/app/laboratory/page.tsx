import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("laboratory");

/** Fond: Laboratory. Placeholder until this fond opens in Stage 2. */
export default function LaboratoryPage() {
  return <FondPlaceholder id="laboratory" />;
}

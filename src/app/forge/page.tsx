import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("forge");

/** Fond: Forge. Placeholder until this fond opens in Stage 2. */
export default function ForgePage() {
  return <FondPlaceholder id="forge" />;
}

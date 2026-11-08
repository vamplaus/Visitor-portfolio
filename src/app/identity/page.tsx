import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("identity");

/** Fond: Identity. Placeholder until this fond opens in Stage 2. */
export default function IdentityPage() {
  return <FondPlaceholder id="identity" />;
}

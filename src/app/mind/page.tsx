import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("mind");

/** Fond: Mind. Placeholder until this fond opens in Stage 2. */
export default function MindPage() {
  return <FondPlaceholder id="mind" />;
}

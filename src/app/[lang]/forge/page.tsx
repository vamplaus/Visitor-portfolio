import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const generateMetadata = fondMetadata("forge");

/** Fond: Forge. In preparation — opens in a later stage. */
export default function ForgePage() {
  return <FondPlaceholder id="forge" />;
}

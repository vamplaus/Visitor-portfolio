import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("contact");

/** Fond: Contact. Placeholder until this fond opens in Stage 2. */
export default function ContactPage() {
  return <FondPlaceholder id="contact" />;
}

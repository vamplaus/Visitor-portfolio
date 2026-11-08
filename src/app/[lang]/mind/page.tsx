import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const generateMetadata = fondMetadata("mind");

/** Fond: Mind. In preparation — opens in a later stage. */
export default function MindPage() {
  return <FondPlaceholder id="mind" specimens={{ ids: ["astrolabe", "codex"], numbers: [5, 7] }} />;
}

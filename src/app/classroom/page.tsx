import { FondPlaceholder } from "@/components/fond/fond-placeholder";
import { fondMetadata } from "@/components/fond/metadata";

export const metadata = fondMetadata("classroom");

/** Fond: Classroom. Placeholder until this fond opens in Stage 2. */
export default function ClassroomPage() {
  return <FondPlaceholder id="classroom" />;
}

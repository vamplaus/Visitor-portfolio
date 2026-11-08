import { cn } from "@/lib/cn";

/**
 * Explicit placeholders. The archive never fills a gap with invented facts:
 * an empty slot is shown as an empty slot, dashed and labelled.
 */

export function PlaceholderBlock({
  kicker,
  label,
  note,
  className,
}: {
  kicker: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div role="note" className={cn("border border-dashed border-line-strong px-5 py-4", className)}>
      <p className="meta text-ember">{kicker}</p>
      <p className="mt-1.5 text-ash">{label}</p>
      {note ? <p className="mt-1 text-sm text-ash">{note}</p> : null}
    </div>
  );
}

export function PlaceholderInline({ label, srPrefix }: { label: string; srPrefix: string }) {
  return (
    <span className="meta inline-block border border-dashed border-line-strong px-1.5 py-0.5 text-ash">
      <span className="sr-only">{srPrefix}: </span>[ {label} ]
    </span>
  );
}

import type { EntryStatus } from "@/content/types";
import { cn } from "@/lib/cn";

/** A square status mark: filled seal for work in progress, outlines otherwise. */
export function StatusMark({ status, label }: { status: EntryStatus; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          "size-1.5 shrink-0",
          status === "active" && "bg-oxblood",
          status === "complete" && "bg-paper",
          status === "paused" && "border border-ash",
          status === "archived" && "border border-dust",
        )}
      />
      {label}
    </span>
  );
}

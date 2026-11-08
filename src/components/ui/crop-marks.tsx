import { cn } from "@/lib/cn";

/**
 * Printer's crop marks in the four corners of a relatively positioned parent.
 * A quiet reminder that every screen is a sheet being composed.
 */
export function CropMarks({ className, inset = "0.75rem" }: { className?: string; inset?: string }) {
  const corner = "pointer-events-none absolute size-3 border-line-strong";
  return (
    <span aria-hidden className={cn("contents", className)} style={{ ["--crop-inset" as string]: inset }}>
      <span className={cn(corner, "top-(--crop-inset) left-(--crop-inset) border-t border-l")} />
      <span className={cn(corner, "top-(--crop-inset) right-(--crop-inset) border-t border-r")} />
      <span className={cn(corner, "bottom-(--crop-inset) left-(--crop-inset) border-b border-l")} />
      <span className={cn(corner, "right-(--crop-inset) bottom-(--crop-inset) border-r border-b")} />
    </span>
  );
}

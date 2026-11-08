import { cn } from "@/lib/cn";

/**
 * The seal: a square of oxblood with an inscribed V.
 * Half hanko, half wax seal — the archive's signature. Decorative only.
 */
export function Seal({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid size-[1.375rem] shrink-0 place-items-center bg-oxblood font-display text-[0.95rem] leading-none font-medium text-paper",
        className,
      )}
    >
      <span className="translate-y-[0.04em]">V</span>
    </span>
  );
}

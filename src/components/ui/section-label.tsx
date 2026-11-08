import { cn } from "@/lib/cn";

/** "§ 01 ——— Preface": the running head that opens every block. */
export function SectionLabel({
  mark,
  children,
  className,
  as: Tag = "p",
  id,
}: {
  mark: string;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("meta flex items-center gap-3 text-ash", className)}>
      <span className="text-paper">{mark}</span>
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </Tag>
  );
}

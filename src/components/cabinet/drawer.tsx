import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSpecimen, type SpecimenId } from "@/content/cabinet";
import { getFond } from "@/content/fonds";
import { localizedPath, tr } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { CropMarks } from "@/components/ui/crop-marks";
import { cn } from "@/lib/cn";
import { SpecimenView } from "./specimen-view";

/** Heights of the specimen mount, by the drawer's shape. */
const MOUNT = {
  tall: "h-[22rem] md:h-[30rem]",
  mid: "h-[20rem] md:h-[24rem]",
  wide: "h-[13rem] sm:h-[16rem] md:h-[19rem]",
} as const;

/**
 * A drawer of the cabinet: a numbered mount for one working specimen, the
 * interest it stands for, the fond that keeps it, and a label as in a museum.
 */
export async function Drawer({
  id,
  number,
  shape = "mid",
  className,
  delay = 0,
}: {
  id: SpecimenId;
  number: number;
  shape?: keyof typeof MOUNT;
  className?: string;
  delay?: number;
}) {
  const { lang, dict } = await getI18n();
  const s = getSpecimen(id);
  const fond = getFond(s.fond);
  const t = dict.cabinet;

  return (
    <figure
      data-reveal="rise"
      style={{ ["--d" as string]: `${delay}ms` } as React.CSSProperties}
      className={cn("group flex flex-col border border-line bg-void transition-colors duration-500 hover:border-line-strong", className)}
    >
      <div className="meta flex items-center justify-between gap-3 border-b border-line px-3 py-2 text-ash">
        <span className="truncate">
          <span className="text-paper">
            {t.specimen} {String(number).padStart(2, "0")}
          </span>
          <span className="text-dust"> · </span>
          {tr(s.interest, lang)}
        </span>
        <Link
          href={localizedPath(lang, fond.href)}
          aria-label={`${t.keptIn} ${fond.numeral}. ${tr(fond.title, lang)}`}
          className="inline-flex shrink-0 items-center gap-1 px-1 py-0.5 transition-colors hover:text-ember"
        >
          {fond.numeral}
          <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.25} />
        </Link>
      </div>

      <div className={cn("relative overflow-hidden", MOUNT[shape])}>
        <CropMarks inset="0.5rem" />
        <SpecimenView id={id} lang={lang} dict={dict} />
      </div>

      <figcaption className="mt-auto border-t border-line px-3 py-3 md:px-4">
        <p className="font-display text-xl leading-tight text-paper md:text-2xl">{tr(s.title, lang)}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ash">{tr(s.caption, lang)}</p>
        <p className="meta mt-2 text-ember">{tr(s.hint, lang)}</p>
      </figcaption>
    </figure>
  );
}

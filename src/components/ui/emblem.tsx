import type { EmblemId } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Line emblems — one per fond, like the shelf marks of a library.
 * Each is drawn with hairlines and has exactly one "seal" element that can be
 * lit in ember. Built with compass and straightedge: circles, arcs, lines.
 */

interface EmblemProps {
  id: EmblemId;
  className?: string;
  /**
   * Light the seal element in ember. Parents can also light it from CSS by
   * setting `--emblem-seal` (stroke) and `--emblem-seal-fill` (fill),
   * e.g. on hover.
   */
  lit?: boolean;
  /** Pass a title to make the emblem meaningful to assistive tech. */
  title?: string;
}

export function Emblem({ id, className, lit = false, title }: EmblemProps) {
  const seal =
    "[stroke:var(--emblem-seal,currentColor)] [fill:var(--emblem-seal-fill,none)] transition-[stroke] duration-500";

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      className={cn(
        "[&_*]:[vector-effect:non-scaling-stroke]",
        lit && "[--emblem-seal-fill:var(--color-ember)] [--emblem-seal:var(--color-ember)]",
        className,
      )}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {renderEmblem(id, seal)}
    </svg>
  );
}

function renderEmblem(id: EmblemId, seal: string) {
  switch (id) {
    // I — a lancet niche with a figure: the person behind the archive.
    case "portal":
      return (
        <>
          <path d="M9 29V16A14 14 0 0 1 16 3.88A14 14 0 0 1 23 16V29" />
          <path d="M5 29H27" />
          <circle cx="16" cy="19" r="2" className={seal} />
        </>
      );
    // II — square, inscribed circle, diagonal: construction, logic, proof.
    case "construction":
      return (
        <>
          <rect x="5" y="5" width="22" height="22" />
          <circle cx="16" cy="16" r="11" />
          <path d="M5 27L27 5" />
          <circle cx="16" cy="16" r="1.5" className={seal} />
        </>
      );
    // III — an exercise book: ruled lines and the red margin.
    case "ruled":
      return (
        <>
          <path d="M4 9H28M4 15H28M4 21H28M4 27H28" />
          <path d="M10 4V30" className={seal} />
        </>
      );
    // IV — a wireframe cube: modelling, worlds, the forge.
    case "cube":
      return (
        <>
          <path d="M16 4L27 10L16 16L5 10Z" />
          <path d="M5 10V22L16 28L27 22V10" />
          <path d="M16 16V28" />
          <circle cx="16" cy="16" r="1.5" className={seal} />
        </>
      );
    // V — a rose window: the Gothic library, the contemplative mind.
    case "rose":
      return (
        <>
          <circle cx="16" cy="16" r="12" />
          <path d="M16 4V11M16 21V28M4 16H11M21 16H28M7.5 7.5L12.5 12.5M19.5 19.5L24.5 24.5M24.5 7.5L19.5 12.5M12.5 19.5L7.5 24.5" />
          <circle cx="16" cy="16" r="4" className={seal} />
        </>
      );
    // VI — a branching stem: the digital garden.
    case "branch":
      return (
        <>
          <path d="M16 30V8" />
          <path d="M16 22C16 17 19 14 23 13" />
          <path d="M16 16C16 12 13 10 9 9" />
          <circle cx="23" cy="13" r="1.5" />
          <circle cx="9" cy="9" r="1.5" />
          <circle cx="16" cy="6" r="1.75" className={seal} />
        </>
      );
    // VII — a sealed letter: correspondence.
    case "letter":
      return (
        <>
          <rect x="4" y="8" width="24" height="16" />
          <path d="M4 8L16 18L28 8" />
          <circle cx="16" cy="18" r="2.25" className={seal} />
        </>
      );
  }
}

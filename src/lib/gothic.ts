/**
 * Gothic geometry, compass and straightedge.
 * Used by the entrance portal and quoted as a specimen in the Laboratory.
 */

export interface Arch {
  span: number;
  apexX: number;
  apexY: number;
}

/** Equilateral arch: radius = span, each arc centred on the opposite springer. */
export function equilateralArch(x1: number, x2: number, springline: number): Arch {
  const span = x2 - x1;
  const rise = Math.sqrt(span ** 2 - (span / 2) ** 2); // = span · √3 / 2
  return { span, apexX: (x1 + x2) / 2, apexY: round(springline - rise) };
}

/** The two arcs of a pointed arch, from the left springer over the apex. */
function arcs(x1: number, x2: number, springline: number): string {
  const { span: r, apexX, apexY } = equilateralArch(x1, x2, springline);
  return `A${r} ${r} 0 0 1 ${apexX} ${apexY}A${r} ${r} 0 0 1 ${x2} ${springline}`;
}

/** The outline of a lancet: two arcs meeting at the apex. */
export function lancetPath(x1: number, x2: number, springline: number): string {
  return `M${x1} ${springline}${arcs(x1, x2, springline)}`;
}

/** A lancet standing on two jambs that run down to the floor. */
export function archivoltPath(x1: number, x2: number, springline: number, floor: number): string {
  return `M${x1} ${floor}V${springline}${arcs(x1, x2, springline)}V${floor}`;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

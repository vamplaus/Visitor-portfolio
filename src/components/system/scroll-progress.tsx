"use client";

import { m, useScroll } from "motion/react";

/** Reading progress: an oxblood hairline under the status bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.span
      aria-hidden
      className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-ember"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

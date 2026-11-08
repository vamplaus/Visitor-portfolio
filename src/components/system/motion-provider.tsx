"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Motion is loaded lazily with the small DOM feature set, and follows the
 * visitor's "reduce motion" preference: transforms are dropped, opacity stays.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

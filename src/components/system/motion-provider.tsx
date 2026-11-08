"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useMotionPref } from "./motion-pref";

/**
 * Motion is loaded lazily with the small DOM feature set and follows the
 * archive's motion switch (which itself starts from the OS preference).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pref = useMotionPref();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={pref === "off" ? "always" : "never"} transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

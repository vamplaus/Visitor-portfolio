"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPref } from "@/components/system/motion-pref";

/**
 * A specimen is "live" while it is on screen and motion is on.
 * Off screen every loop sleeps; with motion off it stays still (but can still
 * be handled by the visitor).
 */
export function useLive<T extends Element>() {
  const ref = useRef<T>(null);
  const pref = useMotionPref();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      rootMargin: "120px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, live: inView && pref === "on", inView, motion: pref === "on" };
}

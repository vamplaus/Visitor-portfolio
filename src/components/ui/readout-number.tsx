"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPref } from "@/components/system/motion-pref";

/**
 * An instrument readout: when it scrolls into view, the digits spin like a
 * mechanical counter and settle on the real value. The server renders the
 * real value; assistive tech only ever reads that.
 */
export function ReadoutNumber({ value, pad = 2, className }: { value: number; pad?: number; className?: string }) {
  const final = String(value).padStart(pad, "0");
  const [shown, setShown] = useState(final);
  const ref = useRef<HTMLSpanElement>(null);
  const pref = useMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el || pref === "off") return;
    let frame = 0;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const spin = (now: number) => {
          const t = now - start;
          if (t > 900) return setShown(final);
          const n = Math.floor(Math.random() * 10 ** pad);
          setShown(String(n).padStart(pad, "0"));
          timer = window.setTimeout(() => (frame = requestAnimationFrame(spin)), 55);
        };
        frame = requestAnimationFrame(spin);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [final, pad, pref]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden className="tabular-nums">
        {shown}
      </span>
    </span>
  );
}

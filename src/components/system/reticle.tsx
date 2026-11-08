"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMotionPref } from "./motion-pref";

/**
 * The reticle: a registration mark that follows the pointer, like the cross
 * a printer aligns sheets by. It widens over anything that can be opened and
 * shows the element's `data-cursor` label ("Open", "Vol. II"…).
 * Fine pointers only, never on touch, never with motion off. The system
 * cursor stays visible: the reticle accompanies it, it does not replace it.
 */

const INTERACTIVE = "a, button, [role='radio'], [data-cursor], summary, label";

export function Reticle() {
  const pref = useMotionPref();
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enabled = fine && pref === "on";

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE);
      setActive(Boolean(target));
      setLabel(target?.getAttribute("data-cursor") ?? "");
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <m.div
        className="absolute -top-5 -left-5 size-10 rounded-full border border-paper"
        animate={{ scale: pressed ? 0.7 : active ? 1.65 : 1, opacity: active ? 1 : 0.55 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      />
      {/* Crosshair ticks */}
      <m.div
        className="absolute -top-5 -left-5 size-10"
        animate={{ rotate: active ? 45 : 0, scale: active ? 1.65 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <span className="absolute top-[-6px] left-1/2 h-2.5 w-px -translate-x-1/2 bg-paper" />
        <span className="absolute bottom-[-6px] left-1/2 h-2.5 w-px -translate-x-1/2 bg-paper" />
        <span className="absolute top-1/2 left-[-6px] h-px w-2.5 -translate-y-1/2 bg-paper" />
        <span className="absolute top-1/2 right-[-6px] h-px w-2.5 -translate-y-1/2 bg-paper" />
      </m.div>
      <m.span
        className="meta absolute top-9 left-9 whitespace-nowrap text-paper"
        animate={{ opacity: label ? 1 : 0, x: label ? 0 : -8 }}
        transition={{ duration: 0.25 }}
      >
        {label}
      </m.span>
    </m.div>
  );
}

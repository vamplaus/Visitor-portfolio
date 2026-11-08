"use client";

import { useEffect, useRef } from "react";
import { useMotionPref } from "@/components/system/motion-pref";
import { cn } from "@/lib/cn";

/**
 * The stage of the entrance. Writes a few CSS variables; CSS moves the scene.
 *   --px, --py   pointer position, -1…1 from the centre (smoothed): parallax
 *   --lx, --ly   pointer position inside the window, px: the lantern
 *   --sp         scroll progress through the first screen, 0…1: the passage
 * One rAF loop that sleeps when the scene is still. Nothing runs with motion off.
 */
export function HeroStage({
  children,
  className,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  labelledBy: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const pref = useMotionPref();

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    const props = ["--px", "--py", "--lx", "--ly", "--sp"];
    if (pref === "off") {
      props.forEach((p) => stage.style.removeProperty(p));
      delete stage.dataset.pointer;
      return;
    }

    const lantern = stage.querySelector<HTMLElement>("[data-lantern]");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let light: { x: number; y: number } | null = null;
    let lightNow: { x: number; y: number } | null = null;
    let frame = 0;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      stage.style.setProperty("--px", current.x.toFixed(4));
      stage.style.setProperty("--py", current.y.toFixed(4));
      let moving = Math.abs(target.x - current.x) > 0.0005 || Math.abs(target.y - current.y) > 0.0005;
      if (light && lightNow) {
        lightNow.x += (light.x - lightNow.x) * 0.16;
        lightNow.y += (light.y - lightNow.y) * 0.16;
        stage.style.setProperty("--lx", `${lightNow.x.toFixed(1)}px`);
        stage.style.setProperty("--ly", `${lightNow.y.toFixed(1)}px`);
        moving ||= Math.abs(light.x - lightNow.x) > 0.3 || Math.abs(light.y - lightNow.y) > 0.3;
      }
      if (moving) frame = requestAnimationFrame(tick);
      else running = false;
    };
    const wake = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = stage.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      target = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 };
      if (lantern) {
        const l = lantern.getBoundingClientRect();
        light = { x: e.clientX - l.left, y: e.clientY - l.top };
        lightNow ??= { ...light };
        stage.dataset.pointer = "on";
      }
      wake();
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      light = null;
      lightNow = null;
      stage.style.removeProperty("--lx");
      stage.style.removeProperty("--ly");
      delete stage.dataset.pointer;
      wake();
    };

    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, stage.offsetHeight)));
        stage.style.setProperty("--sp", p.toFixed(4));
      });
    };

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      stage.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pref]);

  return (
    <section ref={ref} aria-labelledby={labelledBy} className={cn("hero", className)}>
      {children}
    </section>
  );
}

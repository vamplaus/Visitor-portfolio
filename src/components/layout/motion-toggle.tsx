"use client";

import { setMotionPref, useMotionPref } from "@/components/system/motion-pref";
import { cn } from "@/lib/cn";

/**
 * "Motion: on / off". Pauses everything that moves on its own (WCAG 2.2.2)
 * and is remembered between visits. Starts from the OS "reduce motion" setting.
 */
export function MotionToggle({
  label,
  on,
  off,
  className,
}: {
  label: string;
  on: string;
  off: string;
  className?: string;
}) {
  const pref = useMotionPref();
  const enabled = pref === "on";
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => setMotionPref(enabled ? "off" : "on")}
      className={cn("group meta inline-flex items-center gap-2 py-2 text-ash transition-colors hover:text-paper", className)}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-block h-2.5 w-5 border transition-colors duration-300",
          enabled ? "border-ember" : "border-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 size-1.5 -translate-y-1/2 transition-[left,background-color] duration-300",
            enabled ? "left-[calc(100%-0.5rem)] bg-ember" : "left-0.5 bg-ash",
          )}
        />
      </span>
      {label}
      <span className="sr-only">: </span>
      <span className={enabled ? "text-paper" : undefined}>{enabled ? on : off}</span>
    </button>
  );
}

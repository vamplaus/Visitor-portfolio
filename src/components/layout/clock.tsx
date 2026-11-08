"use client";

import { useSyncExternalStore } from "react";

/** Local time in the status bar. Rendered on the client only: no hydration mismatch. */

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  const now = new Date();
  const two = (n: number) => String(n).padStart(2, "0");
  return `${two(now.getHours())}:${two(now.getMinutes())}:${two(now.getSeconds())}`;
}

function getServerSnapshot() {
  return null;
}

export function Clock({ className, suffix }: { className?: string; suffix: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={`${className ?? ""} tabular-nums`} aria-hidden>
      {time ?? "--:--:--"}
      <span className="ml-1.5 text-ash">{suffix}</span>
    </span>
  );
}

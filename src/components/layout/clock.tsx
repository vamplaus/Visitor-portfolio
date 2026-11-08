"use client";

import { useSyncExternalStore } from "react";

/** Local time in the status bar. Rendered on the client only: no hydration mismatch. */

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function getServerSnapshot() {
  return null;
}

export function Clock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={className} aria-hidden>
      {time ?? "--:--"}
      <span className="ml-1.5 text-ash">LOC</span>
    </span>
  );
}

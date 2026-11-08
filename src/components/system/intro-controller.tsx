"use client";

import { useEffect } from "react";
import { INTRO_DURATION } from "./intro";

/**
 * Ends the entrance sequence: after it has played, or as soon as the visitor
 * acts (a key, a click, a scroll, a touch). Interaction is never blocked —
 * the page is fully usable while the sequence runs.
 */
export function IntroController() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;

    const finish = () => {
      root.dataset.intro = "done";
      cleanup();
    };
    const events = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
    const timer = window.setTimeout(finish, INTRO_DURATION);
    events.forEach((e) => window.addEventListener(e, finish, { passive: true, once: true }));

    function cleanup() {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, finish));
    }
    return cleanup;
  }, []);

  return null;
}

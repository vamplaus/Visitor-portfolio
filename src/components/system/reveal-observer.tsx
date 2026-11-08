"use client";

import { useEffect } from "react";

/**
 * One observer for the whole archive. Elements marked `data-reveal` get
 * `data-shown` when they scroll into view; CSS does the choreography
 * (see "Reveals" in globals.css). New pages mounted by client navigation are
 * picked up by a MutationObserver. Without JavaScript, or with motion off,
 * nothing is ever hidden.
 *
 * The attribute is only written once React has hydrated the element: Next.js
 * hydrates page segments in separate passes, and an attribute added before
 * that would be reported as a server/client mismatch. Elements rendered on
 * the client (soft navigation) are ready at once.
 */

const MAX_WAIT = 40; // × 100 ms

function isHydrated(el: Element): boolean {
  return Object.keys(el).some((key) => key.startsWith("__reactFiber$"));
}

function show(el: Element, tries = 0) {
  if (isHydrated(el) || tries >= MAX_WAIT) {
    el.setAttribute("data-shown", "");
    return;
  }
  window.setTimeout(() => show(el, tries + 1), 100);
}
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          show(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    const watch = (root: ParentNode) => {
      if (root instanceof Element && root.matches("[data-reveal]:not([data-shown])")) io.observe(root);
      root.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    };

    watch(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((node) => node instanceof Element && watch(node));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

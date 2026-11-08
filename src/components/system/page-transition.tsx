import { ViewTransition } from "react";

/**
 * Wrap the content of every page. On navigation the old page fades out and
 * the new one settles in (see "Page transitions" in globals.css). Browsers
 * without the View Transitions API simply swap pages instantly.
 *
 * Must live in each page, not in a layout: layouts persist across navigations.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="leaf-in" exit="leaf-out" default="none">
      {children}
    </ViewTransition>
  );
}

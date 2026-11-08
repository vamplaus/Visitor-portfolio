"use client";

import { useSyncExternalStore } from "react";
import { MOTION_EVENT, MOTION_STORAGE_KEY } from "./boot";

/**
 * The visitor's motion preference, as written on <html data-motion> by the
 * boot script. Components subscribe to it; the switch in the status bar and
 * the index changes it.
 */
export type MotionPref = "on" | "off";

function read(): MotionPref {
  return document.documentElement.dataset.motion === "off" ? "off" : "on";
}

function subscribe(onChange: () => void) {
  window.addEventListener(MOTION_EVENT, onChange);
  return () => window.removeEventListener(MOTION_EVENT, onChange);
}

export function useMotionPref(): MotionPref {
  return useSyncExternalStore(subscribe, read, () => "on");
}

export function setMotionPref(value: MotionPref) {
  const root = document.documentElement;
  root.dataset.motion = value;
  if (value === "off" && root.dataset.intro === "play") root.dataset.intro = "done";
  try {
    localStorage.setItem(MOTION_STORAGE_KEY, value);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  window.dispatchEvent(new Event(MOTION_EVENT));
}

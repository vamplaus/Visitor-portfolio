"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLive } from "./use-live";

/**
 * The lantern bearer: a 12×16 pixel character with a four-frame walk cycle,
 * patrolling a Gothic hall with his lantern lighting the floor. Click the
 * scene, then ← → to walk and Space to jump. Beside it, the Godot scene tree
 * such a character would live in.
 */

const SCENE_W = 128;
const SCENE_H = 72;
const FLOOR = 60;

// Palette: h hood, f face, e eye, r robe, b belt, d boots, k lantern frame, l flame
const COLORS: Record<string, string> = {
  h: "#92949b",
  f: "#f0f0ea",
  e: "#08090b",
  r: "#4a4b52",
  b: "#7b1e2b",
  d: "#303137",
  k: "#f0f0ea",
  l: "#d0606b",
};

const BODY = [
  "....hhhh....",
  "...hhhhhh...",
  "..hhhhhhhh..",
  "..hhhffffh..",
  "..hhffefe...",
  "..hhhffff...",
  "...hhhhhh...",
  "..rrrrrrrr..",
  ".rrrrrrrrrr.",
  ".rrrrbbrr.kk",
  ".rrrrrrrr.ll",
  "..rrrrrrr.kk",
  "..rrrrrrr...",
  "..rrrrrrr...",
];

const LEGS = [
  ["..dd....dd..", ".dd......dd."],
  ["...dd..dd...", "....dd.dd..."],
  ["...dd...dd..", "..dd.....dd."],
  ["....dd.dd...", "....ddd....."],
];

/** One frame: the body (bobbing on the passing frames) and the legs. */
function frameRects(frame: number) {
  const bob = frame % 2 === 1 ? 1 : 0;
  const rows = [...BODY.map((r) => r), ...LEGS[frame]];
  const rects: { x: number; y: number; c: string }[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      const isBody = y < BODY.length;
      rects.push({ x, y: y + (isBody ? bob : 0) - 1, c: COLORS[ch] });
    });
  });
  return rects;
}

const FRAMES = [0, 1, 2, 3].map(frameRects);

// The hall: pointed arches in pixels, and floor tiles.
function archPixels(cx: number) {
  const px: [number, number][] = [];
  for (let y = 0; y < 30; y++) {
    const top = 18;
    const yy = top + y;
    // half-width of a lancet: grows quickly near the apex, then straight jambs
    const half = y < 12 ? Math.round(Math.sqrt(y * 4.5)) : 7;
    px.push([cx - half, yy], [cx + half, yy]);
  }
  return px;
}

const ARCHES = [14, 46, 78].flatMap(archPixels);
const TILES = Array.from({ length: SCENE_W / 8 }, (_, i) => i * 8);

export interface SceneTreeLabels {
  scene: string;
  controls: string;
}

export function SpriteScene({ label, labels }: { label: string; labels: SceneTreeLabels }) {
  const { ref, live, motion } = useLive<HTMLDivElement>();
  const [state, setState] = useState({ x: 24, y: FLOOR, dir: 1, frame: 0 });
  const sim = useRef({ x: 24, y: FLOOR, vy: 0, dir: 1, frame: 0, acc: 0, keys: new Set<string>(), manualUntil: 0 });
  const [focused, setFocused] = useState(false);
  const lightId = `lantern-light-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    if (!live && !focused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const s = sim.current;
      const dt = Math.min(40, now - last) / 1000;
      last = now;
      const manual = now < s.manualUntil;
      let move = 0;
      if (s.keys.has("ArrowLeft")) move -= 1;
      if (s.keys.has("ArrowRight")) move += 1;
      if (!manual && motion) {
        // Patrol: walk to the end of the hall, turn, walk back.
        move = s.dir;
        if (s.x > SCENE_W - 22) s.dir = -1;
        if (s.x < 10) s.dir = 1;
        move = s.dir;
      }
      if (move !== 0) s.dir = move > 0 ? 1 : -1;
      s.x = Math.max(2, Math.min(SCENE_W - 14, s.x + move * 26 * dt));
      // Jump
      s.vy += 260 * dt;
      s.y = Math.min(FLOOR, s.y + s.vy * dt);
      if (s.y >= FLOOR) s.vy = 0;
      // Walk cycle at 8 fps while moving
      s.acc += dt;
      if (move !== 0 && s.acc > 0.125) {
        s.frame = (s.frame + 1) % 4;
        s.acc = 0;
      }
      if (move === 0) s.frame = 0;
      setState({ x: s.x, y: s.y, dir: s.dir, frame: s.frame });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, focused, motion]);

  const onKey = (e: React.KeyboardEvent, down: boolean) => {
    const s = sim.current;
    if (!["ArrowLeft", "ArrowRight", " ", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    s.manualUntil = performance.now() + 4000;
    if (e.key === " " || e.key === "ArrowUp") {
      if (down && s.y >= FLOOR) s.vy = -95;
      return;
    }
    if (down) s.keys.add(e.key);
    else s.keys.delete(e.key);
  };

  const lanternX = state.x + (state.dir > 0 ? 11 : 1);
  const lanternY = state.y - 16 + 10;

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="group"
      aria-roledescription="game"
      aria-label={label}
      onKeyDown={(e) => onKey(e, true)}
      onKeyUp={(e) => onKey(e, false)}
      onPointerDown={(e) => {
        // On touch screens a tap is a jump.
        if (e.pointerType !== "touch") return;
        const s = sim.current;
        if (s.y >= FLOOR) s.vy = -95;
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        sim.current.keys.clear();
      }}
      data-cursor="▶"
      className="relative size-full overflow-hidden bg-void"
    >
      <svg
        viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
        aria-hidden
        shapeRendering="crispEdges"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id={lightId}>
            <stop offset="0" stopColor="#d0606b" stopOpacity="0.32" />
            <stop offset="0.5" stopColor="#7b1e2b" stopOpacity="0.12" />
            <stop offset="1" stopColor="#7b1e2b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hall */}
        {ARCHES.map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={1} height={1} fill="#303137" />
        ))}
        <rect x={0} y={FLOOR} width={SCENE_W} height={1} fill="#4a4b52" />
        {TILES.map((x) => (
          <rect key={x} x={x} y={FLOOR + 1} width={7} height={3} fill="#141519" />
        ))}

        {/* Light of the lantern */}
        <circle cx={lanternX} cy={lanternY} r={22} fill={`url(#${lightId})`} />
        <ellipse cx={lanternX} cy={FLOOR + 1} rx={14} ry={2} fill="#d0606b" opacity={0.18} />

        {/* The bearer */}
        <g transform={`translate(${state.dir > 0 ? state.x : state.x + 12} ${state.y - 16}) scale(${state.dir} 1)`}>
          {FRAMES[state.frame].map((p, i) => (
            <rect key={i} x={p.x} y={p.y} width={1} height={1} fill={p.c} />
          ))}
        </g>
      </svg>

      {/* Godot scene tree (one line on phones) */}
      <p aria-hidden className="pointer-events-none absolute top-2.5 right-3 font-mono text-[0.62rem] text-ash sm:hidden">
        <span className="bg-oxblood px-0.5 text-paper">Archivist</span> CharacterBody2D
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute top-2.5 right-3 hidden font-mono text-[0.62rem] leading-[1.55] text-ash sm:block md:text-[0.68rem]"
      >
        <p className="meta mb-1 text-paper">{labels.scene}</p>
        <p>▾ Archive <span className="text-dust">Node2D</span></p>
        <p className="pl-3 text-paper">
          ▾ <span className="bg-oxblood px-0.5">Archivist</span> <span className="text-ash">CharacterBody2D</span>
        </p>
        <p className="pl-7">Sprite2D</p>
        <p className="pl-7">CollisionShape2D</p>
        <p className="pl-7">
          Lantern <span className="text-dust">PointLight2D</span>
        </p>
        <p className="pl-3">TileMapLayer</p>
      </div>
      <p
        aria-hidden
        className={`meta pointer-events-none absolute bottom-2 left-3 transition-colors ${focused ? "text-ember" : "text-ash"}`}
      >
        {labels.controls}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { durerSolid, faceNormal, LIGHT, rotate, dot3, type V3 } from "@/lib/polyhedron";
import { useLive } from "./use-live";

/**
 * Dürer's solid in a modelling viewport: perspective grid, axis gizmo, mesh
 * statistics, vertex markers, hidden edges dashed, faces hatched by light.
 * Turns by itself while on screen; drag (or arrow keys) to orbit.
 */

const W = 400;
const H = 300;
const CX = W / 2;
const CY = H / 2 + 6;
const DIST = 4.4;
const FOCAL = 410;

/** Rounded to 1/10 px: server and browser trigonometry differ in the last digits. */
function project(v: V3): [number, number] {
  const k = FOCAL / (DIST - v[2]);
  return [Math.round((CX + v[0] * k) * 10) / 10, Math.round((CY - v[1] * k) * 10) / 10];
}

/**
 * Light on a dark plate: lit faces are paler than the ground, shaded faces
 * are hatched — sparser to denser, then cross-hatched, as on a copperplate.
 */
function shade(intensity: number): { tone: number; hatch: string | null } {
  if (intensity > 0.55) return { tone: 0.16, hatch: null };
  if (intensity > 0.2) return { tone: 0.08, hatch: "url(#hatch-1)" };
  if (intensity > -0.15) return { tone: 0.03, hatch: "url(#hatch-2)" };
  return { tone: 0, hatch: "url(#hatch-3)" };
}

function render(yaw: number, pitch: number) {
  const { vertices, faces, edges } = durerSolid;
  const world = vertices.map((v) => rotate(v, yaw, pitch));
  const screen = world.map(project);

  const faceInfo = faces.map((f) => {
    const pts = f.map((i) => world[i]);
    const n = faceNormal(pts);
    const depth = pts.reduce((s, p) => s + p[2], 0) / pts.length;
    return { f, visible: n[2] > 0, light: dot3(n, LIGHT), depth };
  });

  const visibleVertex = new Set<number>();
  faceInfo.forEach(({ f, visible }) => visible && f.forEach((i) => visibleVertex.add(i)));

  const edgeVisible = edges.map(([a, b]) =>
    faceInfo.some(({ f, visible }) => visible && f.includes(a) && f.includes(b)),
  );

  const path = (idx: number[]) => "M" + idx.map((i) => screen[i].map((n) => n.toFixed(1)).join(" ")).join("L") + "Z";

  return {
    faces: faceInfo
      .filter((x) => x.visible)
      .sort((a, b) => a.depth - b.depth)
      .map((x) => ({ d: path(x.f), ...shade(x.light) })),
    hidden: edges.filter((_, i) => !edgeVisible[i]).map(([a, b]) => `M${screen[a].join(" ")}L${screen[b].join(" ")}`),
    shown: edges.filter((_, i) => edgeVisible[i]).map(([a, b]) => `M${screen[a].join(" ")}L${screen[b].join(" ")}`),
    verts: [...visibleVertex].map((i) => ({ i, p: screen[i] })),
  };
}

/** Floor grid at the foot of the solid, in perspective. */
function grid(yaw: number, pitch: number) {
  const lines: string[] = [];
  const y = -1.05;
  for (let t = -2; t <= 2.001; t += 0.5) {
    for (const [a, b] of [
      [
        [t, y, -2],
        [t, y, 2],
      ],
      [
        [-2, y, t],
        [2, y, t],
      ],
    ] as [V3, V3][]) {
      const pa = project(rotate(a, yaw, pitch));
      const pb = project(rotate(b, yaw, pitch));
      lines.push(`M${pa[0].toFixed(1)} ${pa[1].toFixed(1)}L${pb[0].toFixed(1)} ${pb[1].toFixed(1)}`);
    }
  }
  return lines.join("");
}

function gizmo(yaw: number, pitch: number) {
  const axes: { label: string; v: V3; cls: string }[] = [
    { label: "X", v: [1, 0, 0], cls: "stroke-ember fill-ember" },
    { label: "Y", v: [0, 0, -1], cls: "stroke-paper fill-paper" },
    { label: "Z", v: [0, 1, 0], cls: "stroke-ash fill-ash" },
  ];
  return axes.map((a) => {
    const r = rotate(a.v, yaw, pitch);
    return { ...a, x: Math.round(r[0] * 260) / 10, y: Math.round(-r[1] * 260) / 10, front: r[2] >= 0 };
  });
}

const SELECTED = 0; // one vertex picked, as in an edit-mode viewport

export function Polyhedron({ label, stats }: { label: string; stats: { v: string; e: string; f: string } }) {
  const { ref, live } = useLive<HTMLDivElement>();
  const [view, setView] = useState({ yaw: 0.62, pitch: 0.36 });
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const idleUntil = useRef(0);

  useEffect(() => {
    if (!live) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      if (!drag.current && now > idleUntil.current) {
        setView((v) => ({ ...v, yaw: v.yaw + dt * 0.00032 }));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [live]);

  const scene = render(view.yaw, view.pitch);
  const axes = gizmo(view.yaw, view.pitch);

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ...view };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setView({
      yaw: d.yaw + (e.clientX - d.x) * 0.012,
      pitch: Math.max(-1.2, Math.min(1.2, d.pitch + (e.clientY - d.y) * 0.012)),
    });
  };
  const onUp = () => {
    drag.current = null;
    idleUntil.current = performance.now() + 2500;
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = 0.15;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    idleUntil.current = performance.now() + 2500;
    setView((v) => ({ yaw: v.yaw + m[0], pitch: Math.max(-1.2, Math.min(1.2, v.pitch + m[1])) }));
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="3D viewport"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      data-cursor="⟲"
      className="relative size-full cursor-grab touch-none select-none active:cursor-grabbing"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        {/* Floor grid */}
        <path d={grid(view.yaw, view.pitch)} className="stroke-line" strokeWidth={0.6} fill="none" opacity={0.7} />

        {/* Hidden edges, as a draughtsman draws them */}
        <path d={scene.hidden.join("")} className="stroke-dust" strokeWidth={0.8} strokeDasharray="3 4" fill="none" />

        {/* Faces: ground, then engraving */}
        {scene.faces.map((f, i) => (
          <g key={i}>
            <path d={f.d} className="fill-void" />
            {f.tone ? <path d={f.d} className="fill-paper" fillOpacity={f.tone} /> : null}
            {f.hatch ? <path d={f.d} fill={f.hatch} /> : null}
          </g>
        ))}
        <path d={scene.shown.join("")} className="stroke-paper" strokeWidth={1.1} strokeLinejoin="round" fill="none" />

        {/* Vertex markers; one selected */}
        {scene.verts.map(({ i, p }) => (
          <rect
            key={i}
            x={Math.round((p[0] - 2.2) * 10) / 10}
            y={Math.round((p[1] - 2.2) * 10) / 10}
            width={4.4}
            height={4.4}
            className={i === SELECTED ? "fill-ember" : "fill-paper"}
          />
        ))}

        {/* Axis gizmo */}
        <g transform="translate(46 246)">
          <circle r={36} className="fill-none stroke-line" strokeWidth={0.6} />
          {axes
            .sort((a, b) => Number(a.front) - Number(b.front))
            .map((a) => (
              <g key={a.label} className={a.cls} opacity={a.front ? 1 : 0.45}>
                <line x1={0} y1={0} x2={a.x} y2={a.y} strokeWidth={1.2} />
                <circle cx={a.x} cy={a.y} r={7} className="stroke-none" />
                <text
                  x={a.x}
                  y={a.y + 3}
                  textAnchor="middle"
                  className="fill-void stroke-none font-mono"
                  fontSize={8}
                  fontWeight={500}
                >
                  {a.label}
                </text>
              </g>
            ))}
        </g>
      </svg>

      {/* Viewport overlays */}
      <p aria-hidden className="meta pointer-events-none absolute top-3 left-3 text-ash">
        User Perspective
        <span className="block text-paper">(1) Dürer · 1514</span>
      </p>
      <p aria-hidden className="meta pointer-events-none absolute top-3 right-3 text-right text-ash tabular-nums">
        {stats.v} <span className="text-paper">12</span>
        <br />
        {stats.e} <span className="text-paper">18</span>
        <br />
        {stats.f} <span className="text-paper">8</span>
      </p>
    </div>
  );
}

"use client";

import { useId, useSyncExternalStore } from "react";
import { toRoman } from "@/lib/roman";
import { useLive } from "./use-live";

/**
 * An astrolabe: the fixed plate (mater) with its degree and hour scales, the
 * tympanum with its circles of altitude, the rete — the star map — turning
 * slowly, and the rule pointing at the visitor's own hour. Noon at the top,
 * midnight at the foot, hours in Roman numerals as on the old instruments.
 */

const CX = 200;
const CY = 225;

/** Round to 1/100: server and browser trigonometry differ in the last digits. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(CX + r * Math.cos(a)), r2(CY + r * Math.sin(a))] as const;
};

const ticks = Array.from({ length: 72 }, (_, i) => {
  const deg = i * 5;
  const long = deg % 15 === 0;
  const [x1, y1] = polar(182, deg);
  const [x2, y2] = polar(long ? 170 : 176, deg);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}).join("");

const hours = Array.from({ length: 24 }, (_, k) => ({ deg: k * 15, label: toRoman(((k + 11) % 12) + 1) }));

// Circles of altitude, seen in stereographic projection: a family of
// eccentric circles crowding towards the zenith.
const almucantars = Array.from({ length: 8 }, (_, i) => ({ cy: CY - 18 - i * 9, r: 124 - i * 15 }));

// The rete: ecliptic ring, tropic of Cancer, bars and star pointers.
const stars = [
  { r: 120, deg: 20 },
  { r: 74, deg: 64 },
  { r: 112, deg: 108 },
  { r: 132, deg: 150 },
  { r: 66, deg: 196 },
  { r: 118, deg: 236 },
  { r: 96, deg: 284 },
  { r: 128, deg: 322 },
];
const pointer = (r: number, deg: number) => {
  const [tx, ty] = polar(r, deg);
  const [ax, ay] = polar(r - 18, deg - 5);
  const [bx, by] = polar(r - 18, deg + 5);
  return `M${ax.toFixed(1)} ${ay.toFixed(1)}Q${tx.toFixed(1)} ${ty.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}Q${tx.toFixed(1)} ${ty.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}Z`;
};

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
}
const now = () => {
  const d = new Date();
  return d.getHours() + Math.round(d.getMinutes() / 5) / 12;
};

export function Astrolabe({ label }: { label: string }) {
  const { ref, live } = useLive<HTMLDivElement>();
  const hour = useSyncExternalStore(subscribe, now, () => null);
  const ruleDeg = hour === null ? 30 : (hour - 12) * 15;
  // Unique per instance: the same specimen may sit in a hidden page too.
  const plateId = `astro-plate-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div ref={ref} data-live={live ? "" : undefined} className="relative size-full">
      <svg viewBox="0 0 400 430" role="img" aria-label={label} className="absolute inset-0 size-full">
        <defs>
          <clipPath id={plateId}>
            <circle cx={CX} cy={CY} r={140} />
          </clipPath>
        </defs>

        {/* Throne and ring */}
        <path d={`M176 41Q200 20 224 41`} className="fill-none stroke-line-strong" strokeWidth={1} />
        <circle cx={CX} cy={20} r={11} className="fill-none stroke-line-strong" strokeWidth={1} />

        {/* Mater: rim, degrees, hours, engraved band */}
        <circle cx={CX} cy={CY} r={190} className="fill-none stroke-line-strong" strokeWidth={1.2} />
        <circle cx={CX} cy={CY} r={182} className="fill-none stroke-line" strokeWidth={0.8} />
        <path d={ticks} className="stroke-ash" strokeWidth={0.7} />
        {hours.map((h) => {
          const [x, y] = polar(158, h.deg);
          return (
            <text
              key={h.deg}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              // Read from outside the rim; the lower half is turned so it never stands on its head.
              transform={`rotate(${h.deg > 90 && h.deg < 270 ? h.deg + 180 : h.deg} ${x} ${y})`}
              className={h.deg === 0 || h.deg === 180 ? "fill-paper font-display" : "fill-ash font-display"}
              fontSize={11}
            >
              {h.label}
            </text>
          );
        })}
        <path
          d={`M${CX} ${CY - 148}a148 148 0 1 0 0.01 0ZM${CX} ${CY - 140}a140 140 0 1 1 -0.01 0Z`}
          fill="url(#hatch-2)"
          fillRule="evenodd"
        />
        <circle cx={CX} cy={CY} r={148} className="fill-none stroke-line" strokeWidth={0.8} />

        {/* Tympanum: tropics, horizon, circles of altitude */}
        <g clipPath={`url(#${plateId})`} className="fill-none">
          <circle cx={CX} cy={CY} r={140} className="stroke-line-strong" strokeWidth={0.8} />
          <circle cx={CX} cy={CY} r={88} className="stroke-line" strokeWidth={0.6} strokeDasharray="2 4" />
          <circle cx={CX} cy={CY} r={52} className="stroke-line" strokeWidth={0.6} />
          {almucantars.map((a, i) => (
            <circle key={i} cx={CX} cy={a.cy} r={a.r} className="stroke-line" strokeWidth={0.55} />
          ))}
          <path d={`M${CX} ${CY - 140}V${CY + 140}M${CX - 140} ${CY}H${CX + 140}`} className="stroke-line" strokeWidth={0.6} />
        </g>

        {/* Rete: the star map, turning */}
        <g className="astro-rete">
          <circle cx={CX} cy={CY - 36} r={104} className="fill-none stroke-paper" strokeWidth={1} opacity={0.7} />
          <circle cx={CX} cy={CY - 36} r={96} className="fill-none stroke-paper" strokeWidth={0.6} opacity={0.5} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            const x1 = r2(CX + 96 * Math.cos(a));
            const y1 = r2(CY - 36 + 96 * Math.sin(a));
            const x2 = r2(CX + 104 * Math.cos(a));
            const y2 = r2(CY - 36 + 104 * Math.sin(a));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-paper" strokeWidth={0.8} opacity={0.7} />;
          })}
          <circle cx={CX} cy={CY} r={52} className="fill-none stroke-paper" strokeWidth={0.9} opacity={0.6} />
          {[0, 90, 180, 270].map((deg) => {
            const [x1, y1] = polar(52, deg);
            const [x2, y2] = polar(140, deg);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-paper" strokeWidth={0.9} opacity={0.6} />;
          })}
          {stars.map((s, i) => {
            const [x, y] = polar(s.r, s.deg);
            return (
              <g key={i}>
                <path d={pointer(s.r, s.deg)} className={i === 2 ? "fill-ember" : "fill-paper"} opacity={i === 2 ? 1 : 0.75} />
                <circle cx={x} cy={y} r={1.6} className={i === 2 ? "fill-ember" : "fill-paper"} />
              </g>
            );
          })}
        </g>

        {/* Rule, set to the visitor's hour */}
        <g transform={`rotate(${ruleDeg} ${CX} ${CY})`} className="transition-transform duration-1000">
          <path d={`M${CX - 3} ${CY}L${CX} ${CY - 176}L${CX + 3} ${CY}L${CX} ${CY + 176}Z`} className="fill-void stroke-paper" strokeWidth={0.9} />
          <path d={`M${CX} ${CY - 176}l-4 14h8Z`} className="fill-ember" />
          <line x1={CX} y1={CY - 150} x2={CX} y2={CY + 150} className="stroke-ash" strokeWidth={0.4} />
        </g>

        {/* Pin */}
        <circle cx={CX} cy={CY} r={7} className="fill-void stroke-paper" strokeWidth={1} />
        <circle cx={CX} cy={CY} r={2.4} className="fill-oxblood" />
      </svg>
    </div>
  );
}

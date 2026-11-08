"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { archivoltPath } from "@/lib/gothic";
import { useLive } from "./use-live";

/**
 * A perceptron drawn as Gothic tracery. Layers rise from the inputs at the sill
 * to a single output in the rose at the apex. Edge weight → line weight
 * (negative weights dashed). Waves of activation climb the window; pointing at
 * a node fires it and lights everything it feeds.
 */

const LAYERS = [4, 6, 5, 3, 1];
const ROWS = [352, 288, 224, 164, 96];
const SPREAD = [76, 92, 80, 46, 0];
const CX = 150;

interface Node {
  id: number;
  layer: number;
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
  w: number;
  d: string;
}

/**
 * Deterministic pseudo-random weight in [-1, 1]. Integer hashing, so the
 * server and every browser compute exactly the same network.
 */
const weight = (a: number, b: number) => {
  let h = Math.imul(a + 1, 73856093) ^ Math.imul(b + 1, 19349663);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h ^= h >>> 13;
  return ((h >>> 0) % 2001) / 1000 - 1;
};

function buildNet() {
  const nodes: Node[] = [];
  LAYERS.forEach((count, layer) => {
    for (let i = 0; i < count; i++) {
      const x = count === 1 ? CX : Math.round((CX - SPREAD[layer] + (2 * SPREAD[layer] * i) / (count - 1)) * 100) / 100;
      nodes.push({ id: nodes.length, layer, x, y: ROWS[layer] });
    }
  });
  const edges: Edge[] = [];
  for (const a of nodes) {
    for (const b of nodes) {
      if (b.layer !== a.layer + 1) continue;
      const w = weight(a.id, b.id);
      if (Math.abs(w) < 0.22) continue; // pruned
      // A slight curve, like a tracery bar
      const mx = Math.round(((a.x + b.x) / 2 + (a.x - b.x) * 0.12) * 100) / 100;
      const my = (a.y + b.y) / 2;
      edges.push({ from: a.id, to: b.id, w, d: `M${a.x} ${a.y}Q${mx} ${my} ${b.x} ${b.y}` });
    }
  }
  return { nodes, edges };
}

const NET = buildNet();

const ROSE = { x: CX, y: ROWS[4], r: 30 };
const roseSpokes = Array.from({ length: 12 }, (_, i) => {
  const t = (i * Math.PI) / 6;
  const p = (r: number) => `${(ROSE.x + r * Math.sin(t)).toFixed(1)} ${(ROSE.y - r * Math.cos(t)).toFixed(1)}`;
  return `M${p(11)}L${p(ROSE.r)}`;
}).join("");

export function NeuralTracery({ label }: { label: string }) {
  const { ref, live } = useLive<HTMLDivElement>();
  const svg = useRef<SVGSVGElement>(null);
  const { nodes, edges } = NET;
  const [fired, setFired] = useState<number | null>(null);
  const pointerAt = useRef(0);

  // Without a hand on it, the window fires its inputs in turn.
  useEffect(() => {
    if (!live) return;
    let n = 0;
    const id = window.setInterval(() => {
      if (performance.now() - pointerAt.current < 2500) return;
      setFired(n % LAYERS[0]);
      n++;
    }, 1700);
    return () => window.clearInterval(id);
  }, [live]);

  // What a fired node reaches: its positive targets, and theirs.
  const lit = useMemo(() => {
    const edgeSet = new Set<number>();
    const hot = new Set<number>();
    if (fired === null) return { edgeSet, hot };
    let frontier = new Set([fired]);
    hot.add(fired);
    for (let hop = 0; hop < LAYERS.length; hop++) {
      const next = new Set<number>();
      edges.forEach((e, i) => {
        if (frontier.has(e.from) && e.w > 0) {
          edgeSet.add(i);
          next.add(e.to);
          hot.add(e.to);
        }
      });
      frontier = next;
    }
    return { edgeSet, hot };
  }, [fired, edges]);

  const onMove = (e: React.PointerEvent) => {
    const el = svg.current;
    if (!el) return;
    const pt = el.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(el.getScreenCTM()?.inverse());
    let best: Node | null = null;
    let bestD = 22;
    for (const n of nodes) {
      const d = Math.hypot(n.x - p.x, n.y - p.y);
      if (d < bestD) {
        best = n;
        bestD = d;
      }
    }
    pointerAt.current = e.timeStamp;
    if (best && best.id !== fired) setFired(best.id);
  };

  return (
    <div ref={ref} data-live={live ? "" : undefined} className="relative size-full" onPointerMove={onMove}>
      <svg ref={svg} viewBox="0 0 300 400" role="img" aria-label={label} className="absolute inset-0 size-full">
        {/* The window */}
        <path d={archivoltPath(18, 282, 176, 396)} className="fill-none stroke-line-strong" strokeWidth={1} />
        <path d={archivoltPath(32, 268, 176, 396)} className="fill-none stroke-line" strokeWidth={0.8} />
        <path d="M18 396H282" className="stroke-line-strong" strokeWidth={1} />

        {/* The rose that holds the output */}
        <circle cx={ROSE.x} cy={ROSE.y} r={ROSE.r + 8} fill="url(#hatch-1)" className="stroke-line" strokeWidth={0.8} />
        <circle cx={ROSE.x} cy={ROSE.y} r={ROSE.r} className="fill-void stroke-line-strong" strokeWidth={0.8} />
        <path d={roseSpokes} className="nn-rose stroke-line" strokeWidth={0.7} />

        {/* Weights */}
        {edges.map((e, i) => (
          <path
            key={i}
            d={e.d}
            fill="none"
            strokeWidth={Math.round((0.35 + Math.abs(e.w) * 1.1) * 100) / 100}
            strokeDasharray={e.w < 0 ? "2 3" : undefined}
            className={
              lit.edgeSet.has(i)
                ? "stroke-ember transition-[stroke,opacity] duration-300"
                : e.w > 0
                  ? "stroke-paper opacity-30 transition-[stroke,opacity] duration-700"
                  : "stroke-ash opacity-35 transition-[stroke,opacity] duration-700"
            }
          />
        ))}

        {/* Activation travelling along the strong positive weights */}
        {edges.map((e, i) =>
          e.w > 0.5 ? (
            <path
              key={`p${i}`}
              d={e.d}
              pathLength={1}
              fill="none"
              className="nn-pulse stroke-ember"
              strokeWidth={1.8}
              strokeLinecap="round"
              style={{ ["--d" as string]: `${nodes[e.from].layer * 0.55 + (i % 4) * 0.12}s` } as React.CSSProperties}
            />
          ) : null,
        )}

        {/* Neurons */}
        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.layer === LAYERS.length - 1 ? 7 : 5.5}
            strokeWidth={1}
            style={{ ["--d" as string]: `${n.layer * 0.55}s` } as React.CSSProperties}
            className={
              lit.hot.has(n.id)
                ? "fill-ember stroke-ember transition-colors duration-300"
                : "nn-node fill-void stroke-paper transition-colors duration-700"
            }
          />
        ))}
      </svg>
    </div>
  );
}

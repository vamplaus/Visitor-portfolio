import { cn } from "@/lib/cn";
import { archivoltPath, lancetPath } from "@/lib/gothic";

/**
 * A Gothic window, drawn the way it was designed: with compass and straightedge.
 *
 * Three equilateral archivolts (each arc's radius equals the span, its centre
 * on the opposite springer), two lancets beneath them and an oculus — a rose —
 * in the spandrel. Faint construction lines show the geometry underneath.
 * Gothic tracery is the archive's thesis in stone: logic in the service of
 * imagination.
 *
 * Layers carry a depth (`--depth`) for pointer parallax, the rose turns, a
 * candle burns behind it. `lit` draws the same window in light — the copy the
 * lantern reveals (see "Entrance stage" in globals.css). Every path is inked
 * in on the entrance sequence and is simply present when it does not play.
 */

// Geometry (viewBox 0 0 400 640). Springline y = 330, floor y = 640.
const S = 330;
const FLOOR = 640;

// Oculus: centre and radius chosen to sit clear of the inner archivolt and the lancets.
const OC = { x: 200, y: 222, r: 66, inner: 22 };
const spokes = Array.from({ length: 12 }, (_, i) => {
  const t = (i * Math.PI) / 6;
  const p = (r: number) => `${(OC.x + r * Math.sin(t)).toFixed(2)} ${(OC.y - r * Math.cos(t)).toFixed(2)}`;
  return `M${p(OC.inner)}L${p(OC.r)}`;
}).join("");

const delay = (ms: number) => ({ ["--intro-delay" as string]: `${ms}ms` }) as React.CSSProperties;
const depth = (d: number) => ({ ["--depth" as string]: d }) as React.CSSProperties;

export function ArchPortal({ className, lit = false }: { className?: string; lit?: boolean }) {
  const stroke = (base: string) => (lit ? "stroke-paper" : base);

  return (
    <svg
      viewBox="0 0 400 640"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      className={cn("pointer-events-none overflow-visible", className)}
    >
      {!lit && (
        <defs>
          <radialGradient id="portal-candle">
            <stop offset="0" stopColor="#7b1e2b" stopOpacity="0.85" />
            <stop offset="0.4" stopColor="#7b1e2b" stopOpacity="0.28" />
            <stop offset="1" stopColor="#7b1e2b" stopOpacity="0" />
          </radialGradient>
        </defs>
      )}

      {/* Construction: axis, springline, compass centres */}
      {!lit && (
        <g data-depth style={depth(3)}>
          <g className="intro-fade stroke-dust" style={delay(0)} strokeWidth={0.6}>
            <path d="M200 -200V640" strokeDasharray="2 6" />
            <path d={`M-400 ${S}H800`} strokeDasharray="2 6" />
            <path d="M-400 400H800" strokeDasharray="1 9" opacity={0.6} />
            {[20, 380, 50, 350].map((x) => (
              <path key={x} d={`M${x - 5} ${S}H${x + 5}M${x} ${S - 5}V${S + 5}`} />
            ))}
          </g>
        </g>
      )}

      {/* Archivolts, outer to inner: each one a step deeper */}
      <g className={stroke("stroke-line-strong")} strokeWidth={lit ? 1 : 0.8}>
        <g data-depth style={depth(6)}>
          <path d={archivoltPath(20, 380, S, FLOOR)} pathLength={1} className="intro-draw" style={delay(0)} />
        </g>
        <g data-depth style={depth(11)}>
          <path d={archivoltPath(50, 350, S, FLOOR)} pathLength={1} className="intro-draw" style={delay(180)} />
        </g>
        <g data-depth style={depth(16)}>
          <path d={archivoltPath(80, 320, S, FLOOR)} pathLength={1} className="intro-draw" style={delay(360)} />
        </g>
      </g>

      {/* Tracery: lancets and mullion — the panes engraved with hatching */}
      <g data-depth style={depth(21)} className={stroke("stroke-line")} strokeWidth={lit ? 1 : 0.8}>
        {!lit && (
          <g className="intro-fade stroke-none" style={delay(1200)} opacity={0.55}>
            <path d={`${lancetPath(80, 200, 400)}V${FLOOR}H80Z`} fill="url(#hatch-1)" />
            <path d={`${lancetPath(200, 320, 400)}V${FLOOR}H200Z`} fill="url(#hatch-1)" />
          </g>
        )}
        <path d={lancetPath(80, 200, 400)} pathLength={1} className="intro-draw" style={delay(700)} />
        <path d={lancetPath(200, 320, 400)} pathLength={1} className="intro-draw" style={delay(780)} />
        <path d="M200 400V640" pathLength={1} className="intro-draw" style={delay(860)} />
      </g>

      {/* The rose: a candle behind it, the wheel turning slowly */}
      <g data-depth style={depth(26)}>
        {!lit && (
          <g className="intro-fade" style={delay(1700)}>
            <circle className="portal-candle" cx={OC.x} cy={OC.y} r={60} fill="url(#portal-candle)" />
          </g>
        )}
        <g className={stroke("stroke-line")} strokeWidth={lit ? 1 : 0.8}>
          <circle cx={OC.x} cy={OC.y} r={OC.r} pathLength={1} className="intro-draw" style={delay(900)} />
          <g className="portal-rose">
            <circle cx={OC.x} cy={OC.y} r={OC.inner} pathLength={1} className="intro-draw" style={delay(1100)} />
            <path d={spokes} className="intro-fade" style={delay(1500)} />
          </g>
        </g>
        {!lit && <circle cx={OC.x} cy={OC.y} r={3.2} className="intro-fade fill-oxblood" style={delay(2000)} />}
      </g>
    </svg>
  );
}

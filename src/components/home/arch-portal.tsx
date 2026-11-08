import { cn } from "@/lib/cn";

/**
 * A Gothic window, drawn the way it was designed: with compass and straightedge.
 *
 * Three equilateral archivolts (each arc's radius equals the span, its centre
 * on the opposite springer), two lancets beneath them and an oculus — a rose —
 * in the spandrel. Faint construction lines show the geometry underneath.
 * Gothic tracery is the archive's thesis in stone: logic in the service of
 * imagination.
 *
 * Every path is drawn in on the entrance sequence (`.intro-draw`), and is
 * simply present when the sequence does not play.
 */

// Geometry (viewBox 0 0 400 640). Springline y = 330.
const S = 330;
const arch = (x1: number, x2: number, springline: number) => {
  const span = x2 - x1;
  const apexX = (x1 + x2) / 2;
  const apexY = springline - Math.sqrt(span * span - (span / 2) * (span / 2));
  return { span, apexX, apexY: Math.round(apexY * 100) / 100 };
};

const a1 = arch(20, 380, S);
const a2 = arch(50, 350, S);
const a3 = arch(80, 320, S);
const lancetL = arch(80, 200, 400);
const lancetR = arch(200, 320, 400);

const archivolt = (x1: number, x2: number, a: ReturnType<typeof arch>, springline: number, foot = 640) =>
  `M${x1} ${foot}V${springline}A${a.span} ${a.span} 0 0 1 ${a.apexX} ${a.apexY}A${a.span} ${a.span} 0 0 1 ${x2} ${springline}V${foot}`;

const lancet = (x1: number, x2: number, a: ReturnType<typeof arch>, springline: number) =>
  `M${x1} ${springline}A${a.span} ${a.span} 0 0 1 ${a.apexX} ${a.apexY}A${a.span} ${a.span} 0 0 1 ${x2} ${springline}`;

// Oculus: centre and radius chosen to sit clear of the inner archivolt and the lancets.
const OC = { x: 200, y: 222, r: 66, inner: 22 };
const spokes = Array.from({ length: 12 }, (_, i) => {
  const t = (i * Math.PI) / 6;
  const r1 = OC.inner;
  const r2 = OC.r;
  const p = (r: number) => `${(OC.x + r * Math.sin(t)).toFixed(2)} ${(OC.y - r * Math.cos(t)).toFixed(2)}`;
  return `M${p(r1)}L${p(r2)}`;
}).join("");

const delay = (ms: number) => ({ ["--intro-delay" as string]: `${ms}ms` }) as React.CSSProperties;

export function ArchPortal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 640"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      {/* Construction: axis, springline, compass centres */}
      <g className="intro-fade stroke-dust" style={delay(0)} strokeWidth={0.6}>
        <path d="M200 0V640" strokeDasharray="2 6" />
        <path d={`M-200 ${S}H600`} strokeDasharray="2 6" />
        <path d="M-200 400H600" strokeDasharray="1 9" opacity={0.6} />
        {[20, 380, 50, 350].map((x) => (
          <path key={x} d={`M${x - 5} ${S}H${x + 5}M${x} ${S - 5}V${S + 5}`} />
        ))}
      </g>

      {/* Archivolts */}
      <g className="stroke-line-strong" strokeWidth={0.8}>
        <path d={archivolt(20, 380, a1, S)} pathLength={1} className="intro-draw" style={delay(0)} />
        <path d={archivolt(50, 350, a2, S)} pathLength={1} className="intro-draw" style={delay(180)} />
        <path d={archivolt(80, 320, a3, S)} pathLength={1} className="intro-draw" style={delay(360)} />
      </g>

      {/* Tracery: lancets, mullion, oculus */}
      <g className="stroke-line" strokeWidth={0.8}>
        <path d={lancet(80, 200, lancetL, 400)} pathLength={1} className="intro-draw" style={delay(700)} />
        <path d={lancet(200, 320, lancetR, 400)} pathLength={1} className="intro-draw" style={delay(780)} />
        <path d="M200 400V640" pathLength={1} className="intro-draw" style={delay(860)} />
        <circle cx={OC.x} cy={OC.y} r={OC.r} pathLength={1} className="intro-draw" style={delay(900)} />
        <circle cx={OC.x} cy={OC.y} r={OC.inner} pathLength={1} className="intro-draw" style={delay(1100)} />
        <path d={spokes} className="intro-fade" style={delay(1500)} />
      </g>

      {/* The seal at the heart of the rose */}
      <circle cx={OC.x} cy={OC.y} r={3.2} className="intro-fade fill-oxblood" style={delay(2000)} />
    </svg>
  );
}

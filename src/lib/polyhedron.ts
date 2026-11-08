/**
 * Dürer's solid — the polyhedron of Melencolia I (1514).
 * A cube stretched along its body diagonal (a rhombohedron), with the two
 * corners on that diagonal cut off: 6 pentagons, 2 triangles,
 * 12 vertices, 18 edges. Built here as a mesh, axis upright.
 */

export type V3 = readonly [number, number, number];

const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => mul(a, 1 / Math.hypot(...a));

const AXIS = norm([1, 1, 1]);
const STRETCH = 1.5; // rhombohedron: the cube drawn out along its diagonal
const CUT = 1.9; // height of the two truncating planes

const stretch = (v: V3): V3 => add(v, mul(AXIS, (STRETCH - 1) * dot(v, AXIS)));
const isPole = (v: V3) => Math.abs(Math.abs(v[0] + v[1] + v[2]) - 3) < 1e-9;

/** Point where the edge pole→neighbour crosses the truncating plane. */
function cut(pole: V3, neighbour: V3): V3 {
  const a = stretch(pole);
  const b = stretch(neighbour);
  const pa = dot(a, AXIS);
  const pb = dot(b, AXIS);
  const t = (pa - Math.sign(pa) * CUT) / (pa - pb);
  return add(a, mul(sub(b, a), t));
}

/** Rodrigues rotation taking the solid's axis to +Y (upright). */
function upright(v: V3): V3 {
  const y: V3 = [0, 1, 0];
  const k = norm(cross(AXIS, y));
  const theta = Math.acos(dot(AXIS, y));
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return add(add(mul(v, c), mul(cross(k, v), s)), mul(k, dot(k, v) * (1 - c)));
}

export interface Mesh {
  vertices: V3[];
  faces: number[][];
  edges: [number, number][];
}

function build(): Mesh {
  const vertices: V3[] = [];
  const index = (v: V3) => {
    const key = v.map((n) => n.toFixed(5)).join(",");
    const found = vertices.findIndex((w) => w.map((n) => n.toFixed(5)).join(",") === key);
    if (found >= 0) return found;
    vertices.push(v);
    return vertices.length - 1;
  };

  const faces: number[][] = [];
  // The six cube faces become pentagons: each loses the corner on the axis.
  for (let k = 0; k < 3; k++) {
    for (const sign of [1, -1]) {
      const [a, b] = [0, 1, 2].filter((i) => i !== k) as [number, number];
      const cycle = [
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
      ].map(([pa, pb]) => {
        const v = [0, 0, 0] as [number, number, number];
        v[k] = sign;
        v[a] = pa;
        v[b] = pb;
        return v as V3;
      });
      const face: number[] = [];
      cycle.forEach((v, i) => {
        if (isPole(v)) {
          face.push(index(cut(v, cycle[(i + 3) % 4])));
          face.push(index(cut(v, cycle[(i + 1) % 4])));
        } else {
          face.push(index(stretch(v)));
        }
      });
      faces.push(face);
    }
  }
  // The two triangles left by the cuts.
  for (const pole of [
    [1, 1, 1],
    [-1, -1, -1],
  ] as V3[]) {
    const neighbours = [0, 1, 2].map((i) => {
      const v = [...pole] as [number, number, number];
      v[i] = -v[i];
      return v as V3;
    });
    faces.push(neighbours.map((n) => index(cut(pole, n))));
  }

  // Upright, centred, unit radius; faces wound outward.
  let placed = vertices.map(upright);
  const radius = Math.max(...placed.map((v) => Math.hypot(...v)));
  placed = placed.map((v) => mul(v, 1 / radius));
  const outward = faces.map((f) => {
    const [p0, p1, p2] = f.map((i) => placed[i]);
    const centre = mul(f.map((i) => placed[i]).reduce(add, [0, 0, 0]), 1 / f.length);
    return dot(cross(sub(p1, p0), sub(p2, p0)), centre) >= 0 ? f : [...f].reverse();
  });

  const edgeSet = new Map<string, [number, number]>();
  for (const f of outward) {
    f.forEach((a, i) => {
      const b = f[(i + 1) % f.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      edgeSet.set(key, a < b ? [a, b] : [b, a]);
    });
  }

  return { vertices: placed, faces: outward, edges: [...edgeSet.values()] };
}

export const durerSolid: Mesh = build();

/* ---------------------------------------------------------------------------
 * Viewing: orbit (yaw, pitch), perspective, back faces, hatch by light.
 * ------------------------------------------------------------------------- */

export function rotate(v: V3, yaw: number, pitch: number): V3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = v[0] * cy + v[2] * sy;
  const z1 = -v[0] * sy + v[2] * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return [x1, v[1] * cp - z1 * sp, v[1] * sp + z1 * cp];
}

export const LIGHT = norm([-0.55, 0.7, 0.6]);

export function faceNormal(points: V3[]): V3 {
  return norm(cross(sub(points[1], points[0]), sub(points[2], points[0])));
}

export { dot as dot3, norm as norm3 };

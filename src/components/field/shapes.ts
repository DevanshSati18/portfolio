import { waypoints } from "@/data/profile";

export type ShapeName = "core" | "field" | "lattice" | "globe";

export type Shape = {
  positions: Float32Array;
  flags: Float32Array; // 0 = primary colour, 1 = signal/amber colour
};

// Deterministic PRNG so every shape is identical across reloads.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** HOME — a dense noisy core wrapped by a tilted orbital ring. */
function core(n: number): Shape {
  const r = rng(11);
  const pos = new Float32Array(n * 3);
  const flags = new Float32Array(n);
  const shell = Math.floor(n * 0.68);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < shell; i++) {
    const y = 1 - (i / (shell - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * rad;
    const z = Math.sin(th) * rad;
    const bump =
      0.16 * Math.sin(x * 4.0 + y * 3.0) * Math.cos(z * 3.5) + 0.08 * Math.sin(y * 9.0 + x * 5.0);
    const R = 1.75 + bump + (r() - 0.5) * 0.05;
    pos.set([x * R, y * R, z * R], i * 3);
    flags[i] = r() < 0.035 ? 1 : 0;
  }
  const tilt = 0.42;
  for (let i = shell; i < n; i++) {
    const a = r() * Math.PI * 2;
    const band = r();
    const R = 2.5 + band * band * 1.3 + (r() - 0.5) * 0.06;
    let x = Math.cos(a) * R;
    let y = (r() - 0.5) * 0.04;
    let z = Math.sin(a) * R;
    // tilt ring around X then Z
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
    const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
    y = y2;
    z = z2;
    const x3 = x * Math.cos(0.25) - y * Math.sin(0.25);
    const y3 = x * Math.sin(0.25) + y * Math.cos(0.25);
    x = x3;
    y = y3;
    pos.set([x, y, z], i * 3);
    flags[i] = band > 0.92 ? 1 : 0;
  }
  return { positions: pos, flags };
}

/** RESEARCH — an input "image" plane; a sparse set of pixels carries an adversarial perturbation. */
function field(n: number): Shape {
  const r = rng(23);
  const pos = new Float32Array(n * 3);
  const flags = new Float32Array(n);
  const cols = Math.ceil(Math.sqrt(n * 1.6));
  const rows = Math.ceil(n / cols);
  const W = 11;
  const D = 7;
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const rr = Math.floor(i / cols);
    const x = (c / (cols - 1) - 0.5) * W;
    const z = (rr / (rows - 1) - 0.5) * D;
    const base = 0.22 * Math.sin(x * 0.8) * Math.cos(z * 0.9);
    const adv = r() < 0.075;
    const y = base + (adv ? (r() < 0.5 ? -1 : 1) * (0.18 + r() * 0.22) : 0);
    pos.set([x + (r() - 0.5) * 0.02, y, z + (r() - 0.5) * 0.02], i * 3);
    flags[i] = adv ? 1 : 0;
  }
  return { positions: pos, flags };
}

/** DEVELOPMENT — stacked layers like a network / system architecture. */
function lattice(n: number): Shape {
  const r = rng(37);
  const pos = new Float32Array(n * 3);
  const flags = new Float32Array(n);
  const layers = [3.4, 2.6, 1.8, 2.6, 3.4];
  const gap = 1.05;
  const perLayer = Math.floor((n * 0.86) / layers.length);
  let i = 0;
  layers.forEach((size, li) => {
    const side = Math.ceil(Math.sqrt(perLayer));
    for (let k = 0; k < perLayer && i < n; k++, i++) {
      const gx = (k % side) / (side - 1) - 0.5;
      const gy = Math.floor(k / side) / (side - 1) - 0.5;
      const x = gx * size;
      const y = gy * size;
      const z = (li - (layers.length - 1) / 2) * gap;
      pos.set([x, y, z + (r() - 0.5) * 0.02], i * 3);
      // light up a few "active nodes" on a sparse grid
      flags[i] = (k % 7 === 0 && Math.floor(k / side) % 7 === 0) || r() < 0.006 ? 1 : 0;
    }
  });
  // connection streams between adjacent layers
  while (i < n) {
    const li = Math.floor(r() * (layers.length - 1));
    const t = r();
    const s0 = layers[li];
    const s1 = layers[li + 1];
    const ax = (r() - 0.5) * s0;
    const ay = (r() - 0.5) * s0;
    const bx = (r() - 0.5) * s1;
    const by = (r() - 0.5) * s1;
    const z0 = (li - (layers.length - 1) / 2) * gap;
    pos.set([ax + (bx - ax) * t, ay + (by - ay) * t, z0 + gap * t], i * 3);
    flags[i] = r() < 0.25 ? 1 : 0;
    i++;
  }
  return { positions: pos, flags };
}

const DEG = Math.PI / 180;
// rotate the globe so India faces the viewer
const LON0 = 78;
const LAT0 = 18;
function ll(lat: number, lon: number, R: number): [number, number, number] {
  const la = lat * DEG;
  const lo = (lon - LON0) * DEG;
  let x = R * Math.cos(la) * Math.sin(lo);
  let y = R * Math.sin(la);
  let z = R * Math.cos(la) * Math.cos(lo);
  // tilt so LAT0 sits at the centre
  const t = LAT0 * DEG;
  const y2 = y * Math.cos(t) - z * Math.sin(t);
  const z2 = y * Math.sin(t) + z * Math.cos(t);
  y = y2;
  z = z2;
  return [x, y, z];
}

/** EXPLORATION — a graticule globe with waypoint beacons, routes and an orbit. */
function globe(n: number): Shape {
  const r = rng(53);
  const pos = new Float32Array(n * 3);
  const flags = new Float32Array(n);
  const R = 2.1;
  let i = 0;
  const gratN = Math.floor(n * 0.6);
  // meridians and parallels every 20°
  for (; i < gratN; i++) {
    if (r() < 0.5) {
      const lon = Math.floor(r() * 18) * 20;
      const lat = (r() - 0.5) * 150;
      pos.set(ll(lat, lon, R), i * 3);
    } else {
      const lat = (Math.floor(r() * 7) - 3) * 20;
      const lon = r() * 360;
      pos.set(ll(lat, lon, R), i * 3);
    }
  }
  const surfN = Math.floor(n * 0.1);
  for (let k = 0; k < surfN; k++, i++) {
    const u = r() * 2 - 1;
    const a = r() * Math.PI * 2;
    pos.set(ll(Math.asin(u) / DEG, a / DEG, R * (0.99 + r() * 0.02)), i * 3);
  }
  const wps = waypoints.length ? waypoints : [{ lat: 28.6, lon: 77.2 }];
  // beacons: short column + ground ring at every waypoint
  const beaconN = Math.floor(n * 0.05);
  for (let k = 0; k < beaconN; k++, i++) {
    const w = wps[k % wps.length];
    if (r() < 0.4) {
      const h = r();
      pos.set(ll(w.lat, w.lon, R + h * h * 0.45), i * 3);
    } else {
      const a = r() * Math.PI * 2;
      const d = 0.6 + r() * 0.5;
      pos.set(ll(w.lat + Math.sin(a) * d, w.lon + Math.cos(a) * d, R + 0.01), i * 3);
    }
    flags[i] = 1;
  }
  // routes between consecutive waypoints
  const routeN = Math.floor(n * 0.07);
  for (let k = 0; k < routeN && wps.length > 1; k++, i++) {
    const a = wps[k % (wps.length - 1)];
    const b = wps[(k % (wps.length - 1)) + 1];
    const t = r();
    const dist = Math.hypot(b.lat - a.lat, b.lon - a.lon);
    const lift = Math.sin(Math.PI * t) * (0.04 + dist / 40);
    pos.set(ll(a.lat + (b.lat - a.lat) * t, a.lon + (b.lon - a.lon) * t, R + lift), i * 3);
    flags[i] = 1;
  }
  // a tilted orbit ring — a satellite track around the globe
  for (; i < n; i++) {
    const a = r() * Math.PI * 2;
    const rr = R * 1.42 + (r() - 0.5) * 0.04;
    let x = Math.cos(a) * rr;
    let y = (r() - 0.5) * 0.02;
    let z = Math.sin(a) * rr;
    const tx = 1.15;
    const y2 = y * Math.cos(tx) - z * Math.sin(tx);
    const z2 = y * Math.sin(tx) + z * Math.cos(tx);
    y = y2;
    z = z2;
    const tz = -0.5;
    const x3 = x * Math.cos(tz) - y * Math.sin(tz);
    const y3 = x * Math.sin(tz) + y * Math.cos(tz);
    pos.set([x3, y3, z], i * 3);
    flags[i] = r() < 0.04 ? 1 : 0;
  }
  return { positions: pos, flags };
}

export function buildShapes(n: number): Record<ShapeName, Shape> {
  return { core: core(n), field: field(n), lattice: lattice(n), globe: globe(n) };
}

/** Per-shape framing: where the object sits and how it is oriented. */
export const framing: Record<
  ShapeName,
  { x: number; y: number; scale: number; rotX: number; rotY: number; spin: number; sway: number; wave: number }
> = {
  core: { x: 2.15, y: 0.05, scale: 0.9, rotX: 0.15, rotY: 0, spin: 0.06, sway: 0, wave: 0 },
  field: { x: 0.6, y: -0.6, scale: 1, rotX: 0.62, rotY: -0.35, spin: 0, sway: 0.12, wave: 0.22 },
  lattice: { x: 2.0, y: 0, scale: 0.95, rotX: -0.35, rotY: 0.75, spin: 0.05, sway: 0, wave: 0 },
  globe: { x: 2.1, y: 0, scale: 0.92, rotX: 0, rotY: 0, spin: 0, sway: 0.3, wave: 0 },
};

export function shapeForPath(path: string): ShapeName {
  if (path.startsWith("/research")) return "field";
  if (path.startsWith("/development")) return "lattice";
  if (path.startsWith("/exploration")) return "globe";
  return "core";
}

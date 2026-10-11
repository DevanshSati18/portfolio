"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme";

const S = 28; // grid resolution

// a deterministic "image": a soft ring + bar — a stand-in for an object in frame
function baseImage() {
  const img = new Float32Array(S * S);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const dx = x - S / 2 + 0.5;
      const dy = y - S / 2 + 0.5;
      const r = Math.hypot(dx, dy);
      const ring = Math.exp(-Math.pow((r - 8.5) / 2.2, 2));
      const bar = Math.abs(dy) < 2.2 && Math.abs(dx) < 6 ? 0.9 : 0;
      img[y * S + x] = Math.min(1, 0.08 + ring * 0.9 + bar);
    }
  return img;
}

// deterministic ±1 "gradient sign" with some spatial structure
function gradSign() {
  const g = new Float32Array(S * S);
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const v = Math.sin(x * 1.7 + y * 0.6) + Math.cos(y * 1.3 - x * 0.4) + (rnd() - 0.5) * 2.2;
      g[y * S + x] = v >= 0 ? 1 : -1;
    }
  return g;
}

const IMG = baseImage();
const GRAD = gradSign();

function hexToRgb(h: string) {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function FgsmDemo() {
  const [eps, setEps] = useState(0.12);
  const { theme } = useTheme();
  const a = useRef<HTMLCanvasElement>(null);
  const b = useRef<HTMLCanvasElement>(null);
  const c = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dark = theme === "dark";
    const bg = hexToRgb(dark ? "#06070a" : "#f1efe9");
    const fg = hexToRgb(dark ? "#8fe8d0" : "#0d6b59");
    const sig = hexToRgb(dark ? "#ffb547" : "#b25c00");
    const mix = (t: number) => bg.map((v, i) => Math.round(v + (fg[i] - v) * t));

    const draw = (cv: HTMLCanvasElement | null, fn: (i: number) => number[]) => {
      if (!cv) return;
      cv.width = S;
      cv.height = S;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const data = ctx.createImageData(S, S);
      for (let i = 0; i < S * S; i++) {
        const [r, g, bl] = fn(i);
        data.data.set([r, g, bl, 255], i * 4);
      }
      ctx.putImageData(data, 0, 0);
    };

    draw(a.current, (i) => mix(IMG[i]));
    draw(b.current, (i) => {
      const t = 0.15 + Math.min(1, eps / 0.3) * 0.85;
      const col = GRAD[i] > 0 ? sig : fg;
      return bg.map((v, k) => Math.round(v + (col[k] - v) * t * 0.9));
    });
    draw(c.current, (i) => {
      const v = Math.min(1, Math.max(0, IMG[i] + eps * GRAD[i]));
      const base = mix(v);
      // tint perturbed pixels slightly toward the signal colour
      const t = eps * 1.4 * (GRAD[i] > 0 ? 1 : 0);
      return base.map((x, k) => Math.round(x + (sig[k] - x) * Math.min(0.5, t)));
    });
  }, [eps, theme]);

  return (
    <div className="fgsm panel corners">
      <div>
        <div className="fgsm-boards">
          <div>
            <canvas ref={a} aria-label="Clean input" role="img" />
            <div className="fgsm-cap">x · clean</div>
          </div>
          <span className="fgsm-op">+</span>
          <div>
            <canvas ref={b} aria-label="Perturbation sign pattern" role="img" />
            <div className="fgsm-cap">ε · sign(∇ₓJ)</div>
          </div>
          <span className="fgsm-op">=</span>
          <div>
            <canvas ref={c} aria-label="Adversarial input" role="img" />
            <div className="fgsm-cap">x′ · adversarial</div>
          </div>
        </div>
        <label className="stack-sm mt-m">
          <span className="row-between mono small">
            <span className="faint">perturbation budget ε</span>
            <span className="signal">{eps.toFixed(2)}</span>
          </span>
          <input
            className="range"
            type="range"
            min={0}
            max={0.3}
            step={0.01}
            value={eps}
            onChange={(e) => setEps(parseFloat(e.target.value))}
          />
        </label>
        <p className="faint small mt-s">Interactive illustration of how FGSM builds an adversarial input — not live model output.</p>
      </div>
      <div className="stack-sm">
        <div className="formula">x′ = clip( x + ε · sign( ∇ₓ J(θ, x, y) ) )</div>
        <p className="muted small">
          One gradient step, pushed in the direction that hurts the model most. Changes that look like noise to a person can
          collapse a detector&apos;s confidence. LightDefend is built to absorb that push at inference time, cheaply enough for
          the edge.
        </p>
      </div>
    </div>
  );
}

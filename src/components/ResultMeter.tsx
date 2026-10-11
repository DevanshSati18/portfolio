"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ResultMeter({ before, after, label }: { before: number; after: number; label: string }) {
  const reduce = useReducedMotion();
  const rows = [
    { k: "Undefended", v: before, color: "var(--signal)" },
    { k: "LightDefend", v: after, color: "var(--accent)" },
  ];
  return (
    <div className="meter" role="img" aria-label={`${label}: ${before} undefended versus ${after} with LightDefend`}>
      {rows.map((r, i) => (
        <div className="meter-row" key={r.k}>
          <span>{r.k}</span>
          <span className="meter-bar">
            <motion.span
              style={{ background: r.color, transformOrigin: "left" }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: r.v }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
          <span style={{ color: r.color }}>{r.v.toFixed(2)}</span>
        </div>
      ))}
      <p className="faint small">{label}, FGSM on COCO 2017 (30 batches).</p>
    </div>
  );
}

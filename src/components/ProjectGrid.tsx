"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Project } from "@/data/profile";

const ALL = "All";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState(ALL);
  const reduce = useReducedMotion();
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [[ALL, projects.length] as const, ...Array.from(counts.entries())];
  }, [projects]);
  const shown = tag === ALL ? projects : projects.filter((p) => p.tags.includes(tag as Project["tags"][number]));

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {tags.map(([t, c]) => (
          <button key={t} className="filter" aria-pressed={tag === t} onClick={() => setTag(t)}>
            {t} <span className="c">{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout={!reduce} className="projects">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => {
            const href = p.href || p.repo;
            const internal = href?.startsWith("/");
            const content = (
              <>
                <div className="project-head">
                  <span>{p.year || "—"}</span>
                  <span>{p.featured ? <span className="featured-badge">● featured</span> : p.tags.join(" · ")}</span>
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p className="sum">{p.summary}</p>
                </div>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="project-foot">
                  <div className="chips">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  {href && <span className="project-link">{internal ? "Read →" : "Source ↗"}</span>}
                </div>
              </>
            );
            return (
              <motion.article
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="panel project"
                onPointerMove={onMove}
              >
                {href ? (
                  internal ? (
                    <Link href={href} className="stack-sm" style={{ display: "contents" }}>
                      {content}
                    </Link>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer" style={{ display: "contents" }}>
                      {content}
                    </a>
                  )
                ) : (
                  content
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

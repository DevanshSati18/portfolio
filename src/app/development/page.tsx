import type { Metadata } from "next";
import Scramble from "@/components/Scramble";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import ProjectGrid from "@/components/ProjectGrid";
import { experience, projects, skills } from "@/data/profile";

export const metadata: Metadata = {
  title: "Development",
  description: "Full-stack platforms, DevOps security automation and the stack behind them.",
  alternates: { canonical: "/development/" },
};

export default function Development() {
  const dev = experience.filter((e) => e.kind === "development");
  return (
    <>
      <section className="wrap page-hero">
        <Reveal>
          <span className="kicker">
            <span className="idx">02</span> Development
          </span>
        </Reveal>
        <h1 className="h1" style={{ marginTop: 24 }}>
          <Scramble text="Systems that" />
          <br />
          <span className="serif accent">
            <Scramble text="ship and stay up." delay={200} />
          </span>
        </h1>
        <Reveal delay={0.2}>
          <p className="lead">
            From QR-tracked government inventory to a self-hosted school platform — I design, build, secure and deploy the
            whole stack, then keep it running.
          </p>
        </Reveal>
      </section>

      <section className="wrap section-tight" aria-labelledby="proj-title">
        <SectionHead idx="//" label="Selected work" title={<span id="proj-title">Projects.</span>} />
        <ProjectGrid projects={projects} />
      </section>

      <section className="wrap section" aria-labelledby="stack-title">
        <SectionHead
          idx="//"
          label="Toolkit"
          title={
            <span id="stack-title">
              The <span className="serif">stack.</span>
            </span>
          }
        >
          Chosen for the job, not the trend — with security considered at every layer.
        </SectionHead>
        <Reveal className="stack">
          {skills.map((s, i) => (
            <div className="stack-cell" key={s.group}>
              <div className="row-between">
                <span className="kicker">{s.group}</span>
                <span className="mono small faint">0{i + 1}</span>
              </div>
              <div className="chips">
                {s.items.map((it) => (
                  <span className="chip" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap section-tight" aria-labelledby="devexp-title">
        <SectionHead idx="//" label="In production" title={<span id="devexp-title">Engineering roles.</span>} />
        <ol className="log">
          {dev.map((e) => (
            <Reveal as="li" key={e.org} className="log-row">
              <div className="log-when">{e.period}</div>
              <div>
                <div className="log-role">{e.role}</div>
                <div className="log-org">
                  {e.org} · {e.place}
                </div>
              </div>
              <ul className="log-points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}

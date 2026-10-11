import type { Metadata } from "next";
import Scramble from "@/components/Scramble";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import FgsmDemo from "@/components/FgsmDemo";
import ResultMeter from "@/components/ResultMeter";
import { ArrowUpRight } from "@/components/Icons";
import { links, publications, researchInterests, securityWork, thesis } from "@/data/profile";

export const metadata: Metadata = {
  title: "Research",
  description: "Adversarial machine learning and edge AI security — LightDefend, a lightweight hybrid defense for YOLOv8.",
  alternates: { canonical: "/research/" },
};

const stages = [
  { n: "01", t: "Input frame", d: "Camera frame headed for a real-time detector.", kind: "" },
  { n: "02", t: "FGSM attack", d: "ε-bounded perturbation along the loss gradient sign.", kind: "attack" },
  { n: "03", t: "Gradient Masking", d: "Denies the attacker a clean gradient signal to follow.", kind: "defense" },
  { n: "04", t: "Feature Sanitization", d: "Cleans perturbed intermediate features at runtime, inside YOLOv8.", kind: "defense" },
  { n: "05", t: "Detections", d: "Confidence restored, latency budget intact.", kind: "" },
];

export default function Research() {
  const scholar = links.find((l) => l.label === "Google Scholar");
  const thesisLinks = thesis.links.filter((l) => l.href);
  return (
    <>
      <section className="wrap page-hero">
        <Reveal>
          <span className="kicker">
            <span className="idx">01</span> Research
          </span>
        </Reveal>
        <h1 className="h1" style={{ marginTop: 24 }}>
          <Scramble text="Making models" />
          <br />
          <span className="serif accent">
            <Scramble text="hard to fool." delay={200} />
          </span>
        </h1>
        <Reveal delay={0.2}>
          <p className="lead">
            My research sits where machine learning meets security: how adversarial inputs break vision models, and how to
            defend them cheaply enough to run on the edge — work I&apos;m now extending towards LLM systems.
          </p>
        </Reveal>
      </section>

      {/* Thesis */}
      <section className="wrap section-tight" aria-labelledby="thesis-title">
        <Reveal className="panel corners thesis">
          <div className="stack-sm" style={{ alignContent: "start" }}>
            <span className="kicker">
              <span className="dot" /> {thesis.type}
            </span>
            <h2 id="thesis-title" className="thesis-title mt-s">
              {thesis.title}
            </h2>
            <p className="serif" style={{ fontSize: "clamp(1.3rem,2.2vw,1.7rem)", lineHeight: 1.25 }}>
              {thesis.subtitle}
            </p>
            <p className="muted mt-s">{thesis.abstract}</p>
            <div className="chips mt-s">
              {thesis.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            {thesisLinks.length > 0 && (
              <div className="chips mt-s">
                {thesisLinks.map((l) => (
                  <a key={l.label} className="btn" href={l.href} target="_blank" rel="noreferrer">
                    {l.label} <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="stack-sm" style={{ alignContent: "start", gap: 32 }}>
            <dl className="kv">
              {thesis.method.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <div className="row-between" style={{ alignItems: "baseline" }}>
                <span className="kicker">Result</span>
                <span className="mono small">
                  <span className="signal">{thesis.result.before.toFixed(2)}</span>
                  <span className="faint"> → </span>
                  <span className="accent">{thesis.result.after.toFixed(2)}</span>
                </span>
              </div>
              <div className="mt-m">
                <ResultMeter before={thesis.result.before} after={thesis.result.after} label="Mean detection confidence under attack" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pipeline */}
      <section className="wrap section-tight" aria-labelledby="pipe-title">
        <SectionHead
          idx="//"
          label="How it works"
          title={
            <span id="pipe-title">
              Attack, then <span className="serif accent">absorb.</span>
            </span>
          }
        >
          Two lightweight defensive layers work around the detector, designed for minimal latency overhead — security that
          fits a real-time budget.
        </SectionHead>
        <Reveal className="pipeline">
          {stages.map((s) => (
            <div key={s.n} className={`stage ${s.kind}`}>
              <span className="stage-n">
                {s.n}
                {s.kind && <span className={s.kind === "attack" ? "signal" : "accent"}> · {s.kind}</span>}
              </span>
              <div>
                <div className="stage-t">{s.t}</div>
                <div className="stage-d mt-s">{s.d}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* FGSM demo */}
      <section className="wrap section-tight" aria-labelledby="fgsm-title">
        <SectionHead
          idx="//"
          label="Interactive"
          title={
            <span id="fgsm-title">
              What an attack <span className="serif">looks like.</span>
            </span>
          }
        >
          Drag the budget. The perturbation stays small; its effect on a detector does not.
        </SectionHead>
        <Reveal>
          <FgsmDemo />
        </Reveal>
      </section>

      {/* Interests */}
      <section className="wrap section" aria-labelledby="int-title">
        <SectionHead idx="//" label="Research interests" title={<span id="int-title">Where I&apos;m looking.</span>} />
        <Reveal className="interests">
          {researchInterests.map((r, i) => (
            <div className="interest" key={r.title}>
              <span className="mono small faint">0{i + 1}</span>
              <div>
                <h3 className="h3">{r.title}</h3>
                <p className="mt-s">{r.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Publications */}
      <section className="wrap section-tight" aria-labelledby="pub-title">
        <SectionHead idx="//" label="Publications & writing" title={<span id="pub-title">On record.</span>}>
          {scholar ? (
            <>
              Full list on{" "}
              <a className="accent link-u" href={scholar.href} target="_blank" rel="noreferrer">
                Google Scholar ↗
              </a>
            </>
          ) : (
            "Papers and preprints will appear here as they're published."
          )}
        </SectionHead>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {publications.map((p) => (
            <Reveal key={p.title} className="pub">
              <span className="mono small faint">{p.year}</span>
              <div>
                <div className="pub-title">{p.title}</div>
                <div className="muted small mt-s">
                  {p.authors} — <span className="serif">{p.venue}</span>
                </div>
              </div>
              {p.href ? (
                <a className="chip chip-accent" href={p.href} target="_blank" rel="noreferrer">
                  Read ↗
                </a>
              ) : (
                <span className="chip">Thesis</span>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Applied security */}
      <section className="wrap section" aria-labelledby="sec-title">
        <SectionHead
          idx="//"
          label="Applied security"
          title={
            <span id="sec-title">
              Research grounded in <span className="serif signal">real attacks.</span>
            </span>
          }
        >
          Before the thesis, industry work on the offensive and defensive side shaped how I think about threat models.
        </SectionHead>
        <div className="log">
          {securityWork.map((s) => (
            <Reveal key={s.org} className="log-row" >
              <div className="log-when">
                <span className="tag tag-security">security</span>
              </div>
              <div className="log-role">{s.org}</div>
              <div className="muted">{s.what}</div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

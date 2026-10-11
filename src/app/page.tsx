import Link from "next/link";
import Scramble from "@/components/Scramble";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHead from "@/components/SectionHead";
import { ArrowRight, ArrowUpRight, Download } from "@/components/Icons";
import { DevGlyph, ExploreGlyph, ResearchGlyph } from "@/components/Glyphs";
import { experience, honors, links, site, stats, education } from "@/data/profile";

const vectors = [
  {
    href: "/research/",
    n: "01",
    title: "Research",
    body: "Adversarial robustness for edge vision models — LightDefend, my thesis on keeping YOLOv8 reliable under FGSM attack.",
    glyph: <ResearchGlyph />,
  },
  {
    href: "/development/",
    n: "02",
    title: "Development",
    body: "Full-stack platforms in production: Next.js, Node, MongoDB, Flutter — deployed and run on servers I manage.",
    glyph: <DevGlyph />,
  },
  {
    href: "/exploration/",
    n: "03",
    title: "Exploration",
    body: "Travel, places that shaped the work, and the things I'm curious about right now.",
    glyph: <ExploreGlyph />,
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="wrap hero" aria-labelledby="hero-title">
        <Reveal>
          <span className="kicker">
            <span className="dot" /> {site.domain} — portfolio / 2026
          </span>
        </Reveal>
        <h1 id="hero-title" className="display" style={{ marginTop: 28 }}>
          <Scramble text="Devansh" duration={1000} />
          <br />
          <span className="serif accent">
            <Scramble text="Sati." delay={250} duration={800} />
          </span>
        </h1>
        <Reveal delay={0.25}>
          <p className="lead" style={{ marginTop: 32 }}>
            {site.tagline}
          </p>
          <div className="hero-roles">
            <span>Researcher</span>
            <span>Developer</span>
            <span>Cybersecurity Engineer</span>
          </div>
          <div className="hero-actions">
            <Link href="/research/" className="btn btn-primary">
              Read the research <ArrowRight size={16} className="arrow" />
            </Link>
            <Link href="/development/" className="btn">
              See the work
            </Link>
            <a href={site.cv} className="btn" target="_blank" rel="noreferrer">
              <Download size={16} /> CV
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.45} className="hero-foot">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </Reveal>
      </section>

      {/* ── Signal: numbers ── */}
      <section className="wrap section-tight" aria-label="Highlights">
        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-v">
                <Counter to={s.value} from={s.from ?? 0} decimals={s.decimals} suffix={s.unit} />
              </div>
              <p className="stat-l">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Three vectors ── */}
      <section className="wrap section" aria-labelledby="vectors-title">
        <SectionHead
          idx="//"
          label="Three vectors"
          title={
            <span id="vectors-title">
              One question, approached <span className="serif accent">three ways</span>: how do we build systems we can trust?
            </span>
          }
        />
        <div className="vectors">
          {vectors.map((v, i) => (
            <Reveal key={v.href} delay={i * 0.1}>
              <Link href={v.href} className="panel corners vector" style={{ height: "100%" }}>
                <div className="vector-top">
                  <span className="kicker">
                    <span className="idx">{v.n}</span>
                  </span>
                  <ArrowUpRight size={18} />
                </div>
                {v.glyph}
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                  <span className="go">
                    Enter <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Experience log ── */}
      <section className="wrap section" aria-labelledby="log-title">
        <SectionHead
          idx="//"
          label="Experience log"
          title={
            <span id="log-title">
              From <span className="serif">breach simulations</span> to production servers.
            </span>
          }
        />
        <ol className="log">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.org + e.start} delay={i * 0.05} className="log-row">
              <div className="log-when">
                <span>{e.period}</span>
                <span className={`tag tag-${e.kind}`}>{e.kind}</span>
              </div>
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

      {/* ── Education & honours ── */}
      <section className="wrap section-tight" aria-labelledby="edu-title">
        <SectionHead idx="//" label="Education & recognition" title={<span id="edu-title">Foundations.</span>} />
        <div className="two-col">
          <ol className="log">
            {education.map((ed) => (
              <Reveal as="li" key={ed.title} className="log-row edu">
                <div className="log-when">{ed.period}</div>
                <div>
                  <div className="log-role">{ed.title}</div>
                  <div className="log-org">
                    {ed.org} · {ed.place}
                  </div>
                  {ed.note && <div className="log-org accent">{ed.note}</div>}
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="stack-sm">
            {honors.map((h) => (
              <Reveal key={h.title} className="panel corners honor">
                <div className="honor-year">{h.year}</div>
                <div>
                  <div className="h3">{h.title}</div>
                  <p className="muted mt-s">Awarded by {h.by}.</p>
                  <p className="faint small mt-s">{h.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="wrap section" aria-labelledby="contact-title">
        <Reveal className="panel corners contact">
          <div>
            <span className="kicker">
              <span className="dot" /> {site.status}
            </span>
            <h2 id="contact-title" className="h1" style={{ marginTop: 24 }}>
              Let&apos;s build something <span className="serif accent">robust.</span>
            </h2>
            <a href={`mailto:${site.email}`} className="btn btn-primary mt-l">
              {site.email} <ArrowRight size={16} className="arrow" />
            </a>
          </div>
          <div className="contact-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span>{l.label}</span>
                <span className="h">{l.handle} ↗</span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

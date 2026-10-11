import type { Metadata } from "next";
import Scramble from "@/components/Scramble";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { curiosities, now, waypoints } from "@/data/profile";

export const metadata: Metadata = {
  title: "Exploration",
  description: "Travel, places and curiosities — the life around the work.",
  alternates: { canonical: "/exploration/" },
};

const fmt = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;

export default function Exploration() {
  return (
    <>
      <section className="wrap page-hero">
        <Reveal>
          <span className="kicker">
            <span className="idx">03</span> Exploration
          </span>
        </Reveal>
        <h1 className="h1" style={{ marginTop: 24 }}>
          <Scramble text="Off the" />
          <br />
          <span className="serif accent">
            <Scramble text="terminal." delay={200} />
          </span>
        </h1>
        <Reveal delay={0.2}>
          <p className="lead">
            The places that shaped the work, the trips in between, and whatever I&apos;m currently curious about. The globe
            behind this page plots every waypoint below.
          </p>
        </Reveal>
      </section>

      <section className="wrap section-tight" aria-labelledby="wp-title">
        <SectionHead
          idx="//"
          label="Waypoints"
          title={
            <span id="wp-title">
              A travel <span className="serif">log.</span>
            </span>
          }
        />
        <ol className="waypoints">
          {waypoints.map((w, i) => (
            <Reveal as="li" key={w.name} className="wp" delay={i * 0.04}>
              <span className="wp-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="wp-name">{w.name}</div>
                <div className="faint small mt-s">
                  {w.region} · {w.when}
                </div>
              </div>
              <span className="wp-coord">
                {fmt(w.lat, "N", "S")} {fmt(w.lon, "E", "W")}
                <br />
                <span className={w.kind === "travel" ? "signal" : "accent"}>{w.kind}</span>
              </span>
              <p className="wp-note">{w.note}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="cur-title">
        <SectionHead
          idx="//"
          label="Curiosities"
          title={
            <span id="cur-title">
              What keeps me <span className="serif accent">exploring.</span>
            </span>
          }
        />
        <div className="curios">
          {curiosities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="panel corners curio">
              <span className="mono small faint">0{i + 1}</span>
              <div>
                <h3 className="h3">{c.title}</h3>
                <p className="mt-s">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section-tight" aria-labelledby="now-title">
        <Reveal className="panel now">
          <div className="row-between">
            <span className="kicker">
              <span className="dot" /> Now
            </span>
            <span className="mono small faint">updated 2026</span>
          </div>
          <h2 id="now-title" className="sr-only">
            Now
          </h2>
          <ul className="mt-m">
            {now.map((n, i) => (
              <li key={n}>
                <span>0{i + 1}</span>
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}

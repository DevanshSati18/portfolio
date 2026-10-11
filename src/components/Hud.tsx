"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/profile";

const labels: Record<string, string> = {
  "/": "core",
  "/research/": "perturbation field",
  "/development/": "system lattice",
  "/exploration/": "waypoint globe",
};

export default function Hud() {
  const pathname = usePathname() || "/";
  const [time, setTime] = useState("");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 260], [1, 0]);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const key = pathname.endsWith("/") ? pathname : pathname + "/";

  return (
    <>
      <motion.div className="hud hud-left" aria-hidden="true" style={{ opacity }}>
        <span className="live" />
        <span>{site.status}</span>
      </motion.div>
      <motion.div className="hud hud-right" aria-hidden="true" style={{ opacity }}>
        <span>field: {labels[key] ?? "core"}</span>
        <span className="scroll-meter" />
        <span suppressHydrationWarning>IST {time}</span>
      </motion.div>
    </>
  );
}

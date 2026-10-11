"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Close, Command, Mark, Menu, Moon, Sun } from "./Icons";
import { useTheme } from "./theme";
import { isActive, openCommandPalette, routes } from "./routes";
import { links, site } from "@/data/profile";

export default function Nav() {
  const pathname = usePathname() || "/";
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <nav className="nav-inner" aria-label="Primary">
            <Link href="/" className="brand" aria-label={`${site.name} — home`}>
              <Mark className="brand-mark" />
              <span className="brand-name">devansh sati</span>
              <span className="brand-dom">/ {pathname === "/" ? "index" : pathname.replace(/\//g, "")}</span>
            </Link>

            <div className="nav-links">
              {routes.map((r) => {
                const active = isActive(pathname, r.href);
                return (
                  <Link key={r.href} href={r.href} className="nav-link" aria-current={active ? "page" : undefined}>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="n">{r.n}</span>
                    {r.label}
                  </Link>
                );
              })}
            </div>

            <div className="nav-tools">
              <button className="icon-btn cmd-btn" onClick={openCommandPalette} aria-label="Open command palette">
                <Command size={17} />
                <span className="kbd">{isMac ? "⌘" : "Ctrl"} K</span>
              </button>
              <button
                className="icon-btn"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                className="icon-btn menu-btn"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <Close size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile">
              {routes.map((r, i) => (
                <motion.div
                  key={r.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={r.href} className="big" aria-current={isActive(pathname, r.href) ? "page" : undefined}>
                    <span className="n">{r.n}</span>
                    {r.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="chips">
              {links.map((l) => (
                <a key={l.label} className="chip" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import Link from "next/link";
import { links, site } from "@/data/profile";
import { routes } from "./routes";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="stack-sm">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built with Next.js · Three.js · Motion — static, no trackers.</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {routes.map((r) => (
            <Link key={r.href} href={r.href}>
              {r.n} {r.label}
            </Link>
          ))}
        </nav>
        <div className="footer-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

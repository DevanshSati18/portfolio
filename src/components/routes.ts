export const routes = [
  { href: "/", label: "Home", n: "00", hint: "Overview" },
  { href: "/research/", label: "Research", n: "01", hint: "Adversarial ML · Edge AI" },
  { href: "/development/", label: "Development", n: "02", hint: "Projects · Stack" },
  { href: "/exploration/", label: "Exploration", n: "03", hint: "Travel · Curiosities" },
];

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

export const openCommandPalette = () => window.dispatchEvent(new CustomEvent("cmdk:open"));

/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to update text, links, projects and trips.
 *  Any link left as "" is hidden automatically.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Devansh Sati",
  domain: "devanshsati.com",
  url: "https://devanshsati.com",
  role: "Researcher · Developer · Security Engineer",
  tagline:
    "I build AI systems that hold up under attack — from adversarial defenses for edge vision models to the full-stack platforms they ship in.",
  location: "India",
  timezone: "Asia/Kolkata",
  status: "Open to research collaborations & engineering roles",
  email: "devanshjsati@gmail.com",
  cv: "/Devansh_Sati_CV.pdf",
};

export type LinkItem = { label: string; href: string; handle: string };

/** External profiles. Fill in Google Scholar / ORCID etc. when you have them. */
export const links: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/DevanshSati18", handle: "DevanshSati18" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devansh-sati", handle: "devansh-sati" },
  { label: "Google Scholar", href: "", handle: "scholar" }, // TODO: paste your Scholar profile URL
  { label: "ORCID", href: "", handle: "orcid" }, // optional
  { label: "Email", href: "mailto:devanshjsati@gmail.com", handle: "devanshjsati@gmail.com" },
].filter((l) => l.href !== "");

export const stats = [
  { value: 0.84, from: 0.62, decimals: 2, label: "Detection confidence recovered under FGSM (from 0.62)", unit: "" },
  { value: 10000, decimals: 0, label: "Assets tracked on the Raj Bhawan inventory platform", unit: "+" },
  { value: 25, decimals: 0, label: "Less manual deployment effort via automated CI/CD", unit: "%" },
  { value: 20, decimals: 0, label: "Front-end performance gain on production React apps", unit: "%" },
];

export type Experience = {
  period: string;
  start: string;
  role: string;
  org: string;
  place: string;
  kind: "research" | "development" | "security";
  points: string[];
};

export const experience: Experience[] = [
  {
    period: "Sep 2025 — Present",
    start: "2025.09",
    role: "Full Stack / AI Engineer",
    org: "Inventory Management System — School Automation",
    place: "Self-managed deployment",
    kind: "development",
    points: [
      "Building a platform that automates institutional records and document workflows.",
      "JWT authentication with Next.js, a Node.js backend and MongoDB.",
      "Secure document vault for PDFs and administrative records.",
      "Configured and run the production server end to end.",
    ],
  },
  {
    period: "Sep 2024 — Sep 2025",
    start: "2024.09",
    role: "Web Developer",
    org: "Esipl",
    place: "Delhi",
    kind: "development",
    points: [
      "Shipped responsive React.js applications, improving performance by ~20%.",
      "Reusable component library cut development effort by ~15%.",
      "REST API integration and structured Git workflows with code review.",
    ],
  },
  {
    period: "Jun 2023 — Aug 2024",
    start: "2023.06",
    role: "Cybersecurity & DevOps Intern",
    org: "Honda Motorcycles India",
    place: "Gurugram",
    kind: "security",
    points: [
      "OWASP practices, VAPT automation and secure DevOps pipelines.",
      "Automated CI/CD processes, reducing manual deployment effort by 25%.",
      "Assisted with threat modelling and enterprise security workflows.",
    ],
  },
  {
    period: "Jul 2023 — Aug 2023",
    start: "2023.07",
    role: "ITDCOP Intern",
    org: "Maruti Suzuki India",
    place: "Gurugram",
    kind: "security",
    points: [
      "Breach Attack Simulation (BAS) for infrastructure defence evaluation.",
      "Network monitoring and server management operations.",
    ],
  },
];

export const education = [
  {
    period: "2021 — 2025",
    title: "B.Tech, Computer Science & Engineering",
    org: "BTKIT, Uttarakhand Technical University",
    place: "Almora, Uttarakhand",
    note: "First Division · Thesis: LightDefend",
  },
  { period: "2021", title: "Class XII — 87.2%", org: "Bal Bharati Public School", place: "Manesar, Haryana", note: "" },
  { period: "2019", title: "Class X", org: "The Mann School", place: "Delhi", note: "" },
];

export const honors = [
  {
    year: "2023",
    title: "Certificate of Appreciation",
    by: "Lt. Gen. Gurmit Singh, Governor of Uttarakhand",
    note: "For leadership and technical contribution.",
  },
];

/* ───────────────────────── RESEARCH ───────────────────────── */

export const researchInterests = [
  { title: "Adversarial Machine Learning", body: "How small, deliberate perturbations break vision models — and how to make them recover." },
  { title: "Edge AI Security", body: "Defenses light enough to run in real time on constrained hardware, not just in the lab." },
  { title: "LLM Systems", body: "Building and securing language-model systems: evaluation, guardrails and deployment." },
  { title: "Secure DevOps", body: "Security testing as part of the pipeline — VAPT, OWASP and threat modelling by default." },
];

export const thesis = {
  title: "LightDefend",
  subtitle: "A lightweight hybrid adversarial defense for real-time edge object detection",
  type: "Bachelor's Thesis · 2025",
  stack: ["PyTorch", "YOLOv8", "COCO 2017", "FGSM"],
  abstract:
    "Object detectors deployed at the edge are exposed to adversarial inputs but cannot afford heavyweight defenses. LightDefend combines Gradient Masking with Runtime Feature Sanitization to restore detection confidence under attack while keeping latency overhead minimal — security that fits in a real-time budget.",
  method: [
    { k: "Threat model", v: "Fast Gradient Sign Method (FGSM) perturbations on input images" },
    { k: "Model", v: "YOLOv8 object detector" },
    { k: "Data", v: "COCO 2017, evaluated across 30 batches" },
    { k: "Defense", v: "Gradient Masking + Runtime Feature Sanitization" },
  ],
  result: { before: 0.62, after: 0.84, label: "mean detection confidence under attack" },
  links: [
    { label: "Code", href: "" }, // TODO: GitHub repo URL for LightDefend
    { label: "Report (PDF)", href: "" }, // TODO: thesis PDF
  ],
};

export type Publication = { title: string; venue: string; year: string; authors: string; href: string };
/** Add papers / preprints here as they come. */
export const publications: Publication[] = [
  {
    title: "LightDefend: Hybrid Gradient Masking and Runtime Feature Sanitization for Edge Object Detection",
    venue: "B.Tech Thesis, BTKIT, Uttarakhand Technical University",
    year: "2025",
    authors: "Devansh Sati",
    href: "",
  },
];

export const securityWork = [
  { org: "Honda Motorcycles India", what: "VAPT automation · OWASP · Threat modelling · Secure CI/CD" },
  { org: "Maruti Suzuki India", what: "Breach Attack Simulation · Network monitoring" },
  { org: "DevOps VAPT Automation", what: "Vulnerability scans wired into CI/CD with automated reporting" },
];

/* ─────────────────────── DEVELOPMENT ─────────────────────── */

export type Project = {
  id: string;
  title: string;
  year: string;
  tags: ("AI" | "Full-stack" | "Security" | "Mobile" | "Web")[];
  stack: string[];
  summary: string;
  points: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "lightdefend",
    title: "LightDefend",
    year: "2025",
    tags: ["AI", "Security"],
    stack: ["PyTorch", "YOLOv8", "Python"],
    summary: "Hybrid adversarial defense for edge object detection.",
    points: [
      "Gradient Masking + Runtime Feature Sanitization.",
      "FGSM attacks simulated on COCO 2017 across 30 batches.",
      "Confidence under attack recovered from 0.62 to 0.84.",
    ],
    href: "/research/",
    featured: true,
  },
  {
    id: "ims-school",
    title: "School Automation IMS",
    year: "2025 —",
    tags: ["Full-stack", "Security"],
    stack: ["Next.js", "Node.js", "MongoDB", "JWT"],
    summary: "Inventory and records platform for institutions, self-hosted.",
    points: [
      "Automates institutional records and document workflows.",
      "JWT auth and a secure PDF document vault.",
      "Deployed and maintained on a self-managed production server.",
    ],
    featured: true,
  },
  {
    id: "raj-bhawan",
    title: "Raj Bhawan Inventory System",
    year: "",
    tags: ["Mobile", "Full-stack"],
    stack: ["Flutter", "Firebase", "Dart"],
    summary: "Enterprise inventory for 10,000+ assets with QR tracking.",
    points: [
      "QR-based asset tracking at government scale.",
      "Multi-user cloud architecture with secure real-time updates.",
      "Delivered with government stakeholders.",
    ],
    featured: true,
  },
  {
    id: "vapt",
    title: "DevOps VAPT Automation",
    year: "2023 — 24",
    tags: ["Security"],
    stack: ["CI/CD", "Security testing", "Scripting"],
    summary: "Vulnerability testing built into the delivery pipeline.",
    points: [
      "Vulnerability scripts integrated into CI/CD for automated checks.",
      "Managed network configs and test environments.",
      "Automated scanning and reporting for project-level validation.",
    ],
  },
  {
    id: "library",
    title: "Library Management System",
    year: "",
    tags: ["Web"],
    stack: ["HTML", "CSS", "JavaScript"],
    summary: "Web platform for searching and managing book records.",
    points: [
      "Search and management workflows for staff and students.",
      "Structured backend integration for secure storage.",
    ],
  },
  {
    id: "portfolio",
    title: "devanshsati.com",
    year: "2026",
    tags: ["Web"],
    stack: ["Next.js", "Three.js", "Motion"],
    summary: "This site — a static Next.js build with a morphing WebGL field.",
    points: ["Statically exported, deployable on GitHub Pages or any server.", "Dark & light themes, keyboard command palette."],
    repo: "https://github.com/DevanshSati18",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "Dart", "HTML/CSS"] },
  { group: "AI / ML", items: ["PyTorch", "YOLOv8", "Adversarial ML", "Edge AI", "LLM Systems"] },
  { group: "Frontend", items: ["React", "Next.js", "Flutter", "Responsive UI"] },
  { group: "Backend", items: ["Node.js", "MongoDB", "Firebase", "REST APIs"] },
  { group: "DevOps & Security", items: ["Docker", "Git", "CI/CD", "OWASP", "VAPT", "JWT"] },
  { group: "Systems", items: ["Linux", "Windows", "Self-hosting"] },
];

/* ─────────────────────── EXPLORATION ─────────────────────── */

export type Waypoint = {
  name: string;
  region: string;
  lat: number;
  lon: number;
  when: string;
  note: string;
  kind: "home" | "study" | "work" | "travel";
};

/**
 * Places on the globe. Add trips here — lat/lon drive the 3D globe markers.
 * Find coordinates by right-clicking a spot on Google Maps.
 */
export const waypoints: Waypoint[] = [
  { name: "Delhi", region: "India", lat: 28.61, lon: 77.21, when: "Home base", note: "School at The Mann School, and a year as a web developer at Esipl.", kind: "home" },
  { name: "Gurugram", region: "Haryana", lat: 28.46, lon: 77.03, when: "2023 — 2024", note: "Security and DevOps internships at Honda and Maruti Suzuki.", kind: "work" },
  { name: "Manesar", region: "Haryana", lat: 28.36, lon: 76.94, when: "— 2021", note: "Senior school — Class XII at Bal Bharati Public School.", kind: "study" },
  { name: "Almora", region: "Uttarakhand", lat: 29.6, lon: 79.66, when: "2021 — 2025", note: "Four years of engineering in the Kumaon hills; LightDefend was built here.", kind: "study" },
  // { name: "Your next trip", region: "", lat: 0, lon: 0, when: "2026", note: "", kind: "travel" },
];

// TODO: these are starter lines — rewrite them in your own voice.
export const curiosities = [
  { title: "Travel", body: "New places, long walks and the hills of Uttarakhand — the log on this page grows with every trip." },
  { title: "LLM systems", body: "Currently going deep on how language-model systems are built, evaluated and attacked." },
  { title: "Self-hosting", body: "Running my own servers end to end — this site moves to one next." },
  { title: "Security puzzles", body: "Attack simulation and threat models — thinking like the adversary to build better defenses." },
];

// TODO: keep this list current.
export const now = [
  "Building the school automation platform and running its server.",
  "Moving deeper into LLM systems and how to secure them.",
  "Planning the next trip — the travel log above grows with it.",
];

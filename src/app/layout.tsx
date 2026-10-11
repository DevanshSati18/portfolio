import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Field from "@/components/field/Field";
import Nav from "@/components/Nav";
import Hud from "@/components/Hud";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import { themeScript } from "@/components/theme";
import { site } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
  authors: [{ name: site.name, url: site.url }],
  keywords: ["Devansh Sati", "adversarial machine learning", "edge AI security", "YOLOv8", "cybersecurity", "full stack", "LLM systems"],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  twitter: { card: "summary", title: site.name, description: site.tagline },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070a" },
    { media: "(prefers-color-scheme: light)", color: "#f1efe9" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  sameAs: ["https://github.com/DevanshSati18", "https://www.linkedin.com/in/devansh-sati"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Field />
        <div className="veil" aria-hidden="true" />
        <div className="grid-lines" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Hud />
        <CommandPalette />
      </body>
    </html>
  );
}

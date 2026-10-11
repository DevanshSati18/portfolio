import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://devanshsati.com";
  return ["/", "/research/", "/development/", "/exploration/"].map((p) => ({
    url: base + p,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
}

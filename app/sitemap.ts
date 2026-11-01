import type { MetadataRoute } from "next";

const base = "https://usemivo.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/whats-new", priority: 0.8 },
    { path: "/pricing", priority: 0.9 },
    { path: "/shop", priority: 0.9 },
    { path: "/shipping-returns", priority: 0.5 },
    { path: "/support", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-11-01"),
    priority,
  }));
}

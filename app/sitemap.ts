import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://touge-start.jp/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://touge-start.jp/guidelines", lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: "https://touge-start.jp/privacy", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://touge-start.jp/disclosure", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}

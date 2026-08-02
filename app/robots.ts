import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://touge-start.jp/sitemap.xml", host: "https://touge-start.jp" }; }

import type { MetadataRoute } from "next";

// output: "export" で静的書き出しするため、生成時に固定する。
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://touge-start.jp/sitemap.xml", host: "https://touge-start.jp" }; }

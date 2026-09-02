import type { MetadataRoute } from "next";

// output: "export" で静的書き出しするため、生成時に固定する。
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest { return { name: "INITIAL D START LINE", short_name: "START LINE", description: "運営者ひとりの頭文字D THE ARCADE プレイ記録", start_url: "/", display: "standalone", background_color: "#090909", theme_color: "#f04432", lang: "ja", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] }; }

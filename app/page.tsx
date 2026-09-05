import type { Metadata } from "next";
import InitialDApp from "./initial-d-app";

export function generateMetadata(): Metadata {
  const origin = "https://touge-start.jp";
  const title = "INITIAL D START LINE｜頭文字D THE ARCADE のプレイ記録";
  const description = "頭文字D THE ARCADE を遊んだ記録を、運営者ひとりが書いていく非公式サイト。いまはストーリーモード チャプター2 第四話、難易度2を走っています。";
  return {
    title,
    description,
    alternates: { canonical: `${origin}/` },
    openGraph: { title, description, type: "website", locale: "ja_JP", url: origin, images: [{ url: `${origin}/og.png`, width: 1536, height: 1024 }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: "INITIAL D START LINE", inLanguage: "ja", description: "頭文字D THE ARCADE を遊んだ記録を運営者ひとりが書いていく非公式サイト" },

    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><InitialDApp /></>;
}

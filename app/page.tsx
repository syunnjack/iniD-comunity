import type { Metadata } from "next";
import { headers } from "next/headers";
import InitialDApp from "./initial-d-app";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "INITIAL D START LINE｜初心者のための頭文字Dアーケード攻略・交流サイト";
  const description = "頭文字D THE ARCADEを始めたばかりのプレイヤーへ。最初の10プレイ攻略、車種・コース情報、成長記録、質問投稿を一か所に。";
  return {
    title,
    description,
    alternates: { canonical: origin },
    openGraph: { title, description, type: "website", locale: "ja_JP", url: origin, images: [{ url: `${origin}/og.png`, width: 1536, height: 1024 }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: "INITIAL D START LINE", inLanguage: "ja", description: "頭文字D THE ARCADE初心者向けの非公式攻略・交流サイト" },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "頭文字D THE ARCADEを初めて遊ぶときは何から始める？", acceptedAnswer: { "@type": "Answer", text: "まずはストーリーモードで操作に慣れ、ブレーキの位置とステアリングを戻すタイミングを覚えます。最初の10プレイは勝敗より、壁に当たらず完走することを目標にしましょう。" } },
        { "@type": "Question", name: "初心者におすすめの車種は？", acceptedAnswer: { "@type": "Answer", text: "好きな車を選ぶことが一番です。迷う場合は操作が素直なFR車から始め、同じ車で走行を重ねると違いを学びやすくなります。" } },
        { "@type": "Question", name: "5回プレイした後の次の目標は？", acceptedAnswer: { "@type": "Answer", text: "ひとつのコースに絞り、壁接触を減らすことを優先します。走行後に苦手なコーナーを一つだけ記録すると上達が見えやすくなります。" } },
      ] },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><InitialDApp /></>;
}

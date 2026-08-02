import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://touge-start.jp"),
  title: { default: "INITIAL D START LINE", template: "%s｜INITIAL D START LINE" },
  description: "頭文字D THE ARCADE初心者の攻略・成長記録・交流コミュニティ。",
  applicationName: "INITIAL D START LINE",
  keywords: ["頭文字D THE ARCADE", "頭文字D アーケード 攻略", "イニシャルD 初心者", "頭文字D 車種", "頭文字D コース"],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://touge-start.jp/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages へ静的書き出しするための設定。
  // 通常のビルド（vinext）と併用する。
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;

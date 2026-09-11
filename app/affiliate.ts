// アフィリエイトの設定。
// タグ・IDが未設定のときは、追跡パラメータの付かない通常リンクをそのまま返す。
// output: "export" のため値はビルド時に埋め込まれる。.env.local か CI の環境変数に置くこと。

export const amazonTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? "";
export const rakutenId = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID ?? "";

/** どちらか一方でも設定されていれば、広告表記を出す必要がある。 */
export const hasAffiliate = Boolean(amazonTag || rakutenId);

/** 商品を名指ししないための検索リンク。存在しない商品名や価格を書かずに済む。 */
export function amazonSearchUrl(keyword: string): string {
  const url = new URL("https://www.amazon.co.jp/s");
  url.searchParams.set("k", keyword);
  if (amazonTag) url.searchParams.set("tag", amazonTag);
  return url.toString();
}

export function rakutenSearchUrl(keyword: string): string {
  const raw = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
  if (!rakutenId) return raw;
  const encoded = encodeURIComponent(raw);
  return `https://hb.afl.rakuten.co.jp/hgc/${rakutenId}/?pc=${encoded}&m=${encoded}`;
}

/** アフィリエイトリンクに付ける rel。Google の指定どおり sponsored を入れる。 */
export const affiliateRel = "sponsored nofollow noopener";

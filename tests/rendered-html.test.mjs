import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("運営者ひとりのプレイ記録として描画される", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /INITIAL D START LINE/);
  assert.match(html, /遊んだ分だけ/);
  assert.match(html, /運営者ひとりが書いていく/);
  assert.match(html, /ストーリーモード 2周目/);
  assert.match(html, /難易度2/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

// 架空の利用者データを二度と載せないための番人。
// 2026年9月2日に、架空の投稿3件・投稿ランキング・貢献ドライバーランキング・
// 投票結果・月額応援メンバー・スポンサー掲載を削除した。
// 同じものが戻ってきたら、ここで落ちる。
test("実在しない利用者を装う表示が含まれない", async () => {
  const response = await render();
  const html = await response.text();
  for (const pattern of [
    /PLAY \/ AE86/,
    /PLAY \/ NA6CE/,
    /PLAY \/ S13/,
    /今週の参考になった投稿/,
    /初心者を助けたドライバー/,
    /TOP SUPPORTER/,
    /参考になった \d/,
    /今週のお題/,
    /YOUR CONTRIBUTION/,
    /月額応援メンバー/,
    /スポンサー掲載/,
    /DRIVERS ONLINE/,
  ]) {
    assert.doesNotMatch(html, pattern);
  }
});

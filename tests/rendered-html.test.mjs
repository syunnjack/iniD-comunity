import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the finished community site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /INITIAL D START LINE/);
  assert.match(html, /最初の一歩が/);
  assert.match(html, /今週のお題/);
  assert.match(html, /型に沿って1分で投稿/);
  assert.match(html, /YOUR CONTRIBUTION/);
  assert.match(html, /初心者にすすめたい車種は/);
  assert.match(html, /今週の参考になった投稿/);
  assert.match(html, /初心者を助けたドライバー/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

# touge-start.jp 公開チェックリスト

## ホスティング接続後

- [ ] ホスティング側へ `touge-start.jp` を追加
- [ ] ホスティング側が表示したA/CNAMEレコードをドメイン管理画面へ登録
- [ ] `www.touge-start.jp` を追加し、ルートドメインへ転送
- [ ] HTTPS証明書の発行完了を確認
- [ ] HTTP、www、ホスティング初期URLが `https://touge-start.jp/` へ統一されることを確認

## 公開確認

- [ ] トップ、投稿ガイドライン、プライバシーポリシー、404を確認
- [ ] `https://touge-start.jp/robots.txt` を確認
- [ ] `https://touge-start.jp/sitemap.xml` を確認
- [ ] OGP画像がSNSプレビューに表示されることを確認
- [ ] スマートフォンで走行ログと投稿の保存を確認

## 検索・計測

- [ ] Google Search Consoleへドメインプロパティを追加
- [ ] Search Console指定のTXTレコードをDNSへ追加
- [ ] `sitemap.xml` をSearch Consoleへ送信
- [ ] 必要ならGA4測定IDとSearch Console確認文字列をホスティング環境変数へ設定
- [ ] インデックス登録後、サイト名・説明・canonicalを確認

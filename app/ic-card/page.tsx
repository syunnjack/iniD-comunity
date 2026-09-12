import type { Metadata } from "next";
import Link from "next/link";
import "../ic-card.css";
import { amazonSearchUrl, rakutenSearchUrl, hasAffiliate, affiliateRel } from "../affiliate";

const origin = "https://touge-start.jp";
const title = "アミューズメントICカードとは｜頭文字D THE ARCADEと湾岸マキシを1枚で遊ぶ";
const description =
  "アミューズメントICカードはアーケードゲーム用ICカードの統一規格です。頭文字D THE ARCADE と 湾岸ミッドナイト マキシマムチューン は、どちらもこの規格に対応しているため、カード1枚で両方のデータを保存して遊べます。公式の記載をもとにまとめました。";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["アミューズメントICカード", "Aime", "Aimeカード 買い方", "頭文字D アーケード カード", "湾岸マキシ カード", "Bandai Namco Passport", "e-amusement pass", "KONAMI ID", "アミューズメントICカード データ移行"],
  alternates: { canonical: `${origin}/ic-card` },
  openGraph: { title, description, type: "article", locale: "ja_JP", url: `${origin}/ic-card`, images: [{ url: `${origin}/og.png`, width: 1536, height: 1024 }] },
  twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
};

const goods = [
  { keyword: "ICカードケース", note: "カードを剥き出しで持ち歩かずに済む。筐体のリーダーに当てる前に出し入れする回数が多いので、開け閉めの軽いものが向く。" },
  { keyword: "リール付き パスケース", note: "カードを本体から外さずにリーダーへ当てられる。落下と置き忘れの対策になる。" },
  { keyword: "カードスリーブ ハード", note: "印字面の擦れ対策。トレーディングカード用のハードスリーブを流用する人が多い。" },
  { keyword: "ICカード ステッカー", note: "同じ絵柄のカードが並ぶ店内で、自分のカードを取り違えないようにする。" },
];

export default function IcCard() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ja",
    mainEntity: [
      {
        "@type": "Question",
        name: "頭文字D THE ARCADEを遊ぶのにカードは必要ですか",
        acceptedAnswer: {
          "@type": "Answer",
          text: "カードが無くても遊べますが、プレイデータは保存されません。公式サイトは「Aimeなどの『アミューズメントICカード』を使うと、プレイデータを保存していつでも遊ぶことができます」と説明しており、アミューズメントICカードで初めてプレイすると初回無料とも記載しています。",
        },
      },
      {
        "@type": "Question",
        name: "頭文字D THE ARCADEと湾岸ミッドナイト マキシマムチューンは同じカードで遊べますか",
        acceptedAnswer: {
          "@type": "Answer",
          text: "どちらもアミューズメントICカードに対応しているため、対応カード1枚で両方のプレイデータを保存して遊べます。湾岸マキシの公式サイトは大会ルールで「Bandai Namco Passport（またはアミューズメントICカード）」と記載しています。",
        },
      },
      {
        "@type": "Question",
        name: "アミューズメントICカードはどこで買えますか",
        acceptedAnswer: {
          "@type": "Answer",
          text: "対応ゲーム機の設置店舗で購入します。Aime公式サイトに「対応ゲーム機の設置店舗でご購入ください」と記載があり、店舗によってカードベンダーや店内カウンターなど販売方法が異なります。取り扱いのない店舗もあります。",
        },
      },
      {
        "@type": "Question",
        name: "カード1枚で遊べるなら、登録するサイトも1つで済みますか",
        acceptedAnswer: {
          "@type": "Answer",
          text: "いいえ。Aime公式サイトには「1枚の『アミューズメントICカード』で各社対応タイトルやサービスを利用できますが、専用サイトの利用やデータの管理につきましては、カード裏面のアクセスコードで各社のIDサービスに登録いただく必要があります」と記載されています。コナミはKONAMI ID、バンダイナムコはバンダイナムコID、タイトーはNESiCA.net IDが必要です。",
        },
      },
    ],
  };

  return (
    <main className="ic-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link className="ic-back" href="/">← START LINE へ戻る</Link>
      <h1>アミューズメントICカードとは</h1>
      <p className="ic-lead">
        頭文字D THE ARCADE を始めるときに最初に迷うのがカードです。
        結論から書くと、<b>頭文字D THE ARCADEと湾岸ミッドナイト マキシマムチューンは、同じカード1枚で両方遊べます</b>。
        このページは公式が公表している内容だけをまとめたもので、運営者の推測は入れていません。
      </p>

      <section>
        <h2>アーケードゲーム用ICカードの統一規格</h2>
        <p>
          アミューズメントICカードは、Aime公式サイトの説明によれば「アーケードゲーム用ICカードの統一規格」です。
          対応したゲーム機・サービスで共通して利用できます。
        </p>
        <p>
          このロゴは、株式会社バンダイナムコエクスペリエンス、株式会社コナミアーケードゲームス、株式会社セガの3社が共同で管理する商標です。
          つまり<b>メーカーをまたいで使うことが前提の仕組み</b>で、非公式な裏技ではありません。
        </p>
        <div className="ic-note">
          <span>見分け方</span>
          <p>対応カードには、表面もしくは裏面にアミューズメントICロゴが付いています。ゲーム機側も、ICカード読み取り部に同じロゴが付いています。非対応機種では使えないため、購入前に各社の対応機種を確認してください。</p>
        </div>
      </section>

      <section>
        <h2>頭文字D THE ARCADE でカードを使うと何が変わるか</h2>
        <p>
          公式サイトの遊び方のページには、「Aimeなどの『アミューズメントICカード』を使うと、プレイデータを保存していつでも遊ぶことができます」と書かれています。
          カード無しでも遊べますが、<b>その日の記録は残りません</b>。
        </p>
        <div className="ic-note">
          <span>初回無料</span>
          <p>公式サイトには、「アミューズメントICカード」で初めてプレイすると初回無料と記載されています。最初の1回はカードを用意してから座るほうが得です。</p>
        </div>
      </section>

      <section>
        <h2>湾岸ミッドナイト マキシマムチューンでも同じカードが使える</h2>
        <p>
          湾岸マキシの公式サイトは、大会ルールやタイムアタック認定会の案内で、使用カードを
          「プレイヤー所有の<b>Bandai Namco Passport</b>（または<b>アミューズメントICカード</b>）」と記載しています。
        </p>
        <p>
          メーカーはセガとバンダイナムコで異なりますが、どちらもこの規格に対応しているため、
          <b>財布に入れるカードは1枚で足ります</b>。カードごとにデータが分かれるので、複数枚持つ理由は「別データを作りたいとき」だけです。
        </p>
        <p className="ic-cross">
          湾岸ミッドナイト マキシマムチューン 6RR PLUS の記録は、姉妹サイトの{" "}
          <a href="https://midnightpit.jp/" rel="noopener">WANGAN BASE</a>{" "}
          に書いています。
        </p>
      </section>

      <section>
        <h2>カードはどこで買うか</h2>
        <p>
          Aime公式サイトには「対応ゲーム機の設置店舗でご購入ください」と記載されています。
          店舗によってカードベンダー、店内カウンターなど販売方法が異なり、取り扱いのない店舗もあります。
        </p>
        <div className="ic-note ic-note-warn">
          <span>注意</span>
          <p>カード本体はゲームセンターの店頭で買うものです。通販で買えるのは、カードそのものではなく下に挙げたような周辺用品です。</p>
        </div>
      </section>

      <section>
        <h2>1枚で遊べるが、Web連携は各社べつ</h2>
        <p>
          ここは誤解されやすいところです。カードは1枚で足りますが、
          <b>専用サイトの利用とデータ管理には、会社ごとに別のIDが要ります</b>。
          Aime公式サイトのデータ管理の説明に、こう書かれています。
        </p>
        <div className="ic-note">
          <span>公式の記載</span>
          <p>1枚の「アミューズメントICカード」で各社対応タイトルやサービスを利用できますが、専用サイトの利用やデータの管理につきましては、カード裏面のアクセスコードで各社のIDサービスに登録いただく必要があります。</p>
        </div>
        <ul className="ic-sources">
          <li>コナミのゲーム専用サイト利用やデータ管理 … <b>KONAMI ID</b></li>
          <li>バンダイナムコのゲーム専用サイト利用やデータ管理 … <b>バンダイナムコID</b></li>
          <li>タイトーのゲーム専用サイト利用やデータ管理 … <b>NESiCA.net ID</b></li>
        </ul>
        <p>
          つまり湾岸マキシと頭文字D THE ARCADEを同じカードで遊んでいても、
          <b>Web側は別々に登録が要ります</b>。カードが1枚だからサイトも1つ、とはなりません。
        </p>
      </section>

      <section>
        <h2>データ移行にはできないことがある</h2>
        <p>
          アミューズメントICカードは、対応する各社ごとにデータを保持する領域を持っています。
          移行したいカードのその領域がまだ空であれば、データの移行が可能です。
          ただし公式に、できないことが明記されています。
        </p>
        <div className="ic-note ic-note-warn">
          <span>できないこと</span>
          <p>複数社のゲームが混ざっているカードどうしを1枚のカードにまとめることはできません。また、すでにデータが入っているカードに、同じ会社のゲームデータは移行できません。</p>
        </div>
        <p>
          カードを増やす前に知っておいたほうがよい制約です。
          複数社のゲームを別々のカードで始めてしまうと、あとから1枚にはまとめられません。
        </p>
      </section>

      <section>
        <h2>持ち運びと保護に使うもの</h2>
        {hasAffiliate && <p className="ic-pr">PR：この節のリンクは広告（アフィリエイト）です。</p>}
        <p>
          カードは筐体のリーダーに当てて使うので、出し入れの回数が多く、印字面が擦れます。
          運営者が実際に使って確認していないものを名指しで薦めることはしません。
          代わりに、探すときの入口だけ置いておきます。
        </p>
        <ul className="ic-goods">
          {goods.map((item) => (
            <li key={item.keyword}>
              <h3>{item.keyword}</h3>
              <p>{item.note}</p>
              <div className="ic-goods-links">
                <a href={amazonSearchUrl(item.keyword)} target="_blank" rel={affiliateRel}>Amazonで探す ↗</a>
                <a href={rakutenSearchUrl(item.keyword)} target="_blank" rel={affiliateRel}>楽天市場で探す ↗</a>
              </div>
            </li>
          ))}
        </ul>
        <p className="ic-disclaimer">
          価格、在庫、仕様はリンク先でご確認ください。購入や契約は各事業者との取引です。
          詳しくは<Link href="/disclosure">広告・PR方針</Link>をご覧ください。
        </p>
      </section>

      <section>
        <h2>出典</h2>
        <ul className="ic-sources">
          <li><a href="https://my-aime.net/glossary/aicc" target="_blank" rel="noopener">アミューズメントICカード紹介／Aimeサービスサイト ↗</a></li>
          <li><a href="https://initiald.sega.jp/guide/" target="_blank" rel="noopener">DACの始め方／頭文字D THE ARCADE 公式サイト ↗</a></li>
          <li><a href="https://wanganmaxi-official.com/" target="_blank" rel="noopener">湾岸ミッドナイト MAXIMUM TUNE 公式サイト ↗</a></li>
        </ul>
        <p className="ic-disclaimer">
          本ページはファンによる非公式サイトの記事です。ゲームメーカーおよび権利者各社とは関係ありません。
          仕様は変更される場合があるため、最終的な確認は各公式サイトでお願いします。
        </p>
      </section>
    </main>
  );
}

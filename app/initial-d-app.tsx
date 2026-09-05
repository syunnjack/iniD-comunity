"use client";

import { FormEvent, useEffect, useState } from "react";

// このサイトは運営者ひとりのプレイ記録。
// 以前は架空の投稿3件と、そこから算出する投稿ランキング・貢献者ランキング、
// 投票結果を初期表示として持っていたが、実在しない利用者を装うことになるため
// すべて削除した。載せてよいのは、公式が公表している情報と、運営者自身の記録だけ。

type DriverLog = { car: string; plays: number; course: string; memo: string };

// 運営者の現在地。ここは実際に確認できたことだけを書く。
// 新しい順に積む。上書きせず、報告した内容をそのまま残していく。
// 過去の記録が残っていないと、進んだのかどうかが自分でも分からなくなる。
const statusLog = [
  {
    updated: "2026年9月5日",
    mode: "ストーリーモード チャプター2 第四話",
    difficulty: "難易度2",
    note: "藤原拓海が倒せない状態が続いている。さすが主人公で、なかなかクリアできない。文太への挑戦はもっと難易度が高いのだろうと思う。",
  },
  {
    updated: "2026年9月3日",
    mode: "ストーリーモード チャプター1 第四話",
    difficulty: "難易度3",
    note: "難易度3で進めている。",
  },
  {
    updated: "2026年9月2日",
    mode: "ストーリーモード 2周目",
    difficulty: "難易度2",
    note: "1周目を終えて2周目に入ったところ。難易度2で走り直している。",
  },
];

const ownerStatus = statusLog[0];

const emptyLog: DriverLog = { car: "", plays: 0, course: "秋名", memo: "" };

// 以下は運営者が走った範囲での私見。攻略の断定はしない。
const starterSteps = [
  { no: "01", range: "1–2 PLAY", title: "まずは完走する", text: "ストーリーモードで操作を確認。速さより、ステアリングを戻す感覚を覚える。", tag: "操作に慣れる" },
  { no: "02", range: "3–5 PLAY", title: "ブレーキ位置を決める", text: "苦手なコーナーをひとつ選び、毎回同じ場所から減速して違いを見る。", tag: "再現性を作る" },
  { no: "03", range: "6–10 PLAY", title: "ひとつの峠を走り込む", text: "コースと車を固定。壁接触の回数を減らし、出口でアクセルを踏める形を目指す。", tag: "得意をひとつ" },
];

const courses = [
  { name: "秋名", direction: "下り", focus: "連続ヘアピン", tone: "red" },
  { name: "妙義", direction: "下り", focus: "高速コーナー", tone: "yellow" },
  { name: "碓氷", direction: "左周り", focus: "連続コーナー", tone: "blue" },
  { name: "赤城", direction: "下り", focus: "中高速の複合", tone: "white" },
];

const cars = [
  ["01", "TOYOTA", "SPRINTER TRUENO GT-APEX", "AE86"],
  ["02", "MAZDA", "ROADSTER", "NA6CE"],
  ["03", "MAZDA", "RX-7 ∞III", "FC3S"],
  ["04", "NISSAN", "SILVIA K's", "S13"],
];

export default function InitialDApp() {
  const [log, setLog] = useState(emptyLog);
  const [modal, setModal] = useState<"log" | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = localStorage.getItem("initial-d-start-line.driver");
      if (saved) setLog(JSON.parse(saved));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const saveLog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = { car: String(data.get("car")), plays: Number(data.get("plays")), course: String(data.get("course")), memo: String(data.get("memo")) };
    setLog(next); localStorage.setItem("initial-d-start-line.driver", JSON.stringify(next)); setModal(null);
  };

  return <main>
    <header className="site-header">
      <button className="brand" onClick={() => jump("top")} aria-label="INITIAL D START LINE ホーム"><span className="brand-slash">{"//"}</span><span>INITIAL D <b>START LINE</b><small>PLAY RECORD</small></span></button>
      <nav aria-label="メインメニュー"><button onClick={() => jump("status")}>いまの状況</button><button onClick={() => jump("start")}>覚えた順番</button><button onClick={() => jump("courses")}>コース</button><button onClick={() => jump("cars")}>車種</button></nav>
      <button className="log-button" onClick={() => setModal("log")}>自分のメモ</button>
    </header>

    <section className="hero" id="top">
      <div className="speed-lines" aria-hidden="true"/>
      <div className="hero-copy">
        <p className="eyebrow">INITIAL D THE ARCADE — ONE PLAYER RECORD</p>
        <h1>遊んだ分だけ、<br/><em>書いていく。</em></h1>
        <p className="hero-lead">頭文字D THE ARCADE を遊んだ記録を、運営者ひとりが書いていくサイトです。<br/>攻略の断定はしません。分かっていないことは、分かっていないと書きます。</p>
        <div className="hero-actions"><button className="primary" onClick={() => jump("status")}>いまの状況を見る <span>→</span></button><button className="secondary" onClick={() => jump("start")}>覚えた順番を見る</button></div>
      </div>
      <aside className="driver-card">
        <div className="card-head"><span>CURRENT STATUS</span><small>{ownerStatus.updated}</small></div>
        <div className="play-count"><small>DIFFICULTY</small><strong>{ownerStatus.difficulty.replace(/[^0-9]/g, "")}</strong><span>難易度</span></div>
        <div className="driver-info"><small>MODE</small><b>{ownerStatus.mode}</b><span>{ownerStatus.difficulty}</span></div>
        <div className="next-action"><span>→</span><div><small>NOTE</small><b>{ownerStatus.note}</b></div></div>
      </aside>
    </section>

    <section className="section" id="status">
      <div className="section-heading"><div><p className="kicker">CURRENT STATUS</p><h2>いまの状況</h2></div><p>運営者本人の進捗です。<br/>更新があったときだけ書き足します。</p></div>
      <div className="empty-posts"><b>{ownerStatus.mode}／{ownerStatus.difficulty}</b><p>{ownerStatus.note}（{ownerStatus.updated}時点）</p></div>
      <div className="step-grid">{statusLog.slice(1).map((entry) => <article key={entry.updated}><span className="step-no">{entry.updated}</span><h3>{entry.mode}</h3><p className="step-text">{entry.difficulty}／{entry.note}</p></article>)}</div>
      <p className="footnote">プレイ回数、使用車種、コース別のタイムは、まだ記録として残していません。書けるようになった時点でここに追記します。なお、以前このページが初期表示として持っていた架空の書き込みと集計表示は、実在しない利用者を装うことになるため2026年9月2日にすべて削除しました。</p>
    </section>

    <section className="section start-section" id="start">
      <div className="section-heading"><div><p className="kicker">WHAT I LEARNED FIRST</p><h2>最初に覚えた順番</h2></div><p>運営者が実際にやってみて、この順番が分かりやすかったという私見です。<br/>正解ではありません。</p></div>
      <div className="step-grid">{starterSteps.map((step) => <article key={step.no}><span className="step-no">{step.no}</span><p>{step.range}</p><h3>{step.title}</h3><div className="step-road"/><p className="step-text">{step.text}</p><b>✓ {step.tag}</b></article>)}</div>
    </section>

    <section className="section dark-panel" id="courses">
      <div className="section-heading"><div><p className="kicker">COURSE</p><h2>収録コース</h2></div><p>ゲームに収録されているコースです。<br/>練習テーマは運営者のメモです。</p></div>
      <div className="course-grid">{courses.map((course, index) => <article className={`course-card ${course.tone}`} key={course.name}><span>0{index+1}</span><div className="course-line"/><p>COURSE</p><h3>{course.name}<small>{course.direction}</small></h3><dl><div><dt>練習テーマ</dt><dd>{course.focus}</dd></div></dl></article>)}</div>
    </section>

    <section className="section" id="cars">
      <div className="section-heading"><div><p className="kicker">MACHINE</p><h2>車種</h2></div><p>名称のみを載せています。<br/>性能の比較やおすすめ度は付けていません。</p></div>
      <div className="car-list">{cars.map(car => <article key={car[0]}><span>{car[0]}</span><b>◇</b><div><small>{car[1]}</small><h3>{car[2]}</h3><em>{car[3]}</em></div></article>)}</div>
    </section>

    <footer className="footer">
      <div className="brand"><span className="brand-slash">{"//"}</span><span>INITIAL D <b>START LINE</b></span></div>
      <p>運営者ひとりのプレイ記録サイトです。掲示板や会員制度はありません。<br/>ファンによる非公式サイトで、ゲームメーカーおよび権利者各社とは関係ありません。ゲーム名、車名、商標等は各権利者に帰属します。</p>
    </footer>

    <nav className="mobile-nav" aria-label="モバイルメニュー">
      <button onClick={() => jump("top")}><b>⌂</b>ホーム</button>
      <button onClick={() => jump("status")}><b>◎</b>状況</button>
      <button onClick={() => jump("courses")}><b>↗</b>コース</button>
      <button onClick={() => setModal("log")}><b>♢</b>メモ</button>
    </nav>

    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
      <section className="modal" role="dialog" aria-modal="true" aria-label="自分のメモ" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setModal(null)}>×</button>
        <p className="kicker">MY MEMO</p>
        <h2>自分の記録をメモする</h2>
        <p>このメモはお使いの端末にだけ保存されます。運営者にも他の人にも送信されません。</p>
        <form onSubmit={saveLog}>
          <label>プレイ回数<input name="plays" type="number" min="0" defaultValue={log.plays} /></label>
          <label>使用車種<input name="car" defaultValue={log.car} placeholder="例：AE86" /></label>
          <label>練習中のコース<select name="course" defaultValue={log.course}>{courses.map(c => <option key={c.name}>{c.name}</option>)}</select></label>
          <label>次に意識すること<textarea name="memo" rows={3} defaultValue={log.memo} placeholder="例：壁に当たらず完走する" /></label>
          <button className="primary">保存する →</button>
        </form>
      </section>
    </div>}
  </main>;
}

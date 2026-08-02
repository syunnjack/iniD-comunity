"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type DriverLog = { name: string; car: string; plays: number; course: string; memo: string };
type Post = { id: number; category: string; title: string; body: string; author: string; tags: string[]; likes: number; time: string };

const defaultLog: DriverLog = { name: "ROOKIE DRIVER", car: "TOYOTA SPRINTER TRUENO GT-APEX (AE86)", plays: 5, course: "秋名・下り", memo: "壁に当たらず完走する" };
const starterSteps = [
  { no: "01", range: "1–2 PLAY", title: "まずは完走する", text: "ストーリーモードで操作を確認。速さより、ステアリングを戻す感覚を覚える。", tag: "操作に慣れる" },
  { no: "02", range: "3–5 PLAY", title: "ブレーキ位置を決める", text: "苦手なコーナーをひとつ選び、毎回同じ場所から減速して違いを見る。", tag: "再現性を作る" },
  { no: "03", range: "6–10 PLAY", title: "ひとつの峠を走り込む", text: "コースと車を固定。壁接触の回数を減らし、出口でアクセルを踏める形を目指す。", tag: "得意をひとつ" },
];
const courses = [
  { name: "秋名", direction: "下り", level: "BEGINNER ROUTE", focus: "連続ヘアピン", advice: "手前で減速して車体をまっすぐ戻す", tone: "red" },
  { name: "妙義", direction: "下り", level: "SPEED CONTROL", focus: "高速コーナー", advice: "細かな切り足しを減らし滑らかに曲がる", tone: "yellow" },
  { name: "碓氷", direction: "左周り", level: "RHYTHM", focus: "連続コーナー", advice: "次の曲がりを早めに見てリズムを作る", tone: "blue" },
  { name: "赤城", direction: "下り", level: "NEXT STEP", focus: "中高速の複合", advice: "無理に攻めず出口のラインを優先する", tone: "white" },
];
const cars = [
  ["01", "TOYOTA", "SPRINTER TRUENO GT-APEX", "AE86", "素直なFR / 基本を学びやすい"],
  ["02", "MAZDA", "ROADSTER", "NA6CE", "軽快 / コーナーの感覚をつかみやすい"],
  ["03", "MAZDA", "RX-7 ∞III", "FC3S", "旋回 / 丁寧な操作が身につく"],
  ["04", "NISSAN", "SILVIA K's", "S13", "バランス / 好みを探しやすい"],
];
const initialPosts: Post[] = [
  { id: 1, category: "初心者質問", title: "5回目。秋名の連続ヘアピンで壁に当たります", body: "ハンドルを切りすぎている気がします。減速する場所と戻すタイミングを教えてください。", author: "5 PLAY / AE86", tags: ["秋名", "初心者"], likes: 12, time: "18分前" },
  { id: 2, category: "攻略メモ", title: "最初の10プレイは車とコースを固定すると分かりやすい", body: "毎回条件を変えず、今日は壁接触を一回減らす、のように目標を一つにすると上達を感じられました。", author: "24 PLAY / NA6CE", tags: ["練習法", "10プレイ"], likes: 38, time: "42分前" },
  { id: 3, category: "走行記録", title: "碓氷左周り、初めてノーミスで完走", body: "タイムよりも先を見ることを意識。次は同じ走りを再現するのが目標です。", author: "11 PLAY / S13", tags: ["碓氷", "成長ログ"], likes: 21, time: "1時間前" },
];

export default function InitialDApp() {
  const [log, setLog] = useState(defaultLog);
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState("すべて");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<"log" | "post" | null>(null);

  useEffect(() => { const timer = window.setTimeout(() => { const savedLog = localStorage.getItem("initial-d-start-line.driver"); const savedPosts = localStorage.getItem("initial-d-start-line.posts"); if (savedLog) setLog(JSON.parse(savedLog)); if (savedPosts) setPosts(JSON.parse(savedPosts)); }, 0); return () => window.clearTimeout(timer); }, []);
  const filteredPosts = useMemo(() => posts.filter((post) => (filter === "すべて" || post.category === filter) && `${post.title} ${post.body} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [posts, filter, query]);
  const progress = Math.min(100, log.plays * 10);
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const saveLog = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); const next = { name: String(data.get("name")), car: String(data.get("car")), plays: Number(data.get("plays")), course: String(data.get("course")), memo: String(data.get("memo")) }; setLog(next); localStorage.setItem("initial-d-start-line.driver", JSON.stringify(next)); setModal(null); };
  const addPost = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); const next = { id: Date.now(), category: String(data.get("category")), title: String(data.get("title")), body: String(data.get("body")), author: `${log.plays} PLAY / ${log.name}`, tags: [String(data.get("tag") || "初心者")], likes: 0, time: "たった今" }; const updated = [next, ...posts]; setPosts(updated); localStorage.setItem("initial-d-start-line.posts", JSON.stringify(updated)); setModal(null); jump("community"); };

  return <main>
    <header className="site-header"><button className="brand" onClick={() => jump("top")} aria-label="INITIAL D START LINE ホーム"><span className="brand-slash">{"//"}</span><span>INITIAL D <b>START LINE</b><small>ROOKIE DRIVER COMMUNITY</small></span></button><nav aria-label="メインメニュー"><button onClick={() => jump("start")}>はじめ方</button><button onClick={() => jump("courses")}>コース</button><button onClick={() => jump("cars")}>車種</button><button onClick={() => jump("community")}>コミュニティ</button></nav><button className="log-button" onClick={() => setModal("log")}>走行ログ <b>{log.plays}</b></button></header>

    <section className="hero" id="top"><div className="speed-lines" aria-hidden="true"/><div className="hero-copy"><p className="eyebrow">INITIAL D THE ARCADE — BEGINNER COMMUNITY</p><h1>最初の一歩が、<br/><em>最速への一歩。</em></h1><p className="hero-lead">まだ5回。だから、いま知りたいことがわかる。<br/>走り方を学び、成長を残し、同じ目線の仲間とつながろう。</p><div className="hero-actions"><button className="primary" onClick={() => jump("start")}>最初の10プレイ攻略 <span>→</span></button><button className="secondary" onClick={() => setModal("post")}>質問を投稿する</button></div><p className="trust-note"><i/> 初心者の実体験から育てる、非公式コミュニティ</p></div>
      <aside className="driver-card"><div className="card-head"><span>MY START LINE</span><button onClick={() => setModal("log")}>編集 ↗</button></div><div className="play-count"><small>TOTAL PLAY</small><strong>{String(log.plays).padStart(2,"0")}</strong><span>RUNS</span></div><div className="driver-info"><small>DRIVER</small><b>{log.name}</b><span>{log.car}</span></div><div className="goal-row"><div><small>FIRST MILESTONE</small><b>10 PLAY</b></div><strong>{progress}%</strong></div><div className="progress"><i style={{ width: `${progress}%` }}/></div><div className="next-action"><span>→</span><div><small>NEXT FOCUS</small><b>{log.memo}</b><em>{log.course}で練習中</em></div></div></aside>
    </section>

    <div className="ticker"><b>ROOKIE NOTE</b><span>勝敗より、昨日より壁接触をひとつ減らす。</span><span>車とコースを固定すると変化が見える。</span><span>プレイ後の一言メモが上達を残す。</span></div>

    <section className="section start-section" id="start"><div className="section-heading"><div><p className="kicker">FIRST 10 PLAYS</p><h2>最初の10回で、<br/><em>何を覚える？</em></h2></div><p>速く走る前に、同じ操作を再現できるようになる。<br/>初心者の疑問に、順番で答えるロードマップ。</p></div><div className="step-grid">{starterSteps.map((step) => <article key={step.no}><span className="step-no">{step.no}</span><p>{step.range}</p><h3>{step.title}</h3><div className="step-road"/><p className="step-text">{step.text}</p><b>✓ {step.tag}</b></article>)}</div></section>

    <section className="section dark-panel" id="courses"><div className="section-heading"><div><p className="kicker">COURSE GUIDE</p><h2>ひとつの峠を、<br/><em>得意にする。</em></h2></div><p>コース選び・練習テーマ・初心者向けポイントを、<br/>短く引用しやすい形で整理しています。</p></div><div className="course-grid">{courses.map((course,index) => <article className={`course-card ${course.tone}`} key={course.name}><span>0{index+1}</span><div className="course-line"/><p>{course.level}</p><h3>{course.name}<small>{course.direction}</small></h3><dl><div><dt>練習テーマ</dt><dd>{course.focus}</dd></div><div><dt>最初のポイント</dt><dd>{course.advice}</dd></div></dl><button onClick={() => alert(`${course.name}の詳細攻略は、みんなの走行ログを集めながら追加予定です。`)}>攻略メモを見る ↗</button></article>)}</div></section>

    <section className="section" id="cars"><div className="section-heading"><div><p className="kicker">BEGINNER MACHINE GUIDE</p><h2>速さより先に、<br/><em>好きな相棒を。</em></h2></div><p>初心者に絶対の正解はありません。<br/>好きな車を長く使うことが、違いを知る近道です。</p></div><div className="car-list">{cars.map(car => <article key={car[0]}><span>{car[0]}</span><b>◇</b><div><small>{car[1]}</small><h3>{car[2]}</h3><em>{car[3]}</em></div><p>{car[4]}</p><button aria-label={`${car[2]}の詳細`}>↗</button></article>)}</div></section>

    <section className="section community" id="community"><div className="section-heading"><div><p className="kicker">COMMUNITY PASS</p><h2>初心者の「わからない」を、<br/><em>次の攻略に。</em></h2></div><button className="primary" onClick={() => setModal("post")}>＋ 新しい投稿</button></div><div className="community-tools"><div>{["すべて","初心者質問","攻略メモ","走行記録"].map(item => <button className={filter===item?"active":""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><label>⌕<input value={query} onChange={e => setQuery(e.target.value)} placeholder="コース・悩みを検索" aria-label="投稿を検索"/></label></div><div className="post-grid">{filteredPosts.map(post => <article key={post.id}><header><span>{post.category}</span><time>{post.time}</time></header><h3>{post.title}</h3><p>{post.body}</p><div className="tags">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><footer><b>{post.author}</b><button onClick={() => { const updated=posts.map(item=>item.id===post.id?{...item,likes:item.likes+1}:item); setPosts(updated); localStorage.setItem("initial-d-start-line.posts", JSON.stringify(updated)); }}>♡ {post.likes}</button></footer></article>)}</div></section>

    <section className="section faq" id="faq"><p className="kicker">QUICK ANSWERS</p><h2>初心者FAQ</h2><div><details open><summary>初めて遊ぶときは何から始める？</summary><p>ストーリーモードで操作に慣れましょう。最初の10プレイは勝敗より、壁に当たらず完走することを目標にします。</p></details><details><summary>初心者におすすめの車種は？</summary><p>一番は好きな車です。迷う場合は操作が素直なFR車を選び、同じ車で走り続けると変化を学びやすくなります。</p></details><details><summary>5回プレイした後の目標は？</summary><p>コースをひとつに絞り、壁接触を減らします。走行後に苦手なコーナーを一つだけ記録すると、次の練習が明確になります。</p></details></div></section>

    <section className="cta"><p className="kicker">YOUR NEXT RUN STARTS HERE</p><h2>次の1プレイに、<br/><em>ひとつの目標を。</em></h2><p>回数、コース、気づきを残せば、初心者の5回目も誰かの攻略になる。</p><button className="primary" onClick={() => setModal("log")}>走行ログを更新 <span>→</span></button></section>
    <footer className="footer"><div className="brand"><span className="brand-slash">{"//"}</span><span>INITIAL D <b>START LINE</b></span></div><p>ファンによる非公式コミュニティサイトです。ゲームメーカーおよび権利者各社とは関係ありません。<br/>ゲーム名・車名・商標等は各権利者に帰属します。投稿内容は個人の体験です。</p><div><a href="#start">はじめ方</a><a href="#faq">FAQ</a><a href="#community">投稿</a></div></footer>
    <nav className="mobile-nav" aria-label="モバイルメニュー"><button onClick={() => jump("top")}><b>⌂</b>ホーム</button><button onClick={() => jump("start")}><b>↗</b>攻略</button><button onClick={() => setModal("post")}><b>＋</b>投稿</button><button onClick={() => setModal("log")}><b>◇</b>ログ</button></nav>

    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={modal === "log" ? "走行ログを編集" : "新しい投稿"} onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)}>×</button>{modal === "log" ? <><p className="kicker">MY START LINE</p><h2>走行ログを更新</h2><form onSubmit={saveLog}><label>プレイヤーネーム<input name="name" defaultValue={log.name} required/></label><div className="form-row"><label>プレイ回数<input name="plays" type="number" min="0" max="9999" defaultValue={log.plays} required/></label><label>練習コース<select name="course" defaultValue={log.course}>{courses.map(c => <option key={c.name}>{c.name}・{c.direction}</option>)}</select></label></div><label>使用車種<input name="car" defaultValue={log.car} required/></label><label>次の目標<input name="memo" defaultValue={log.memo} required/></label><button className="primary">端末に保存 →</button></form></> : <><p className="kicker">NEW COMMUNITY POST</p><h2>経験を共有する</h2><form onSubmit={addPost}><label>カテゴリー<select name="category"><option>初心者質問</option><option>攻略メモ</option><option>走行記録</option></select></label><label>タイトル<input name="title" required placeholder="何を知りたい？ 何ができた？"/></label><label>本文<textarea name="body" rows={4} required placeholder="コース、車種、困った場面を書くと答えが集まりやすくなります"/></label><label>タグ<input name="tag" placeholder="例：秋名、ブレーキ"/></label><button className="primary">投稿する →</button></form></>}</section></div>}
  </main>;
}

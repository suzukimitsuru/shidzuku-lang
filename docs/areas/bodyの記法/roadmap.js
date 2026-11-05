// 領域「bodyの記法」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/bodyの記法",
  title: "bodyの記法",
  children: [],
  html: `
<p class="lead">状態: 検討中。ADR 0027(body の記法)を提案として起票した。決定は候補の書き比べの後に書く</p>
<figure>
  <svg viewBox="0 0 920 82" role="img" aria-label="領域「bodyの記法」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M260 53 C236 53, 232 53, 208 53"></path>
    <rect class="chip-adr" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U26 body の記法</text>
    <a class="node" href="decisions/0027-bodyの記法.md">
      <rect class="chip-adr" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0027 body の記法</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">提案 2026-09-28</text>
    <text class="tiny" x="762" y="57" text-anchor="middle">まだ無い</text>
  </svg>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0027-bodyの記法.md">ADR 0027 body の記法</a> <span class="note">U26・候補 B-1〜B-6(Go・Hike 風/Rust 風/TypeScript 風/ML 系/独自記法/出力言語で直に)・物差し8つ・決定は書き比べの後</span></span><span class="pill prog">提案</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <p class="note">まだ無い</p>
  </div>
</div>
`,
});

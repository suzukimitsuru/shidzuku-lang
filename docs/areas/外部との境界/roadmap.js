// 領域「外部との境界」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/外部との境界",
  title: "外部との境界",
  children: [],
  html: `
<p class="lead">状態: 未着手。ADR 0015・0018 が一部を決めている</p>
<figure>
  <svg viewBox="0 0 920 136" role="img" aria-label="領域「外部との境界」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <rect class="chip-rel" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U12 外部との境界</text>
    <text class="tiny" x="16" y="78" text-anchor="start">他の領域: 型と単位・記述と構造</text>
    <rect class="chip" x="8" y="94" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="111" text-anchor="middle">U20 役割の向きと通信</text>
    <text class="tiny" x="410" y="57" text-anchor="middle">まだ無い</text>
    <text class="tiny" x="762" y="57" text-anchor="middle">まだ無い</text>
  </svg>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <p class="note">まだ無い</p>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <p class="note">まだ無い</p>
  </div>
</div>
`,
});

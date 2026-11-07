// 領域「外部との境界」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/外部との境界",
  title: "外部との境界",
  children: [],
  html: `
<p class="lead">状態: 検討中。ADR 0015・0018 が一部を決めている。思考実験 33(外部との境界)で外部依存の書き場所の三案とフローの端点の二案を書き比べ、論点を出した。何も決めていない。実行モデルからの入力を一件保留</p>
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
    <a class="node" href="experiments/33-外部との境界.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">33 外部との境界</text>
    </a>
    <text class="tiny" x="620" y="78" text-anchor="start">U12・U20 の材料</text>
  </svg>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <p class="note">まだ無い</p>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/33-外部との境界.md">思考実験 33 外部との境界</a> <span class="note">U12・U20 の材料・外の相手の棚卸し(14 のコンポーネントのうち 10 が外の形式で授受)・外部依存の書き場所の三案・フローの端点の二案・外部の時刻表現・W0018-1・actor・役割の向きの範囲・論点は十</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>2026-11-05 — 思考実験 33 で外部との境界を書き比べた</b><br>外部世界との境界(U12)と役割の向きと通信の関係(U20)の材料として <a href="experiments/33-外部との境界.md">思考実験 33(外部との境界)</a> を行った。<a href="experiments/02-センサー収集パイプライン.md">思考実験 02</a> のセンサー収集と、<a href="decisions/0031-失敗の体系.md">ADR 0031</a> の受注の一生の PaymentBridge と決済代行を、外部依存の書き場所の三案(<code>depends</code> を広げる案・システムの <code>depends</code> に担い手を書く案・コンポーネントにも <code>external</code> を置く案)と、フローの端点の二案で書き下ろした。<b>「外部」は二つの軸の語だった</b> — <code>external</code> は誰が相手かを、役割「境界」は何の形で授受するかを言う。送ってくる相手と往復する相手まで書けるのは、コンポーネントにも <code>external</code> を置く案だけだった。外部を端点に書くと、外部の公開面・期限の測り手・外から来る流れの属性・<code>restart</code>・鍵の五つで今の規則が立たない。外部への要求には期限の書き場所が無く、その失敗は <a href="decisions/0031-失敗の体系.md">ADR 0031</a> の四つの置き場のどれにも決まって入らない。入りの道で <code>時点にする</code> を書ける層も無い。何も決めていない。</li>
</ul>
`,
});

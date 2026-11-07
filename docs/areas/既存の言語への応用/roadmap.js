// 領域「既存の言語への応用」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/既存の言語への応用",
  title: "既存の言語への応用",
  children: [],
  html: `
<p class="lead">状態: ADR 0026(shidzuku-lint の作成)を採用した。細い縦の試作の検証器ができてから着手し、継続して改良する(ADR 0033(試作を先に置く進め方))。実行モデルからの入力を一件保留</p>
<figure>
  <svg viewBox="0 0 920 98" role="img" aria-label="領域「既存の言語への応用」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M612 53 C588 53, 584 53, 560 53"></path>
    <a class="node" href="decisions/0026-shidzuku-lintの作成.md">
      <rect class="chip-done" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0026 shidzuku-lint の作成</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">採用 2026-09-28</text>
    <text class="tiny" x="268" y="78" text-anchor="start">他の領域: 動作環境・実行モデル</text>
    <a class="node" href="experiments/26-shidzuku-lint.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">26 shidzuku-lint</text>
    </a>
    <text class="tiny" x="108" y="57" text-anchor="middle">課題の番号を持たない</text>
  </svg>
  <figcaption>
    <ul>
      <li><b>ADR 0026</b>(採用 2026-09-28)— <a href="experiments/26-shidzuku-lint.md">思考実験 26</a> の論点1 に suzukimitsuru の判断で答えた。Shidzuku の考え方を既存の言語(Rust・TypeScript)へ届ける lint である shidzuku-lint を、Phase 1 の言語実装から作り、以後も仕様と共に改良する。<a href="decisions/0008-省略の禁止.md">ADR 0008</a>・<a href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">0013</a> が lint を退けたのは言語としての shidzuku-lang の判断であり、shidzuku-lint とは分けて考える。課題(U)を持たないため、ADR 0012 の出力先(U5)への関連だけを破線で引いた。<a href="spec/00-vision.md">第0章</a> 0.8 に反映した。</li>
    </ul>
  </figcaption>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0026-shidzuku-lintの作成.md">ADR 0026 shidzuku-lint の作成</a> <span class="note">全体・思考実験 26 の論点1・Phase 1 から継続・移せる11件と既にある10件(17件は要検討)・Rust/TypeScript と Hike</span></span><span class="pill done">採用 ✓</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/26-shidzuku-lint.md">思考実験 26 shidzuku-lint</a> <span class="note">検査を既存の言語の lint に移せるかで分ける・注釈なしで11件、宣言を足して17件</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>2026-09-28 — 既存の言語に移せる検査を抜き出した</b><br>suzukimitsuru の指示により、<a href="spec/03-constraints.md">第3章</a> 3.3 の検査と、それを支える宣言を、既存の言語(主に Rust と TypeScript)の lint(仮称 shidzuku-lint)に移せるかで分けた(<a href="experiments/26-shidzuku-lint.md">思考実験 26</a>)。<b>そのまま移せる11件・宣言を足せば移せる17件・既にある10件・移せない9群</b>になった。注釈なしで最も効くのは、既定が「無限」になっている所(期限の無い要求・上限の無い待ち行列)、公開面に名前の無い値を出す所(<code>bool</code>・素の数値)、システム時刻での経過時間の計測である。宣言を足せば、層の強度と役割と、意図の構造(<code>rejected</code> の組)が移る。<b>lint が届くのはコンポーネントの内側とその公開面まで</b>で、動作環境が担う物とプロセスを跨ぐ記述には届かない。<a href="decisions/0008-省略の禁止.md">ADR 0008</a>・<a href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">0013</a> が lint を退けたのは Shidzuku の中の話であり、本実験はその判断を覆さない。Shidzuku へ跳ね返る論点が3つ出た — 直和の分岐の「残り全部」と警告の抑止の書き方は <a href="PLAN.md">計画書</a> 第4節 4.5 の「Phase 1 の中で決める物」へ、外への要求の期限は U12 へ。shidzuku-lint を作るかどうかは suzukimitsuru の判断に委ねた。</li>
  <li><b>2026-09-28 — ADR 0026 で shidzuku-lint を作る事を決めた</b><br>suzukimitsuru の判断により、<a href="experiments/26-shidzuku-lint.md">思考実験 26</a> の論点1 に答えを出した(<a href="decisions/0026-shidzuku-lintの作成.md">ADR 0026</a>、起案と同日に採用)。理由は<b>他の言語での応用を言語仕様と共に考える事で得る物がある</b>事で、思考実験 26 だけで仕様の穴が3つ見つかった事がそれを裏付けている。<b>Phase 1 の言語実装から着手し、以後も継続して改良する</b>。範囲は、そのまま移せる11件と既にある10件(既存の lint を束ね、深刻度を Shidzuku に揃える)で、宣言を足せば移せる17件は宣言の置き場と構文を決めてから件ごとに判断する(要検討)。移せない9群は作らない。以後、検査を足す ADR は既存の言語に移せるかを併せて書く(<a href="PLAN.md">docs/PLAN.md</a> 第9節)。<b>shidzuku-lang と shidzuku-lint は分けて考える</b> — <a href="decisions/0008-省略の禁止.md">ADR 0008</a>・<a href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">0013</a> が lint を退けたのは言語としての shidzuku-lang の判断であり、既存の言語を対象とする shidzuku-lint の設計はそれに縛られない。対象の言語は Rust と TypeScript から始め、suzukimitsuru の指示で <a href="experiments/24-Hikeの取り組み.md">Hike</a> を検討した。shidzuku-lint の三つ目の対象に加え(既存の lint が無く「束ねる物が無い」場合を試す)、shidzuku-lang のトランスパイル先としては GC の無い言語での写像と寿命を試せるため <a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> 決定7 の候補に加える事を提案とし、接合面の凍結の後に判断する。<a href="spec/00-vision.md">第0章</a> 0.8 の実現戦略に反映した。</li>
</ul>
`,
});

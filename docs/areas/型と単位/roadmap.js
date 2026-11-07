// 領域「型と単位」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/型と単位",
  title: "型と単位",
  children: [],
  html: `
<p class="lead">状態: 決着(外部との境界からの入力を一件保留)。ADR 0009・0013・0019・0020・0021・0022・0028 を採用した(ADR 0010・0017 は破棄)</p>
<figure>
  <svg viewBox="0 0 920 500" role="img" aria-label="領域「型と単位」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M260 53 C236 53, 232 53, 208 53"></path>
    <path class="link" d="M260 91 C236 91, 232 53, 208 53"></path>
    <path class="link" d="M260 145 C236 145, 232 107, 208 107"></path>
    <path class="link link-rel" d="M260 145 C236 145, 232 53, 208 53"></path>
    <path class="link" d="M260 199 C236 199, 232 107, 208 107"></path>
    <path class="link link-rel" d="M260 199 C236 199, 232 53, 208 53"></path>
    <path class="link" d="M260 253 C236 253, 232 161, 208 161"></path>
    <path class="link link-rel" d="M260 253 C236 253, 232 53, 208 53"></path>
    <path class="link link-rel" d="M260 253 C236 253, 232 107, 208 107"></path>
    <path class="link" d="M260 307 C236 307, 232 161, 208 161"></path>
    <path class="link" d="M260 345 C236 345, 232 199, 208 199"></path>
    <path class="link link-rel" d="M260 345 C236 345, 232 107, 208 107"></path>
    <path class="link" d="M260 383 C236 383, 232 237, 208 237"></path>
    <path class="link link-rel" d="M260 383 C236 383, 232 107, 208 107"></path>
    <path class="link" d="M260 421 C236 421, 232 53, 208 53"></path>
    <path class="link" d="M612 129 C588 129, 584 145, 560 145"></path>
    <path class="link" d="M612 91 C588 91, 584 345, 560 345"></path>
    <path class="link" d="M612 357 C588 357, 584 345, 560 345"></path>
    <path class="link" d="M612 433 C588 433, 584 345, 560 345"></path>
    <path class="link" d="M612 281 C588 281, 584 383, 560 383"></path>
    <rect class="chip-done" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U9 データ型の記述</text>
    <text class="tiny" x="16" y="78" text-anchor="start">他の領域: 記述と構造</text>
    <rect class="chip-done" x="8" y="94" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="111" text-anchor="middle">U15 数値の型と単位</text>
    <text class="tiny" x="16" y="132" text-anchor="start">他の領域: 記述と構造</text>
    <rect class="chip-done" x="8" y="148" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="165" text-anchor="middle">U22 基本型の体系</text>
    <rect class="chip-done" x="8" y="186" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="203" text-anchor="middle">U23 数値型の設計全体</text>
    <rect class="chip-done" x="8" y="224" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="241" text-anchor="middle">U24 序数と基数の区別</text>
    <a class="node" href="decisions/0009-データ型の記述.md">
      <rect class="chip-done" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0009 データ型の記述</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">採用</text>
    <a class="node" href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">
      <rect class="chip-done" x="260" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="95" text-anchor="start">0013 文字列型の廃止・テキスト型・層</text>
    </a>
    <text class="tiny" x="550" y="95" text-anchor="end">採用</text>
    <text class="tiny" x="268" y="116" text-anchor="start">他の領域: 記述と構造・外部との境界・通信と失敗</text>
    <a class="node" href="decisions/0010-数値の型と単位.md">
      <rect class="chip-void" x="260" y="132" width="300" height="26" rx="13"></rect>
      <text class="chip-text-void" x="270" y="149" text-anchor="start">0010 数値の型と単位</text>
    </a>
    <text class="tiny" x="550" y="149" text-anchor="end">破棄 2026-09-03</text>
    <text class="tiny" x="268" y="170" text-anchor="start">他の領域: 外部との境界・通信と失敗</text>
    <a class="node" href="decisions/0017-数値型の体系.md">
      <rect class="chip-void" x="260" y="186" width="300" height="26" rx="13"></rect>
      <text class="chip-text-void" x="270" y="203" text-anchor="start">0017 数値型の体系</text>
    </a>
    <text class="tiny" x="550" y="203" text-anchor="end">破棄 2026-09-03</text>
    <text class="tiny" x="268" y="224" text-anchor="start">他の領域: 通信と失敗</text>
    <a class="node" href="decisions/0019-基本型の体系.md">
      <rect class="chip-done" x="260" y="240" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="257" text-anchor="start">0019 基本型の体系</text>
    </a>
    <text class="tiny" x="550" y="257" text-anchor="end">採用</text>
    <text class="tiny" x="268" y="278" text-anchor="start">他の領域: 外部との境界・通信と失敗・全体</text>
    <a class="node" href="decisions/0020-暦の拡張.md">
      <rect class="chip-done" x="260" y="294" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="311" text-anchor="start">0020 暦の拡張</text>
    </a>
    <text class="tiny" x="550" y="311" text-anchor="end">採用</text>
    <a class="node" href="decisions/0021-数値型の体系.md">
      <rect class="chip-done" x="260" y="332" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="349" text-anchor="start">0021 数値型の体系</text>
    </a>
    <text class="tiny" x="550" y="349" text-anchor="end">採用 2026-09-16</text>
    <a class="node" href="decisions/0022-単位の種別.md">
      <rect class="chip-done" x="260" y="370" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="387" text-anchor="start">0022 単位の種別</text>
    </a>
    <text class="tiny" x="550" y="387" text-anchor="end">採用 2026-09-17</text>
    <a class="node" href="decisions/0028-データ宣言の語.md">
      <rect class="chip-done" x="260" y="408" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="425" text-anchor="start">0028 データ宣言の語</text>
    </a>
    <text class="tiny" x="550" y="425" text-anchor="end">採用 2026-09-29</text>
    <a class="node" href="experiments/05-データの記述.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">05 データの記述</text>
    </a>
    <a class="node" href="experiments/06-数値と単位の記述.md">
      <rect class="chip" x="612" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="95" text-anchor="start">06 数値と単位の記述</text>
    </a>
    <a class="node" href="experiments/07-数値型の限界と指数部.md">
      <rect class="chip" x="612" y="116" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="133" text-anchor="start">07 数値型の限界と指数部</text>
    </a>
    <a class="node" href="experiments/09-数値以外の基本型の棚卸し.md">
      <rect class="chip" x="612" y="154" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="171" text-anchor="start">09 数値以外の基本型の棚卸し</text>
    </a>
    <a class="node" href="experiments/11-暦の拡張.md">
      <rect class="chip" x="612" y="192" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="209" text-anchor="start">11 暦の拡張</text>
    </a>
    <a class="node" href="experiments/12-採用後の全データ.md">
      <rect class="chip" x="612" y="230" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="247" text-anchor="start">12 採用後の全データ</text>
    </a>
    <a class="node" href="experiments/13-数える単位.md">
      <rect class="chip" x="612" y="268" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="285" text-anchor="start">13 数える単位</text>
    </a>
    <a class="node" href="experiments/14-数値型の再検討.md">
      <rect class="chip" x="612" y="306" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="323" text-anchor="start">14 数値型の再検討</text>
    </a>
    <a class="node" href="experiments/16-整数型の要否.md">
      <rect class="chip" x="612" y="344" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="361" text-anchor="start">16 整数型の要否</text>
    </a>
    <a class="node" href="experiments/17-主要言語の数値型の比較.md">
      <rect class="chip" x="612" y="382" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="399" text-anchor="start">17 主要言語の数値型の比較</text>
    </a>
    <a class="node" href="experiments/18-幅と位取りの数値型.md">
      <rect class="chip" x="612" y="420" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="437" text-anchor="start">18 幅と位取りの数値型</text>
    </a>
    <a class="node" href="experiments/19-単位の種別.md">
      <rect class="chip" x="612" y="458" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="475" text-anchor="start">19 単位の種別</text>
    </a>
  </svg>
  <figcaption>
    <ul>
      <li><b>基本型の ADR</b>(0009・0010・0013・0017・0019・0020・0021)— <b>0010・0017 は破棄</b>され、数値型は思考実験 14〜18 を経て <b>ADR 0021</b> として起案し直し、<b>2026-09-16 に採用した</b>。これで 0009・0013・0019・0020・0021 が揃い、基本型 11 種が確定している。</li>
      <li><b>第6章の新設</b> — ステップ2(0009・0013・0019・0020)の採用による。数値の節(6.2・6.3)は 2026-09-16 の <b>ADR 0021</b> の採用で書き直した。第4章・第5章と同じく段に属さず段を跨ぐため、段の順の後ろに置く。</li>
      <li><b>ADR 0017</b>(破棄)— 0010 を改訂し、数値型を <code>実数</code>(IEEE 754 binary64)と <code>十進数</code> の2つにするものだった。</li>
      <li><b>ADR 0019</b>(採用)— 0009 の基本型の一覧を10(論理・整数・実数・十進数・テキスト・バイト列・時点・日付・時刻・時間帯)に確定し(数値の3つは ADR 0021 が <code>int</code>・<code>uint</code>・<code>float</code>・<code>dec</code> に置き換えた)、<code>期間</code> と <code>時間量</code> を外した。暦は <code>日付</code> の型の欄(単位と同じ形)、日時は直積で書き、<code>日付</code> は紀元前まで表す。</li>
      <li><b>ADR 0020</b>(採用)— 0019 の暦を改訂し、記述者が紀年法(和暦・仏暦)を宣言できるようにする。</li>
      <li><b>ADR 0021</b>(採用 2026-09-16)— 0010・0017 の後継。数値型は <code>int8〜int256(s)</code>・<code>uint8〜uint256(s)</code>・<code>float32/64</code> と、内部計算用の <code>dec(i.f)</code> の4種。<b>幅(または宣言した桁)で上限を、位取りで刻みを型に書く</b>。単位の欄は必須で、単位なしは <code>unitless</code>。暗黙の変換は1本も無く、桁溢れはラップもトラップもせず失敗とする。<code>dec</code> は格納が可変長だが上界は宣言が言い、跨ぐ値・状態・外部には書けない。<code>float128</code> はハードウェアと出力先の事情から置かない。</li>
      <li><b>ADR 0022</b>(採用 2026-09-17)— 0021 の決定4・決定11 を改訂した。量を<b>比率・計数・計量・位置</b>の4種別に分けて宣言し、乗除算は強さの順(比率 &lt; 計数 &lt; 計量)で決める。数える量は掛けると単位が消え(<code>円 × 個 = 円</code>)、位置の量(<code>版目</code>・<code>要素目</code>)は差とだけ足せる。U24(序数と基数)を新しい基本型なしで解いた。第6章 6.3 に「量の種別」、第3章 3.3 に E0022-1〜E0022-5 として反映済み。</li>
    </ul>
  </figcaption>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0009-データ型の記述.md">ADR 0009 データ型の記述</a> <span class="note">U9・構成子と基本型の一覧(数値は 0021 が確定)</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0010-数値の型と単位.md">ADR 0010 数値の型と単位</a> <span class="note">U15・後継は ADR 0021(採用)</span></span><span class="pill todo">破棄</span></li>
      <li><span class="what"><a href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">ADR 0013 文字列型の廃止・テキスト型・層モデル</a> <span class="note">U9/U3・層も基本型も反映済み(第6章)</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0017-数値型の体系.md">ADR 0017 数値型の体系</a> <span class="note">U15・0010 と共に取り下げ。後継は 0021</span></span><span class="pill todo">破棄</span></li>
      <li><span class="what"><a href="decisions/0019-基本型の体系.md">ADR 0019 基本型の体系</a> <span class="note">U22・時点/日付(暦の欄)/時刻/時間帯。決定2・7(数値)は 0021 が置換</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0020-暦の拡張.md">ADR 0020 暦の拡張</a> <span class="note">U22・0019 の暦を改訂・紀年法を記述者が宣言</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0021-数値型の体系.md">ADR 0021 数値型の体系</a> <span class="note">U23・U15・0010/0017 の後継・幅で上限、位取りで刻み</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0022-単位の種別.md">ADR 0022 単位の種別</a> <span class="note">U24・U15・0021 を改訂・数える量は掛けると消え、位置は差とだけ足せる</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0028-データ宣言の語.md">ADR 0028 データ宣言の語</a> <span class="note">U9・0009 を改訂・<code>data</code> を直積 <code>record</code>・直和 <code>choice</code>・識別子型 <code>id</code> に分ける・起案と同日に採用</span></span><span class="pill done">採用 ✓</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/05-データの記述.md">思考実験 05 データの記述</a> <span class="note">01〜04 の横断検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/06-数値と単位の記述.md">思考実験 06 数値と単位の記述</a> <span class="note">U15 の検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/07-数値型の限界と指数部.md">思考実験 07 数値型の限界と指数部</a> <span class="note">ADR 0010 の反証試験</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/09-数値以外の基本型の棚卸し.md">思考実験 09 数値以外の基本型の棚卸し</a> <span class="note">ADR 0009 の裏付け試験・instant と暦の調査</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/11-暦の拡張.md">思考実験 11 暦の拡張</a> <span class="note">和暦とイスラム暦は書けるか</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/12-採用後の全データ.md">思考実験 12 採用後の全データ</a> <span class="note">ステップ2 の採用の検証・U23 を新設</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/13-数える単位.md">思考実験 13 数える単位</a> <span class="note">U23 の制限案の検証・U24 を新設</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/14-数値型の再検討.md">思考実験 14 数値型の再検討</a> <span class="note">ADR 0010・0017 破棄後・他言語の比較</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/16-整数型の要否.md">思考実験 16 整数型の要否</a> <span class="note">ADR 0021 の反証試験・整数を十進数に畳めるか</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/17-主要言語の数値型の比較.md">思考実験 17 主要言語の数値型の比較</a> <span class="note">ビット幅と範囲・桁溢れの扱いの4分類</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/18-幅と位取りの数値型.md">思考実験 18 幅と位取りの数値型</a> <span class="note">確定した型での書き下ろし・3つの論点と dec の検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/19-単位の種別.md">思考実験 19 単位の種別</a> <span class="note">比率・計数・計量・位置の4種別・U24 の検証</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>思考実験 07 → ADR 0017</b><br>ADR 0010 の限界(近似が本質の計算が書けない)への差し戻しであり、このループが一周した例である。</li>
  <li><b>思考実験 09 → U22 と ADR 0019</b><br>ADR 0017 が数値型を軽くした副作用で 19 桁の値(ナノ秒の時点)の置き場所が消えていた事が、整数型を置く直接の理由である。これも思考実験が ADR へ差し戻した例である。</li>
  <li><b>思考実験 10 → ADR 0019 を同日に改訂</b><br>6点の穴(時刻に長さを足せない・曜日が無い・整数の単位換算が無い・隔たりの桁溢れ 等)を見つけた。</li>
  <li><b>思考実験 11 → ADR 0020 の起案</b><br>「元号は版が変わる表だから持たない」という判断が、退ける対象を取り違えていた事を示した。</li>
  <li><b>ステップ2 の5本を採用し、第6章「データと型」を新設</b></li>
  <li><b>思考実験 12 → U23 を新設</b><br>思考実験 01〜11 の全データを仕様書だけで書き直し、全て書けた上で5つの論点が出た。2つは仕様書の文面で閉じ、スカラー倍の穴が U23 となった。</li>
  <li><b>思考実験 13 → U24 を新設</b><br>U23 への「数える値にも単位を持たせる」案を検証し、単位の軸と数値型の軸が直交している事(この案では U23 が解けない事)を示した。</li>
  <li><b><a href="experiments/17-主要言語の数値型の比較.md">思考実験 17</a>・<a href="experiments/18-幅と位取りの数値型.md">思考実験 18</a> → ADR 0021 の確定</b><br>主要言語11種を並べて「なぜ幅の違う整数型が複数あるのか」を確かめ(記憶域と実行時間の上界・外部形式との一致・ハードウェアの語長)、suzukimitsuru が数値型を <code>intN(s)</code>・<code>uintN(s)</code>・<code>floatN</code> に確定した。思考実験 18 でその型のまま金額計算を書き下ろし、3つの論点(除数の型・<code>float</code> の演算語彙・乗算の桁溢れ)と、中間結果が幅を食う問題を見つけた。後者への答えが内部計算専用の <code>dec(i.f)</code> であり、<b>宣言した桁が上界・可変長は表現の最適化</b>という形で、ADR 0010 が唯一残していた「桁の上界が定まらない <code>合算(列)</code>」の穴も内部では閉じた。</li>
  <li><b>2026-09-16 — 数値型が確定し、型の体系が閉じた</b><br><a href="decisions/0021-数値型の体系.md">ADR 0021</a> を採用した。U15・U23 が決着し、ADR 0019 の決定2・決定7 の凍結も解けた(決定7 は 0021 が置き換えた)。第6章 6.2・6.3 を書き直し、第3章 3.3 に E0021-1〜E0021-4 と実行時に戻る失敗7つを、第5章 5.3 に新しい基本型の語彙を入れた。<b>2026-09-03 から続いていた「数値型が宙に浮いている」状態は 13 日で解消した。</b>残る宿題は値域の宣言(幅より細かい上界)と、序数と基数の区別(U24)である。</li>
  <li><b>2026-09-29 — ADR 0028 でデータ宣言の語を分けた</b><br>Phase 1 の残る作業に入る前に、suzukimitsuru の指示で <code>data</code> の語を見直した。参照している言語から候補(<code>type</code>・<code>message</code>・<code>shape</code>・<code>term</code>・<code>value</code>、形ごとに分ける案)を比べ、suzukimitsuru の判断で<b>形ごとに分ける</b>事にした(<a href="decisions/0028-データ宣言の語.md">ADR 0028</a>、起案と同日に採用)。直積は <code>record</code>、直和は <code>choice</code>、識別子型は <code>id</code> を頭に置く。<a href="spec/05-notation.md">第5章</a> 5.3・<a href="spec/06-data.md">第6章</a> 6.1・6.6 に反映し、<a href="PLAN.md">docs/PLAN.md</a> と <code>data</code> を書いた思考実験 17 本の古い記述も書き換えた。</li>
</ul>
`,
});

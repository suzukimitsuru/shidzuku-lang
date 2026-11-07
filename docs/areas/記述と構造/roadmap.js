// 領域「記述と構造」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/記述と構造",
  title: "記述と構造",
  children: [],
  html: `
<p class="lead">状態: 図と実装の一致の範囲(U8)を除いて決着(実行モデルからの入力を一件保留)。コンポーネントの粒度の指針(U7)は採用後も反例を探し続ける</p>
<figure>
  <svg viewBox="0 0 920 558" role="img" aria-label="領域「記述と構造」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M260 53 C236 53, 232 53, 208 53"></path>
    <path class="link" d="M260 91 C236 91, 232 91, 208 91"></path>
    <path class="link" d="M260 183 C236 183, 232 145, 208 145"></path>
    <path class="link" d="M260 275 C236 275, 232 237, 208 237"></path>
    <path class="link link-rel" d="M260 237 C236 237, 232 199, 208 199"></path>
    <path class="link link-rel" d="M260 237 C236 237, 232 53, 208 53"></path>
    <path class="link link-rel" d="M260 129 C236 129, 232 91, 208 91"></path>
    <path class="link" d="M260 329 C236 329, 232 275, 208 275"></path>
    <path class="link link-rel" d="M260 329 C236 329, 232 199, 208 199"></path>
    <path class="link" d="M260 383 C236 383, 232 313, 208 313"></path>
    <path class="link link-rel" d="M260 421 C236 421, 232 275, 208 275"></path>
    <path class="link link-rel" d="M260 475 C236 475, 232 145, 208 145"></path>
    <path class="link" d="M260 529 C236 529, 232 145, 208 145"></path>
    <rect class="chip-done" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U1 意図の記述形式</text>
    <rect class="chip-done" x="8" y="78" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="95" text-anchor="middle">U3 内部階層の制約</text>
    <text class="tiny" x="16" y="116" text-anchor="start">他の領域: 型と単位</text>
    <rect class="chip-done" x="8" y="132" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="149" text-anchor="middle">U7 コンポーネントの粒度</text>
    <text class="tiny" x="16" y="170" text-anchor="start">他の領域: 型と単位</text>
    <rect class="chip-rel" x="8" y="186" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="203" text-anchor="middle">U8 図と実装の一致</text>
    <rect class="chip-done" x="8" y="224" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="241" text-anchor="middle">U17 識別子と語彙の表記</text>
    <rect class="chip-done" x="8" y="262" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="279" text-anchor="middle">U18 システムコンテキスト</text>
    <rect class="chip-done" x="8" y="300" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="317" text-anchor="middle">U19 検証番号の採番</text>
    <a class="node" href="decisions/0003-検証不能な意図の記述形式.md">
      <rect class="chip-done" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0003 検証不能な意図の記述形式</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">採用</text>
    <a class="node" href="decisions/0005-内部階層の制約宣言.md">
      <rect class="chip-done" x="260" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="95" text-anchor="start">0005 内部階層の制約宣言</text>
    </a>
    <text class="tiny" x="550" y="95" text-anchor="end">採用</text>
    <a class="node" href="decisions/0008-省略の禁止.md">
      <rect class="chip-done" x="260" y="116" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="133" text-anchor="start">0008 省略の禁止(全体制約)</text>
    </a>
    <text class="tiny" x="550" y="133" text-anchor="end">採用</text>
    <text class="tiny" x="268" y="154" text-anchor="start">他の領域: 通信と失敗</text>
    <a class="node" href="decisions/0006-コンポーネントの粒度の指針.md">
      <rect class="chip-done" x="260" y="170" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="187" text-anchor="start">0006 コンポーネントの粒度の指針</text>
    </a>
    <text class="tiny" x="550" y="187" text-anchor="end">採用 2026-09-18</text>
    <text class="tiny" x="268" y="208" text-anchor="start">他の領域: 全体</text>
    <a class="node" href="decisions/0007-ADRとC4モデルの考え方の取り込み.md">
      <rect class="chip-done" x="260" y="224" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="241" text-anchor="start">0007 ADR と C4 の考え方の取り込み</text>
    </a>
    <text class="tiny" x="550" y="241" text-anchor="end">採用</text>
    <a class="node" href="decisions/0014-識別子と言語語彙の表記.md">
      <rect class="chip-done" x="260" y="262" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="279" text-anchor="start">0014 識別子と言語語彙の表記</text>
    </a>
    <text class="tiny" x="550" y="279" text-anchor="end">採用</text>
    <text class="tiny" x="268" y="300" text-anchor="start">他の領域: 型と単位・プログラムの宣言</text>
    <a class="node" href="decisions/0015-C4モデルの命名の取り込み.md">
      <rect class="chip-done" x="260" y="316" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="333" text-anchor="start">0015 C4 モデルの命名の取り込み</text>
    </a>
    <text class="tiny" x="550" y="333" text-anchor="end">採用</text>
    <text class="tiny" x="268" y="354" text-anchor="start">他の領域: 外部との境界・プログラムの宣言</text>
    <a class="node" href="decisions/0016-検証番号の採番規則.md">
      <rect class="chip-done" x="260" y="370" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="387" text-anchor="start">0016 検証番号の採番規則</text>
    </a>
    <text class="tiny" x="550" y="387" text-anchor="end">採用</text>
    <a class="node" href="decisions/0018-システムの入れ子.md">
      <rect class="chip-done" x="260" y="408" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="425" text-anchor="start">0018 システムの入れ子</text>
    </a>
    <text class="tiny" x="550" y="425" text-anchor="end">採用 2026-09-25</text>
    <text class="tiny" x="268" y="446" text-anchor="start">他の領域: プログラムの宣言・外部との境界</text>
    <a class="node" href="decisions/0024-APoSDと結合バランスの考え方の取り込み.md">
      <rect class="chip-done" x="260" y="462" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="479" text-anchor="start">0024 APoSD と結合バランスの取り込み</text>
    </a>
    <text class="tiny" x="550" y="479" text-anchor="end">採用 2026-09-28</text>
    <text class="tiny" x="268" y="500" text-anchor="start">他の領域: プログラムの宣言</text>
    <a class="node" href="decisions/0025-粒度の指針に結合の釣り合いを加える.md">
      <rect class="chip-done" x="260" y="516" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="533" text-anchor="start">0025 粒度の指針に結合の釣り合い</text>
    </a>
    <text class="tiny" x="550" y="533" text-anchor="end">採用 2026-09-28</text>
    <a class="node" href="experiments/23-結合の釣り合い.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">23 結合の釣り合い</text>
    </a>
  </svg>
  <figcaption>
    <ul>
      <li><b>第5章の新設</b> — ADR 0014 は表記の基準であり、2026-08-29 の採用で日本語の語彙を英字へ読み替え、識別子の規則を置く第5章を新設した。</li>
      <li><b>ADR 0015</b>(採用)— 四段の命名を C4 に揃え、0014 の語彙表から <code>measure</code> を外して <code>unit</code> に戻す。</li>
      <li><b>ADR 0018</b>(採用 2026-09-25)— 0015 の「1プログラム = 1システム」と外部システムの判定基準を外し、<code>contains</code> にシステムを書けるようにした。採用に先立ち、コンポーネントとシステムが混在した <code>contains</code> の中で互いを呼べない穴を塞ぎ、<code>depends</code> の相手を<b>兄弟(同じ <code>contains</code>)と親の兄弟、そして <code>external</code></b> に揃えた。第1章 1.4・1.5、第2章 2.3、第3章 3.2 に反映した。</li>
      <li><b>ADR 0006</b>(採用 2026-09-18)— 1コンポーネント = 隠す設計判断が1つ。後続 ADR に追従させ、小さすぎのシグナルの比べる相手をシステムの intent に改め、内部階層の数と役割を分割のシグナルにしない事(0013 決定5)を取り込んだ。第2章 2.5 に反映した。U7 の検証は続ける。</li>
      <li><b>ADR 0024・0025</b>(起案 2026-09-26、採用 2026-09-28)— <a href="experiments/23-結合の釣り合い.md">思考実験 23</a> で既存の記述を結合バランスの三軸(強度・距離・変動性)で読み直して起案した。<a href="decisions/0024-APoSDと結合バランスの考え方の取り込み.md">0024</a> は APoSD の取り込み範囲と、既定値について APoSD と逆を選んだ理由(<a href="decisions/0008-省略の禁止.md">ADR 0008</a>)を記録し、結合バランスを検証ではなく物差しとして取り込む。<a href="decisions/0025-粒度の指針に結合の釣り合いを加える.md">0025</a> は <a href="decisions/0006-コンポーネントの粒度の指針.md">ADR 0006</a> の粒度の指針に、コンポーネントの間を見るシグナルを3つ足す。2026-09-28 に suzukimitsuru の判断で2本とも採用し、<a href="spec/00-vision.md">第0章</a> 0.9・<a href="spec/01-system-context.md">第1章</a> 1.5・<a href="spec/02-component.md">第2章</a> 2.5 に反映した。</li>
    </ul>
  </figcaption>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0003-検証不能な意図の記述形式.md">ADR 0003 検証不能な意図の記述形式</a> <span class="note">U1</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0005-内部階層の制約宣言.md">ADR 0005 内部階層の制約宣言</a> <span class="note">U3・0008/0013 が改訂</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0006-コンポーネントの粒度の指針.md">ADR 0006 コンポーネントの粒度の指針</a> <span class="note">U7・後続 ADR へ追従した上で 2026-09-18 に採用・層では割らない・継続検証</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0007-ADRとC4モデルの考え方の取り込み.md">ADR 0007 ADR と C4 の考え方の取り込み</a> <span class="note">U8 先行</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0008-省略の禁止.md">ADR 0008 省略の禁止</a> <span class="note">全体制約・0004/0005 を改訂</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0014-識別子と言語語彙の表記.md">ADR 0014 識別子と言語語彙の表記</a> <span class="note">U17・語彙は ASCII、名前は UTF-8・第5章を新設</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0015-C4モデルの命名の取り込み.md">ADR 0015 C4 モデルの命名の取り込み</a> <span class="note">U18・0007 の対応表と 0014 の語彙表を改訂</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0016-検証番号の採番規則.md">ADR 0016 検証番号の採番規則</a> <span class="note">U19・番号は E&lt;出自&gt;-&lt;連番&gt;</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0018-システムの入れ子.md">ADR 0018 システムの入れ子</a> <span class="note">U14 一部/U18・0015 を改訂・System Landscape・混在の穴を塞いだ上で 2026-09-25 に採用</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0024-APoSDと結合バランスの考え方の取り込み.md">ADR 0024 APoSD と結合バランスの考え方の取り込み</a> <span class="note">全体・思考実験 23 が材料・既定値は APoSD と逆を選ぶ・結合は物差しにし検証にしない</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0025-粒度の指針に結合の釣り合いを加える.md">ADR 0025 粒度の指針に結合の釣り合いを加える</a> <span class="note">U7・0006 にシグナルを足す・変わる理由/共有と同じ変化/束ね方・機械検証しない</span></span><span class="pill done">採用 ✓</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/23-結合の釣り合い.md">思考実験 23 結合の釣り合い</a> <span class="note">01・02・08・20・21 を強度・距離・変動性で読み直す・ADR 0024・0025 を起案</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>〜2026-08-28 — 内部階層とシステムコンテキストが確定</b><br>U1(意図)・U2(通信)・省略の禁止(ADR 0008)に続き、U3(ADR 0005・0013)と U18(ADR 0015)を採用した。配置の記述は ADR 0015 が「動作環境の設定として Phase 2 で決める」と答えた。</li>
  <li><b>2026-08-29 — 記述の表記が確定し、第5章が加わった</b><br>U17(ADR 0014)を採用した。</li>
  <li><b>2026-09-18 — ADR 0006 を後続の決定に追従させて採用し、ステップ3 が空になった</b><br><a href="decisions/0006-コンポーネントの粒度の指針.md">ADR 0006</a>(提案)は起案以来改訂されていなかった。<a href="decisions/0015-C4モデルの命名の取り込み.md">ADR 0015</a> に従って「ユニット」を「コンポーネント」に改めてファイル名も改め、小さすぎのシグナルの「親ユニット」を所属するシステムの intent に直し(コンポーネントは入れ子にならない)、<a href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">ADR 0013</a> の決定5 から「内部階層の数と役割は分割のシグナルにしない」を取り込んだ。<a href="experiments/08-多言語商品カタログ検索.md">思考実験 08</a>(15層でもコンポーネントは割れなかった)を裏付けに加え、<a href="experiments/10-多地域シフト勤怠.md">思考実験 10</a> の論点8(body の中の業務判断を intent が拾えない)を将来の検証に置いた。suzukimitsuru の判断により同日に採用し、<a href="spec/02-component.md">第2章</a> 2.5 に反映した。<b>決定の骨格は変わらず</b>、U7 の検証は続ける。</li>
  <li><b>2026-09-25 — ADR 0018 を採用し、判断待ちの ADR が無くなった</b><br>採否の判断に先立って読み直したところ、<b>決定1 と決定5 が噛み合っていない</b>事が分かった——決定1 はコンポーネントとシステムが一つの <code>contains</code> に混在してよいと定めたのに、決定5 の <code>depends</code> は相手をシステムに限っており、<b>混在させた当人どうしがどの行にも当たらない</b>。<code>depends</code> の相手を<b>兄弟(同じ <code>contains</code>)と親の兄弟、そして <code>external</code></b> に揃え、相手がコンポーネントかシステムかを問わない形にして塞いだ(検証番号は増えていない。E0018-3 の定義が広がった)。逆向きを「元の <code>ask</code> への後からの戻り(コールバック)」で説明する案は捨てた——<code>ask</code> は期限内に必ず返ると定めており(<a href="decisions/0004-ユニット間の通信モデル.md">ADR 0004</a>)、内側のシステムが自分から出す <code>ask</code>・<code>flow</code>(採番・監査)も説明できないためである。対になる通信の相関は<a href="spec/04-communication.md">第4章</a> 4.6 の未定事項に残した。<a href="spec/01-system-context.md">第1章</a> 1.4・1.5、<a href="spec/02-component.md">第2章</a> 2.3、<a href="spec/03-constraints.md">第3章</a> 3.2・3.3 に反映した。</li>
  <li><b>思考実験 23 → ADR 0024・0025 を起案した(2026-09-26)</b><br>系譜に挙げる APoSD(深いモジュール)は一つのコンポーネントの形を問うが、コンポーネントの間の関係を問う知見(Khononov の結合バランス)は参照していなかった。<a href="experiments/23-結合の釣り合い.md">思考実験 23</a> で既存の 01・02・08・20・21 を<b>強度・距離・変動性</b>で読み直すと、侵入結合の禁止・境界の層・<code>correlate</code> を同じ宣言に置く制約が、結合の語彙を使わずに釣り合いを保っていた。欠けていたのは<b>モデル結合(<code>data</code> の共有)の距離</b>で、08 の <code>商品の見出し</code> と 20 の <code>注文</code> は actor まで届いていた。U14 論点1・2 への入力(K-a・K-b)を<a href="PLAN.md">計画書</a> 第5節に記し、<a href="decisions/0024-APoSDと結合バランスの考え方の取り込み.md">ADR 0024</a>(取り込みの範囲と既定値の対比)と <a href="decisions/0025-粒度の指針に結合の釣り合いを加える.md">ADR 0025</a>(粒度のシグナル)を提案として起案した。</li>
</ul>
`,
});

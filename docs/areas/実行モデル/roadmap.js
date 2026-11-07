// 領域「実行モデル」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/実行モデル",
  title: "実行モデル",
  children: [],
  html: `
<p class="lead">状態: 検討中。ADR 0032(実行モデルと順序保証)を提案として起案し、決めてもらう事の五つは推奨の通りに決まった。細い縦の試作で仮に使い、その結果を材料に採否を決める</p>
<figure>
  <svg viewBox="0 0 920 136" role="img" aria-label="領域「実行モデル」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M260 72 C236 72, 232 53, 208 53"></path>
    <path class="link" d="M260 72 C236 72, 232 91, 208 91"></path>
    <path class="link" d="M612 53 C588 53, 584 72, 560 72"></path>
    <path class="link" d="M612 107 C588 107, 584 72, 560 72"></path>
    <rect class="chip-adr" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U10 実行モデル</text>
    <rect class="chip-adr" x="8" y="78" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="95" text-anchor="middle">U11 順序保証</text>
    <a class="node" href="decisions/0032-実行モデルと順序保証.md">
      <rect class="chip-adr" x="260" y="59" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="76" text-anchor="start">0032 実行モデルと順序保証</text>
    </a>
    <text class="tiny" x="550" y="76" text-anchor="end">提案 2026-11-05</text>
    <a class="node" href="experiments/24-Hikeの取り組み.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">24 Hikeの取り組み</text>
    </a>
    <text class="tiny" x="620" y="78" text-anchor="start">他の領域: 既存の言語への応用</text>
    <a class="node" href="experiments/32-実行モデルと順序.md">
      <rect class="chip" x="612" y="94" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="111" text-anchor="start">32 実行モデルと順序</text>
    </a>
  </svg>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0032-実行モデルと順序保証.md">ADR 0032 実行モデルと順序保証</a> <span class="note">U10・U11・中は逐次で待つ所で次を受ける・重ならない仕事の組を exclusive で宣言・仕事の起点は受け口と時計と期限切れ・flow の接続の中は FIFO・再送は追い越さない・pressure と ask の受け口に bound・ask の閉路は警告・exclusive は必須・決めてもらう事5つは推奨の通りに決定</span></span><span class="pill prog">提案</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/24-Hikeの取り組み.md">思考実験 24 Hike の取り組み</a> <span class="note">17件を突き合わせ・取り込む候補5件は U10 と Phase 1 への入力</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/32-実行モデルと順序.md">思考実験 32 実行モデルと順序</a> <span class="note">U10・U11 の材料・待たせる逐次/待つ所で次を受ける逐次/内側の並行を書き比べ・再入の害は状態と待つ所を持つ仕事にだけ出る・接続の中は FIFO・再送は追い越さない・待ち行列と仕事の上限・論点9つ</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>思考実験 24 → Hike の取り組みを突き合わせた(2026-09-26)</b><br>suzukimitsuru の指示により、プログラミング言語 Hike(Go に似た構文の、GC の無いシステム言語)の取り組み17件を仕様と突き合わせた(<a href="experiments/24-Hikeの取り組み.md">思考実験 24</a>)。<b>取り込む候補の5件は全てコンポーネントの内側に集まった</b> — 共有の仕方を宣言の側で言う(<code>threadable</code>・<code>concurrent</code>)、<code>ask</code> の送り出しと待ちを分ける、ロックの制限に倣って <code>ask</code> の閉路を検証器で見つける、の3つは U10(実行モデル)と <a href="spec/03-constraints.md">第3章</a> 3.5 の比較の材料に、元の記述への対応表(バックエンドの責務 G7)と、出力言語で直に書く逃げ道を置くなら全出力先の対を必須にする事の2つは Phase 1 と U12 への入力にした。テキストとバイト列の分離など5件は既に同じ判断をしており、既定の引数・綴りで決まる可視性・寿命の模型など7件は <a href="decisions/0008-省略の禁止.md">ADR 0008</a> か <a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> で切れた。何も決めておらず、<a href="spec/00-vision.md">第0章</a> 0.9 の系譜にも足していない。</li>
  <li><b>2026-10-08 — 思考実験 32 で実行モデルと順序を書き比べた</b><br>suzukimitsuru の指示で、コンポーネントの実行モデル(U10)とメッセージの順序保証(U11)の材料として <a href="experiments/32-実行モデルと順序.md">思考実験 32(実行モデルと順序)</a> を行った。<a href="experiments/04-分散KVストア.md">思考実験 04</a> の KVCore と受注の一生の OrderIntake を、待たせる逐次・待つ所で次を受ける逐次・内側の並行の三案で書き下ろした。<b>内側の並行は TypeScript に写せない。</b>待たせる逐次では読みが書きの詰まりに巻き込まれ、<code>ask</code> の閉路は必ず期限切れになる。待つ所で次を受けると、<b>状態と待つ所の両方を持つ仕事どうしで追い越しが起きる</b>ため、再入を公開面ごとに選ぶ形が要りそうである。順序は、接続の中の FIFO(先に入った物が先に出る)と、durable の再送で追い越さない事の二つを言えば足りる。<code>pressure block</code>・<code>drop</code> の上限と、<code>ask</code> の受け口・待つ所の仕事の上限も要る。何も決めていない。</li>
  <li><b>2026-10-15 — 再入を選ぶ単位を、全ての受け口に当てて数えた</b><br>suzukimitsuru の指示で、ADR の起案の前に <a href="experiments/32-実行モデルと順序.md">思考実験 32</a> の論点3 を <a href="experiments/01-注文管理サービス.md">思考実験 01</a>・<a href="experiments/02-センサー収集パイプライン.md">02</a>・<a href="experiments/04-分散KVストア.md">04</a> の全ての受け口に当てた(第10節)。14 の受け口と 1 つの時計で始まる仕事のうち、<b>待たせたいのは 3 か所</b>(KVCore の格納、Persister の書込記録、Aggregator の時計の締めと受け口の組)だった。<b>害は受け口ではなく仕事の組に出る</b>ため、重ならない仕事の組を宣言する形(仮の語 <code>exclusive</code>)が合う。Persister の害は <code>state</code> に無いログのファイルから出ており、状態の宣言からは推せない。待つ所の範囲と、公開面から始まらない仕事(時計・<code>on expiry</code>)に言語の形が無い事も分かった。</li>
  <li><b>2026-11-05 — ADR 0032 で実行モデルと順序保証を起案した</b><br><a href="experiments/32-実行モデルと順序.md">思考実験 32(実行モデルと順序)</a> と <a href="experiments/24-Hikeの取り組み.md">思考実験 24</a> の論点1〜4 を材料に、<a href="decisions/0032-実行モデルと順序保証.md">ADR 0032(実行モデルと順序保証)</a> を提案として起案した。<b>コンポーネントの中は逐次とし、待つ所で次の仕事を受ける。</b>待つ所は <code>ask</code> の応答・<code>pressure block</code> の受付・<code>io</code> の層の外部への入出力の三つである。害は受け口ではなく仕事の組に出るため、<b>重ならない仕事の組を <code>exclusive</code> で名指す</b>形を採り、全ての仕事を一組にすれば待たせる逐次になる。仕事の起点は受け口・時計・期限切れの三つとし、時計の仕事を <code>timer</code>(仮の語)で宣言する。順序は <code>flow</code> の接続の中の FIFO と、durable の再送で「重複はあり得るが追い越しは無い」事の二つだけを約束する。<code>pressure block</code>・<code>drop</code> と <code>ask</code> の受け口に <code>bound</code> を書き、<code>ask</code> の閉路は警告とする。接合面には時計の仕事を起こす呼び出しを足す(<a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> の改訂)。<code>exclusive none</code> を書かせるか等、suzukimitsuru に決めてもらう事を五つ、推奨を添えて残した。採否は決めていない。</li>
  <li><b>2026-11-06 — ADR 0032 の決めてもらう事を推奨の通りに決めた</b><br>suzukimitsuru の判断により、<a href="decisions/0032-実行モデルと順序保証.md">ADR 0032(実行モデルと順序保証)</a> の決めてもらう事の五つを全て推奨の通りに決めた。<b>exclusive は必須とし、重ならない組を持たないコンポーネントも exclusive none と書く。</b>時計の仕事は constraint に timer で書き、ask の受け口の上限は expose の欄に受け口ごとに書く。durable の bound は件数一つで記憶と永続の記憶域を縛る。ask の閉路は、フローの段は警告、body で exclusive の組に閉じる物はエラーとする。状態は提案のままで、採否はこれから決める。</li>
</ul>
`,
});

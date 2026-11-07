// 領域「全体」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/全体",
  title: "全体",
  children: [],
  html: `
<p class="lead">状態: 継続。2026-11-07 に ADR 0033(試作を先に置く進め方)を採用し、最小の言語実装(Phase 1)へ移った。試作の順と仮置きは <a href="PLAN.md">docs/PLAN.md</a> 第4節(最小の言語実装(Phase 1)の進め方)にある</p>
<figure>
  <svg viewBox="0 0 920 380" role="img" aria-label="領域「全体」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <a class="node" href="decisions/0002-プロジェクト名の再考.md">
      <rect class="chip-done" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0002 プロジェクト名の再考</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">採用</text>
    <a class="node" href="decisions/0033-試作を先に置く進め方.md">
      <rect class="chip-done" x="260" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="95" text-anchor="start">0033 試作を先に置く進め方</text>
    </a>
    <text class="tiny" x="550" y="95" text-anchor="end">採用</text>
    <a class="node" href="experiments/01-注文管理サービス.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">01 注文管理サービス</text>
    </a>
    <a class="node" href="experiments/02-センサー収集パイプライン.md">
      <rect class="chip" x="612" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="95" text-anchor="start">02 センサー収集パイプライン</text>
    </a>
    <a class="node" href="experiments/03-画像変換サービス.md">
      <rect class="chip" x="612" y="116" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="133" text-anchor="start">03 画像変換サービス</text>
    </a>
    <text class="tiny" x="620" y="154" text-anchor="start">他の領域: 記述と構造</text>
    <a class="node" href="experiments/04-分散KVストア.md">
      <rect class="chip" x="612" y="170" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="187" text-anchor="start">04 分散KVストア</text>
    </a>
    <a class="node" href="experiments/08-多言語商品カタログ検索.md">
      <rect class="chip" x="612" y="208" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="225" text-anchor="start">08 多言語商品カタログ検索</text>
    </a>
    <a class="node" href="experiments/10-多地域シフト勤怠.md">
      <rect class="chip" x="612" y="246" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="263" text-anchor="start">10 多地域シフト勤怠</text>
    </a>
    <text class="tiny" x="620" y="284" text-anchor="start">他の領域: 型と単位</text>
    <a class="node" href="experiments/28-シンプリシティとの比較.md">
      <rect class="chip" x="612" y="300" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="317" text-anchor="start">28 シンプリシティとの比較</text>
    </a>
    <a class="node" href="experiments/31-反証と肯定.md">
      <rect class="chip" x="612" y="338" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="355" text-anchor="start">31 反証と肯定</text>
    </a>
    <text class="tiny" x="108" y="57" text-anchor="middle">課題の番号を持たない</text>
  </svg>
  <figcaption>
    <ul>
      <li><b>線の引き方</b> — 章と課題の線は、その章が依拠と宣言している ADR と、その ADR が決める課題を繋いだもの。第0章は依拠行を持たないため、本文(0.3 四つの段・0.5 省略の禁止・0.9 参照する系譜)に反映されている ADR から引き、破線とした。</li>
      <li><b>番号について</b> — ADR 0011 は欠番。検証番号は ADR 0016 により <code>E&lt;出自&gt;-&lt;連番&gt;</code> 形式で、出自はその検査を定めた ADR の番号(<code>0000</code> は仕様書本体)。</li>
    </ul>
  </figcaption>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0002-プロジェクト名の再考.md">ADR 0002 プロジェクト名の再考</a></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0033-試作を先に置く進め方.md">ADR 0033 試作を先に置く進め方</a> <span class="note">Phase 1 へ今移る・未決の課題は試作で仮に決めて確かめる・動いた事を仕様へ書き戻す</span></span><span class="pill done">採用 ✓</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/01-注文管理サービス.md">思考実験 01 注文管理サービス</a> <span class="note">U1 の実地検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/02-センサー収集パイプライン.md">思考実験 02 センサー収集パイプライン</a> <span class="note">U2/U3/U7 の検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/03-画像変換サービス.md">思考実験 03 画像変換サービス</a> <span class="note">ADR 0004〜0006 の検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/04-分散KVストア.md">思考実験 04 分散 KV ストア</a> <span class="note">第2〜4章の検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/08-多言語商品カタログ検索.md">思考実験 08 多言語商品カタログ検索</a> <span class="note">ADR 0013・0015 の新題材での検証</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/10-多地域シフト勤怠.md">思考実験 10 多地域シフト勤怠</a> <span class="note">ADR 0019 の反証試験・時間軸/暦/時間帯</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/28-シンプリシティとの比較.md">思考実験 28 シンプリシティとの比較</a> <span class="note">Dave Thomas の思想と並べる・目指す所は同じで手段が違う・系譜には含めない</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/31-反証と肯定.md">思考実験 31 反証と肯定</a> <span class="note">今のプログラマが受け入れない所と、プログラマ以外への良い影響・費用は書き手、利益は読み手・強い反証は生態系と外部世界と警告の抑止・最も強い肯定は値が化けない事</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>思考実験 08 → U19〜U21 を新設</b><br>U19(検証番号の採番)は ADR 0016 で即日決着した。論点5 は解決したのではなく問い自体が消えた — ADR 0018(採用)が「1プログラム = 1システム」を外してシステムの入れ子(C4 の System Landscape)を許し、外部システムの判定基準を廃した(<code>external</code> に書いた物が外部システムである)ためである。</li>
  <li><b>2026-09-03 — 4つの方向のうち3つを白紙から再検討</b><br>U14 の論点は計画書 第5節に8つへ展開し、方向の上で残る問題は第6節に置いた。その上で suzukimitsuru が次のように決めた。
    <ul>
      <li><b>数値型(U23)</b> — ADR 0010・0017 を破棄。思考実験 14 で金融機関(COBOL・BigDecimal・C# decimal)と科学技術計算(Fortran の KIND・単精度・区間演算)を比較し、7つの論点にまとめた</li>
      <li><b>名前空間(U14 論点4・5)</b> — 逆ドメイン名を撤回。思考実験 15 で Java・Rust・Common Lisp・Unison 等を比較し、<code>contains</code> の木構造(ADR 0018)をそのまま名前空間にできる可能性を示した</li>
      <li><b><a href="experiments/16-整数型の要否.md">思考実験 16</a> → ADR 0021 の改訂</b> — <code>十進数(0)</code> が任意精度の整数になったため、ADR 0019 が <code>整数</code> を置いた根拠は失効していた。suzukimitsuru の指定(外部との接合は幅付き整数・時間の型は内部で整数保持でよい)を受け、<code>整数</code> を基本型から外して数値型を2つにし、幅付き整数は境界の宣言に移した</li>
      <li><b>可視性のキーワード(U14 論点1)</b> — <code>expose</code> の流用を撤回し、<code>share</code> を候補として提案した</li>
      <li><b>組み込みの区分名(U14 論点2)</b> — 第6章 6.1 の指針(不在の区分名は何が無いのかを言う)と衝突するため、撤回のまま確定した</li>
    </ul>
  </li>
  <li><b>2026-09-26 — Phase 1 へ移るまでの計画を立てた</b><br>ADR 0023 の採用で一度判断待ちが無くなった所で、残る判断を三つに振り分けた。思考実験 23・24 の結果も反映してある(<a href="PLAN.md">docs/PLAN.md</a> 第4節 4.5)。<b>Phase 1 の前に決める物</b>は U13 → U10・U11 → U12・U20 → U14 → 移行点検の順である。U20 は U12 と同じく「外部」の語義を問うため U12 と同じ行に加え、U14 は決定フェーズが Phase 0〜1 だが、パーサの単位と名前の解決に要るため前に置いた。思考実験 24 の論点4 を受けて、ask の閉路の扱いは U10 の再入と組にして U10・U11 の行で決める。0024・0025 の採否はいつでもよいが、U14 の起案より前とする。<b>Phase 1 の中で決める物</b>は U16(接合面の凍結の前)・U21(検証器が E0013-3 を実装する時)・語の綴り・依存の循環 等であり、<b>Phase 2 以降へ送る物</b>は U4・U6・U8 である。移行の条件・成果物の題材(<a href="experiments/04-分散KVストア.md">思考実験 04</a> を推奨)・文法を書く時期など五つを、suzukimitsuru の判断に委ねた。</li>
  <li><b>2026-09-28 — Phase 1 へ移る計画を見直した</b><br><a href="experiments/26-shidzuku-lint.md">思考実験 26</a> と <a href="decisions/0026-shidzuku-lintの作成.md">ADR 0026</a>(shidzuku-lint の作成)を受けて、<a href="PLAN.md">docs/PLAN.md</a> 第4節 4.5 を見直した。順序(U13 → U10・U11 → U12・U20 → U14 → 移行点検)は変わらない。変えた所は四つである — <b>移行の条件 M1〜M5 は shidzuku-lint の着手条件も兼ねる</b>(ADR 0026 決定2: Phase 0 の間は作らない)。<b>U13・U10・U11・U12・U20・U14 の ADR は既存の言語に移せるかを併せて書く</b>(決定6)。振り分けから漏れていた W0003-2 の判定基準(U16 の後)と shidzuku-lint の置き場所・実装の言語(Phase 1 の着手時)を足した。各章の未定事項のうち「必要が確認された時」に決める物と Phase 2 へ送る物も、漏れなく並べ直した。決めていただく問いは増えていない。</li>
  <li><b>2026-09-28 — 移行の条件と U14 の位置を決め、ADR 0024・0025 を採用した</b><br>suzukimitsuru が、移行の条件を M1〜M5 とし、U14 を Phase 1 の前に決め、<a href="decisions/0024-APoSDと結合バランスの考え方の取り込み.md">ADR 0024</a>・<a href="decisions/0025-粒度の指針に結合の釣り合いを加える.md">ADR 0025</a> を採用した。問い返しを受けて二つを足した — <b>成果物の題材</b>(Phase 1 で実装して動かすシステム)は一つに絞らず段を踏んで増やす案とし、候補を並べた(第1段 <a href="experiments/04-分散KVストア.md">思考実験 04</a>、第2段 <a href="experiments/01-注文管理サービス.md">思考実験 01</a> 系・<a href="experiments/02-センサー収集パイプライン.md">思考実験 02</a>、第3段 03・10・08)。また、全ての思考実験が body を <code>{ ... }</code> のまま書いてきた事から、<b>body の記法が決まっていない</b>事が分かり、<b>U26</b> として新設して U14 の次に置いた。候補は Go・Hike 風、Rust 風、TypeScript 風、ML 系、宣言の層に揃えた独自記法、出力言語で直に書く、の六つである(<a href="PLAN.md">docs/PLAN.md</a> 第4節 4.5・第7節 7.13)。</li>
  <li><b>2026-09-28 — 残る三つを決め、ADR 0027 を起票した</b><br>suzukimitsuru が、<b>U14 の思考実験</b>(<a href="experiments/15-名前空間の再検討.md">思考実験 15</a>・<a href="experiments/23-結合の釣り合い.md">23</a> の続き)を U13・U10・U11・U12・U20 と並行して進める事、<b>成果物の題材</b>を第1段から第3段の全てとする事を決めた。<b>U26 body の記法</b>はこれから検討するため、<a href="decisions/0027-bodyの記法.md">ADR 0027</a> を起票した(提案。候補 B-1〜B-6 と比べる物差し8つを置き、決定は書き比べの思考実験の後に書く)。計画書の本文の「順N」は、検索しやすいように課題の番号(U14 等)に置き換えた。</li>
  <li><b>2026-10-14 — シンプリシティと比べた</b><br>suzukimitsuru の指示により、Dave Thomas『シンプリシティ ―持続可能かつ人間的で効果的なソフトウェア開発』の思想と Shidzuku の設計思想を並べた(<a href="experiments/28-シンプリシティとの比較.md">思考実験 28(シンプリシティとの比較)</a>)。複雑さと煩雑さを分ける事、方向を定め一歩進み学ぶ事、持続可能で人間的である事は同じで、<b>目指す所は同じだが手段が違う</b>——本書は人の習慣と判断に頼り、Shidzuku は言語による強制に頼る(規則を退けるか強制するか、削るか省略を禁じて書かせるか)。同じ所はいずれも suzukimitsuru の構想から出ており、本書から取り込んだ物は無いため、suzukimitsuru の判断により <a href="spec/00-vision.md">第0章</a> 0.9(参照する系譜)には含めない。何も決めていない。</li>
  <li><b>2026-10-18 — 反証と肯定をまとめた</b><br>suzukimitsuru の指示により、言語仕様に対する反証(今のプログラマに受け入れられない所)と肯定(プログラマ以外の人に与える良い影響)を、外部の研究と事例に照らしてまとめた(<a href="experiments/31-反証と肯定.md">思考実験 31(反証と肯定)</a>)。外部の知見は要旨と二次資料に拠る。<b>反証の芯は、費用を書き手が払い、利益を読み手が受ける非対称である</b>——言語を選ぶのは書き手であり、言語の普及は機能よりもライブラリ・既存のコード・慣れで決まる。強い反証は、言語の外の物(生態系)・外部世界が書けない事(U12)・警告を黙らせられない事の三つで、いずれも未完成の部分である。書く量・慣れた操作・設計を書く層(UML(統一モデリング言語)とモデル駆動工学の轍)への反証は中に留まり、意図して逆を選んだ所に当たる。<b>最も強い肯定は、科学技術・計測・金融の担当者に対して、単位の取り違えと暗黙の変換で値が化けない事</b>である(火星探査機の単位の事故、表計算による遺伝子名の化け)。業務の専門家・監査・後任には業務の語と判断の跡が届く。肯定はいずれも読む事で得られ、振る舞い駆動開発の経験から、読み手に書かせず、図や名前と区分の一覧で早く届ける事が条件になる。論点は7つ。何も決めていない。</li>
  <li><b>2026-11-07 — 振り返りを受けて、試作を先に置く進め方に組み替えた</b><br>試作を繰り返して定義する要件と進め方が逆になっていた事が分かり、<a href="decisions/0033-試作を先に置く進め方.md">ADR 0033(試作を先に置く進め方)</a> を採用して最小の言語実装(Phase 1)へ移った。</li>
  <li><b>次に決める事</b><br>細い縦の試作に着手する(<a href="PLAN.md">docs/PLAN.md</a> 第4節「試作の順」)。題材は <a href="experiments/02-センサー収集パイプライン.md">思考実験 02(センサー収集パイプライン)</a> の SensorIntake と Normalizer である。試作が動いたら、仮置きの表の行を一つずつ確かめる。</li>
</ul>
`,
});

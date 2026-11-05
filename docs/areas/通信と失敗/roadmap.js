// 領域「通信と失敗」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/通信と失敗",
  title: "通信と失敗",
  children: [],
  html: `
<p class="lead">状態: 決着。ADR 0004・0023・0031 を採用した</p>
<figure>
  <svg viewBox="0 0 920 196" role="img" aria-label="領域「通信と失敗」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M260 53 C236 53, 232 53, 208 53"></path>
    <path class="link" d="M260 91 C236 91, 232 161, 208 161"></path>
    <path class="link" d="M260 129 C236 129, 232 107, 208 107"></path>
    <path class="link" d="M612 129 C588 129, 584 129, 560 129"></path>
    <path class="link" d="M612 167 C588 167, 584 129, 560 129"></path>
    <path class="link" d="M612 53 C588 53, 584 129, 560 129"></path>
    <path class="link" d="M612 91 C588 91, 584 129, 560 129"></path>
    <rect class="chip-done" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U2 通信モデル</text>
    <text class="tiny" x="16" y="78" text-anchor="start">他の領域: 記述と構造</text>
    <rect class="chip-done" x="8" y="94" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="111" text-anchor="middle">U13 失敗の体系</text>
    <text class="tiny" x="16" y="132" text-anchor="start">他の領域: 型と単位</text>
    <rect class="chip" x="8" y="148" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="165" text-anchor="middle">U25 対になる通信</text>
    <a class="node" href="decisions/0004-ユニット間の通信モデル.md">
      <rect class="chip-done" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0004 ユニット間の通信モデル</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">採用</text>
    <a class="node" href="decisions/0023-対になる通信の相関.md">
      <rect class="chip-done" x="260" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="95" text-anchor="start">0023 対になる通信の相関</text>
    </a>
    <text class="tiny" x="550" y="95" text-anchor="end">採用 2026-09-26</text>
    <a class="node" href="decisions/0031-失敗の体系.md">
      <rect class="chip-done" x="260" y="116" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="133" text-anchor="start">0031 失敗の体系</text>
    </a>
    <text class="tiny" x="550" y="133" text-anchor="end">採用 2026-10-08</text>
    <a class="node" href="experiments/20-対になる通信.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">20 対になる通信</text>
    </a>
    <a class="node" href="experiments/21-補償と巻き戻し.md">
      <rect class="chip" x="612" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="95" text-anchor="start">21 補償と巻き戻し</text>
    </a>
    <a class="node" href="experiments/22-失敗の棚卸し.md">
      <rect class="chip" x="612" y="116" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="133" text-anchor="start">22 失敗の棚卸し</text>
    </a>
    <a class="node" href="experiments/25-系の失敗の書き分け.md">
      <rect class="chip" x="612" y="154" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="171" text-anchor="start">25 系の失敗の書き分け</text>
    </a>
  </svg>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0004-ユニット間の通信モデル.md">ADR 0004 ユニット間の通信モデル</a> <span class="note">U2</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0023-対になる通信の相関.md">ADR 0023 対になる通信の相関</a> <span class="note">U25・思考実験 20・21 が材料・鍵は接続の対ごと・期限は U13 へ・起案と同日に採用</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0031-失敗の体系.md">ADR 0031 失敗の体系</a> <span class="note">U13・<a href="experiments/22-失敗の棚卸し.md">思考実験 22(失敗の棚卸し)</a>・<a href="experiments/25-系の失敗の書き分け.md">思考実験 25(系の失敗の書き分け)</a> が材料・失敗を四つの置き場に・接続の失敗は公開面に書かずフローが翻訳・<code>on failure</code> を型の付いた欄に・演算の失敗はコンポーネントの中で受ける・待ちの期限は相関の区間に・起案と同日に採用</span></span><span class="pill done">採用 ✓</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/20-対になる通信.md">思考実験 20 対になる通信</a> <span class="note">ask と後から届く flow の相関・U25 を新設</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/21-補償と巻き戻し.md">思考実験 21 補償と巻き戻し</a> <span class="note">引当の解放は書けるか・補償が二形になる穴</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/22-失敗の棚卸し.md">思考実験 22 失敗の棚卸し</a> <span class="note">28 件を6群に・U13 の4つの問い</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/25-系の失敗の書き分け.md">思考実験 25 系の失敗の書き分け</a> <span class="note">U13 論点1 の三案を書き比べ・フローが翻訳する第四の形へ</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>思考実験 20 → U25 を新設</b><br>ADR 0018 の採用で残った「対になる通信」(第4章 4.6)を、受注の確定が後から決まる系で書き下ろした。<code>flow</code> 宣言に二本を並べれば意図と障害時の埋め合わせは書けるが、<b>二本を結ぶ鍵(受注番号)が同じ物である事は検査されず</b>、同じ相手に複数の <code>ask</code> があると戻りがどれの続きか決まらない。さらに <b>「確定が何分以内に決まるか」という仕事全体の期限を書く場所が無い</b>事が分かった(<code>ask</code> の <code>deadline</code> は応答までの期限、<code>pressure block</code> の期限は投入までの期限である)。案は3つに整理し、<code>flow</code> 宣言に相関の鍵と期限を書く案を第一候補とした。ADR 0004(通信は ask と flow の2方式)を改訂せずに済むためである。</li>
  <li><b>思考実験 21 → U25 の形を直し、論点5 を U13 へ送った</b><br>D-2(<code>flow</code> 宣言に相関の鍵を書く案)を起案する前に、引当 → 決済 → 確定という<b>巻き戻しが要る系</b>で検証した。業務上の補償(引当の解放)は普通の接続として書けたため、<b>サーガの単位は要らない</b>。一方で、同じ補償が障害時には <code>on failure</code> の散文になり、その通信は <code>depends</code> も型も期限も検査されない事が分かった(第4章 4.6 に「<code>on failure</code> の欄の形」として足した)。さらに<b>鍵は仕事に一つではなく、結ぶ対ごとにある</b>(受注番号と引当番号)事が分かり、D-2 の形を直す入力になった。孤児の引当が残る論点は、<b>仕事の期限を U13(失敗の体系)へ送った判断を裏付けた</b>。</li>
  <li><b>2026-09-26 — U25 の ADR 0023 を起案し、同日に採用した</b><br>思考実験 20・21 が材料を出し切ったため、<a href="decisions/0023-対になる通信の相関.md">ADR 0023</a> を起案した。<code>flow</code> 宣言に<code>correlate 受注番号 : 受注 -> 受注の状態</code> のように<b>二本を結ぶ鍵</b>を書く。鍵は仕事に一つではなく<b>接続の対ごと</b>であり、接続が2本以上ある宣言では必須(結ぶ対が無ければ <code>correlate none</code>)。仕事の期限(U13)と <code>on failure</code> の欄の形は、あえて含めていない。机上検証では<b>相関がフローの切り方を押す</b>事が分かった — 受付と確定を別の宣言に切ると、在庫を戻す道が記述の上で切れる。同日に採用し、<a href="spec/04-communication.md">第4章</a> 4.2 に <code>correlate</code> を、<a href="spec/03-constraints.md">第3章</a> 3.3 に E0023-1〜E0023-4・W0023-1 を、<a href="spec/05-notation.md">第5章</a> 5.3 に語彙を入れた。U25 は閉じた。</li>
  <li><b>2026-09-26 — U13 の材料として失敗を棚卸しした</b><br><a href="experiments/22-失敗の棚卸し.md">思考実験 22</a> で、仕様書と ADR に散らばった「うまくいかない事」を全て並べた(28 件)。<b>「失敗」が一語で三つの物を指している</b>事が分かった — 直和の区分(正常な不在・業務の拒否)、戻る値(数値と解析)、接続の失敗(期限超過・相手障害)であり、<b>待ち(確定が来ない・孤児の引当)はどれでもない</b>。何も返らないため、受け取って分岐する形では書けない。さらに <code>expose 受注(注文) -&gt; 受注番号 | 受注不可</code> は二つしか返さないように読めるが、第4章 4.1 は期限超過と相手障害でも失敗応答が返ると定めている — <b>三つ目が型に現れていない</b>。U13 で決める事を4つ(系の失敗の書き方・数値と解析の失敗の型・再試行で変わるかを分けるか・待ちの期限)に分けた。</li>
  <li><b>2026-09-27 — U13 論点1 の三案を書き比べた</b><br><a href="experiments/25-系の失敗の書き分け.md">思考実験 25</a> で、系の失敗(期限超過・相手障害)を公開面にどう書くかの三案を同じ系に書き下ろした。<b>F-2(直和に並べる)・F-3(器を分ける)は、同じ二語を全ての <code>ask</code> に書き写す</b>記述になり、しかも<b>言語が語を1つ足すだけで全コンポーネントの版が上がる</b>(公開面は互換性の単位。U16)。F-1(書かない)は省略の禁止に反する。書いている途中で<b>第四の形</b>に行き着いた — 系の失敗を公開面に書かず、<b>フローが業務の語彙へ翻訳する</b>。思考実験 21 の <code>on failure Inventory : OrderIntake は受注不可を返す</code> は、既にその形になっていた。新しい語を増やさず、既にある必須の欄を型の付いた形にするだけで済む。</li>
  <li><b>2026-09-27 — F-4 の「全ての接続がフローに現れる」を記述の中に限った</b><br>F-4 は U13 の ADR に「全ての接続がどれかのフローに現れる」事を求めるが、外部システムは今はフローの端点に書けない(U12 の未定事項)。suzukimitsuru の判断により、<b>U13 ではこの要求を記述の中の接続(兄弟と親の兄弟)に限り、外部との接続は U12 がフローの端点を決める時に広げる</b>(<a href="PLAN.md">docs/PLAN.md</a> 第4節 4.5)。U12 と組にして決める案は、U13 が U10・U11 を越えて U12 を待つ事になり順序が崩れるため採らなかった。</li>
  <li><b>2026-10-08 — 失敗の体系(U13)を ADR 0031 として起案した</b><br>suzukimitsuru の指示で、Phase 1 の前に決める課題の先頭である失敗の体系(U13)を <a href="decisions/0031-失敗の体系.md">ADR 0031(失敗の体系)</a> として起案した(提案)。失敗を<b>四つの置き場</b>に分ける——データの区分(業務の <code>choice</code>)・演算と解析の失敗(body の中で受け、公開面を越えない)・接続の失敗(<code>on failure</code>)・待ちの期限切れ(<code>on expiry</code>)。<b>接続の失敗は公開面に書かず、フローが業務の区分へ翻訳する</b>(<a href="experiments/25-系の失敗の書き分け.md">思考実験 25(系の失敗の書き分け)</a> の第四の形)。<code>on failure</code> は接続の行・<code>respond</code>・<code>restart</code> の三種の行で書き、補償は平常時と同じ検査を受ける。待ちの期限は <code>correlate</code> の区間に <code>within</code> で書き、待つ側の動作環境が測る。記述の中の接続は全てどれかのフローに現れる事を求め、机上検証で書き漏れた接続が一つ見つかった。接合面には待ちを置く・解く呼び出しを足す(<a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> の改訂)。仕様書は採用時に書き換える。</li>
  <li><b>2026-10-08 — ADR 0031 を採用した</b><br>suzukimitsuru の判断により、<a href="decisions/0031-失敗の体系.md">ADR 0031(失敗の体系)</a> を起案と同日に採用した。期限切れに通信しない時の書き方は <code>on expiry &lt;接続&gt; none</code> とした。<a href="spec/03-constraints.md">第3章</a> に E0031-1〜E0031-9・W0031-1 と演算の失敗の受け方を、<a href="spec/04-communication.md">第4章</a> に四つの置き場・<code>on failure</code> の新しい形・<code>within</code> と <code>on expiry</code> を、<a href="spec/05-notation.md">第5章</a> に語彙を、<a href="spec/06-data.md">第6章</a> に正常な不在と接続の失敗の切り分けを書き、<a href="spec/01-system-context.md">第1章</a> 1.6 と <a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> の接合面を H1〜H9 にした。判断待ちの ADR は 0027(body の記法)の1本に戻った。</li>
</ul>
`,
});

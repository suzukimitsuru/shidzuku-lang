// 領域「動作環境」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/動作環境",
  title: "動作環境",
  children: [],
  html: `
<p class="lead">状態: トランスパイル先の言語(U5)は ADR 0012 で、最小の動作環境は ADR 0029・0030 で決着。ログ規約(U4)と Raft の適用範囲(U6)は Phase 2、版の混在と移行(U16)は再起動と版の入れ替えの試作で仮に置いて確かめる</p>
<figure>
  <svg viewBox="0 0 920 212" role="img" aria-label="領域「動作環境」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <path class="link" d="M260 53 C236 53, 232 91, 208 91"></path>
    <path class="link link-rel" d="M260 91 C236 91, 232 145, 208 145"></path>
    <path class="link link-rel" d="M260 53 C236 53, 232 183, 208 183"></path>
    <path class="link link-rel" d="M260 129 C236 129, 232 91, 208 91"></path>
    <path class="link link-rel" d="M260 167 C236 167, 232 91, 208 91"></path>
    <path class="link" d="M612 53 C588 53, 584 129, 560 129"></path>
    <path class="link" d="M612 53 C588 53, 584 167, 560 167"></path>
    <rect class="chip" x="8" y="40" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="57" text-anchor="middle">U4 ログ規約</text>
    <rect class="chip-done" x="8" y="78" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="95" text-anchor="middle">U5 トランスパイル先</text>
    <text class="tiny" x="16" y="116" text-anchor="start">他の領域: 既存の言語への応用</text>
    <rect class="chip-rel" x="8" y="132" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="149" text-anchor="middle">U6 Raft の適用範囲</text>
    <rect class="chip" x="8" y="170" width="200" height="26" rx="13"></rect>
    <text class="chip-text" x="108" y="187" text-anchor="middle">U16 版の混在と移行</text>
    <a class="node" href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">
      <rect class="chip-done" x="260" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="57" text-anchor="start">0012 動作環境とトランスパイル先</text>
    </a>
    <text class="tiny" x="550" y="57" text-anchor="end">採用 2026-09-17</text>
    <a class="node" href="decisions/0001-分散環境の通信プロトコル.md">
      <rect class="chip-done" x="260" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="95" text-anchor="start">0001 分散環境の通信プロトコル</text>
    </a>
    <text class="tiny" x="550" y="95" text-anchor="end">採用</text>
    <a class="node" href="decisions/0029-最小の動作環境.md">
      <rect class="chip-done" x="260" y="116" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="133" text-anchor="start">0029 最小の動作環境</text>
    </a>
    <text class="tiny" x="550" y="133" text-anchor="end">採用 2026-09-30</text>
    <a class="node" href="decisions/0030-ESP32ボードの選定.md">
      <rect class="chip-done" x="260" y="154" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="270" y="171" text-anchor="start">0030 ESP32 ボードの選定</text>
    </a>
    <text class="tiny" x="550" y="171" text-anchor="end">採用 2026-10-03</text>
    <a class="node" href="experiments/27-ESP32の最小動作環境.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">27 ESP32の最小動作環境</text>
    </a>
  </svg>
  <figcaption>
    <ul>
      <li><b>ADR 0012</b>(採用 2026-09-17)— 動作環境は Rust の1実装、トランスパイル先は Rust と TypeScript。コンポーネントと動作環境は正準形だけが流れる接合面 H1〜H8 で繋がり、第1章 1.6 に分担を入れた。H1〜H8 の凍結は TypeScript のコンポーネントが通ってから。</li>
    </ul>
  </figcaption>
</figure>
<div class="detail-grid">
  <div class="card">
    <p class="card-title">決定 — ADR</p>
    <ul>
      <li><span class="what"><a href="decisions/0001-分散環境の通信プロトコル.md">ADR 0001 分散環境の通信プロトコル</a> <span class="note">U6 関連</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what">ADR 0011 (欠番) <span class="note">草稿2本を 0012 に統合した空き番</span></span><span class="pill todo">欠番</span></li>
      <li><span class="what"><a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012 動作環境の言語とトランスパイル先の言語</a> <span class="note">U5・U16 を新設・後続 ADR へ追従した上で 2026-09-17 に採用・接合面の凍結は Phase 1</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0029-最小の動作環境.md">ADR 0029 最小の動作環境</a> <span class="note">全体・<a href="experiments/27-ESP32の最小動作環境.md">思考実験 27(ESP32 の最小動作環境)</a> の論点1〜6・意味の核1つと器・能力は配置の設定で照らす・一体の書き込みから WASM でのロードへ・状態はコードに出さない・ロードは署名で認証・最小の分散動作環境(Phase 2)</span></span><span class="pill done">採用 ✓</span></li>
      <li><span class="what"><a href="decisions/0030-ESP32ボードの選定.md">ADR 0030 ESP32 ボードの選定</a> <span class="note">全体・ADR 0029(最小の動作環境)から求める事を7つ・一体の書き込みは ESP32-C6-DevKitC-1・WASM でのロードは ESP32-S3-DevKitC-1・その時に ESP32-C5 と比べ直す・公式ボード以外も比べた</span></span><span class="pill done">採用 ✓</span></li>
    </ul>
  </div>
  <div class="card">
    <p class="card-title">思考実験</p>
    <ul>
      <li><span class="what"><a href="experiments/27-ESP32の最小動作環境.md">思考実験 27 ESP32 の最小動作環境</a> <span class="note">通信・状態の確認・ロードに意味の最小限を足す・持たない意味は弱めずに拒む・論点6つは ADR 0029 で決定</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>2026-09-17 — ADR 0012 を後続の決定に追従させた</b><br><a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a>(提案)は起案以来改訂されていなかったため、採否の判断に先立って書き直した。<a href="decisions/0021-数値型の体系.md">ADR 0021</a>・<a href="decisions/0019-基本型の体系.md">ADR 0019</a>・<a href="decisions/0013-文字列型の廃止、text%20型の導入、および層モデル.md">ADR 0013</a> から「基本型の写像」(8〜256 ビットの整数・<code>dec</code> の多倍長・ナノ秒の <code>時点</code>・テキスト)を比較の軸と決定8 に加え、<a href="decisions/0014-識別子と言語語彙の表記.md">ADR 0014</a> の名前の符号化を取り込み、<a href="decisions/0015-C4モデルの命名の取り込み.md">ADR 0015</a> に従って「ユニット」を「コンポーネント」に改め、章番号を現行に合わせた。机上検証の「block の上限は実装を待たずに要る」は <a href="spec/04-communication.md">第4章</a> 4.6 にも記した。<b>決定の骨格は変わらず</b>、TypeScript が基本型を最も素直に写せない事は、2つ目の言語の選び方をむしろ裏付けた。</li>
  <li><b>2026-09-17 — U5 が決着し、ステップ5 が空になった</b><br>suzukimitsuru の判断により <a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> を採用した。動作環境は Rust の1実装、トランスパイル先は Rust と TypeScript に確定し、<a href="spec/00-vision.md">第0章</a> 0.8・<a href="spec/01-system-context.md">第1章</a> 1.6・<a href="spec/03-constraints.md">第3章</a> 3.5 に反映した。接合面 H1〜H8 の表は凍結まで ADR 0012 に置く。</li>
  <li><b>2026-09-30 — ESP32 を最小の動作環境として検討した</b><br>suzukimitsuru の指示により、ESP32 を管理機能の無い最小の動作環境(Container)にできるかを検討した(<a href="experiments/27-ESP32の最小動作環境.md">思考実験 27</a>)。<b>通信・状態の確認・ロードの三つでは足りず</b>、ask の期限・上限付きの待ち行列・<code>on failure</code> の再起動は ask と flow の約束として残る。durable・recoverable・<code>collator</code> は持てないため、<b>弱めずにロードで拒む</b>。ESP32 にはプロセスが無く、一体の書き込みなら障害境界は機器に、WASM ならコンポーネントに置き直す事になる。Rust の出力だけで載り、C を足す必要は無い(<a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> の将来の変更想定の前提が一つ外れる)。<a href="experiments/02-センサー収集パイプライン.md">思考実験 02</a> は載り、<a href="experiments/04-分散KVストア.md">思考実験 04</a> は載らない。何も決めておらず、論点1〜6 は <a href="PLAN.md">docs/PLAN.md</a> の第7節 7.15 にある。</li>
  <li><b>2026-09-30 — ADR 0029 で最小の動作環境を決めた</b><br>suzukimitsuru が <a href="experiments/27-ESP32の最小動作環境.md">思考実験 27</a> の論点1〜6 を決め、<a href="decisions/0029-最小の動作環境.md">ADR 0029</a> として採用した。<b>動作環境を意味の核と器に分ける</b>——期限・待ち行列と <code>pressure</code>・記述子の照合・<code>on failure</code> の規則を <code>no_std</code> の1クレートにし、PC と ESP32 の器が共に使う。<a href="decisions/0012-動作環境の言語とトランスパイル先の言語.md">ADR 0012</a> は改訂せず、その「1実装」は意味の核が1つである事として保たれる。持たない意味は<b>配置の設定の時に拒み</b>、ロードは一体の書き込みと1機器1コンポーネントから始めて WASM を後に足す。ロードは署名で認証する。論点4(状態の確認)は判断の前に調べ、<b>状態の確認をコードが読む必要は無い</b>——相手の障害と期限切れは ask の失敗として、背圧は <code>pressure</code> として既に届いている——ため、組み込みのデータ型は提供しない。ESP32 の器は最小の分散動作環境(Phase 2)に置き、<a href="spec/01-system-context.md">第1章</a> 1.6(動作環境は言語の記述対象外)に反映した。</li>
  <li><b>2026-10-03 — ADR 0030 で ESP32 ボードを選び、採用した</b><br>suzukimitsuru の指示で、<a href="decisions/0029-最小の動作環境.md">ADR 0029(最小の動作環境)</a> の決定からボードに求める事を7つにまとめ(Rust で ESP-IDF の上に書ける・zenoh-pico・セキュアブート・OTA(回線越しの更新)の区画を2面取れるフラッシュ・USB だけで繋がる・PSRAM(外付けの擬似 SRAM)と WAMR(組込み向けの WebAssembly 実行系)の対応・USB の口の分離)、<a href="decisions/0030-ESP32ボードの選定.md">ADR 0030(ESP32 ボードの選定)</a> を起票した。<b>一体の書き込みには ESP32-C6-DevKitC-1</b>(rustc 本流のターゲット、開発2・セキュアブートの確かめ1・予備1の4枚)、<b>WASM でのロードには ESP32-S3-DevKitC-1</b>(PSRAM 8MB)を使う。<a href="experiments/27-ESP32の最小動作環境.md">思考実験 27(ESP32 の最小動作環境)</a> の後に量産に入った ESP32-C5 は RISC-V の1品種で両方を揃えられるが、Rust の ESP-IDF の上の対応が若いため、WASM でのロードに入る時に比べ直す。ESP32-C61 は WAMR が対応していないため採らない。同日に公式ボード以外(XIAO ESP32C6・XIAO ESP32C5・M5Stack AtomS3R・Raspberry Pi Pico 2 W)も比べたが、<b>推奨は変わらなかった</b>——USB の口を2つ持ち、zenoh-pico をシリアルで繋ぎながら書き込みとログが取れるのは公式の DevKitC-1 だけである。suzukimitsuru の判断により、<b>公式ボード以外に適したボードが無い事を前提として同日に採用した</b>。</li>
</ul>
`,
});

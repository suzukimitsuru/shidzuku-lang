// 領域「用語辞書」の節。docs/roadmap.html が読み込んで「検討の領域」に差し込む。
// リンク先は docs/roadmap.html から見た相対パスで書く。断片の中で id を作らない。本文に逆引用符とドル記号と波括弧の組を書かない。
Shidzuku.area({
  path: "areas/用語辞書",
  title: "用語辞書",
  children: [],
  html: `
<p class="lead">状態: 検討中。思考実験 29・30 と、母国語の欄を除いて公開する名前に限る検討を行った。何も決めていない</p>
<figure>
  <svg viewBox="0 0 920 120" role="img" aria-label="領域「用語辞書」の課題・決定(ADR)・思考実験と、その関係。左から課題、ADR、思考実験の順に並べ、ADR が決めた課題と、ADR が依拠する思考実験を線で結んだ図">
    <text class="eyebrow" x="108" y="22" text-anchor="middle">課題</text>
    <text class="eyebrow" x="410" y="22" text-anchor="middle">決定 — ADR</text>
    <text class="eyebrow" x="762" y="22" text-anchor="middle">思考実験</text>
    <a class="node" href="experiments/29-用語辞書による名前の規則.md">
      <rect class="chip" x="612" y="40" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="57" text-anchor="start">29 用語辞書による名前の規則</text>
    </a>
    <a class="node" href="experiments/30-開発の流れと用語辞書.md">
      <rect class="chip" x="612" y="78" width="300" height="26" rx="13"></rect>
      <text class="chip-text" x="622" y="95" text-anchor="start">30 開発の流れと用語辞書</text>
    </a>
    <text class="tiny" x="108" y="57" text-anchor="middle">課題の番号を持たない</text>
    <text class="tiny" x="410" y="57" text-anchor="middle">まだ無い</text>
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
      <li><span class="what"><a href="experiments/29-用語辞書による名前の規則.md">思考実験 29 用語辞書による名前の規則</a> <span class="note">語の閉包・退けた語は言語が強制できる・コードは英語(ASCII)・辞書は語と役と定義で母国語の欄は持たない(ローカライズは後で)・公開する名前への限定・置き場の三案と既存の lint を比較</span></span><span class="pill done">一巡 ✓</span></li>
      <li><span class="what"><a href="experiments/30-開発の流れと用語辞書.md">思考実験 30 開発の流れと用語辞書</a> <span class="note">通販を段を追って書き直す・宣言の場所で定義し、無い語は使った段の辞書へ・語の昇格・公開する名前に限ればコンポーネントの辞書は要らない</span></span><span class="pill done">一巡 ✓</span></li>
    </ul>
  </div>
</div>
<p class="card-title">検証ループ</p>
<ul class="points">
  <li><b>2026-10-14 — 用語辞書による名前の規則を検討した</b><br>suzukimitsuru の指示により、用語辞書(名詞・動詞を記述者が宣言する仕組み)を言語が提供する事で、名前を規則に従わせられるかを検討した(<a href="experiments/29-用語辞書による名前の規則.md">思考実験 29(用語辞書による名前の規則)</a>)。思考実験 01〜28 の名前には、識別子を表す語(<code>ID</code>・<code>番号</code>・<code>コード</code>)、「の」の有無、送り仮名、同じ事態の別の語の揺れがあった。<b>名前を宣言された語だけで組ませる事(語の閉包)と、退けた語を使わせない事は、記述者の宣言と照らすだけなので言語が強制できる</b>。同日、suzukimitsuru の指示で呼び名を「用語辞典」から「用語辞書」に改め(結論は変わらない)、<b>辞書に母国語と英語の対応表を兼ねさせ、コードの名前は英語(ASCII)だけで書く前提</b>を置いた。前提の下では語の切れ目が文字で決まって日本語の分け方の曖昧さが消え、名詞と動詞の規則も英語を仮定すれば強制できるが、言語が特定の自然言語を仮定する事になる。前提は記述者の名前を UTF-8 とした <a href="decisions/0014-識別子と言語語彙の表記.md">ADR 0014</a> の決定3 と食い違うため、論点に残した。置き場の三案(言語の宣言・言語の外の lint・宣言を足さない)を比べ、lint の案の汎用性と言語の宣言の強制は、辞書の書式を言語に依らないファイルにすれば組み合わせられる事を示した。同じ目的の lint は見つからず、cspell・typescript-eslint・PMD・codic・Contextive がそれぞれ一部を持つ。Swift の API 設計の指針も要約した。2026-10-15、「語彙辞書」と他の呼び名を比べ、<b>suzukimitsuru の判断で「用語辞書」のままとした</b>。語彙は語の集まりで見出し語を指さず、仕様の「言語が定める語彙」と紛れるためである。次点は「単語辞書」である。キーと値の対応の型は、<a href="spec/06-data.md">第6章</a> 6.6 の通り対応表(map)と呼ぶ。課題(U)は足していない。</li>
  <li><b>2026-10-15 — 開発の流れの中で用語辞書を育てる形を検討した</b><br>suzukimitsuru の指示により、システム・人(actor)・外部システムから記述し、コンポーネント、欄や DB の項目へと進む流れの中で、用語を記述の中で定義して用語辞書を育てる形を検討した(<a href="experiments/30-開発の流れと用語辞書.md">思考実験 30(開発の流れと用語辞書)</a>)。<a href="experiments/20-対になる通信.md">思考実験 20</a> の通販を段を追って書き直し、<b>宣言の場所で名前の母国語と定義を書き、宣言を持たない語は使った段の辞書に足す</b>形を試した。新しい語は段ごとに 13・10・8 で、宣言から定義されたのは 31 のうち5に留まった。複合語の名前の多くは、語を並べても業務の名前にならず、母国語の名前は宣言の場所に書く事になる。内側の辞書の語が外の型に現れると外の辞書へ移す<b>語の昇格</b>が起き、データ宣言の届く範囲と同じ形をしていた。論点は7つ。何も決めていない。</li>
  <li><b>2026-10-16 — 用語辞書から母国語の欄を除き、公開する名前への限定を検討した</b><br>suzukimitsuru の指示により、<a href="experiments/29-用語辞書による名前の規則.md">思考実験 29(用語辞書による名前の規則)</a> と <a href="experiments/30-開発の流れと用語辞書.md">思考実験 30(開発の流れと用語辞書)</a> を改めた。<b>用語辞書から母国語の欄を除き</b>、辞書の中身を英語の語・役・定義とした。図・ログ・診断に母国語の名前を出す事は、ローカライズと共に後で考える。これに伴い対応の一意(英語の語と母国語の語の一対一の対応)を外し、思考実験 30 で見えた母国語の名前の事柄はローカライズへ渡した。同じ指示で、<b>辞書に無い語を公開する名前に使わせない形</b>を検討した(思考実験 29 の第9節(公開する名前への限定))。システム・コンポーネント・<code>actor</code>・<code>external</code>・公開面・<code>flow</code>・データ宣言・欄・区分の名前を公開する名前とし、<code>state</code>・階層・照合器・body の中・DB の表と列の名前は辞書に掛けない。線は宣言の種類で引けるため、言語が強制できるままであり、情報隠蔽と同じ所に線が引ける。コンポーネントの辞書は要らなくなる。既存の言語では可視性で線を引き、FxCop の CA1704・CA1726 が外部から見える識別子に限って辞書と照らした先例である。残る問題は、内と外の語の食い違い、退けた語を内側にも掛けるか、名前を ASCII に限る事も公開する名前に留めるかである。何も決めていない。</li>
</ul>
`,
});

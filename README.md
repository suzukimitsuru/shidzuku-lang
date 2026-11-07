# 雫 (Shidzuku)

**綺麗なコード、静かなシステム。**

Shidzuku は、設計意図から制約・構造・実装までを一本の記述で貫く事を目指す言語プロジェクトです。
図面は別に描くものではなく、コードからの投影として常に実装と一致します。

## 中核となる考え

- コンポーネント: **モジュール = フローの節 = 障害境界 = 配置単位**
- 各コンポーネントは三層で記述する: **意図**(検証不能な理由の記録)/ **制約**(機械検証)/ **実装**(名前付きの層に強度と役割を宣言。ADR 0005・0013)
- 記述の段は C4 モデルに揃える: **システム** / **動作環境** / **コンポーネント** / **コード**(ADR 0015)。システムは入れ子にできる(ADR 0018)
- 記述の表記は「言語が定める語彙は ASCII、記述者が定める名前は UTF-8」(ADR 0014)
- データの型は11 の基本型と4つの構成子。**型の名前が値の出どころを告げる**(ADR 0009・0019・0020・0021・0022)。数値は幅と位取りを型に書き、単位は量の種別(比率・計数・計量・位置)に属する(下記)
- 実行時の静けさ(障害が伝播しない・ログが騒がしくない・運用で驚きがない)を構造から生む

詳細は [docs/spec/00-vision.md](docs/spec/00-vision.md) を参照。

## 文書

| 文書                                                                               | 内容                                           |
| ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| 📄 [docs/spec/00-vision.md](docs/spec/00-vision.md)                                | 第0章 ビジョン                                 |
| 📄 [docs/spec/01-system-context.md](docs/spec/01-system-context.md)                | 第1章 システムコンテキスト                     |
| 📄 [docs/spec/02-component.md](docs/spec/02-component.md)                          | 第2章 コンポーネントの定義                     |
| 📄 [docs/spec/03-constraints.md](docs/spec/03-constraints.md)                      | 第3章 制約の体系                               |
| 📄 [docs/spec/04-communication.md](docs/spec/04-communication.md)                  | 第4章 通信モデル                               |
| 📄 [docs/spec/05-notation.md](docs/spec/05-notation.md)                            | 第5章 記述の表記                               |
| 📄 [docs/spec/06-data.md](docs/spec/06-data.md)                                    | 第6章 データと型                               |
| 📄 [docs/PLAN.md](docs/PLAN.md)                                                    | フェーズ計画・ADR の検討順・Phase 1 へ移る条件 |
| 📄 [docs/numbering.md](docs/numbering.md)                                          | 採番台帳 — 思考実験・ADR・課題の番号と領域     |
| 🔗 [docs/roadmap.html](https://suzukimitsuru.github.io/shidzuku-lang/roadmap.html) | 道のりと現在位置の図(クリックでブラウザ表示)   |
| 🗂️ [docs/areas/](docs/areas/README.md)                                             | 検討の領域 — 領域ごとの計画・現在地・経緯      |
| 🗂️ docs/decisions/                                                                 | ADR — 課題の決定を記録する                     |
| 🗂️ docs/experiments/                                                               | 思考実験 — 既存システムの Shidzuku 記述        |

## 状態

Phase 0(言語仕様)を進行中。
2026-11-07 から、採用済みの ADR だけに依る部分(データ宣言と型・正準形・動作環境の意味の核の一部・shidzuku-lint の一部)を、Phase 1(最小の言語実装)への移行の前に先に着手します。

仕様の検討は、領域の木([docs/areas/README.md](docs/areas/README.md))に分けて進めています。
各領域の README に、担当する課題・現在地・次に決める事・経緯があります。思考実験・ADR・課題の番号は [docs/numbering.md](docs/numbering.md)(採番台帳)で予約します。
全体の計画(フェーズ・ADR の検討順・Phase 1 へ移る条件)は [docs/PLAN.md](docs/PLAN.md) に、道のりの図は [docs/roadmap.html](https://suzukimitsuru.github.io/shidzuku-lang/roadmap.html) にあります。
2026-10-18 までの経緯の概観は [全体](docs/areas/全体/README.md) の領域へ移しました。

## License

MIT License

# 雫 (Shidzuku)

**綺麗なコード、静かなシステム。**

Shidzuku は、設計意図から制約・構造・実装までを一本の記述で貫く事を目指す言語プロジェクトです。
図面は別に描くものではなく、コードからの投影として常に実装と一致します。

## 中核となる考え

- コンポーネント: **モジュール = フローの節 = 障害境界 = 配置単位**
- 各コンポーネントは三層で記述する: **意図**(検証不能な理由の記録)/ **制約**(機械検証)/ **実装**(名前付きの層に強度と役割を宣言。ADR 0005・0013)
- 記述の段は C4 モデルに揃える: **システム** / **動作環境** / **コンポーネント** / **コード**(ADR 0015)。システムは入れ子にできる(ADR 0018 提案)
- 記述の表記は「言語が定める語彙は ASCII、書き手が定める名前は UTF-8」(ADR 0014)
- データの型は10 の基本型と4つの構成子。**型の名前が値の出どころを告げる**(ADR 0009・0010・0017・0019・0020)
- 実行時の静けさ(障害が伝播しない・ログが騒がしくない・運用で驚きがない)を構造から生む

詳細は [docs/spec/00-vision.md](docs/spec/00-vision.md) を参照。

## 文書

| 文書                                                                               | 内容                                         |
| ---------------------------------------------------------------------------------- | -------------------------------------------- |
| 📄 [docs/spec/00-vision.md](docs/spec/00-vision.md)                                | 第0章 ビジョン                               |
| 📄 [docs/spec/01-system-context.md](docs/spec/01-system-context.md)                | 第1章 システムコンテキスト                   |
| 📄 [docs/spec/02-component.md](docs/spec/02-component.md)                          | 第2章 コンポーネントの定義                   |
| 📄 [docs/spec/03-constraints.md](docs/spec/03-constraints.md)                      | 第3章 制約の体系                             |
| 📄 [docs/spec/04-communication.md](docs/spec/04-communication.md)                  | 第4章 通信モデル                             |
| 📄 [docs/spec/05-notation.md](docs/spec/05-notation.md)                            | 第5章 記述の表記                             |
| 📄 [docs/spec/06-data.md](docs/spec/06-data.md)                                    | 第6章 データと型                             |
| 📄 [docs/PLAN.md](docs/PLAN.md)                                                    | フェーズ計画・未解決課題 (U1〜U24)・ADR 一覧 |
| 🔗 [docs/roadmap.html](https://suzukimitsuru.github.io/shidzuku-lang/roadmap.html) | 道のりと現在位置の図(クリックでブラウザ表示) |
| 🗂️ docs/decisions/                                                                 | ADR — 課題の決定を記録する                   |
| 🗂️ docs/experiments/                                                               | 思考実験 — 既存システムの Shidzuku 記述      |

## 状態

Phase 0(言語仕様)を進行中。

課題(U1〜U24)は [docs/PLAN.md](docs/PLAN.md) 第2節に、
それに対する決定(ADR 0001〜0020、0011 は欠番)の状態は同じく第3節にまとめてあります。
ADR 0005・0013・0015・0016 は 2026-08-28 に、ADR 0014・0009・0010・0017・0019・0020 は 2026-08-29 に採用しました。
**型の体系(束 B)が確定し、第6章「データと型」を新設しました。**
判断待ちは ADR 0006・0012・0018 の3本で、どの順に採否を判断するかは第4節にあります。

## License

MIT License

# 雫 (Shidzuku)

**綺麗なコード、静かなシステム。**

Shidzuku は、設計意図から制約・構造・実装までを一本の記述で貫く事を目指す言語プロジェクトです。
図面は別に描くものではなく、コードからの投影として常に実装と一致します。

## 中核となる考え

- コンポーネント: **モジュール = フローの節 = 障害境界 = 配置単位**
- 各コンポーネントは三層で記述する: **意図**(検証不能な理由の記録)/ **制約**(機械検証)/ **実装**(名前付きの層に強度と役割を宣言。ADR 0005・0013)
- 記述の段は C4 モデルに揃える: **システム** / **動作環境** / **コンポーネント** / **コード**(ADR 0015)
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
| 📄 [docs/PLAN.md](docs/PLAN.md)                                                    | フェーズ計画・未解決課題 (U1〜U21)・ADR 一覧 |
| 🔗 [docs/roadmap.html](https://suzukimitsuru.github.io/shidzuku-lang/roadmap.html) | 道のりと現在位置の図(クリックでブラウザ表示) |
| 🗂️ docs/decisions/                                                                 | ADR — 課題の決定を記録する                   |
| 🗂️ docs/experiments/                                                               | 思考実験 — 既存システムの Shidzuku 記述      |

## 状態

Phase 0(言語仕様)を進行中。

課題(U1〜U21)は [docs/PLAN.md](docs/PLAN.md) 第2節に、
それに対する決定(ADR 0001〜0016)の状態は同じく第3節にまとめてあります。
ADR 0005・0013・0015・0016 は 2026-08-28 に採用しました。
提案中の ADR をどの順に、どれと束にして採否を判断するかは第4節にあります。

## License

MIT License

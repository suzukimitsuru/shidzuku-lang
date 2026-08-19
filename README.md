# 雫 (Shidzuku)

**綺麗なコード、静かなシステム。**

Shidzuku は、設計意図から制約・構造・実装までを一本の記述で貫く事を目指す言語プロジェクトです。
図面は別に描くものではなく、コードからの投影として常に実装と一致します。

## 中核となる考え

- 基本単位: **モジュール = フローの節 = 障害境界 = 配置単位**
- 各単位は三層で記述する: **意図**(検証不能な理由の記録)/ **制約**(機械検証)/ **実装**(内側は自由)
- 実行時の静けさ(障害が伝播しない・ログが騒がしくない・運用で驚きがない)を構造から生む

詳細は [docs/spec/00-vision.md](docs/spec/00-vision.md) を参照。

## 文書

| 文書                                                           | 内容                                    |
| -------------------------------------------------------------- | --------------------------------------- |
| [docs/spec/00-vision.md](docs/spec/00-vision.md)               | 第0章 ビジョン                          |
| [docs/spec/01-unit.md](docs/spec/01-unit.md)                   | 第1章 基本単位の定義                    |
| [docs/spec/02-constraints.md](docs/spec/02-constraints.md)     | 第2章 制約の体系                        |
| [docs/spec/03-communication.md](docs/spec/03-communication.md) | 第3章 通信モデル                        |
| [docs/PLAN.md](docs/PLAN.md)                                   | フェーズ計画と未解決課題 (U1〜U8)       |
| [docs/roadmap.html](docs/roadmap.html)                         | 道のりと現在位置の図                    |
| docs/decisions/                                                | ADR — 課題の決定を記録する              |
| docs/experiments/                                              | 思考実験 — 既存システムの Shidzuku 記述 |

## 状態

Phase 0(言語仕様)を進行中。

## License

MIT License

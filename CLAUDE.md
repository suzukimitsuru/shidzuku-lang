# Claude Code 向けプロジェクト指針

## プロジェクト概要

Shidzuku(雫)— 設計意図から実装までを一本の記述で貫く言語。
まず docs/spec/00-vision.md と docs/PLAN.md を読むこと。

## 進め方の原則

- 未解決課題 (U1〜U8) の決定は docs/decisions/ に ADR として残す(template.md 使用)
- 各フェーズは「動く最小の成果物」で締める。仕様だけを先行させない
- 仕様に迷ったら docs/experiments/ の思考実験(既存システムを Shidzuku で記述してみる)に戻る
- 道のりと現在位置の図は docs/roadmap.html に置く。進捗(章の執筆、ADR の状態変化、思考実験の追加・更新、フェーズ移行)があったら、docs/PLAN.md と docs/roadmap.html を同時に更新する
- 文書ファイルを追加・削除・移動したら、README.md の「文書」一覧も同時に更新する
- 会話・文書は日本語を基本とする

## 制約

- Claude Code からの応答・報告は日本語で行う
- Markdown の形式
  - `npx -y markdownlint-cli2 "**/*.md" "#node_modules"`で問題が報告されない事とする
  - インデントは空白文字で2文字とする
  - 表はテキストの状態でインデントで桁を合わせる事とする
- 現在は Phase 0(言語仕様)。compiler/ runtime/ への実装着手は仕様の裏付けができてから

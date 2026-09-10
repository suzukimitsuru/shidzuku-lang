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
- `docs/dev-memo.md` は書き手の覚え書きであり、纏まっていない状態のまま書き足す場所とする。AI は参照せず、README.md の「文書」一覧にも載せず、markdownlint の対象からも外す(`.markdownlint-cli2.jsonc` の `ignores`)
- 会話・文書は日本語を基本とする

## 制約

- Claude Code からの応答・報告は日本語で行う
- Markdown の形式
  - `npx -y markdownlint-cli2 "**/*.md" "#node_modules"`で問題が報告されない事とする
  - インデントは空白文字で2文字とする
  - 表はテキストの状態でインデントで桁を合わせる事とする
- HTML の形式
  - 文書ファイル(`.md`)や文書の置き場(`docs/spec/` 等)に本文・見出し・図の注記・SVG の文字で言及したら、その箇所を `<a href="...">` のリンクにする事とする
  - 仕様の章・思考実験・ADR を項目として並べたら、その項目名を対応する `.md` へのリンクにする事とする(一覧の `<li>` と、図の中の節点の両方)
  - 図(SVG)の中の項目は `<rect>` と `<text>` をまとめて `a.node` で包む事とする。下線は付けず、hover で枠と文字を `--accent` に変えて手掛かりとする
  - リンク先は HTML から見た相対パスで書く事とする(例: `docs/roadmap.html` から `docs/PLAN.md` を指すなら `href="PLAN.md"`)
  - ファイル名の空白は `%20` に置き換える事とする(日本語はそのまま書き、読める形で残す)
  - 表示する文字は元の表記(例: `docs/PLAN.md`)のまま変えない事とする
  - 対応する `.md` が無い項目(欠番の ADR、未解決課題 U〜 等)はリンクにしない事とする
  - 文書を追加・改名したら、HTML のリンク切れが無いか確かめる事とする
- 現在は Phase 0(言語仕様)。compiler/ runtime/ への実装着手は仕様の裏付けができてから

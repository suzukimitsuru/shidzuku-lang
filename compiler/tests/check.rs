//! 検証器の確かめ。細い縦の試作の記述を一か所ずつ崩し、決まった検証番号で拒む事を見る。

#![allow(non_snake_case, mixed_script_confusables)]

use shidzuku_compiler::check_source;

const 元: &str = include_str!("../../examples/細い縦の試作/センサー収集.shidzuku");
const 接続: &str = "SensorIntake -> Normalizer : flow 計測値 pressure block(deadline 1 秒, bound 64 要素) (transient)";

/// 元の記述の `前` を `後` に置き換え、出た検証番号を並べる
fn 崩す(前: &str, 後: &str) -> Vec<&'static str> {
    assert!(元.contains(前), "元の記述に `{前}` が無い");
    let src = 元.replacen(前, 後, 1);
    match check_source(&src, "試し.shidzuku") {
        Ok(_) => vec![],
        Err(diags) => diags.iter().map(|d| d.code.unwrap_or("番号なし")).collect(),
    }
}

#[test]
fn 元の記述は通る() {
    assert_eq!(崩す("", ""), Vec::<&str>::new());
}

#[test]
fn pressureの欠落() {
    assert_eq!(崩す(接続, "SensorIntake -> Normalizer : flow 計測値 (transient)"), ["E0008-1"]);
}

#[test]
fn 配達保証の欠落() {
    assert_eq!(崩す(接続, "SensorIntake -> Normalizer : flow 計測値 pressure block(deadline 1 秒, bound 64 要素)"), ["E0008-1"]);
}

#[test]
fn blockのdeadlineとboundの欠落() {
    assert_eq!(崩す(接続, "SensorIntake -> Normalizer : flow 計測値 pressure block (transient)"), ["E0008-1", "E0008-1"]);
}

#[test]
fn latestにboundは書けない() {
    assert_eq!(崩す(接続, "SensorIntake -> Normalizer : flow 計測値 pressure latest(bound 1 要素) (transient)"), ["E0032-2"]);
}

#[test]
fn boundが0() {
    assert_eq!(崩す(接続, "SensorIntake -> Normalizer : flow 計測値 pressure drop(bound 0 要素) (transient)"), ["E0032-2"]);
}

#[test]
fn whyが空() {
    assert_eq!(
        崩す("why      \"機種ごとの癖(単位系の違い)を吸収する知識をここに閉じ込める。下流は機種を知らない\"", "why \"  \""),
        ["E0003-1"]
    );
}

#[test]
fn rejectedが無い() {
    assert_eq!(
        崩す(
            "rejected option \"SensorIntake から Normalizer へ ask で渡す\"\n             reason \"計測値に応答は要らず、受け入れが正規化を待つ理由が無いため\"\n",
            ""
        ),
        ["E0003-2"]
    );
}

#[test]
fn componentのbodyの欠落() {
    assert_eq!(崩す("  body { }\n}\n\ncomponent Normalizer", "}\n\ncomponent Normalizer"), ["E0000-1"]);
}

#[test]
fn flowのintentの欠落() {
    let 前 = 元.split("flow 計測の取り込み {\n").nth(1).unwrap().split("  SensorIntake ->").next().unwrap();
    assert_eq!(崩す(前, ""), ["E0003-1"]);
}

#[test]
fn 行末のcr() {
    assert_eq!(崩す("id       機器番号\n", "id       機器番号\r\n"), ["E0014-1"]);
}

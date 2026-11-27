//! 締めの確かめ(計画書 第4節「試作の順」の細い縦の試作)。
//!
//! - 記述から生成した Rust が動き、試験の口から流した計測値が正規化されて受け口に届く
//! - `pressure` を書かない記述を検証器が拒む

#![allow(non_snake_case, mixed_script_confusables)]

use shidzuku_example_thin_vertical_slice::body::{中継, 機種Aの番号, 機種Bの番号, 正規化};
use shidzuku_example_thin_vertical_slice::記述::{self, 機器番号, 正規化済み計測値, 計測値};
use std::cell::Cell;
use std::rc::Rc;
use std::time::Duration;

use shidzuku_runtime_pc::{動作環境, 走らせる};

/// 2026-11-07T00:00:00Z(UTC のエポックからのナノ秒)
const 始めの時刻: i64 = 1_793_404_800_000_000_000;

#[test]
fn 試験の口から流した計測値が正規化されて受け口に届く() {
    // 機種A はヘクトパスカル、機種B はキロパスカルで報告する。どちらも 1 ヘクトパスカルの刻みで表せる値にする
    let 入れる: Vec<計測値> = (0..10)
        .map(|i| {
            let 機種Aか = i % 2 == 0;
            計測値 {
                機器: 機器番号(100 + i as u64),
                機種: if 機種Aか { 機種Aの番号 } else { 機種Bの番号 },
                時刻: 始めの時刻 + i * 1_000_000_000,
                生値: if 機種Aか { 1000.0 + i as f64 } else { 100.0 + i as f64 / 10.0 },
            }
        })
        .collect();
    let 期待: Vec<正規化済み計測値> = (0..10)
        .map(|i| 正規化済み計測値 { 機器: 機器番号(100 + i as u64), 時刻: 始めの時刻 + i * 1_000_000_000, 値: 1000.0 + i as f64 })
        .collect();

    let 届いた = 走らせる(async {
        let 環境 = 動作環境::新しく();
        let 口 = 記述::起動(&環境, 中継, 正規化::default()).expect("結合できない");
        for 値 in &入れる {
            口.計測値の受け入れ(値).await.expect("流し込めない");
        }
        let mut 届いた = Vec::new();
        for _ in 0..入れる.len() {
            届いた.push(口.正規化済み計測値の送り出し().await.expect("正準形を読めない"));
        }
        届いた
    });

    // 全てヘクトパスカルに揃い、送った順に届く
    assert_eq!(届いた.len(), 期待.len());
    for (届, 期) in 届いた.iter().zip(&期待) {
        assert_eq!(届.機器, 期.機器);
        assert_eq!(届.時刻, 期.時刻);
        assert!((届.値 - 期.値).abs() < 1e-9, "{} ヘクトパスカルを期待したが {} が届いた", 期.値, 届.値);
    }
}

#[test]
fn 受け口が詰まると上流は待たされ_受け口が受けると流れが戻る() {
    // 試験が受けずに流し込み続けると、pressure block の上限で上流が止まる。受け始めると全てが送った順に届く
    走らせる(async {
        let 環境 = 動作環境::新しく();
        let 口 = Rc::new(記述::起動(&環境, 中継, 正規化::default()).expect("結合できない"));
        let 件数 = 300u64;
        let 流した数 = Rc::new(Cell::new(0u64));

        let (送る口, 数) = (口.clone(), 流した数.clone());
        let 送り手 = tokio::task::spawn_local(async move {
            for i in 0..件数 {
                let 値 = 計測値 { 機器: 機器番号(i), 機種: 機種Aの番号, 時刻: 始めの時刻, 生値: 1000.0 };
                送る口.計測値の受け入れ(&値).await.expect("流し込めない");
                数.set(数.get() + 1);
            }
        });

        tokio::time::sleep(Duration::from_millis(20)).await;
        let 止まった所 = 流した数.get();
        assert!(止まった所 < 件数, "上流が待たされなかった({止まった所} 件を流し込めた)");

        let mut 届いた = Vec::new();
        for _ in 0..件数 {
            届いた.push(口.正規化済み計測値の送り出し().await.unwrap().機器.0);
        }
        送り手.await.unwrap();
        assert_eq!(届いた, (0..件数).collect::<Vec<_>>());
        eprintln!("上流は {止まった所} 件で止まり、受け始めると {件数} 件が送った順に届いた");
    });
}

#[test]
fn pressureを書かない記述を検証器が拒む() {
    let path = concat!(env!("CARGO_MANIFEST_DIR"), "/拒まれる記述/pressureを書かない.shidzuku");
    let src = std::fs::read_to_string(path).unwrap();
    let diags = shidzuku_compiler::check_source(&src, "pressureを書かない.shidzuku").expect_err("拒まれなかった");
    assert_eq!(diags.len(), 1, "{diags:?}");
    assert_eq!(diags[0].code, Some("E0008-1"));
    assert!(diags[0].message.contains("pressure"), "{}", diags[0]);
    assert_eq!(diags[0].span.line, 74);
}

#[test]
fn 元の記述は検証を通る() {
    let path = concat!(env!("CARGO_MANIFEST_DIR"), "/センサー収集.shidzuku");
    let src = std::fs::read_to_string(path).unwrap();
    shidzuku_compiler::check_source(&src, "センサー収集.shidzuku").expect("検証を通らなかった");
}

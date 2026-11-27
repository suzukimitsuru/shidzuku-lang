//! PC の器の `pressure` の確かめ。生成した骨組みを通さず、記述子を手で組んで確かめる。

#![allow(non_snake_case, mixed_script_confusables)]

use std::time::Duration;

use shidzuku_runtime_pc::{核, 接続の失敗, 動作環境, 走らせる};
use 核::待ち行列::圧力;
use 核::記述子::*;

fn 所在(c: &str, p: &str) -> 口の所在 {
    口の所在 { コンポーネント: c.to_string(), 口: p.to_string() }
}

/// 送り手 A から受け手 B へ一本の接続を持つ記述子。A の入口と B の出口は試験の口にする。
fn 記述子(圧力: 圧力) -> システムの記述子 {
    let 口 = |名前: &str| 口の記述 { 名前: 名前.to_string(), 型の指紋: 7 };
    システムの記述子 {
        名前: "試し".to_string(),
        コンポーネント: vec![
            コンポーネントの記述子 { 名前: "A".to_string(), 受け口: vec![口("入")], 出口: vec![口("出")] },
            コンポーネントの記述子 { 名前: "B".to_string(), 受け口: vec![口("入")], 出口: vec![口("出")] },
        ],
        接続: vec![接続の記述 { 送り手: 所在("A", "出"), 受け手: 所在("B", "入"), 圧力, 配達保証: 配達保証::Transient }],
        口: vec![
            システムの口 { 名前: "入り".to_string(), 向き: 向き::入り, 型の指紋: 7, 担い手: 所在("A", "入") },
            システムの口 { 名前: "出".to_string(), 向き: 向き::出, 型の指紋: 7, 担い手: 所在("B", "出") },
        ],
    }
}

#[test]
fn blockは上限で送り手を待たせ_期限を過ぎたら接続の失敗を返す() {
    走らせる(async {
        let 環境 = 動作環境::新しく();
        let mut 結合 = 環境.結合(記述子(圧力::Block { 期限: Some(50_000_000), 上限: 1 })).unwrap();
        let A出口 = 結合.出口("A", "出").unwrap();
        let B受け口 = 結合.受け口群("B").unwrap();

        // 1件目は入る。B はまだ受けないので、2件目は 50 ミリ秒待って失敗になる
        A出口.流す(vec![1]).await.unwrap();
        let 失敗 = A出口.流す(vec![2]).await.unwrap_err();
        assert!(matches!(失敗, 接続の失敗::受付の期限切れ { .. }));

        // B が受けて終えれば空く
        let 受けた = B受け口.受ける().await;
        assert_eq!(受けた.中身, vec![1]);
        B受け口.終えた(受けた.番);
        A出口.流す(vec![3]).await.unwrap();
    });
}

#[test]
fn blockで待っている送り手は_受け手が終えると進む() {
    走らせる(async {
        let 環境 = 動作環境::新しく();
        let mut 結合 = 環境.結合(記述子(圧力::Block { 期限: None, 上限: 1 })).unwrap();
        let A出口 = 結合.出口("A", "出").unwrap();
        let B受け口 = 結合.受け口群("B").unwrap();

        let 受け手 = tokio::task::spawn_local(async move {
            let mut 届いた = Vec::new();
            for _ in 0..5 {
                let 受けた = B受け口.受ける().await;
                tokio::time::sleep(Duration::from_millis(2)).await;
                届いた.push(受けた.中身[0]);
                B受け口.終えた(受けた.番);
            }
            届いた
        });
        for i in 0..5u8 {
            A出口.流す(vec![i]).await.unwrap();
        }
        // 接続の中は送った順に届く
        assert_eq!(受け手.await.unwrap(), vec![0, 1, 2, 3, 4]);
    });
}

#[test]
fn 能力に無いdurableは結合の時に拒む() {
    let 環境 = 動作環境::新しく();
    let mut d = 記述子(圧力::Latest);
    d.接続[0].配達保証 = 配達保証::Durable;
    assert!(環境.結合(d).is_err());
}

//! Shidzuku の動作環境の意味の核。
//!
//! 標準ライブラリに依らない1つのクレートとし、PC の器と ESP32 の器が共に使う
//! (ADR 0029(最小の動作環境)の決定1(意味の核を1つのクレートにする))。
//! 器が差し込むのは通信・時計・ロード・永続化だけであり、意味はここにだけ置く。
//!
//! 細い縦の試作で置いた物は次の通り。
//!
//! - [`記述子`] — コンポーネント記述子とシステムの記述子、その照合と能力の判定
//! - [`待ち行列`] — 接続の待ち行列と `pressure`(`block`・`latest`・`drop`)の適用
//! - [`期限`] — 期限の判定。時計の読みは器から受け取る
//!
//! `on failure` の規則の適用は、再起動と版の入れ替えの試作で足す。

#![no_std]
#![allow(non_snake_case, mixed_script_confusables)]

extern crate alloc;

pub mod deadline;
pub mod descriptor;
pub mod queue;

pub use deadline as 期限;
pub use descriptor as 記述子;
pub use queue as 待ち行列;

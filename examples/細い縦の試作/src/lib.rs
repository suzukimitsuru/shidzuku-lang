//! 細い縦の試作: 思考実験 02(センサー収集パイプライン)の SensorIntake と Normalizer を、`flow` 一本で繋いで1プロセスで動かす。
//!
//! - [`記述`] — センサー収集.shidzuku から生成した Rust(build.rs が生成する)
//! - [`body`] — 生成した骨組みに手で書いた body(body は出力言語で直に書く。計画書 第4節「仮置き」)

#![allow(non_snake_case, mixed_script_confusables)]

/// センサー収集.shidzuku から生成した Rust。
#[allow(non_snake_case, non_camel_case_types, dead_code, clippy::all)]
pub mod 記述 {
    include!(concat!(env!("OUT_DIR"), "/センサー収集.rs"));
}

pub mod body;

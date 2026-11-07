//! 記述(センサー収集.shidzuku)から Rust を生成する。検証で拒まれたらビルドが落ちる。

use std::path::PathBuf;

fn main() {
    let source = "センサー収集.shidzuku";
    println!("cargo:rerun-if-changed={source}");
    let src = std::fs::read_to_string(source).expect("記述を読めない");
    match shidzuku_compiler::rust_from_source(&src, source) {
        Ok(code) => {
            let out = PathBuf::from(std::env::var("OUT_DIR").unwrap()).join("センサー収集.rs");
            std::fs::write(out, code).expect("生成した Rust を書けない");
        }
        Err(diags) => {
            for d in &diags {
                eprintln!("{d}");
            }
            panic!("記述が検証を通らなかった");
        }
    }
}

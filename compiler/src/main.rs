//! `shidzuku` コマンド。
//!
//! - `shidzuku check <記述>`: 検証だけを行う
//! - `shidzuku rust <記述> [-o <出力>]`: 検証を通った記述から Rust を生成する(出力を省くと標準出力へ)

use std::process::ExitCode;

fn usage() -> ExitCode {
    eprintln!("使い方: shidzuku check <記述> | shidzuku rust <記述> [-o <出力>]");
    ExitCode::from(2)
}

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let (command, path) = match args.as_slice() {
        [c, p, ..] => (c.as_str(), p.as_str()),
        _ => return usage(),
    };
    let src = match std::fs::read_to_string(path) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("{path} を読めない: {e}");
            return ExitCode::from(2);
        }
    };
    let result = match command {
        "check" => shidzuku_compiler::check_source(&src, path).map(|_| None),
        "rust" => shidzuku_compiler::rust_from_source(&src, path).map(Some),
        _ => return usage(),
    };
    match result {
        Ok(None) => {
            eprintln!("{path}: 検証を通った");
            ExitCode::SUCCESS
        }
        Ok(Some(code)) => {
            match args.iter().position(|a| a == "-o").and_then(|i| args.get(i + 1)) {
                Some(out) => {
                    if let Err(e) = std::fs::write(out, code) {
                        eprintln!("{out} に書けない: {e}");
                        return ExitCode::from(2);
                    }
                }
                None => print!("{code}"),
            }
            ExitCode::SUCCESS
        }
        Err(diags) => {
            for d in &diags {
                eprintln!("{d}");
            }
            ExitCode::FAILURE
        }
    }
}

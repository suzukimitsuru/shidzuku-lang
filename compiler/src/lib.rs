//! Shidzuku のコンパイラ(細い縦の試作)。
//!
//! 記述を字句・構文・検証の順に通し、通った記述から Rust を生成する。
//!
//! - [`check_source`] — 検証まで行い、診断を返す
//! - [`rust_from_source`] — 検証を通った記述から Rust を生成する

#![allow(non_snake_case, mixed_script_confusables)]

pub mod ast;
pub mod check;
pub mod diag;
pub mod lexer;
pub mod parser;
pub mod rust;

pub use diag::Diagnostic;

/// 字句・構文・検証を通す。通れば構文の木を返す。
pub fn check_source(src: &str, file: &str) -> Result<ast::Program, Vec<Diagnostic>> {
    let tokens = lexer::lex(src, file)?;
    let program = parser::parse(tokens, file)?;
    let diags = check::check(&program, file);
    if diags.is_empty() { Ok(program) } else { Err(diags) }
}

/// 検証を通った記述から Rust を生成する。
pub fn rust_from_source(src: &str, file: &str) -> Result<String, Vec<Diagnostic>> {
    let program = check_source(src, file)?;
    rust::generate(&program, file)
}

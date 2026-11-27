//! 字句の解析。
//!
//! - 符号化は UTF-8、改行は LF(第5章 5.2)。行末の CR と全角空白は E0014-1 とする
//! - 言語が定める語彙(ASCII)も記述者が定める名前(UTF-8)も、字句の上では同じ「名前」として読み、構文の解析で語彙を見分ける(第5章 5.1)
//! - `#` から行末までは注記
//!
//! 識別子の文字の規則(UAX #31)と NFC の検査(E0014-1・E0014-2)は、細い縦の試作では Unicode の英字と数字と `_` に近似する。

use crate::diag::{Diagnostic, Span};

#[derive(Clone, Debug, PartialEq)]
pub enum Tok {
    /// 名前(言語の語彙か、記述者の名前)
    Name(String),
    /// 文字列 `"..."`。改行を含んでよい
    Str(String),
    /// 数 `64`・`1.5`
    Num(String),
    /// 記号
    Sym(&'static str),
    Eof,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Token {
    pub tok: Tok,
    pub span: Span,
}

const SYMBOLS: &[&str] = &["->", "{", "}", "(", ")", ",", ":", "|", "<", ">", "=", "*", "/"];

fn is_name_start(c: char) -> bool {
    c == '_' || c.is_alphabetic()
}

fn is_name_continue(c: char) -> bool {
    c == '_' || c.is_alphanumeric()
}

pub fn lex(src: &str, file: &str) -> Result<Vec<Token>, Vec<Diagnostic>> {
    let src = src.strip_prefix('\u{feff}').unwrap_or(src);
    let chars: Vec<char> = src.chars().collect();
    let mut tokens = Vec::new();
    let mut errors = Vec::new();
    let (mut i, mut line, mut col) = (0usize, 1usize, 1usize);

    macro_rules! advance {
        () => {{
            let c = chars[i];
            i += 1;
            if c == '\n' {
                line += 1;
                col = 1;
            } else {
                col += 1;
            }
            c
        }};
    }

    'outer: while i < chars.len() {
        let c = chars[i];
        let span = Span { line, col };
        match c {
            '\n' | ' ' | '\t' => {
                advance!();
            }
            '\r' => {
                errors.push(Diagnostic::new(file, span, Some("E0014-1"), "行末の CR は使えない(改行は LF。第5章 5.2)"));
                advance!();
            }
            '\u{3000}' => {
                errors.push(Diagnostic::new(file, span, Some("E0014-1"), "全角空白は使えない(第5章 5.5)"));
                advance!();
            }
            '#' => {
                while i < chars.len() && chars[i] != '\n' {
                    advance!();
                }
            }
            '"' => {
                advance!();
                let mut s = String::new();
                loop {
                    if i >= chars.len() {
                        errors.push(Diagnostic::new(file, span, None, "文字列が閉じていない"));
                        break 'outer;
                    }
                    let c = advance!();
                    match c {
                        '"' => break,
                        '\\' if i < chars.len() => s.push(advance!()),
                        c => s.push(c),
                    }
                }
                tokens.push(Token { tok: Tok::Str(s), span });
            }
            c if c.is_ascii_digit() => {
                let mut s = String::new();
                while i < chars.len() && (chars[i].is_ascii_digit() || chars[i] == '.') {
                    s.push(advance!());
                }
                tokens.push(Token { tok: Tok::Num(s), span });
            }
            c if is_name_start(c) => {
                let mut s = String::new();
                while i < chars.len() && is_name_continue(chars[i]) {
                    s.push(advance!());
                }
                tokens.push(Token { tok: Tok::Name(s), span });
            }
            _ => {
                let rest: String = chars[i..chars.len().min(i + 2)].iter().collect();
                if let Some(sym) = SYMBOLS.iter().find(|s| rest.starts_with(**s)) {
                    for _ in 0..sym.chars().count() {
                        advance!();
                    }
                    tokens.push(Token { tok: Tok::Sym(sym), span });
                } else {
                    errors.push(Diagnostic::new(file, span, None, format!("読めない文字 `{c}`")));
                    advance!();
                }
            }
        }
    }
    tokens.push(Token { tok: Tok::Eof, span: Span { line, col } });
    if errors.is_empty() { Ok(tokens) } else { Err(errors) }
}

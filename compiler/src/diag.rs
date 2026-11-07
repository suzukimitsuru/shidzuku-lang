//! 診断(エラーの報告)。

use std::fmt;

/// ソースの中の位置(1 から数える)。
#[derive(Clone, Copy, Debug, PartialEq, Eq, Default)]
pub struct Span {
    pub line: usize,
    pub col: usize,
}

/// 一件の診断。
///
/// `code` は仕様書 第3章 3.3 の検証番号(例: `E0008-1`)。
/// 試作の中で仕様に番号の無い誤り(読めない記述・生成できない記述)を報告する時は `None` にする。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Diagnostic {
    pub file: String,
    pub span: Span,
    pub code: Option<&'static str>,
    pub message: String,
}

impl Diagnostic {
    pub fn new(file: &str, span: Span, code: Option<&'static str>, message: impl Into<String>) -> Self {
        Self { file: file.to_string(), span, code, message: message.into() }
    }
}

impl fmt::Display for Diagnostic {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}:{}:{}: ", self.file, self.span.line, self.span.col)?;
        match self.code {
            Some(code) => write!(f, "{code} {}", self.message),
            None => write!(f, "{}", self.message),
        }
    }
}

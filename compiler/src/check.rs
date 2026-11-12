//! 検証器。
//!
//! 細い縦の試作で見るのは、省略の禁止(ADR 0008)のうち次だけである(計画書 第4節「試作の順」)。
//!
//! | 見る物                                   | 検証番号                                                    |
//! | ---------------------------------------- | ----------------------------------------------------------- |
//! | `system` の二層                          | E0015-1                                                     |
//! | `component` の三層                       | E0000-1                                                     |
//! | `flow` の `intent`                       | E0003-1(仕様書に `flow` の `intent` の欠落の番号が無いため) |
//! | `intent` の必須項目と `rejected` の組    | E0003-1・E0003-2                                            |
//! | 接続の `pressure`・配達保証・`deadline`  | E0008-1                                                     |
//! | `block`・`drop` の `bound`               | E0008-1(ADR 0032 の決定6。提案。仮置きとして従う)           |
//! | `latest` の `bound`・0 の `bound`        | E0032-2(同上)                                               |

use crate::ast::*;
use crate::diag::{Diagnostic, Span};

pub fn check(program: &Program, file: &str) -> Vec<Diagnostic> {
    let mut out = Vec::new();
    let mut d = |span: Span, code: &'static str, message: String| out.push(Diagnostic::new(file, span, Some(code), message));

    for item in &program.items {
        match item {
            Item::System(s) => {
                let what = format!("system {}", s.name.text);
                match &s.intent {
                    Some(i) => check_intent(i, &what, &mut d),
                    None => d(s.name.span, "E0015-1", format!("{what} に intent が無い(システムの二層の欠落)")),
                }
                if s.constraint.is_none() {
                    d(s.name.span, "E0015-1", format!("{what} に constraint が無い(システムの二層の欠落)"));
                }
            }
            Item::Component(c) => {
                let what = format!("component {}", c.name.text);
                match &c.intent {
                    Some(i) => check_intent(i, &what, &mut d),
                    None => d(c.name.span, "E0000-1", format!("{what} に intent が無い(三層記述の欠落)")),
                }
                if c.constraint.is_none() {
                    d(c.name.span, "E0000-1", format!("{what} に constraint が無い(三層記述の欠落)"));
                }
                if c.body.is_none() {
                    d(c.name.span, "E0000-1", format!("{what} に body が無い(三層記述の欠落)"));
                }
            }
            Item::Flow(f) => {
                let what = format!("flow {}", f.name.text);
                match &f.intent {
                    Some(i) => check_intent(i, &what, &mut d),
                    None => d(f.name.span, "E0003-1", format!("{what} に intent が無い(フローの intent は必須。第4章 4.2)")),
                }
                for k in &f.connections {
                    check_connection(k, &mut d);
                }
            }
            Item::Id(_) | Item::Quantity(_) | Item::Record(_) => {}
        }
    }
    out
}

fn blank(s: &Option<Str>) -> bool {
    s.as_ref().is_none_or(|s| s.text.trim().is_empty())
}

fn check_intent(i: &Intent, what: &str, d: &mut impl FnMut(Span, &'static str, String)) {
    if blank(&i.why) {
        d(i.span, "E0003-1", format!("{what} の intent に why が無いか空である"));
    }
    if blank(&i.change) {
        d(i.span, "E0003-1", format!("{what} の intent に change が無いか空である"));
    }
    for r in &i.rejected {
        if r.option.text.trim().is_empty() {
            d(r.option.span, "E0003-1", format!("{what} の intent の rejected option が空である"));
        }
        match &r.reason {
            None => d(r.option.span, "E0003-2", format!("{what} の intent の rejected option に reason が無い(選択肢と理由の組)")),
            Some(s) if s.text.trim().is_empty() => d(s.span, "E0003-1", format!("{what} の intent の reason が空である")),
            Some(_) => {}
        }
    }
    match &i.rejected_none {
        Some(s) if s.text.trim().is_empty() => {
            d(s.span, "E0003-1", format!("{what} の intent の rejected none に理由が無い"))
        }
        Some(_) => {}
        None if i.rejected.is_empty() => d(i.span, "E0003-2", format!("{what} の intent に rejected が無い(選択肢と理由の組が0件)")),
        None => {}
    }
}

fn check_connection(k: &Connection, d: &mut impl FnMut(Span, &'static str, String)) {
    let what = format!("接続 {} -> {} の flow {}", k.from.text, k.to.text, k.content.text);
    match &k.pressure {
        None => d(k.span, "E0008-1", format!("{what} に pressure が無い(必須宣言の欠落。block・latest・drop のどれかを書く)")),
        Some(p) => {
            match p.kind {
                PressureKind::Block => {
                    if p.deadline.is_none() {
                        d(p.span, "E0008-1", format!("{what} の pressure block に deadline が無い(無期限なら deadline none と書く)"));
                    }
                    if p.bound.is_none() {
                        d(p.span, "E0008-1", format!("{what} の pressure block に bound が無い"));
                    }
                }
                PressureKind::Drop => {
                    if p.bound.is_none() {
                        d(p.span, "E0008-1", format!("{what} の pressure drop に bound が無い"));
                    }
                }
                PressureKind::Latest => {
                    if let Some((_, span)) = p.bound {
                        d(span, "E0032-2", format!("{what} の pressure latest に bound は書けない(上限は意味から 1)"));
                    }
                }
            }
            if let Some((0, span)) = p.bound {
                d(span, "E0032-2", format!("{what} の bound が 0 である(1 以上)"));
            }
        }
    }
    if k.delivery.is_none() {
        d(k.span, "E0008-1", format!("{what} に配達保証が無い(必須宣言の欠落。(transient) か (durable) を書く)"));
    }
}

//! 構文の解析。
//!
//! 細い縦の試作で読むのは `system`・`component`・`intent`・`constraint`・`flow` と、
//! 計測値の `record` を読むのに要るデータ宣言(`id`・`quantity`・`record`)である(計画書 第4節「試作の順」)。
//! `body` は中を読まずに読み飛ばす。`ask`・`correlate`・`on expiry` などまだ扱わない語は、扱わない事を報告する。

use crate::ast::*;
use crate::diag::{Diagnostic, Span};
use crate::lexer::{Tok, Token};

type PResult<T> = Result<T, Diagnostic>;

pub fn parse(tokens: Vec<Token>, file: &str) -> Result<Program, Vec<Diagnostic>> {
    let mut p = Parser { tokens, pos: 0, file };
    p.program().map_err(|d| vec![d])
}

struct Parser<'a> {
    tokens: Vec<Token>,
    pos: usize,
    file: &'a str,
}

/// 期限の単位(言語が最初から持つ `量 時間`。第6章 6.3)をナノ秒に直す倍率
fn time_unit_nanos(unit: &str) -> Option<u64> {
    Some(match unit {
        "ナノ秒" => 1,
        "マイクロ秒" => 1_000,
        "ミリ秒" => 1_000_000,
        "秒" => 1_000_000_000,
        "分" => 60_000_000_000,
        "時" => 3_600_000_000_000,
        "日" => 86_400_000_000_000,
        _ => return None,
    })
}

impl<'a> Parser<'a> {
    // ---- 字句の扱い ----

    fn peek(&self) -> &Tok {
        &self.tokens[self.pos].tok
    }

    fn peek_at(&self, n: usize) -> &Tok {
        &self.tokens[(self.pos + n).min(self.tokens.len() - 1)].tok
    }

    fn span(&self) -> Span {
        self.tokens[self.pos].span
    }

    fn bump(&mut self) -> Token {
        let t = self.tokens[self.pos].clone();
        if self.pos < self.tokens.len() - 1 {
            self.pos += 1;
        }
        t
    }

    fn err(&self, message: impl Into<String>) -> Diagnostic {
        Diagnostic::new(self.file, self.span(), None, message)
    }

    fn unsupported(&self, what: &str) -> Diagnostic {
        self.err(format!("{what} は細い縦の試作ではまだ扱わない"))
    }

    fn describe(tok: &Tok) -> String {
        match tok {
            Tok::Name(s) => format!("`{s}`"),
            Tok::Str(_) => "文字列".to_string(),
            Tok::Num(s) => format!("数 `{s}`"),
            Tok::Sym(s) => format!("`{s}`"),
            Tok::Eof => "ファイルの終わり".to_string(),
        }
    }

    fn is_word(&self, word: &str) -> bool {
        matches!(self.peek(), Tok::Name(s) if s == word)
    }

    fn is_sym(&self, sym: &str) -> bool {
        matches!(self.peek(), Tok::Sym(s) if *s == sym)
    }

    fn eat_word(&mut self, word: &str) -> bool {
        if self.is_word(word) {
            self.bump();
            true
        } else {
            false
        }
    }

    fn eat_sym(&mut self, sym: &str) -> bool {
        if self.is_sym(sym) {
            self.bump();
            true
        } else {
            false
        }
    }

    fn expect_word(&mut self, word: &str) -> PResult<Span> {
        let span = self.span();
        if self.eat_word(word) { Ok(span) } else { Err(self.err(format!("`{word}` が要る所に {} がある", Self::describe(self.peek())))) }
    }

    fn expect_sym(&mut self, sym: &str) -> PResult<Span> {
        let span = self.span();
        if self.eat_sym(sym) { Ok(span) } else { Err(self.err(format!("`{sym}` が要る所に {} がある", Self::describe(self.peek())))) }
    }

    fn name(&mut self) -> PResult<Name> {
        match self.peek().clone() {
            Tok::Name(text) => {
                let span = self.span();
                self.bump();
                Ok(Name { text, span })
            }
            other => Err(self.err(format!("名前が要る所に {} がある", Self::describe(&other)))),
        }
    }

    fn string(&mut self) -> PResult<Str> {
        match self.peek().clone() {
            Tok::Str(text) => {
                let span = self.span();
                self.bump();
                Ok(Str { text, span })
            }
            other => Err(self.err(format!("文字列が要る所に {} がある", Self::describe(&other)))),
        }
    }

    fn number(&mut self) -> PResult<(String, Span)> {
        match self.peek().clone() {
            Tok::Num(text) => {
                let span = self.span();
                self.bump();
                Ok((text, span))
            }
            other => Err(self.err(format!("数が要る所に {} がある", Self::describe(&other)))),
        }
    }

    fn integer(&mut self) -> PResult<(u64, Span)> {
        let (text, span) = self.number()?;
        text.parse::<u64>()
            .map(|n| (n, span))
            .map_err(|_| Diagnostic::new(self.file, span, None, format!("整数が要る所に `{text}` がある")))
    }

    /// `Name (, Name)*`
    fn name_list(&mut self) -> PResult<Vec<Name>> {
        let mut v = vec![self.name()?];
        while self.eat_sym(",") {
            v.push(self.name()?);
        }
        Ok(v)
    }

    /// `none` か `Name (, Name)*`
    fn none_or_names(&mut self) -> PResult<NoneOr<Name>> {
        let span = self.span();
        if self.eat_word("none") { Ok(NoneOr::None(span)) } else { Ok(NoneOr::Items(self.name_list()?)) }
    }

    /// 釣り合った括弧を読み飛ばす(開き括弧の上で呼ぶ)
    fn skip_balanced(&mut self, open: &'static str, close: &'static str) -> PResult<()> {
        let start = self.span();
        self.expect_sym(open)?;
        let mut depth = 1;
        while depth > 0 {
            match self.peek() {
                Tok::Eof => return Err(Diagnostic::new(self.file, start, None, format!("`{open}` が閉じていない"))),
                Tok::Sym(s) if *s == open => depth += 1,
                Tok::Sym(s) if *s == close => depth -= 1,
                _ => {}
            }
            self.bump();
        }
        Ok(())
    }

    // ---- トップレベル ----

    fn program(&mut self) -> PResult<Program> {
        let mut program = Program::default();
        loop {
            let item = match self.peek().clone() {
                Tok::Eof => break,
                Tok::Name(w) => match w.as_str() {
                    "id" => {
                        self.bump();
                        Item::Id(self.name()?)
                    }
                    "quantity" => Item::Quantity(self.quantity()?),
                    "record" => Item::Record(self.record()?),
                    "system" => Item::System(self.system()?),
                    "component" => Item::Component(self.component()?),
                    "flow" => Item::Flow(self.flow()?),
                    "choice" | "unit" | "calendar" => return Err(self.unsupported(&format!("`{w}` の宣言"))),
                    _ => return Err(self.err(format!("宣言の頭に `{w}` がある"))),
                },
                other => return Err(self.err(format!("宣言の頭に {} がある", Self::describe(&other)))),
            };
            program.items.push(item);
        }
        Ok(program)
    }

    fn quantity(&mut self) -> PResult<QuantityDecl> {
        self.expect_word("quantity")?;
        let name = self.name()?;
        let kind = self.name()?;
        self.expect_word("base")?;
        let base = if self.eat_word("none") { None } else { Some(self.name()?) };
        Ok(QuantityDecl { name, kind, base })
    }

    fn record(&mut self) -> PResult<RecordDecl> {
        self.expect_word("record")?;
        let name = self.name()?;
        self.expect_sym("{")?;
        let mut fields = Vec::new();
        while !self.is_sym("}") {
            let field = self.name()?;
            self.expect_sym(":")?;
            let ty = self.type_ref()?;
            fields.push(Field { name: field, ty });
            if !self.eat_sym(",") {
                break;
            }
        }
        self.expect_sym("}")?;
        Ok(RecordDecl { name, fields })
    }

    fn type_ref(&mut self) -> PResult<TypeRef> {
        let name = self.name()?;
        let span = name.span;
        let t = name.text.as_str();
        if t == "float32" || t == "float64" {
            let bits = if t == "float32" { 32 } else { 64 };
            return Ok(TypeRef::Float { bits, unit: self.name()?, span });
        }
        if t == "instant" {
            return Ok(TypeRef::Instant(span));
        }
        let (signed, digits) = if let Some(d) = t.strip_prefix("uint") {
            (false, d)
        } else if let Some(d) = t.strip_prefix("int") {
            (true, d)
        } else {
            if matches!(t, "bool" | "text" | "bytes" | "date" | "clock" | "zone" | "dec" | "list") {
                return Err(Diagnostic::new(self.file, span, None, format!("基本型 `{t}` は細い縦の試作ではまだ扱わない")));
            }
            return Ok(TypeRef::Named(name));
        };
        if let Ok(bits) = digits.parse::<u16>() {
            if !matches!(bits, 8 | 16 | 32 | 64 | 128 | 256) {
                return Err(Diagnostic::new(self.file, span, None, format!("整数の幅 `{bits}` は無い(8/16/32/64/128/256)")));
            }
            self.expect_sym("(")?;
            let (scale, _) = self.integer()?;
            self.expect_sym(")")?;
            let unit = self.name()?;
            return Ok(TypeRef::Int { signed, bits, scale: scale as u32, unit, span });
        }
        Ok(TypeRef::Named(name))
    }

    // ---- 意図 ----

    fn intent(&mut self) -> PResult<Intent> {
        let span = self.expect_word("intent")?;
        self.expect_sym("{")?;
        let mut intent = Intent { span, why: None, rejected: Vec::new(), rejected_none: None, change: None, refs: None };
        while !self.is_sym("}") {
            let key = self.name()?;
            match key.text.as_str() {
                "why" => intent.why = Some(self.string()?),
                "change" => intent.change = Some(self.string()?),
                "refs" => intent.refs = Some(self.string()?),
                "rejected" => {
                    if self.eat_word("none") {
                        intent.rejected_none = Some(self.string()?);
                    } else {
                        self.expect_word("option")?;
                        let option = self.string()?;
                        let reason = if self.eat_word("reason") { Some(self.string()?) } else { None };
                        intent.rejected.push(Rejected { option, reason });
                    }
                }
                other => return Err(Diagnostic::new(self.file, key.span, None, format!("intent の中に `{other}` がある"))),
            }
        }
        self.expect_sym("}")?;
        Ok(intent)
    }

    // ---- システム ----

    fn system(&mut self) -> PResult<SystemDecl> {
        self.expect_word("system")?;
        let name = self.name()?;
        self.expect_sym("{")?;
        let mut decl = SystemDecl { name, intent: None, constraint: None };
        while !self.is_sym("}") {
            if self.is_word("intent") {
                decl.intent = Some(self.intent()?);
            } else if self.is_word("constraint") {
                decl.constraint = Some(self.system_constraint()?);
            } else if self.is_word("body") {
                return Err(self.err("system は body を持たない(第1章 1.2)"));
            } else {
                return Err(self.err(format!("system の中に {} がある", Self::describe(self.peek()))));
            }
        }
        self.expect_sym("}")?;
        Ok(decl)
    }

    /// `none` か、(名前, 説明)の組の並び(`actor`・`external`)
    fn named_descriptions(&mut self) -> PResult<NoneOr<(Name, Str)>> {
        let span = self.span();
        if self.eat_word("none") {
            return Ok(NoneOr::None(span));
        }
        let mut v = Vec::new();
        loop {
            let n = self.name()?;
            let s = self.string()?;
            v.push((n, s));
            if !(matches!(self.peek(), Tok::Name(_)) && matches!(self.peek_at(1), Tok::Str(_))) {
                break;
            }
        }
        Ok(NoneOr::Items(v))
    }

    fn system_constraint(&mut self) -> PResult<SystemConstraint> {
        self.expect_word("constraint")?;
        self.expect_sym("{")?;
        let mut c = SystemConstraint::default();
        while !self.is_sym("}") {
            let key = self.name()?;
            match key.text.as_str() {
                "actor" => c.actor = Some(self.named_descriptions()?),
                "external" => c.external = Some(self.named_descriptions()?),
                "depends" => c.depends = Some(self.none_or_names()?),
                "contains" => c.contains = Some(self.name_list()?),
                "expose" => {
                    let span = self.span();
                    if self.eat_word("none") {
                        c.expose = Some(NoneOr::None(span));
                    } else {
                        let port = self.flow_port()?;
                        self.expect_word("by")?;
                        let by = self.name()?;
                        match &mut c.expose {
                            Some(NoneOr::Items(v)) => v.push((port, by)),
                            _ => c.expose = Some(NoneOr::Items(vec![(port, by)])),
                        }
                    }
                }
                other => return Err(Diagnostic::new(self.file, key.span, None, format!("system の constraint の中に `{other}` がある"))),
            }
        }
        self.expect_sym("}")?;
        Ok(c)
    }

    /// `<名前>(<内容>) flow in|out`
    fn flow_port(&mut self) -> PResult<FlowPort> {
        let name = self.name()?;
        self.expect_sym("(")?;
        let content = self.name()?;
        self.expect_sym(")")?;
        if self.is_sym("->") {
            return Err(self.unsupported("ask の受け口"));
        }
        self.expect_word("flow")?;
        let direction = if self.eat_word("in") {
            Direction::In
        } else if self.eat_word("out") {
            Direction::Out
        } else {
            return Err(self.err("`flow` の後に `in` か `out` が要る"));
        };
        Ok(FlowPort { name, content, direction })
    }

    // ---- コンポーネント ----

    fn component(&mut self) -> PResult<ComponentDecl> {
        self.expect_word("component")?;
        let name = self.name()?;
        self.expect_sym("{")?;
        let mut decl = ComponentDecl { name, intent: None, constraint: None, body: None };
        while !self.is_sym("}") {
            if self.is_word("intent") {
                decl.intent = Some(self.intent()?);
            } else if self.is_word("constraint") {
                decl.constraint = Some(self.component_constraint()?);
            } else if self.is_word("body") {
                let span = self.span();
                self.bump();
                self.skip_balanced("{", "}")?;
                decl.body = Some(span);
            } else {
                return Err(self.err(format!("component の中に {} がある", Self::describe(self.peek()))));
            }
        }
        self.expect_sym("}")?;
        Ok(decl)
    }

    fn component_constraint(&mut self) -> PResult<ComponentConstraint> {
        self.expect_word("constraint")?;
        self.expect_sym("{")?;
        let mut c = ComponentConstraint::default();
        while !self.is_sym("}") {
            let key = self.name()?;
            match key.text.as_str() {
                "depends" => c.depends = Some(self.none_or_names()?),
                "expose" => {
                    let span = self.span();
                    if self.eat_word("none") {
                        c.expose = Some(NoneOr::None(span));
                    } else {
                        let port = self.flow_port()?;
                        match &mut c.expose {
                            Some(NoneOr::Items(v)) => v.push(port),
                            _ => c.expose = Some(NoneOr::Items(vec![port])),
                        }
                    }
                }
                "idempotent" => c.idempotent.push(self.name()?),
                "state" => {
                    let span = self.span();
                    if self.eat_word("none") {
                        c.state = Some(NoneOr::None(span));
                    } else {
                        let n = self.name()?;
                        if self.eat_word("recoverable") {
                            self.skip_balanced("(", ")")?;
                        } else {
                            self.expect_word("volatile")?;
                        }
                        match &mut c.state {
                            Some(NoneOr::Items(v)) => v.push(n),
                            _ => c.state = Some(NoneOr::Items(vec![n])),
                        }
                    }
                }
                "collator" => {
                    let span = self.span();
                    if self.eat_word("none") {
                        c.collator = Some(NoneOr::None(span));
                    } else {
                        let n = self.name()?;
                        self.skip_balanced("(", ")")?;
                        c.collator = Some(NoneOr::Items(vec![n]));
                    }
                }
                "layers" => c.layers = Some(self.layers()?),
                other => return Err(Diagnostic::new(self.file, key.span, None, format!("component の constraint の中に `{other}` がある"))),
            }
        }
        self.expect_sym("}")?;
        Ok(c)
    }

    /// `{ <階層名> { <制約強度> <役割> } ... }`
    fn layers(&mut self) -> PResult<Vec<Layer>> {
        self.expect_sym("{")?;
        let mut v = Vec::new();
        while !self.is_sym("}") {
            let name = self.name()?;
            self.expect_sym("{")?;
            let strength = self.name()?;
            let role = self.name()?;
            self.expect_sym("}")?;
            v.push(Layer { name, strength, role });
        }
        self.expect_sym("}")?;
        Ok(v)
    }

    // ---- フロー ----

    fn flow(&mut self) -> PResult<FlowDecl> {
        self.expect_word("flow")?;
        let name = self.name()?;
        self.expect_sym("{")?;
        let mut decl = FlowDecl { name, intent: None, connections: Vec::new(), on_failures: Vec::new() };
        while !self.is_sym("}") {
            if self.is_word("intent") {
                decl.intent = Some(self.intent()?);
            } else if self.is_word("correlate") {
                return Err(self.unsupported("`correlate`"));
            } else if self.is_word("on") {
                decl.on_failures.push(self.on_failure()?);
            } else if matches!(self.peek(), Tok::Name(_)) && matches!(self.peek_at(1), Tok::Sym("->")) {
                decl.connections.push(self.connection()?);
            } else {
                return Err(self.err(format!("flow の中に {} がある", Self::describe(self.peek()))));
            }
        }
        self.expect_sym("}")?;
        Ok(decl)
    }

    fn connection(&mut self) -> PResult<Connection> {
        let span = self.span();
        let from = self.name()?;
        self.expect_sym("->")?;
        let to = self.name()?;
        self.expect_sym(":")?;
        if self.is_word("ask") {
            return Err(self.unsupported("ask の接続"));
        }
        self.expect_word("flow")?;
        let content = self.name()?;
        let pressure = if self.is_word("pressure") { Some(self.pressure()?) } else { None };
        let delivery = if self.is_sym("(") {
            self.bump();
            let d = self.name()?;
            let delivery = match d.text.as_str() {
                "transient" => Delivery::Transient,
                "durable" => Delivery::Durable,
                other => return Err(Diagnostic::new(self.file, d.span, None, format!("配達保証は `transient` か `durable`(`{other}` がある)"))),
            };
            self.expect_sym(")")?;
            Some(delivery)
        } else {
            None
        };
        Ok(Connection { span, from, to, content, pressure, delivery })
    }

    fn pressure(&mut self) -> PResult<Pressure> {
        self.expect_word("pressure")?;
        let span = self.span();
        let kind_name = self.name()?;
        let kind = match kind_name.text.as_str() {
            "block" => PressureKind::Block,
            "drop" => PressureKind::Drop,
            "latest" => PressureKind::Latest,
            other => return Err(Diagnostic::new(self.file, kind_name.span, None, format!("pressure のポリシーは block・latest・drop(`{other}` がある)"))),
        };
        let mut p = Pressure { span, kind, deadline: None, bound: None };
        // `(` の次が欄の名前なら pressure の欄。そうでなければ配達保証の括弧である
        let has_fields = self.is_sym("(") && matches!(self.peek_at(1), Tok::Name(s) if s == "deadline" || s == "bound");
        if has_fields {
            self.bump();
            loop {
                let key = self.name()?;
                match key.text.as_str() {
                    "deadline" => {
                        if self.eat_word("none") {
                            p.deadline = Some(None);
                        } else {
                            p.deadline = Some(Some(self.duration()?));
                        }
                    }
                    "bound" => {
                        let (n, nspan) = self.integer()?;
                        let unit = self.name()?;
                        if unit.text != "要素" {
                            return Err(Diagnostic::new(self.file, unit.span, None, format!("bound の単位は `要素`(`{}` がある)", unit.text)));
                        }
                        p.bound = Some((n, nspan));
                    }
                    other => return Err(Diagnostic::new(self.file, key.span, None, format!("pressure の欄に `{other}` がある"))),
                }
                if !self.eat_sym(",") {
                    break;
                }
            }
            self.expect_sym(")")?;
        }
        Ok(p)
    }

    /// `量 時間` を持つ数値(`1 秒`・`200 ミリ秒`)をナノ秒で返す
    fn duration(&mut self) -> PResult<u64> {
        let (text, span) = self.number()?;
        let unit = self.name()?;
        let mult = time_unit_nanos(&unit.text).ok_or_else(|| {
            Diagnostic::new(self.file, unit.span, None, format!("期限の単位は `量 時間` の単位(`{}` がある)", unit.text))
        })?;
        let bad = || Diagnostic::new(self.file, span, None, format!("期限 `{text} {}` をナノ秒で表せない", unit.text));
        let (int, frac) = text.split_once('.').unwrap_or((&text, ""));
        let int: u64 = int.parse().map_err(|_| bad())?;
        let mut ns = int.checked_mul(mult).ok_or_else(bad)?;
        if !frac.is_empty() {
            let denom = 10u64.checked_pow(frac.len() as u32).ok_or_else(bad)?;
            let f: u64 = frac.parse().map_err(|_| bad())?;
            let part = f.checked_mul(mult).ok_or_else(bad)?;
            if part % denom != 0 {
                return Err(bad());
            }
            ns = ns.checked_add(part / denom).ok_or_else(bad)?;
        }
        Ok(ns)
    }

    fn on_failure(&mut self) -> PResult<OnFailure> {
        self.expect_word("on")?;
        if self.is_word("expiry") {
            return Err(self.unsupported("`on expiry`"));
        }
        self.expect_word("failure")?;
        let component = self.name()?;
        if self.is_word("at") {
            return Err(self.unsupported("`on failure` の `at`"));
        }
        self.expect_sym("{")?;
        let mut restart = None;
        while !self.is_sym("}") {
            if self.eat_word("restart") {
                restart = Some(!self.eat_word("none"));
            } else {
                return Err(self.unsupported("`on failure` の中の `restart` 以外の行"));
            }
        }
        self.expect_sym("}")?;
        Ok(OnFailure { component, restart })
    }
}

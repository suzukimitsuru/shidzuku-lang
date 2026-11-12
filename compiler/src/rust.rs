//! Rust の生成器(トランスパイル先の言語のバックエンド。ADR 0012 の決定8(バックエンドの責務は6つ))。
//!
//! 細い縦の試作で出す物は次の通り。
//!
//! | 責務                         | 出す物                                                               |
//! | ---------------------------- | -------------------------------------------------------------------- |
//! | データと基本型の写像         | `id` は64ビットの整数を包む型、`record` は構造体                     |
//! | 正準形への符号化・復号       | 試作の仮の形式(欄の順に、数を大きい桁から並べる)と型の指紋           |
//! | 公開面の受け口・出口の骨組み | コンポーネントごとの body の trait と出口の型                        |
//! | 接合面の呼び出し             | 結合・流す・流れを受ける(PC の器のクレートを直接呼ぶ)                |
//! | 内部階層の写像               | まだ出さない(body を出力言語で直に書く間は検査しない。計画書 第4節) |
//! | 起動の骨組み                 | 記述子と、全てのコンポーネントを結合して起こす `起動`                |
//!
//! 生成の前に名前を解決する。解決できない記述は、仕様の検証番号を付けずに「生成できない」と報告する。

use std::collections::{HashMap, HashSet};
use std::fmt::Write;

use crate::ast::*;
use crate::diag::{Diagnostic, Span};

/// 言語が最初から持つ `量 時間` の単位(第6章 6.3)
const TIME_UNITS: &[&str] = &["ナノ秒", "マイクロ秒", "ミリ秒", "秒", "分", "時", "日"];

const RUST_KEYWORDS: &[&str] = &[
    "as", "async", "await", "break", "const", "continue", "crate", "dyn", "else", "enum", "extern", "false", "fn", "for", "gen",
    "if", "impl", "in", "let", "loop", "match", "mod", "move", "mut", "pub", "ref", "return", "self", "static", "struct",
    "super", "trait", "true", "type", "unsafe", "use", "where", "while",
];

fn ident(name: &str) -> String {
    if RUST_KEYWORDS.contains(&name) { format!("r#{name}") } else { name.to_string() }
}

/// 型の指紋。型の正準の綴り(名前と欄と幅と単位)の FNV-1a 64 ビット
fn fingerprint(canonical: &str) -> u64 {
    let mut h: u64 = 0xcbf2_9ce4_8422_2325;
    for b in canonical.as_bytes() {
        h ^= *b as u64;
        h = h.wrapping_mul(0x0100_0000_01b3);
    }
    h
}

struct Port<'a> {
    name: &'a str,
    content: &'a str,
}

struct Comp<'a> {
    decl: &'a ComponentDecl,
    inputs: Vec<Port<'a>>,
    outputs: Vec<Port<'a>>,
}

struct Conn<'a> {
    from: (&'a str, &'a str),
    to: (&'a str, &'a str),
    pressure: &'a Pressure,
    delivery: Delivery,
}

struct SysPort<'a> {
    name: &'a str,
    content: &'a str,
    direction: Direction,
    by: (&'a str, &'a str),
}

struct Model<'a> {
    ids: Vec<&'a Name>,
    records: Vec<&'a RecordDecl>,
    system: &'a SystemDecl,
    comps: Vec<Comp<'a>>,
    conns: Vec<Conn<'a>>,
    sys_ports: Vec<SysPort<'a>>,
}

struct Resolver<'a> {
    file: &'a str,
    errors: Vec<Diagnostic>,
}

impl<'a> Resolver<'a> {
    fn err(&mut self, span: Span, message: impl Into<String>) {
        self.errors.push(Diagnostic::new(self.file, span, None, format!("生成できない: {}", message.into())));
    }

    fn resolve(&mut self, program: &'a Program) -> Option<Model<'a>> {
        let mut ids = Vec::new();
        let mut records = Vec::new();
        let mut units: HashSet<&str> = TIME_UNITS.iter().copied().collect();
        units.insert("unitless");
        let mut systems = Vec::new();
        let mut components: HashMap<&str, &ComponentDecl> = HashMap::new();
        let mut flows = Vec::new();
        let mut names: HashMap<&str, Span> = HashMap::new();

        for item in &program.items {
            let name = match item {
                Item::Id(n) => {
                    ids.push(n);
                    n
                }
                Item::Quantity(q) => {
                    if let Some(b) = &q.base {
                        units.insert(&b.text);
                    }
                    &q.name
                }
                Item::Record(r) => {
                    records.push(r);
                    &r.name
                }
                Item::System(s) => {
                    systems.push(s);
                    &s.name
                }
                Item::Component(c) => {
                    components.insert(&c.name.text, c);
                    &c.name
                }
                Item::Flow(f) => {
                    flows.push(f);
                    &f.name
                }
            };
            // 名前はファイルの中で一意とする(プログラムの宣言(U14)の仮置き)
            if names.insert(&name.text, name.span).is_some() {
                self.err(name.span, format!("名前 `{}` が二度宣言されている(名前はファイルの中で一意とする)", name.text));
            }
        }

        let data: HashSet<&str> = ids.iter().map(|n| n.text.as_str()).chain(records.iter().map(|r| r.name.text.as_str())).collect();

        for r in &records {
            for f in &r.fields {
                match &f.ty {
                    TypeRef::Named(n) if !data.contains(n.text.as_str()) => {
                        self.err(n.span, format!("型 `{}` が宣言されていない", n.text))
                    }
                    TypeRef::Float { unit, .. } | TypeRef::Int { unit, .. } if !units.contains(unit.text.as_str()) => {
                        self.err(unit.span, format!("単位 `{}` が宣言されていない", unit.text))
                    }
                    TypeRef::Int { bits: 256, span, .. } => self.err(*span, "256 ビットの整数は細い縦の試作ではまだ出さない"),
                    _ => {}
                }
            }
        }

        // ルートの system は一つ(1ファイルに1つのルートの system。プログラムの宣言(U14)の仮置き)
        let [system] = systems.as_slice() else {
            let span = systems.get(1).map(|s| s.name.span).unwrap_or_default();
            self.err(span, "system は1ファイルにちょうど1つ書く");
            return None;
        };
        let Some(sc) = &system.constraint else { return None };
        let Some(contains) = &sc.contains else {
            self.err(system.name.span, "system に contains が無い");
            return None;
        };

        let mut comps = Vec::new();
        for n in contains {
            let Some(decl) = components.get(n.text.as_str()) else {
                self.err(n.span, format!("contains の `{}` は component として宣言されていない(内側の system はまだ扱わない)", n.text));
                continue;
            };
            let mut comp = Comp { decl, inputs: Vec::new(), outputs: Vec::new() };
            if let Some(NoneOr::Items(ports)) = decl.constraint.as_ref().and_then(|c| c.expose.as_ref()) {
                for p in ports {
                    if !data.contains(p.content.text.as_str()) {
                        self.err(p.content.span, format!("型 `{}` が宣言されていない", p.content.text));
                    }
                    let port = Port { name: &p.name.text, content: &p.content.text };
                    match p.direction {
                        Direction::In => comp.inputs.push(port),
                        Direction::Out => comp.outputs.push(port),
                    }
                }
            }
            comps.push(comp);
        }
        for (name, c) in &components {
            if !contains.iter().any(|n| n.text == *name) {
                self.err(c.name.span, format!("component `{name}` がどの contains にも属さない"));
            }
        }

        let find_port = |comps: &[Comp<'a>], comp: &str, out: bool, content: &str| -> Result<&'a str, String> {
            let Some(c) = comps.iter().find(|c| c.decl.name.text == comp) else {
                return Err(format!("`{comp}` は contains の中のコンポーネントでない"));
            };
            let ports = if out { &c.outputs } else { &c.inputs };
            let found: Vec<_> = ports.iter().filter(|p| p.content == content).collect();
            match found.as_slice() {
                [p] => Ok(p.name),
                [] => Err(format!("`{comp}` に `{content}` の flow {} が無い", if out { "out" } else { "in" })),
                _ => Err(format!("`{comp}` に `{content}` の flow {} が二つ以上あり、一つに決まらない", if out { "out" } else { "in" })),
            }
        };

        let mut conns = Vec::new();
        for f in &flows {
            for k in &f.connections {
                let (Some(pressure), Some(delivery)) = (&k.pressure, k.delivery) else { continue };
                let from = find_port(&comps, &k.from.text, true, &k.content.text);
                let to = find_port(&comps, &k.to.text, false, &k.content.text);
                match (from, to) {
                    (Ok(fp), Ok(tp)) => conns.push(Conn {
                        from: (&k.from.text, fp),
                        to: (&k.to.text, tp),
                        pressure,
                        delivery,
                    }),
                    (a, b) => {
                        for e in [a.err(), b.err()].into_iter().flatten() {
                            self.err(k.span, e);
                        }
                    }
                }
            }
        }

        let mut sys_ports = Vec::new();
        if let Some(NoneOr::Items(exposes)) = &sc.expose {
            for (p, by) in exposes {
                let Some(c) = comps.iter().find(|c| c.decl.name.text == by.text) else {
                    self.err(by.span, format!("expose の担い手 `{}` は contains の中のコンポーネントでない", by.text));
                    continue;
                };
                let ports = match p.direction {
                    Direction::In => &c.inputs,
                    Direction::Out => &c.outputs,
                };
                match ports.iter().find(|q| q.name == p.name.text) {
                    Some(q) if q.content == p.content.text => sys_ports.push(SysPort {
                        name: &p.name.text,
                        content: &p.content.text,
                        direction: p.direction,
                        by: (&by.text, q.name),
                    }),
                    _ => self.err(p.name.span, format!("担い手 `{}` の expose に同じ口 `{}` が無い", by.text, p.name.text)),
                }
            }
        }

        Some(Model { ids, records, system, comps, conns, sys_ports })
    }
}

struct Gen<'m, 'a> {
    m: &'m Model<'a>,
    records: HashMap<&'a str, &'a RecordDecl>,
    ids: HashSet<&'a str>,
    out: String,
}

impl<'m, 'a> Gen<'m, 'a> {
    fn canonical(&self, ty: &TypeRef) -> String {
        match ty {
            TypeRef::Named(n) => self.canonical_named(&n.text),
            TypeRef::Float { bits, unit, .. } => format!("float{bits} {}", unit.text),
            TypeRef::Int { signed, bits, scale, unit, .. } => {
                format!("{}int{bits}({scale}) {}", if *signed { "" } else { "u" }, unit.text)
            }
            TypeRef::Instant(_) => "instant".to_string(),
        }
    }

    fn canonical_named(&self, name: &str) -> String {
        if self.ids.contains(name) {
            return format!("id {name}");
        }
        let r = self.records[name];
        let fields: Vec<String> = r.fields.iter().map(|f| format!("{}: {}", f.name.text, self.canonical(&f.ty))).collect();
        format!("record {name} {{ {} }}", fields.join(", "))
    }

    fn rust_type(&self, ty: &TypeRef) -> String {
        match ty {
            TypeRef::Named(n) => ident(&n.text),
            TypeRef::Float { bits, .. } => format!("f{bits}"),
            TypeRef::Int { signed, bits, .. } => format!("{}{bits}", if *signed { "i" } else { "u" }),
            TypeRef::Instant(_) => "i64".to_string(),
        }
    }

    fn line(&mut self, s: impl AsRef<str>) {
        self.out.push_str(s.as_ref());
        self.out.push('\n');
    }

    fn generate(mut self, file: &str) -> String {
        let m = self.m;
        self.line(format!("// 生成した物: {file} から shidzuku-compiler が生成した。手で書き換えない。"));
        self.line("// 正準形の符号化は試作の仮の形式である(欄の順に、数を大きい桁から並べる)。形式は混在の試作の前に決める。");
        self.line("");
        self.line("use shidzuku_runtime_pc as rt;");
        self.line("use rt::核::記述子 as 記;");
        self.line("");
        self.line(PRELUDE);

        self.line("// ---- データ ----");
        for n in &m.ids {
            let fp = fingerprint(&self.canonical_named(&n.text));
            let t = ident(&n.text);
            self.line(format!("/// `id {}`。中身は試作の仮の表現(64ビットの整数)", n.text));
            self.line("#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord)]");
            self.line(format!("pub struct {t}(pub u64);"));
            self.line(format!("impl 正準形 for {t} {{"));
            self.line(format!("    const 型の指紋: u64 = {fp:#018x};"));
            self.line("    fn 符号化(&self, 先: &mut Vec<u8>) { 先.extend_from_slice(&self.0.to_be_bytes()); }");
            self.line("    fn 復号(元: &mut &[u8]) -> Result<Self, rt::復号の失敗> { Ok(Self(u64::from_be_bytes(取り出す::<8>(元)?))) }");
            self.line("}");
            self.line("");
        }
        for r in &m.records {
            let canonical = self.canonical_named(&r.name.text);
            let fp = fingerprint(&canonical);
            let t = ident(&r.name.text);
            self.line(format!("/// `{canonical}`"));
            self.line("#[derive(Clone, Debug, PartialEq)]");
            self.line(format!("pub struct {t} {{"));
            for f in &r.fields {
                let doc = match &f.ty {
                    TypeRef::Instant(_) => "instant(UTC のエポックからのナノ秒)".to_string(),
                    other => self.canonical(other),
                };
                self.line(format!("    /// {doc}"));
                self.line(format!("    pub {}: {},", ident(&f.name.text), self.rust_type(&f.ty)));
            }
            self.line("}");
            self.line(format!("impl 正準形 for {t} {{"));
            self.line(format!("    const 型の指紋: u64 = {fp:#018x};"));
            self.line("    fn 符号化(&self, 先: &mut Vec<u8>) {");
            for f in &r.fields {
                let field = ident(&f.name.text);
                match &f.ty {
                    TypeRef::Named(_) => self.line(format!("        self.{field}.符号化(先);")),
                    TypeRef::Float { .. } => self.line(format!("        先.extend_from_slice(&self.{field}.to_bits().to_be_bytes());")),
                    TypeRef::Int { .. } | TypeRef::Instant(_) => self.line(format!("        先.extend_from_slice(&self.{field}.to_be_bytes());")),
                }
            }
            self.line("    }");
            self.line("    fn 復号(元: &mut &[u8]) -> Result<Self, rt::復号の失敗> {");
            self.line("        Ok(Self {");
            for f in &r.fields {
                let field = ident(&f.name.text);
                let expr = match &f.ty {
                    TypeRef::Named(n) => format!("<{} as 正準形>::復号(元)?", ident(&n.text)),
                    TypeRef::Float { bits, .. } => {
                        format!("f{bits}::from_bits(u{bits}::from_be_bytes(取り出す::<{}>(元)?))", bits / 8)
                    }
                    TypeRef::Int { .. } | TypeRef::Instant(_) => {
                        let rt = self.rust_type(&f.ty);
                        let bytes = match &f.ty {
                            TypeRef::Int { bits, .. } => bits / 8,
                            _ => 8,
                        };
                        format!("{rt}::from_be_bytes(取り出す::<{bytes}>(元)?)")
                    }
                };
                self.line(format!("            {field}: {expr},"));
            }
            self.line("        })");
            self.line("    }");
            self.line("}");
            self.line("");
        }

        for c in &m.comps {
            self.component(c);
        }
        self.descriptor();
        self.startup();
        self.out
    }

    fn component(&mut self, c: &Comp<'a>) {
        let name = &c.decl.name.text;
        self.line(format!("// ---- コンポーネント {name} ----"));
        self.line(format!("/// {name} の出口。body はここから流す(接合面の4つ目)"));
        self.line(format!("pub struct {name}の出口 {{"));
        for p in &c.outputs {
            self.line(format!("    {}: rt::出口,", ident(p.name)));
        }
        self.line("}");
        self.line(format!("impl {name}の出口 {{"));
        for p in &c.outputs {
            self.line(format!("    /// `expose {}({}) flow out`", p.name, p.content));
            self.line(format!(
                "    pub async fn {}(&self, 値: &{}) -> Result<(), rt::接続の失敗> {{ self.{}.流す(値.符号化した物()).await }}",
                ident(p.name),
                ident(p.content),
                ident(p.name)
            ));
        }
        self.line("}");
        self.line(format!("/// {name} の body。出力言語(Rust)で直に書く(計画書 第4節「仮置き」)。受け口ごとに一つの仕事を持つ"));
        self.line("#[allow(async_fn_in_trait)]");
        self.line(format!("pub trait {name}の本体 {{"));
        for p in &c.inputs {
            self.line(format!("    /// `expose {}({}) flow in`", p.name, p.content));
            self.line(format!(
                "    async fn {}(&mut self, 値: {}, 出口: &{name}の出口) -> Result<(), rt::障害>;",
                ident(p.name),
                ident(p.content)
            ));
        }
        self.line("}");
        if !c.inputs.is_empty() {
            self.line(format!("/// {name} の仕事を回す。コンポーネントの中は逐次であり、一件を終えてから次を受ける"));
            self.line(format!(
                "async fn {name}を動かす(mut 本体: impl {name}の本体, 出口: {name}の出口, 受け口: rt::受け口群) -> Result<(), rt::障害> {{"
            ));
            self.line("    loop {");
            self.line("        let 受けた = 受け口.受ける().await;");
            self.line("        match 受けた.口 {");
            for (i, p) in c.inputs.iter().enumerate() {
                self.line(format!(
                    "            {i} => 本体.{}(<{} as 正準形>::全て復号(&受けた.中身)?, &出口).await?,",
                    ident(p.name),
                    ident(p.content)
                ));
            }
            self.line("            _ => unreachable!(\"記述子に無い受け口\"),");
            self.line("        }");
            self.line("        受け口.終えた(受けた.番);");
            self.line("    }");
            self.line("}");
        }
        self.line("");
    }

    fn descriptor(&mut self) {
        let m = self.m;
        let q = |s: &str| format!("{s:?}");
        self.line("// ---- 記述子(接合面の1つ目の結合で渡す) ----");
        self.line("/// システムの記述子");
        self.line("pub fn 記述子() -> 記::システムの記述子 {");
        self.line("    let 口 = |名前: &str, 型の指紋: u64| 記::口の記述 { 名前: 名前.to_string(), 型の指紋 };");
        self.line("    let 所在 = |c: &str, p: &str| 記::口の所在 { コンポーネント: c.to_string(), 口: p.to_string() };");
        self.line("    記::システムの記述子 {");
        self.line(format!("        名前: {}.to_string(),", q(&m.system.name.text)));
        self.line("        コンポーネント: vec![");
        for c in &m.comps {
            let ports = |ps: &[Port]| {
                ps.iter().map(|p| format!("口({}, <{} as 正準形>::型の指紋)", q(p.name), ident(p.content))).collect::<Vec<_>>().join(", ")
            };
            self.line(format!(
                "            記::コンポーネントの記述子 {{ 名前: {}.to_string(), 受け口: vec![{}], 出口: vec![{}] }},",
                q(&c.decl.name.text),
                ports(&c.inputs),
                ports(&c.outputs)
            ));
        }
        self.line("        ],");
        self.line("        接続: vec![");
        for k in &m.conns {
            let deadline = |d: Option<u64>| d.map_or("None".to_string(), |ns| format!("Some({ns})"));
            let p = match k.pressure.kind {
                PressureKind::Block => format!(
                    "Block {{ 期限: {}, 上限: {} }}",
                    deadline(k.pressure.deadline.flatten()),
                    k.pressure.bound.map_or(0, |b| b.0)
                ),
                PressureKind::Drop => format!("Drop {{ 上限: {} }}", k.pressure.bound.map_or(0, |b| b.0)),
                PressureKind::Latest => "Latest".to_string(),
            };
            let d = match k.delivery {
                Delivery::Transient => "Transient",
                Delivery::Durable => "Durable",
            };
            self.line(format!(
                "            記::接続の記述 {{ 送り手: 所在({}, {}), 受け手: 所在({}, {}), 圧力: rt::核::待ち行列::圧力::{p}, 配達保証: 記::配達保証::{d} }},",
                q(k.from.0),
                q(k.from.1),
                q(k.to.0),
                q(k.to.1)
            ));
        }
        self.line("        ],");
        self.line("        口: vec![");
        for p in &m.sys_ports {
            let dir = match p.direction {
                Direction::In => "入り",
                Direction::Out => "出",
            };
            self.line(format!(
                "            記::システムの口 {{ 名前: {}.to_string(), 向き: 記::向き::{dir}, 型の指紋: <{} as 正準形>::型の指紋, 担い手: 所在({}, {}) }},",
                q(p.name),
                ident(p.content),
                q(p.by.0),
                q(p.by.1)
            ));
        }
        self.line("        ],");
        self.line("    }");
        self.line("}");
        self.line("");
    }

    fn startup(&mut self) {
        let m = self.m;
        let sys = &m.system.name.text;
        let q = |s: &str| format!("{s:?}");
        self.line("// ---- 起動 ----");
        self.line(format!("/// {sys} の試験の口。ルートの system の expose を、試験から値を流し込む口と、値を受け取る口にする(計画書 第4節「仮置き」)"));
        self.line(format!("pub struct {sys}の口 {{"));
        for p in &m.sys_ports {
            let t = if p.direction == Direction::In { "rt::出口" } else { "rt::受け口群" };
            self.line(format!("    {}: {t},", ident(p.name)));
        }
        self.line("}");
        self.line(format!("impl {sys}の口 {{"));
        for p in &m.sys_ports {
            let f = ident(p.name);
            let t = ident(p.content);
            match p.direction {
                Direction::In => {
                    self.line(format!("    /// 試験から流し込む: `expose {}({}) flow in by {}`", p.name, p.content, p.by.0));
                    self.line(format!(
                        "    pub async fn {f}(&self, 値: &{t}) -> Result<(), rt::接続の失敗> {{ self.{f}.流す(値.符号化した物()).await }}"
                    ));
                }
                Direction::Out => {
                    self.line(format!("    /// 試験が受け取る: `expose {}({}) flow out by {}`", p.name, p.content, p.by.0));
                    self.line(format!("    pub async fn {f}(&self) -> Result<{t}, rt::復号の失敗> {{"));
                    self.line(format!("        let 受けた = self.{f}.受ける().await;"));
                    self.line(format!("        self.{f}.終えた(受けた.番);"));
                    self.line(format!("        <{t} as 正準形>::全て復号(&受けた.中身)"));
                    self.line("    }");
                }
            }
        }
        self.line("}");
        let params: Vec<String> = m.comps.iter().map(|c| format!("{0}: impl {0}の本体 + 'static", c.decl.name.text)).collect();
        self.line("/// 記述子を結合し、全てのコンポーネントを同居の形で起こす(起動の骨組み)");
        self.line(format!(
            "pub fn 起動(環境: &rt::動作環境, {}) -> Result<{sys}の口, rt::結合の失敗> {{",
            params.join(", ")
        ));
        self.line("    let mut 結合 = 環境.結合(記述子())?;");
        for c in &m.comps {
            let name = &c.decl.name.text;
            if c.inputs.is_empty() {
                self.line(format!("    let _ = {name}; // 受け口が無いので起こす仕事が無い"));
                continue;
            }
            self.line("    {");
            self.line(format!("        let 出口 = {name}の出口 {{"));
            for p in &c.outputs {
                self.line(format!("            {}: 結合.出口({}, {})?,", ident(p.name), q(name), q(p.name)));
            }
            self.line("        };");
            self.line(format!("        let 受け口 = 結合.受け口群({})?;", q(name)));
            self.line(format!("        環境.起こす({}, {name}を動かす({name}, 出口, 受け口));", q(name)));
            self.line("    }");
        }
        self.line(format!("    Ok({sys}の口 {{"));
        for p in &m.sys_ports {
            let method = if p.direction == Direction::In { "試験の入口" } else { "試験の受け口" };
            self.line(format!("        {}: 結合.{method}({})?,", ident(p.name), q(p.name)));
        }
        self.line("    })");
        self.line("}");
    }
}

const PRELUDE: &str = r#"/// 正準形への符号化と復号(バックエンドの責務の2つ目)
pub trait 正準形: Sized {
    /// 型の指紋。記述子の照合で、接続の両端の型が同じかを見る
    const 型の指紋: u64;
    fn 符号化(&self, 先: &mut Vec<u8>);
    fn 復号(元: &mut &[u8]) -> Result<Self, rt::復号の失敗>;
    fn 符号化した物(&self) -> Vec<u8> {
        let mut 先 = Vec::new();
        self.符号化(&mut 先);
        先
    }
    fn 全て復号(mut 元: &[u8]) -> Result<Self, rt::復号の失敗> {
        let 値 = Self::復号(&mut 元)?;
        if 元.is_empty() { Ok(値) } else { Err(rt::復号の失敗) }
    }
}

fn 取り出す<const N: usize>(元: &mut &[u8]) -> Result<[u8; N], rt::復号の失敗> {
    if 元.len() < N {
        return Err(rt::復号の失敗);
    }
    let (頭, 残り) = 元.split_at(N);
    *元 = 残り;
    頭.try_into().map_err(|_| rt::復号の失敗)
}
"#;

/// 名前を解決して Rust を生成する。
pub fn generate(program: &Program, file: &str) -> Result<String, Vec<Diagnostic>> {
    let mut r = Resolver { file, errors: Vec::new() };
    let model = r.resolve(program);
    if !r.errors.is_empty() {
        return Err(r.errors);
    }
    let Some(m) = model else { return Err(vec![Diagnostic::new(file, Span::default(), None, "生成できない")]) };
    let records = m.records.iter().map(|r| (r.name.text.as_str(), *r)).collect();
    let ids = m.ids.iter().map(|n| n.text.as_str()).collect();
    let g = Gen { m: &m, records, ids, out: String::new() };
    let mut code = g.generate(file);
    let _ = writeln!(code);
    Ok(code)
}

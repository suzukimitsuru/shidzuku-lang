//! 構文の木。
//!
//! 必須の宣言でも、書かれていなければ `None` として読む。欠落を報告するのは検証器の仕事である。

use crate::diag::Span;

#[derive(Clone, Debug, PartialEq)]
pub struct Name {
    pub text: String,
    pub span: Span,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Str {
    pub text: String,
    pub span: Span,
}

/// `none` か、一つ以上の物の並び。
#[derive(Clone, Debug, PartialEq)]
pub enum NoneOr<T> {
    None(Span),
    Items(Vec<T>),
}

#[derive(Clone, Debug, PartialEq, Default)]
pub struct Program {
    pub items: Vec<Item>,
}

#[derive(Clone, Debug, PartialEq)]
pub enum Item {
    Id(Name),
    Quantity(QuantityDecl),
    Record(RecordDecl),
    System(SystemDecl),
    Component(ComponentDecl),
    Flow(FlowDecl),
}

/// `quantity <名前> <種別> base <単位 | none>`
#[derive(Clone, Debug, PartialEq)]
pub struct QuantityDecl {
    pub name: Name,
    pub kind: Name,
    pub base: Option<Name>,
}

/// `record <名前> { <欄名>: <型>, ... }`
#[derive(Clone, Debug, PartialEq)]
pub struct RecordDecl {
    pub name: Name,
    pub fields: Vec<Field>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Field {
    pub name: Name,
    pub ty: TypeRef,
}

#[derive(Clone, Debug, PartialEq)]
pub enum TypeRef {
    /// データ宣言(`record`・`id`)の名前
    Named(Name),
    /// `float32 <単位>`・`float64 <単位>`
    Float { bits: u16, unit: Name, span: Span },
    /// `intN(<位取り>) <単位>`・`uintN(<位取り>) <単位>`
    Int { signed: bool, bits: u16, scale: u32, unit: Name, span: Span },
    /// `instant`
    Instant(Span),
}

impl TypeRef {
    pub fn span(&self) -> Span {
        match self {
            TypeRef::Named(n) => n.span,
            TypeRef::Float { span, .. } | TypeRef::Int { span, .. } | TypeRef::Instant(span) => *span,
        }
    }
}

/// 意図の層。
#[derive(Clone, Debug, PartialEq)]
pub struct Intent {
    pub span: Span,
    pub why: Option<Str>,
    pub rejected: Vec<Rejected>,
    pub rejected_none: Option<Str>,
    pub change: Option<Str>,
    pub refs: Option<Str>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Rejected {
    pub option: Str,
    pub reason: Option<Str>,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Direction {
    In,
    Out,
}

/// 公開面の `flow` の口。`<名前>(<内容>) flow in|out`
#[derive(Clone, Debug, PartialEq)]
pub struct FlowPort {
    pub name: Name,
    pub content: Name,
    pub direction: Direction,
}

#[derive(Clone, Debug, PartialEq)]
pub struct SystemDecl {
    pub name: Name,
    pub intent: Option<Intent>,
    pub constraint: Option<SystemConstraint>,
}

#[derive(Clone, Debug, PartialEq, Default)]
pub struct SystemConstraint {
    pub actor: Option<NoneOr<(Name, Str)>>,
    pub external: Option<NoneOr<(Name, Str)>>,
    pub depends: Option<NoneOr<Name>>,
    pub expose: Option<NoneOr<(FlowPort, Name)>>,
    pub contains: Option<Vec<Name>>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct ComponentDecl {
    pub name: Name,
    pub intent: Option<Intent>,
    pub constraint: Option<ComponentConstraint>,
    /// `body { ... }` の位置。中身は読まない(body は出力言語で直に書く。計画書 第4節「仮置き」)
    pub body: Option<Span>,
}

#[derive(Clone, Debug, PartialEq, Default)]
pub struct ComponentConstraint {
    pub depends: Option<NoneOr<Name>>,
    pub expose: Option<NoneOr<FlowPort>>,
    pub idempotent: Vec<Name>,
    pub state: Option<NoneOr<Name>>,
    pub collator: Option<NoneOr<Name>>,
    pub layers: Option<Vec<Layer>>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Layer {
    pub name: Name,
    pub strength: Name,
    pub role: Name,
}

#[derive(Clone, Debug, PartialEq)]
pub struct FlowDecl {
    pub name: Name,
    pub intent: Option<Intent>,
    pub connections: Vec<Connection>,
    pub on_failures: Vec<OnFailure>,
}

/// `<送り手> -> <受け手> : flow <内容> pressure <ポリシー> (transient | durable)`
#[derive(Clone, Debug, PartialEq)]
pub struct Connection {
    pub span: Span,
    pub from: Name,
    pub to: Name,
    pub content: Name,
    pub pressure: Option<Pressure>,
    pub delivery: Option<Delivery>,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum PressureKind {
    Block,
    Drop,
    Latest,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Pressure {
    pub span: Span,
    pub kind: PressureKind,
    /// `deadline` の欄。外側の `None` は書かれていない、内側の `None` は `deadline none`。値はナノ秒
    pub deadline: Option<Option<u64>>,
    /// `bound <数> 要素` の欄
    pub bound: Option<(u64, Span)>,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Delivery {
    Transient,
    Durable,
}

/// `on failure <コンポーネント> { restart | restart none }`
#[derive(Clone, Debug, PartialEq)]
pub struct OnFailure {
    pub component: Name,
    /// `restart` の行。`Some(true)` は `restart`、`Some(false)` は `restart none`
    pub restart: Option<bool>,
}

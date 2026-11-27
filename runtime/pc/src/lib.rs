//! Shidzuku の動作環境の PC の器。
//!
//! 意味の核([`shidzuku_runtime_core`])に、時計(OS の経過時間計)とロード(Rust の同居)を差し込む
//! (ADR 0029(最小の動作環境)の決定1(意味の核を1つのクレートにする))。
//! 通信は1プロセスの中の待ち行列であり、永続化はまだ持たない(能力の `durable` は偽)。
//!
//! コンポーネントの中は逐次とし、一本の非同期の実行系(`tokio` の `current_thread`)で動かす
//! (ADR 0032(実行モデルと順序保証)の決定1(コンポーネントの中は逐次)・決定13(出力先への写し)。提案。仮置きとして従う)。
//! 細い縦の試作では、待つ所で次の仕事を受ける再入(同じく決定2)はまだ行わない。
//!
//! 接合面(ADR 0012 の決定3)のうち、ここで通すのは次の三つである。
//!
//! | 呼び出し                 | ここでの形                                  |
//! | ------------------------ | ------------------------------------------- |
//! | 結合(接合面の1つ目)      | [`動作環境::結合`]                          |
//! | 流す(接合面の4つ目)      | [`出口::流す`]                              |
//! | 流れを受ける(5つ目)      | [`受け口群::受ける`]・[`受け口群::終えた`]  |
//!
//! 接合面を流れるのは正準形のバイト列だけであり、器は中身を解釈しない(ADR 0012 の決定4)。

#![allow(non_snake_case, mixed_script_confusables)]

use std::cell::{Cell, RefCell};
use std::collections::HashMap;
use std::fmt;
use std::future::Future;
use std::rc::Rc;
use std::time::{Duration, Instant};

use tokio::sync::Notify;

pub use shidzuku_runtime_core as 核;

use 核::待ち行列::{差し出し, 圧力, 待ち行列};
use 核::期限::{残り, 残りを測る};
use 核::記述子::{システムの記述子, 向き, 照合の失敗, 能力};

/// ルートのシステムの公開面(試験の口)に動作環境が決め打ちで置く `pressure`。
///
/// 外部との境界(U12)が決まるまで、外部は書かない(計画書 第4節「仮置き」)。
/// そのため試験の口には `pressure` を書く場所が無く、器が決める。
pub const 試験の口の圧力: 圧力 = 圧力::Block { 期限: None, 上限: 64 };

/// 試験の中で、動作環境を一本の非同期の実行系の上で走らせる。
pub fn 走らせる<F: Future>(仕事: F) -> F::Output {
    let 実行系 = tokio::runtime::Builder::new_current_thread()
        .enable_time()
        .build()
        .expect("非同期の実行系を作れなかった");
    let 局所 = tokio::task::LocalSet::new();
    局所.block_on(&実行系, 仕事)
}

/// 経過時間計。
#[derive(Clone)]
struct 時計 {
    始め: Instant,
}

impl 時計 {
    fn 今(&self) -> u64 {
        self.始め.elapsed().as_nanos() as u64
    }
}

/// 動作環境。
pub struct 動作環境 {
    能力: 能力,
    時計: 時計,
}

impl Default for 動作環境 {
    fn default() -> Self {
        Self::新しく()
    }
}

impl 動作環境 {
    pub fn 新しく() -> Self {
        Self { 能力: 能力 { durable: false }, 時計: 時計 { 始め: Instant::now() } }
    }

    pub fn 能力(&self) -> 能力 {
        self.能力
    }

    /// 結合(接合面の1つ目)。記述子を照合し、能力に無い意味を要る物を拒み、接続の待ち行列を作る。
    pub fn 結合(&self, 記述子: システムの記述子) -> Result<結合済み, 結合の失敗> {
        let 失敗 = 記述子.照合する(&self.能力);
        if !失敗.is_empty() {
            return Err(結合の失敗::照合(失敗));
        }

        let mut 結合 = 結合済み {
            記述子: 記述子.clone(),
            時計: self.時計.clone(),
            出口: HashMap::new(),
            受け口: HashMap::new(),
            試験の入口: HashMap::new(),
            試験の受け口: HashMap::new(),
        };

        // 受け手ごとに「届いた」の知らせを一つ持つ。受け手は自分の受け口のどれかに届くのを待つ
        let mut 届いた: HashMap<String, Rc<Notify>> = HashMap::new();
        for c in &記述子.コンポーネント {
            届いた.insert(c.名前.clone(), Rc::new(Notify::new()));
        }

        for k in &記述子.接続 {
            let 番 = 受け口の番(&記述子, &k.受け手.コンポーネント, &k.受け手.口);
            let 接続 = Rc::new(接続::新しく(
                format!("{}.{} -> {}.{}", k.送り手.コンポーネント, k.送り手.口, k.受け手.コンポーネント, k.受け手.口),
                k.圧力,
                届いた[&k.受け手.コンポーネント].clone(),
            ));
            結合.出口.entry((k.送り手.コンポーネント.clone(), k.送り手.口.clone())).or_default().push(接続.clone());
            結合.受け口.entry(k.受け手.コンポーネント.clone()).or_default().push((番, 接続));
        }

        for 口 in &記述子.口 {
            match 口.向き {
                向き::入り => {
                    let 番 = 受け口の番(&記述子, &口.担い手.コンポーネント, &口.担い手.口);
                    let 接続 = Rc::new(接続::新しく(
                        format!("試験 -> {}.{}", 口.担い手.コンポーネント, 口.担い手.口),
                        試験の口の圧力,
                        届いた[&口.担い手.コンポーネント].clone(),
                    ));
                    結合.試験の入口.insert(口.名前.clone(), 接続.clone());
                    結合.受け口.entry(口.担い手.コンポーネント.clone()).or_default().push((番, 接続));
                }
                向き::出 => {
                    let 接続 = Rc::new(接続::新しく(
                        format!("{}.{} -> 試験", 口.担い手.コンポーネント, 口.担い手.口),
                        試験の口の圧力,
                        Rc::new(Notify::new()),
                    ));
                    結合.試験の受け口.insert(口.名前.clone(), 接続.clone());
                    結合.出口.entry((口.担い手.コンポーネント.clone(), 口.担い手.口.clone())).or_default().push(接続);
                }
            }
        }

        Ok(結合)
    }

    /// コンポーネントの仕事を同居の形で起こす(Rust の同居。ADR 0012 の決定5)。
    /// 障害で止まった事は記録するが、再起動はまだしない(再起動と版の入れ替えの試作で足す)。
    pub fn 起こす(&self, コンポーネント: &str, 仕事: impl Future<Output = Result<(), 障害>> + 'static) {
        let 名前 = コンポーネント.to_string();
        tokio::task::spawn_local(async move {
            if let Err(e) = 仕事.await {
                eprintln!("動作環境: {名前} が障害で止まった: {e}");
            }
        });
    }
}

fn 受け口の番(記述子: &システムの記述子, コンポーネント: &str, 口: &str) -> usize {
    記述子
        .コンポーネント
        .iter()
        .find(|c| c.名前 == コンポーネント)
        .and_then(|c| c.受け口.iter().position(|p| p.名前 == 口))
        .expect("照合を通った記述子の受け口")
}

/// 結合の失敗。
#[derive(Debug)]
pub enum 結合の失敗 {
    照合(Vec<照合の失敗>),
    口が無い(String),
}

impl fmt::Display for 結合の失敗 {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            結合の失敗::照合(v) => write!(f, "記述子の照合で拒んだ: {v:?}"),
            結合の失敗::口が無い(s) => write!(f, "結合した記述子に口が無い: {s}"),
        }
    }
}

impl std::error::Error for 結合の失敗 {}

/// 結合を済ませた記述子。生成した起動の骨組みが、ここから口を取り出す。
pub struct 結合済み {
    記述子: システムの記述子,
    時計: 時計,
    出口: HashMap<(String, String), Vec<Rc<接続>>>,
    受け口: HashMap<String, Vec<(usize, Rc<接続>)>>,
    試験の入口: HashMap<String, Rc<接続>>,
    試験の受け口: HashMap<String, Rc<接続>>,
}

impl 結合済み {
    pub fn 記述子(&self) -> &システムの記述子 {
        &self.記述子
    }

    /// コンポーネントの出口を取り出す。
    pub fn 出口(&mut self, コンポーネント: &str, 口: &str) -> Result<出口, 結合の失敗> {
        let 接続 = self
            .出口
            .remove(&(コンポーネント.to_string(), 口.to_string()))
            .ok_or_else(|| 結合の失敗::口が無い(format!("{コンポーネント}.{口}")))?;
        Ok(出口 { 接続, 時計: self.時計.clone() })
    }

    /// コンポーネントの受け口の全てを、一つの受け口群として取り出す。
    pub fn 受け口群(&mut self, コンポーネント: &str) -> Result<受け口群, 結合の失敗> {
        let 口 = self
            .受け口
            .remove(コンポーネント)
            .ok_or_else(|| 結合の失敗::口が無い(コンポーネント.to_string()))?;
        let 届いた = 口[0].1.届いた.clone();
        Ok(受け口群 { 口, 届いた, 次: Cell::new(0) })
    }

    /// ルートのシステムの `flow in` を、試験から値を流し込む口として取り出す。
    pub fn 試験の入口(&mut self, 口: &str) -> Result<出口, 結合の失敗> {
        let 接続 = self.試験の入口.remove(口).ok_or_else(|| 結合の失敗::口が無い(口.to_string()))?;
        Ok(出口 { 接続: vec![接続], 時計: self.時計.clone() })
    }

    /// ルートのシステムの `flow out` を、試験が値を受け取る口として取り出す。
    pub fn 試験の受け口(&mut self, 口: &str) -> Result<受け口群, 結合の失敗> {
        let 接続 = self.試験の受け口.remove(口).ok_or_else(|| 結合の失敗::口が無い(口.to_string()))?;
        let 届いた = 接続.届いた.clone();
        Ok(受け口群 { 口: vec![(0, 接続)], 届いた, 次: Cell::new(0) })
    }
}

/// 一本の接続。
struct 接続 {
    名前: String,
    行列: RefCell<待ち行列<Vec<u8>>>,
    /// 受け手が仕事を終えて空きができた知らせ
    空き: Notify,
    /// 受け手の受け口のどれかに届いた知らせ(受け手ごとに共有する)
    届いた: Rc<Notify>,
}

impl 接続 {
    fn 新しく(名前: String, 圧力: 圧力, 届いた: Rc<Notify>) -> Self {
        Self { 名前, 行列: RefCell::new(待ち行列::新しく(圧力)), 空き: Notify::new(), 届いた }
    }
}

/// 接続の失敗(第4章 4.5)。公開面には現れず、フローの `on failure` が引き受ける。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum 接続の失敗 {
    /// `pressure block` の期限を過ぎても受け付けられなかった。
    受付の期限切れ { 接続: String },
}

impl fmt::Display for 接続の失敗 {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            接続の失敗::受付の期限切れ { 接続 } => write!(f, "{接続} の pressure block の期限を過ぎた"),
        }
    }
}

impl std::error::Error for 接続の失敗 {}

/// 正準形を読めなかった。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct 復号の失敗;

impl fmt::Display for 復号の失敗 {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "正準形を読めなかった")
    }
}

impl std::error::Error for 復号の失敗 {}

/// コンポーネントの障害。body が返すと、そのコンポーネントの仕事が止まる。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct 障害 {
    pub 理由: String,
}

impl 障害 {
    pub fn 新しく(理由: impl Into<String>) -> Self {
        Self { 理由: 理由.into() }
    }
}

impl fmt::Display for 障害 {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.理由)
    }
}

impl From<接続の失敗> for 障害 {
    fn from(e: 接続の失敗) -> Self {
        障害::新しく(e.to_string())
    }
}

impl From<復号の失敗> for 障害 {
    fn from(e: 復号の失敗) -> Self {
        障害::新しく(e.to_string())
    }
}

/// コンポーネントの一つの出口(ファンアウトなら複数の接続を持つ)。
pub struct 出口 {
    接続: Vec<Rc<接続>>,
    時計: 時計,
}

impl 出口 {
    /// 流す(接合面の4つ目)。`pressure` を適用する。ファンアウトの各接続は互いに独立に扱う(第4章 4.3)。
    pub async fn 流す(&self, 中身: Vec<u8>) -> Result<(), 接続の失敗> {
        let 最後 = self.接続.len().saturating_sub(1);
        let mut 中身 = Some(中身);
        for (i, k) in self.接続.iter().enumerate() {
            let 物 = if i == 最後 { 中身.take().unwrap_or_default() } else { 中身.clone().unwrap_or_default() };
            self.一本に流す(k, 物).await?;
        }
        Ok(())
    }

    async fn 一本に流す(&self, k: &接続, mut 物: Vec<u8>) -> Result<(), 接続の失敗> {
        let 始め = self.時計.今();
        let 期限 = match k.行列.borrow().圧力() {
            圧力::Block { 期限, .. } => 期限,
            _ => None,
        };
        loop {
            let 知らせ = k.空き.notified();
            tokio::pin!(知らせ);
            知らせ.as_mut().enable();

            let 結果 = k.行列.borrow_mut().差し出す(物);
            match 結果 {
                差し出し::受けた | 差し出し::置き換えた | 差し出し::捨てた => {
                    k.届いた.notify_one();
                    return Ok(());
                }
                差し出し::満杯(戻った) => 物 = 戻った,
            }

            match 残りを測る(始め, self.時計.今(), 期限) {
                残り::無期限 => 知らせ.await,
                残り::あと(ns) => {
                    let _ = tokio::time::timeout(Duration::from_nanos(ns), 知らせ).await;
                }
                残り::過ぎた => return Err(接続の失敗::受付の期限切れ { 接続: k.名前.clone() }),
            }
        }
    }
}

/// 受け取った一件。
pub struct 受けた物 {
    /// どの受け口に届いたか(コンポーネント記述子の受け口の並びの番号)
    pub 口: usize,
    /// 正準形のバイト列
    pub 中身: Vec<u8>,
    /// どの接続から取り出したか([`受け口群::終えた`] に渡す)
    pub 番: usize,
}

/// コンポーネントの受け口の全て。
pub struct 受け口群 {
    口: Vec<(usize, Rc<接続>)>,
    届いた: Rc<Notify>,
    次: Cell<usize>,
}

impl 受け口群 {
    /// 流れを受ける(接合面の5つ目)。どれかの受け口に届くまで待つ。
    /// 接続の中は送った順に渡す。受け口を跨ぐ順は言わない(ADR 0032 の決定10(言わない順序))ので、順に見て回る。
    pub async fn 受ける(&self) -> 受けた物 {
        loop {
            let 知らせ = self.届いた.notified();
            tokio::pin!(知らせ);
            知らせ.as_mut().enable();

            let n = self.口.len();
            for j in 0..n {
                let 番 = (self.次.get() + j) % n;
                let (口, k) = &self.口[番];
                let 取れた = k.行列.borrow_mut().取り出す();
                if let Some(中身) = 取れた {
                    self.次.set((番 + 1) % n);
                    return 受けた物 { 口: *口, 中身, 番 };
                }
            }
            知らせ.await;
        }
    }

    /// 受けた一件の仕事を終えた(受領を返す)。上限の数から外し、待っている送り手に知らせる。
    pub fn 終えた(&self, 番: usize) {
        let k = &self.口[番].1;
        k.行列.borrow_mut().終えた();
        k.空き.notify_waiters();
    }
}

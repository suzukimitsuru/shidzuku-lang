//! コンポーネント記述子とシステムの記述子、その照合(ADR 0012 の決定9(互換性の単位))と能力の判定(ADR 0029 の決定3(能力と配置の設定))。
//!
//! 記述子に載るのは名前・口・型の指紋・接続の属性だけであり、値の中身は載らない。
//! 版(`名前@版`)は、再起動と版の入れ替えの試作で足す。

use alloc::string::String;
use alloc::vec::Vec;

use crate::queue::圧力;

/// 接続の配達保証(第4章 4.4)。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum 配達保証 {
    Transient,
    Durable,
}

/// 公開面の一つの口(`flow in` か `flow out`)。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct 口の記述 {
    pub 名前: String,
    pub 型の指紋: u64,
}

/// コンポーネント記述子。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct コンポーネントの記述子 {
    pub 名前: String,
    pub 受け口: Vec<口の記述>,
    pub 出口: Vec<口の記述>,
}

/// コンポーネントの口を指す。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct 口の所在 {
    pub コンポーネント: String,
    pub 口: String,
}

/// `flow` 宣言の一本の接続。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct 接続の記述 {
    pub 送り手: 口の所在,
    pub 受け手: 口の所在,
    pub 圧力: 圧力,
    pub 配達保証: 配達保証,
}

/// ルートのシステムの公開面の向き。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum 向き {
    /// `flow in`。試験から値を流し込む口になる。
    入り,
    /// `flow out`。試験が値を受け取る口になる。
    出,
}

/// ルートのシステムの公開面の口と、それを担うコンポーネントの口(`expose ... by`)。
///
/// 外部との境界(U12)が決まるまでは、試験の口として使う(計画書 第4節「仮置き」)。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct システムの口 {
    pub 名前: String,
    pub 向き: 向き,
    pub 型の指紋: u64,
    pub 担い手: 口の所在,
}

/// システムの記述子。1プロセスに載せる単位。
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct システムの記述子 {
    pub 名前: String,
    pub コンポーネント: Vec<コンポーネントの記述子>,
    pub 接続: Vec<接続の記述>,
    pub 口: Vec<システムの口>,
}

/// 動作環境が持つ意味の一覧(能力)。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct 能力 {
    pub durable: bool,
}

/// 照合で見つかった食い違い。
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum 照合の失敗 {
    コンポーネントの名前が重なる(String),
    コンポーネントが無い(String),
    口が無い(口の所在),
    型の指紋が合わない { 送り手: 口の所在, 受け手: 口の所在 },
    受け口に何も繋がっていない(口の所在),
    出口がどこにも繋がっていない(口の所在),
    上限が0(口の所在),
    能力に無い { 意味: &'static str, 受け手: 口の所在 },
}

impl システムの記述子 {
    fn コンポーネントを探す(&self, 名前: &str) -> Option<&コンポーネントの記述子> {
        self.コンポーネント.iter().find(|c| c.名前 == 名前)
    }

    fn 受け口を探す(&self, 所在: &口の所在) -> Result<&口の記述, 照合の失敗> {
        let c = self
            .コンポーネントを探す(&所在.コンポーネント)
            .ok_or_else(|| 照合の失敗::コンポーネントが無い(所在.コンポーネント.clone()))?;
        c.受け口.iter().find(|p| p.名前 == 所在.口).ok_or_else(|| 照合の失敗::口が無い(所在.clone()))
    }

    fn 出口を探す(&self, 所在: &口の所在) -> Result<&口の記述, 照合の失敗> {
        let c = self
            .コンポーネントを探す(&所在.コンポーネント)
            .ok_or_else(|| 照合の失敗::コンポーネントが無い(所在.コンポーネント.clone()))?;
        c.出口.iter().find(|p| p.名前 == 所在.口).ok_or_else(|| 照合の失敗::口が無い(所在.clone()))
    }

    /// 記述子の中の整合と、動作環境の能力で載せられるかを照らす。食い違いを全て返す。
    pub fn 照合する(&self, 能力: &能力) -> Vec<照合の失敗> {
        let mut 失敗 = Vec::new();

        for (i, c) in self.コンポーネント.iter().enumerate() {
            if self.コンポーネント[..i].iter().any(|d| d.名前 == c.名前) {
                失敗.push(照合の失敗::コンポーネントの名前が重なる(c.名前.clone()));
            }
        }

        for 接続 in &self.接続 {
            let 送り = self.出口を探す(&接続.送り手);
            let 受け = self.受け口を探す(&接続.受け手);
            match (送り, 受け) {
                (Ok(送り), Ok(受け)) => {
                    if 送り.型の指紋 != 受け.型の指紋 {
                        失敗.push(照合の失敗::型の指紋が合わない {
                            送り手: 接続.送り手.clone(),
                            受け手: 接続.受け手.clone(),
                        });
                    }
                }
                (送り, 受け) => {
                    失敗.extend(送り.err());
                    失敗.extend(受け.err());
                }
            }
            match 接続.圧力 {
                圧力::Block { 上限: 0, .. } | 圧力::Drop { 上限: 0 } => {
                    失敗.push(照合の失敗::上限が0(接続.受け手.clone()))
                }
                _ => {}
            }
            if 接続.配達保証 == 配達保証::Durable && !能力.durable {
                失敗.push(照合の失敗::能力に無い { 意味: "durable", 受け手: 接続.受け手.clone() });
            }
        }

        for 口 in &self.口 {
            let 担い手の口 = match 口.向き {
                向き::入り => self.受け口を探す(&口.担い手),
                向き::出 => self.出口を探す(&口.担い手),
            };
            match 担い手の口 {
                Ok(p) if p.型の指紋 != 口.型の指紋 => 失敗.push(照合の失敗::型の指紋が合わない {
                    送り手: 口.担い手.clone(),
                    受け手: 口.担い手.clone(),
                }),
                Ok(_) => {}
                Err(e) => 失敗.push(e),
            }
        }

        // 宣言した口は、どれも何かに繋がっていなければならない
        for c in &self.コンポーネント {
            for p in &c.受け口 {
                let 所在 = 口の所在 { コンポーネント: c.名前.clone(), 口: p.名前.clone() };
                let 繋がる = self.接続.iter().any(|k| k.受け手 == 所在)
                    || self.口.iter().any(|s| s.向き == 向き::入り && s.担い手 == 所在);
                if !繋がる {
                    失敗.push(照合の失敗::受け口に何も繋がっていない(所在));
                }
            }
            for p in &c.出口 {
                let 所在 = 口の所在 { コンポーネント: c.名前.clone(), 口: p.名前.clone() };
                let 繋がる = self.接続.iter().any(|k| k.送り手 == 所在)
                    || self.口.iter().any(|s| s.向き == 向き::出 && s.担い手 == 所在);
                if !繋がる {
                    失敗.push(照合の失敗::出口がどこにも繋がっていない(所在));
                }
            }
        }

        失敗
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use alloc::string::ToString;
    use alloc::vec;

    fn 所在(c: &str, p: &str) -> 口の所在 {
        口の所在 { コンポーネント: c.to_string(), 口: p.to_string() }
    }

    fn 二つの記述子(受け手の指紋: u64, 配達保証: 配達保証) -> システムの記述子 {
        システムの記述子 {
            名前: "試し".to_string(),
            コンポーネント: vec![
                コンポーネントの記述子 {
                    名前: "A".to_string(),
                    受け口: vec![],
                    出口: vec![口の記述 { 名前: "出".to_string(), 型の指紋: 1 }],
                },
                コンポーネントの記述子 {
                    名前: "B".to_string(),
                    受け口: vec![口の記述 { 名前: "入".to_string(), 型の指紋: 受け手の指紋 }],
                    出口: vec![],
                },
            ],
            接続: vec![接続の記述 {
                送り手: 所在("A", "出"),
                受け手: 所在("B", "入"),
                圧力: 圧力::Latest,
                配達保証,
            }],
            口: vec![],
        }
    }

    #[test]
    fn 整った記述子は通る() {
        let d = 二つの記述子(1, 配達保証::Transient);
        assert_eq!(d.照合する(&能力 { durable: false }), vec![]);
    }

    #[test]
    fn 型の指紋が違えば拒む() {
        let d = 二つの記述子(2, 配達保証::Transient);
        assert_eq!(
            d.照合する(&能力 { durable: false }),
            vec![照合の失敗::型の指紋が合わない { 送り手: 所在("A", "出"), 受け手: 所在("B", "入") }]
        );
    }

    #[test]
    fn 能力に無い意味は配置の時に拒む() {
        let d = 二つの記述子(1, 配達保証::Durable);
        assert_eq!(
            d.照合する(&能力 { durable: false }),
            vec![照合の失敗::能力に無い { 意味: "durable", 受け手: 所在("B", "入") }]
        );
        assert_eq!(d.照合する(&能力 { durable: true }), vec![]);
    }
}

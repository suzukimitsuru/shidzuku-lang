//! 接続の待ち行列と `pressure` の適用(第4章 4.3)。
//!
//! 上限 `bound` が数えるのは、受け手がまだ終えていない物である——待ち行列に並んでいる物と、
//! 取り出して仕事を始めたが終えていない物の和である(ADR 0032(実行モデルと順序保証)の決定6(上限を `bound` で書く)。提案。仮置きとして従う)。
//! 待ち行列の中は送った順に並べ、取り出す順もこの順に保つ(同じく決定8(接続の中は FIFO))。
//!
//! 待ち行列は中身を解釈しない。PC の器はバイト列(正準形)を入れる。

use alloc::collections::VecDeque;

/// 接続の `pressure`。
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum 圧力 {
    /// 上限に達したら送り手を待たせる。`期限` はナノ秒、`None` は `deadline none`。
    Block { 期限: Option<u64>, 上限: u64 },
    /// 上限に達した後に来た物を捨てる。
    Drop { 上限: u64 },
    /// 最新の1件だけを並べ、並んでいた物を捨てる。
    Latest,
}

/// 差し出した結果。
#[derive(Debug, PartialEq, Eq)]
pub enum 差し出し<T> {
    /// 待ち行列に入った。
    受けた,
    /// `block` の上限に達していて入らなかった。差し出した物を返す。送り手は空きを待つ。
    満杯(T),
    /// `drop` の上限に達していたので捨てた(宣言された廃棄であり、失敗ではない。第4章 4.5)。
    捨てた,
    /// `latest` で、並んでいた物を捨てて置き換えた。
    置き換えた,
}

/// 一本の接続の待ち行列。
#[derive(Debug)]
pub struct 待ち行列<T> {
    圧力: 圧力,
    並び: VecDeque<T>,
    仕掛かり: u64,
}

impl<T> 待ち行列<T> {
    pub fn 新しく(圧力: 圧力) -> Self {
        Self { 圧力, 並び: VecDeque::new(), 仕掛かり: 0 }
    }

    pub fn 圧力(&self) -> 圧力 {
        self.圧力
    }

    /// 受け手がまだ終えていない物の数(並んでいる物と仕掛かりの和)。
    pub fn 抱えている数(&self) -> u64 {
        self.並び.len() as u64 + self.仕掛かり
    }

    pub fn 差し出す(&mut self, 物: T) -> 差し出し<T> {
        match self.圧力 {
            圧力::Block { 上限, .. } => {
                if self.抱えている数() >= 上限 {
                    差し出し::満杯(物)
                } else {
                    self.並び.push_back(物);
                    差し出し::受けた
                }
            }
            圧力::Drop { 上限 } => {
                if self.抱えている数() >= 上限 {
                    差し出し::捨てた
                } else {
                    self.並び.push_back(物);
                    差し出し::受けた
                }
            }
            圧力::Latest => {
                let 捨てた = !self.並び.is_empty();
                self.並び.clear();
                self.並び.push_back(物);
                if 捨てた { 差し出し::置き換えた } else { 差し出し::受けた }
            }
        }
    }

    /// 最も古い物を取り出す。取り出した物は、[`待ち行列::終えた`] を呼ぶまで仕掛かりとして数える。
    pub fn 取り出す(&mut self) -> Option<T> {
        let 物 = self.並び.pop_front()?;
        self.仕掛かり += 1;
        Some(物)
    }

    /// 取り出した物の仕事を終えた。
    pub fn 終えた(&mut self) {
        self.仕掛かり = self.仕掛かり.saturating_sub(1);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn blockは上限で満杯を返し_終えると空く() {
        let mut 行列 = 待ち行列::新しく(圧力::Block { 期限: None, 上限: 2 });
        assert_eq!(行列.差し出す(1), 差し出し::受けた);
        assert_eq!(行列.差し出す(2), 差し出し::受けた);
        assert_eq!(行列.差し出す(3), 差し出し::満杯(3));
        // 取り出しても、終えるまでは上限に数える
        assert_eq!(行列.取り出す(), Some(1));
        assert_eq!(行列.差し出す(3), 差し出し::満杯(3));
        行列.終えた();
        assert_eq!(行列.差し出す(3), 差し出し::受けた);
        assert_eq!(行列.取り出す(), Some(2));
        assert_eq!(行列.取り出す(), Some(3));
    }

    #[test]
    fn dropは上限の後に来た物を捨てる() {
        let mut 行列 = 待ち行列::新しく(圧力::Drop { 上限: 1 });
        assert_eq!(行列.差し出す(1), 差し出し::受けた);
        assert_eq!(行列.差し出す(2), 差し出し::捨てた);
        assert_eq!(行列.取り出す(), Some(1));
        assert_eq!(行列.取り出す(), None);
    }

    #[test]
    fn latestは並んでいた物を置き換える() {
        let mut 行列 = 待ち行列::新しく(圧力::Latest);
        assert_eq!(行列.差し出す(1), 差し出し::受けた);
        assert_eq!(行列.差し出す(2), 差し出し::置き換えた);
        assert_eq!(行列.取り出す(), Some(2));
        assert_eq!(行列.差し出す(3), 差し出し::受けた);
    }
}

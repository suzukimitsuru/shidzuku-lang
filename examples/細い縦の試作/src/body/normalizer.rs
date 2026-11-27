//! Normalizer の body。機種ごとの単位系の違いを、換算表で吸収する。

use std::collections::HashMap;

use shidzuku_runtime_pc as rt;

use crate::記述::{Normalizerの出口, Normalizerの本体, 機種番号, 正規化済み計測値, 計測値};

/// ヘクトパスカルで報告する機種
pub const 機種Aの番号: 機種番号 = 機種番号(1);
/// キロパスカルで報告する機種
pub const 機種Bの番号: 機種番号 = 機種番号(2);

pub struct 正規化 {
    /// 機種ごとの、生値をヘクトパスカルに直す倍率
    換算表: HashMap<機種番号, f64>,
}

impl Default for 正規化 {
    fn default() -> Self {
        Self { 換算表: HashMap::from([(機種Aの番号, 1.0), (機種Bの番号, 10.0)]) }
    }
}

/// 換算の層(pure domain)。表に無い機種は換算できない
fn 換算(換算表: &HashMap<機種番号, f64>, 値: &計測値) -> Option<正規化済み計測値> {
    let 倍率 = 換算表.get(&値.機種)?;
    Some(正規化済み計測値 { 機器: 値.機器, 時刻: 値.時刻, 値: 値.生値 * 倍率 })
}

impl Normalizerの本体 for 正規化 {
    async fn 計測値の受け入れ(&mut self, 値: 計測値, 出口: &Normalizerの出口) -> Result<(), rt::障害> {
        let Some(正規化した) = 換算(&self.換算表, &値) else {
            // 表に無い機種は障害にする。on failure の restart は、再起動と版の入れ替えの試作で動作環境が行う
            return Err(rt::障害::新しく(format!("機種 {:?} の換算表が無い", 値.機種)));
        };
        // 送り出しの層(io domain)
        出口.正規化済み計測値の送り出し(&正規化した).await?;
        Ok(())
    }
}

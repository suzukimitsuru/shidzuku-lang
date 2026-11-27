//! SensorIntake の body。
//!
//! 外部は書かない(計画書 第4節「仮置き」)ため、機器のプロトコルはまだ無い。試験の口から届いた計測値を、そのまま内側へ流す。

use shidzuku_runtime_pc as rt;

use crate::記述::{SensorIntakeの出口, SensorIntakeの本体, 計測値};

pub struct 中継;

impl SensorIntakeの本体 for 中継 {
    // 中継の層(io domain): 流す所は pressure block の受付を待つ所である
    async fn 計測値の受け入れ(&mut self, 値: 計測値, 出口: &SensorIntakeの出口) -> Result<(), rt::障害> {
        出口.計測値の送り出し(&値).await?;
        Ok(())
    }
}

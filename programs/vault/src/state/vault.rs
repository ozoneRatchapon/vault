use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub vault_bump: u8, // 8 bits
    pub state_bump: u8,
}

// or can do space calculations
// impl Space for VaultState {
//     const INIT_SPACE: usize = 8 + 1 + 1; // 1 = bytes
// }

use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"state", user.key().as_ref()],
        bump = vault_state.state_bump,
        close = user
    )]
    pub vault_state: Account<'info, VaultState>,
    #[account(
        mut,
        seeds=[b"vault",user.key().as_ref()],
        bump = vault_state.vault_bump
    )]
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

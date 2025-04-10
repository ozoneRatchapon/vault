#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;

use crate::instructions::*;

declare_id!("478y4QgdTocQQVFKhpsxjcNJ7aY7WcJm2cQzAfiMvq3D");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize(&ctx.bumps)
    }

    // deposit
    pub fn deposit(ctx: Context<Payment>, amount: u64) -> Result<()> {
        ctx.accounts.deposit(amount)
        // ctx.accounts.createNFT(&ctx.bumps) we can do another instruction
    }

    // withdraw
    pub fn withdraw(ctx: Context<Payment>, amount: u64) -> Result<()> {
        ctx.accounts.withdraw(amount)
    }

    // close
    pub fn close(ctx: Context<Close>) -> Result<()> {
        ctx.accounts.close()
    }
}

# Vault Program

The `vault` program is a Solana-based smart contract written using the Anchor framework. It provides functionality for initializing a vault, depositing funds, withdrawing funds, and closing the vault.

## Table of Contents

- [Overview](#overview)
- [Instructions](#instructions)
  - [Initialize](#initialize)
  - [Deposit](#deposit)
  - [Withdraw](#withdraw)
  - [Close](#close)
- [Setup](#setup)
- [Building and Deploying](#building-and-deploying)
- [License](#license)

---

## Overview

The `vault` program is designed to manage funds in a secure and efficient manner. It allows users to:
- Initialize a vault account.
- Deposit funds into the vault.
- Withdraw funds from the vault.
- Close the vault when it is no longer needed.

This program is built using the [Anchor framework](https://www.anchor-lang.com/), which simplifies Solana smart contract development.

---

## Instructions

### Initialize

**Function:** `initialize(ctx: Context<Initialize>) -> Result<()>`

This instruction initializes the vault account. It sets up the necessary state and prepares the vault for deposits and withdrawals.

### Deposit

**Function:** `deposit(ctx: Context<Payment>, amount: u64) -> Result<()>`

This instruction allows a user to deposit a specified amount of funds into the vault.

- **Parameters:**
  - `ctx`: The context containing the accounts required for the deposit.
  - `amount`: The amount of funds to deposit.

### Withdraw

**Function:** `withdraw(ctx: Context<Payment>, amount: u64) -> Result<()>`

This instruction allows a user to withdraw a specified amount of funds from the vault.

- **Parameters:**
  - `ctx`: The context containing the accounts required for the withdrawal.
  - `amount`: The amount of funds to withdraw.

### Close

**Function:** `close(ctx: Context<Close>) -> Result<()>`

This instruction closes the vault. It is typically used when the vault is no longer needed.

---

## Setup

### Prerequisites

- Rust and Cargo installed. ([Install Rust](https://www.rust-lang.org/tools/install))
- Solana CLI installed. ([Install Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools))
- Anchor framework installed. ([Install Anchor](https://www.anchor-lang.com/docs/installation))
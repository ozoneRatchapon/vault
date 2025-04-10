import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Vault } from "../target/types/vault";
import { assert } from "chai";

describe("vault", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.vault as Program<Vault>;

  // Derive PDAs
  const vaultState = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), provider.publicKey.toBuffer()],
    program.programId
  )[0];

  const vault = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), provider.publicKey.toBuffer()],
    program.programId
  )[0];

  it("Initializes the vault", async () => {
    try {
      const tx = await program.methods
        .initialize()
        .accountsPartial({
          user: provider.wallet.publicKey,
          vaultState,
          vault,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
      console.log("Transaction signature:", tx);
      console.log(
        "Vault info:",
        await provider.connection.getAccountInfo(vault)
      );
    } catch (error) {
      console.error("Error initializing vault:", error);
    }
  });

  it("Deposits funds (2 SOL) into the vault", async () => {
    // try {
    const tx = await program.methods
      .deposit(new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL))
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Transaction signature:", tx);
    console.log(
      "Vault info:",
      await provider.connection.getAccountInfo(vault)
    );
    console.log(
      "Vault balance:",
      (await provider.connection.getBalance(vault)).toString()
    );
    // } catch (error) {
    //   console.error("Error depositing funds:", error);
    // }
  });

  // it("Withdraws funds from the vault", async () => {
  //   const withdrawAmount = new anchor.BN(500);

  //   const tx = await program.methods
  //     .withdraw(withdrawAmount)
  //     .accounts({
  //       vault: vaultAccount.publicKey,
  //       user: program.provider.publicKey,
  //     })
  //     .rpc();

  //   console.log("Transaction signature for withdraw:", tx);

  //   // Fetch the vault account to verify the withdrawal.
  //   const vault = await program.account.vault.fetch(vaultAccount.publicKey);
  //   assert.equal(
  //     vault.balance.toString(),
  //     "500",
  //     "Vault balance should reflect the withdrawn amount"
  //   );
  // });

  // it("Closes the vault", async () => {
  //   const tx = await program.methods
  //     .close()
  //     .accounts({
  //       vault: vaultAccount.publicKey,
  //       user: program.provider.publicKey,
  //     })
  //     .rpc();

  //   console.log("Transaction signature for close:", tx);

  //   // Attempt to fetch the vault account to ensure it has been closed.
  //   try {
  //     await program.account.vault.fetch(vaultAccount.publicKey);
  //     assert.fail("Vault account should not exist after being closed");
  //   } catch (err) {
  //     assert.ok("Vault account successfully closed");
  //   }
  // });
});

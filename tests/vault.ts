import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Vault } from "../target/types/vault";

describe("vault", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.vault as Program<Vault>;
  const user = provider.wallet.publicKey;

  // Derive PDAs
  const vaultState = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), user.toBytes()],
    program.programId
  )[0];

  const vault = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), user.toBytes()],
    program.programId
  )[0];

  console.log("Program ID:", program.programId.toString());
  console.log("User:", user.toString());
  console.log("Vault State:", vaultState.toString());
  console.log("Vault:", vault.toString());

  it("Initializes the vault", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        user,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();
    console.log("Transaction signature:", tx);
    console.log("Vault info:", await provider.connection.getAccountInfo(vault));
    const initialBalance = await provider.connection.getBalance(vault);
    console.log("Initial vault balance:", initialBalance);
  });

  it("Deposits funds (2 SOL) into the vault", async () => {
    const tx = await program.methods
      .deposit(new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL))
      .accounts({
        user,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();

    console.log("Transaction signature:", tx);
    console.log("Vault info:", await provider.connection.getAccountInfo(vault));
    console.log(
      "Vault balance:",
      (await provider.connection.getBalance(vault)).toString()
    );
  });

  it("Withdraws funds from the vault", async () => {
    const tx = await program.methods
      .withdraw(new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL))
      .accounts({
        user,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();

    console.log("Transaction signature:", tx);
    console.log("Vault info:", await provider.connection.getAccountInfo(vault));
    console.log(
      "Vault balance:",
      (await provider.connection.getBalance(vault)).toString()
    );
  });

  it("Closes the vault", async () => {
    const tx = await program.methods
      .close()
      .accounts({
        user,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();

    console.log("Transaction signature for close:", tx);
    console.log("Vault info:", await provider.connection.getAccountInfo(vault));
    console.log(
      "Vault balance:",
      (await provider.connection.getBalance(vault)).toString()
    );
  });
});

import * as moneroTs from "monero-ts";

main();
async function main() {

  // create a random keys-only (offline) stagenet wallet
  let walletKeys = await moneroTs.createWalletKeys({
    networkType: moneroTs.MoneroNetworkType.STAGENET,
    language: "English"
  });

  let myNum: number = 0;

  let manager = new moneroTs.MoneroConnectionManager();
  console.log("Connection: " + manager.getConnection());

  let seed = await walletKeys.getSeed();
  
  // Print the wallet's attributes in the browser Window
  document.getElementById("wallet_seed_phrase")!.innerHTML = "Seed phrase: " + await walletKeys.getSeed();
  document.getElementById("wallet_address")!.innerHTML = "Address: " + await walletKeys.getAddress(0, 0);
  document.getElementById("wallet_spend_key")!.innerHTML = "Spend key: " + await walletKeys.getPrivateSpendKey();
  document.getElementById("wallet_view_key")!.innerHTML = "View key: " + await walletKeys.getPrivateViewKey();
}

export default { main };
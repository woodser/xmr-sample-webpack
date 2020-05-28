require("monero-javascript");

mainFunction();
async function mainFunction() {
  
  // create a random keys-only (offline) stagenet wallet
  let walletKeys = await MoneroWalletKeys.createWallet({networkType: MoneroNetworkType.STAGENET, language: "English"});
  
  // Print the wallet's attributes in the browser Window
  document.getElementById("wallet_seed_phrase").innerHTML = "Seed phrase: " + await walletKeys.getMnemonic();
  document.getElementById("wallet_address").innerHTML = "Address: " + await walletKeys.getAddress(0, 0);
  document.getElementById("wallet_spend_key").innerHTML = "Spend key: " + await walletKeys.getPrivateSpendKey();
  document.getElementById("wallet_view_key").innerHTML = "View key: " + await walletKeys.getPrivateViewKey();
}
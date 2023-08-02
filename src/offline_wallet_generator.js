const monerojs = require("monero-javascript");

main();
async function main() {
  
  // create a random keys-only (offline) stagenet wallet
  let walletKeys = await monerojs.createWalletKeys({networkType: "stagenet", language: "English"});
  
  // Print the wallet's attributes in the browser Window
  document.getElementById("wallet_seed_phrase").innerHTML = "Seed phrase: " + await walletKeys.getSeed();
  document.getElementById("wallet_address").innerHTML = "Address: " + await walletKeys.getAddress(0, 0);
  document.getElementById("wallet_spend_key").innerHTML = "Spend key: " + await walletKeys.getPrivateSpendKey();
  document.getElementById("wallet_view_key").innerHTML = "View key: " + await walletKeys.getPrivateViewKey();
}
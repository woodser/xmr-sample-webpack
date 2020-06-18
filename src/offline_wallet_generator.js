const monerojs = require("monero-javascript");

main();
async function main() {
  
  // create a random keys-only (offline) stagenet wallet
  let walletKeys = await monerojs.createWalletKeys({networkType: "stagenet", language: "English"});
  
  // Print the wallet's attributes in the browser Window
  document.getElementById("wallet_mnemonic_phrase").innerHTML = "Mnemonic phrase: " + await walletKeys.getMnemonic();
  document.getElementById("wallet_address").innerHTML = "Address: " + await walletKeys.getAddress(0, 0);
  document.getElementById("wallet_spend_key").innerHTML = "Spend key: " + await walletKeys.getPrivateSpendKey();
  document.getElementById("wallet_view_key").innerHTML = "View key: " + await walletKeys.getPrivateViewKey();
}
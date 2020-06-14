/**
 * Sample code using monero-javascript.
 */
runMain();
async function runMain() {
  
  // import entire library
  const assert = require("assert");
  let monerojs = require("monero-javascript");
  const MoneroWalletListener = monerojs.MoneroWalletListener;
  const BigInteger = monerojs.BigInteger;
  
  // connect to a daemon
  let daemon = monerojs.connectToDaemonRpc("http://localhost:38081", "superuser", "abctesting123"); 
  let height = await daemon.getHeight();            // 1523651
  let feeEstimate = await daemon.getFeeEstimate();  // 1014313512
  let txsInPool = await daemon.getTxPool();         // get transactions in the pool
  
  // open wallet on monero-wallet-rpc
  let walletRpc = monerojs.connectToWalletRpc("http://localhost:38083", "rpc_user", "abc123");
  await walletRpc.openWallet("test_wallet_1", "supersecretpassword123");  // *** CHANGE README TO "sample_wallet_rpc" ***
  let primaryAddress = await walletRpc.getPrimaryAddress(); // 555zgduFhmKd2o8rPUz...
  let balance = await walletRpc.getBalance();               // 533648366742
  let txs = await walletRpc.getTxs();                       // get transactions containing transfers to/from the wallet
  
  // create wallet from mnemonic phrase using WebAssembly bindings to Monero Core
  let walletWasm = await monerojs.createWalletWasm({
    //path: "./test_wallets/" + GenUtils.getUUID(),  // *** CHANGE README TO "sample_wallet_wasm"
    password: "supersecretpassword123",
    networkType: "stagenet",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    mnemonic: "hijack lucky rally sober hockey robot gumball amaze gave fifteen organs gecko skater wizard demonstrate upright system vegan tobacco tsunami lurk withdrawn tomorrow uphill organs",
    restoreHeight: 589429 // *** REPLACE WITH FIRST RECEIVE HEIGHT IN README ***
  });
  
  // synchronize with progress notifications
  await walletWasm.sync(new class extends MoneroWalletListener {
    onSyncProgress(height, startHeight, endHeight, percentDone, message) {
      // feed a progress bar?
    }
  });
  
  // synchronize in the background
  await walletWasm.startSyncing();
  
  // listen for incoming transfers
  let fundsReceived = false;
  await walletWasm.addListener(new class extends MoneroWalletListener {
    onOutputReceived(output) {
      let amount = output.getAmount();
      let txHash = output.getTx().getHash();
      fundsReceived = true;
    }
  });
  
  // send funds from RPC wallet to WebAssembly wallet
  let createdTx = await walletRpc.createTx({
    accountIndex: 0,
    address: await walletWasm.getAddress(1, 0),
    amount: new BigInteger("50000"), // amount to transfer in atomic units
    relay: false // create transaction and relay to the network if true
  });
  let fee = createdTx.getFee(); // "Are you sure you want to send... ?"
  await walletRpc.relayTx(createdTx); // relay the transaction
  
  // recipient receives unconfirmed funds within 10 seconds
  await new Promise(function(resolve) { setTimeout(resolve, 10000); });
  assert(fundsReceived);
  
  // save and close WebAssembly wallet
  await walletWasm.close();
}
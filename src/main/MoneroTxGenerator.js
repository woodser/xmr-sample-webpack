
// configuration
const MAX_AVAILABLE_OUTPUTS = 300;        // maximum outputs to create per wallet

/**
 * Generates transactions on the Monero network using a wallet.
 */
class MoneroTxGenerator {
  
  constructor(wallet) {
    this.setWallet(wallet);
  }
  
  setWallet(wallet) {
    this.wallet = wallet;
  }
  
  getWallet() {
    return this.wallet;
  }
  
  start() {
    if (this._isGenerating) throw new Error("Transaction generation already in progress");
    this._isGenerating = true;
    this._startGenerateLoop();
  }
  
  stop() {
    this._isGenerating = false;
  }
  
  isGenerating() {
    return this._isGenerating;
  }
  
  async _startGenerateLoop() {
    while (true) {
      if (!this._isGenerating) break;
      
      // spend available outputs
      spendAvailableOutputs(this.daemon, this.wallet);
      
      // sleep for a moment
      await new Promise(function(resolve) { setTimeout(resolve, MoneroUtils.WALLET_REFRESH_RATE); });
    }
  }
}

async function spendAvailableOutputs(daemon, wallet) {
  
  // get available outputs
  let outputs = await wallet.getOutputs({isLocked: false, isSpent: false});
  
  // create additional outputs until enough of are available
  let outputsToCreate = MAX_AVAILABLE_OUTPUTS - outputs.length;
  console.log(outputsToCreate + " remaining outputs to create");
  
  // spend each available output
  for (let output of outputs) {
    
    // break if not generating
    if (!this._isGenerating) break;
    
    // get fee with multiplier to be conservative
    let expectedFee = await daemon.getFeeEstimate();
    expectedFee = expectedFee.multiply(BigInteger.parse("1.2"));
    
    // skip if output is too small to cover fee
    if (output.getAmount().compare(expectedFee) <= 0) continue;
    
    // split output until max available outputs reached
    if (outputsToCreate > 0) {
      
      // build send request
      let request = new MoneroSendRequest().setAccountIndex(output.getAccountIndex()).setSubaddressIndex(output.getSubaddressIndex());            // source from output subaddress
      let numDsts = Math.min(outputsToCreate, MAX_OUTPUTS_PER_TX - 1);
      let amtPerSubaddress = output.getAmount().subtract(expectedFee).divide(new BigInteger(numDsts));  // amount to send per subaddress, one output used for change
      let dstAccount = output.getAccountIndex() === 0 ? 1 : 0;
      let destinations = [];
      for (let dstSubaddress = 0; dstSubaddress < numDsts; dstSubaddress++) {
        destinations.push(new MoneroDestination((await wallet.getSubaddress(dstAccount, dstSubaddress)).getAddress(), amtPerSubaddress)); // TODO: without getAddress(), obscure optional deref error, prolly from serializing in first step of monero_wallet_core::send_split
      }
      request.setDestinations(destinations);
      
      // attempt to send
      try {
        let tx = (await wallet.send(request)).getTxs()[0];
        console.log("Sent tx id: " + tx.getHash());
        outputsToCreate -= numDsts;
      } catch (e) {
        console.log("Error creating tx: " + e.message);
      }
    }
    
    // otherwise sweep output
    else {
      let dstAccount = output.getAccountIndex() === 0 ? 1 : 0;
      let dstAddress = await wallet.getAddress(dstAccount, 0);
      try {
        let tx = await wallet.sweepOutput(dstAddress, output.getKeyImage());
        console.log("Sweep tx id: " + tx.getHash());
      } catch (e) {
        console.log("Error creating tx: " + e.message);
      }
    }
  }
}

module.exports = MoneroTxGenerator;
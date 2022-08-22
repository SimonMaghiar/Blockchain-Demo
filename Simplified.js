const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {

      while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
          this.nonce++;
          this.hash = this.calculateHash();
      }

      console.log("Block mined: " + this.hash);
    }
}


class Blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0,'01/01/2018', 'Genesis block', '0');
  }

  genLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.genLatestBlock().hash;
    newBlock.mineBlock(4);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousHash = this.chain[i-1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
          return false;
        }

        if(currentBlock.previousHash != previousHash.hash){
          return false;
        }
    }
    return true;
  }
}

let bitcoin = new Blockchain();
bitcoin.addBlock(new Block(1,'10/07/2018', { amount: 4}));
bitcoin.addBlock(new Block(2,'11/07/2018', { amount: 10}));

bitcoin.chain[1].data = { amount: 100 };
bitcoin.chain[1].hash = bitcoin.chain[1].calculateHash();

// console.log(bitcoin.isChainValid());
console.log(JSON.stringify(bitcoin,null,4));

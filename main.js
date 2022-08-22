const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('3c0d84568f4c113ae3aa80211c66e7f00316e09fd26cb1d4a0377bab72f1f3fd');
const myWalletAddress = myKey.getPublic('hex');

let bitcoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
bitcoin.addTransaction(tx1);

console.log('\n Starting the miner...');
bitcoin.minePendingTransactions(myWalletAddress);

console.log('\n Starting the miner...');
bitcoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Simon is: ', bitcoin.getBalanceOfAdress(myWalletAddress));

console.log('Is chain valid?', bitcoin.isChainValid());









// bitcoin.createTransaction(new Transaction('address1','address2', 100));
// bitcoin.createTransaction(new Transaction('address2','address1', 50));

// // console.log('\n Starting the miner....');
// bitcoin.minePendingTransactions('simon-address');
// bitcoin.minePendingTransactions('simon-address');
// bitcoin.minePendingTransactions('simon-address');

// console.log(bitcoin);

// console.log('\nBalance of simon is', bitcoin.getBalanceOfAdress('simon-address'));

// console.log('\n Starting the miner again....');
// bitcoin.minePendingTransactions('simon-address');

// console.log('\nBalance of simon is', bitcoin.getBalanceOfAdress('simon-address'));

// console.log('\n Starting the miner again....');
// bitcoin.minePendingTransactions('simon-address');

// console.log('\nBalance of simon is', bitcoin.getBalanceOfAdress('simon-address'));
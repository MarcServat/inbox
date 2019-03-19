const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const memonic = require('./memonic');

const provider = new HDWalletProvider(memonic, 'https://rinkeby.infura.io/v3/97bb1015ace54afba65ff9668cc70cdb');
const web3 = new Web3(provider);

(async function deploy () {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x' + bytecode, arguments: ['Hi there!']})
    .send({from: accounts[0]});
    console.log(result);
})();
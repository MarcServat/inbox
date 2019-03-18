const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode}, {arguments: 'Hellow!!'})
        .send({from: accounts[0]}, {gas: '1000000'})
    console.log(inbox)
});

describe('Inbox', () => {
    it('deploy my contract', () => {})
})
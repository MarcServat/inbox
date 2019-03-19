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
        .deploy({ data: bytecode, arguments: ['Hellow!!']})
        .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', () => {
    it('deploy my contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hellow!!');
    });

    it('set message', async () => {
        await inbox.methods.setMessage('New Msg').send({from: accounts[0]})
        const message = await inbox.methods.message().call();
        assert.equal(message, 'New Msg');
    });
});
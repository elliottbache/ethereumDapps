const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

//const chalk = import("chalk").then(m=>m.default);
/*
const chai = import("chai").use(require('chai-as-promised'))
.should();
;
*/
require('chai')
.use(require('chai-as-promised'))
.should();

contract('DecentralBank', ([owner, customer]) => {
    // All of the code fgoes here for testing
    let tether, rwd, decentralBank;

    function tokens(number) {
        return web3.utils.toWei(number,'ether');
    }

    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // Transfer all tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address, tokens('1000000'));

        // Transfer 100 mock Tethers to Customer
        await tether.transfer(customer,tokens('100'), {from: owner});
    });

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name();
            assert.equal(name,'Tether');
        });
        it('matches symbol successfully', async () => {
            const symbol = await tether.symbol();
            assert.equal(symbol,'USDT');
        });
    });

    describe('Reward token deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name();
            assert.equal(name,'Reward Token');
        });
    });

    describe('Dencentral bank deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name();
            assert.equal(name,'Decentral Bank');
        });

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance,tokens('1000000'));
        })
    });

    describe('Yield farming', async () => {
        it('rewards tokens for staking', async () => {
            // Check investor balance
            let result = await tether.balanceOf(customer);
            assert.equal(result,tokens('100'), 'customer mock wallet balance before staking');

            // Check staking for customer
            await tether.approve(decentralBank.address, tokens('100'), {from: customer});
            await decentralBank.depositTokens(tokens('100'),{from: customer});

            // Check updated balance of customer
            result = await tether.balanceOf(customer);
            let num = 0;
            assert.equal(result,tokens(num.toString()),'customer mock wallet balance before staking');

            // Check updated balance of decentral bank
            result = await tether.balanceOf(decentralBank.address);
            num = 100;
            assert.equal(result,tokens(num.toString()),'decentral bank mock wallet balance before staking');

            // Check if customer is now staking
            result = await decentralBank.isStaking(customer);
            assert.equal(result,true,'customer is staking status');

            // Issue tokens
            await decentralBank.issueTokens({from: owner});

            // Ensure only the owner can issue tokens
//            decentralBank.issueTokens({from: customer}).;
//            should.exist(result);
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // Unstake tokens
            await decentralBank.unstakeTokens({from: customer});

            // Check unstaking balances
            result = await tether.balanceOf(customer);
            num = 100;
            assert.equal(result,tokens(num.toString()),'customer mock wallet balance after staking');

            // Check updated balance of decentral bank
            result = await tether.balanceOf(decentralBank.address);
            num = 0;
            assert.equal(result,tokens(num.toString()),'decentral bank mock wallet balance after staking');

            // Check if customer is now staking
            result = await decentralBank.isStaking(customer);
            assert.equal(result,false,'customer is no longer staking after unstaking');
        });
    });



});
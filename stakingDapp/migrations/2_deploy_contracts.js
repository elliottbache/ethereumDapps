const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer) {
    // Deploy mock Tether contract
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    // Deploy RWD contract
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    // Deploy DecentralBank contract
    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    // Transfer all RWD tokens to Decentral Bank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    // Distribute 100 Tether tokens to investor
    accounts = await web3.eth.getAccounts();
    console.log(accounts[1]);
   
    await tether.transfer(accounts[1],'100000000000000000000');
    balance = await tether.balanceOf(accounts[1]);
    console.log(balance.toString());
    balanceEth = await web3.utils.fromWei(balance);
    console.log(balanceEth.toString());
    
};


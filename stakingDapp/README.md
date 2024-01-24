# stakingApp

This code was created based on the Clarian North "Complete DApp - Solidity and React - Blockchain Development" course.
This guide requires installing node.js, npm, truffle, ganache, and VS Code.

## To download this project simply run: 

git clone https://github.com/elliottbache/stakingDapp.git

## To run this dApp:
1. Open VS code to the folder location
2. Open a terminal within VS Code
3. Type "truffle compile" in the terminal
    - If any packages are missing, install them.
4. Open Ganache and use the "Quickstart" option
5. Open Metamask and add a new network with the following parameters:
    - Network name:  Ganache
    - New RPC URL: the one given in Ganache at the top of the window (normally it's http://127.0.0.1:7545)
    - Chain ID: 1337
    - Currency Symbol: ETH
6. Add a new account in Metamask with the private key copied from first account in Ganache
7. Add another new account in Metamask with the private key copied from the second account in Ganache
8. Select the first account in Metamask
9. Type "truffle migrate --reset" in the terminal
10. Select the second account in Metamask
11. Type "npm run start" in the terminal

## Using this dApp:
- Mock Tether tokens can be staked defining the number you want to stake and pressing "Deposit"
- Once 50 mock Tether tokens have been deposited and the page has been refreshed, a 30 second countdown will begin.
- Once the countdown is over, a Metamask pop-up will ask for confirmation and once confirmed, the reward tokens will be distributed.
- The mock Tether can be withdrawn with the "Withdraw" button.
# Auction-Dapp-on-CCN-and-Ale-Wallet
Created by Yiyang Ni(yn2415), Xingyu Wu(xw2813) and Yixing Chen(yc3848).

## Way to run it:
1. run `npm run serve` at the terminal of front folder.
2. input the top four boxes and change it in `./back/scripts/deploy.js`.
3. set your own private key at `./back/hardhat.config.js`
4. deploy the contract at the terminal of back folder by inputting `npx hardhat run scripts/deploy.js --network huygens`
5. duplicate the addresses of the contract and update them in `contract_auction.js` and `contract_auctionBox.js` respectively.
6. Save it, then enjoy yourself!

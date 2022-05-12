// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const AuctionBox = await hre.ethers.getContractFactory("AuctionBox");
  const auctionBox = await AuctionBox.deploy();

  await auctionBox.deployed();

  console.log("AuctionBox deployed to:", auctionBox.address);

  const Auction = await hre.ethers.getContractFactory("Auction");
  const auction = await Auction.deploy('0x90FC25a3f1836d1a555C621eE0BA35D760eBd0a1', 'nyy', 2, 2, 'Yiyang Ni');

  await auction.deployed();

  console.log("Auction deployed to:", auction.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

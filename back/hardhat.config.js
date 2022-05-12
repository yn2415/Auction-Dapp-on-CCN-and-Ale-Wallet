require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: "huygens",
  networks: {
    hardhat: {
    },
    huygens: {
      url: "http://18.182.45.18:8765",
      accounts: ['A607C8F3E54111425E57EBDE2A4B128FCB9AF2AE91248834AEDB3BBC2EA947A7', '2E451D93AD4B17FA80D90EA3E7B57529137872A5FD5369B8E96BEB92490DCC7D']
    }
  },
  solidity: {
    version: "0.5.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}

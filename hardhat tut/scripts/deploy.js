// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  //deploye the contract
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.deployed();

  console.log(`contract deployed to: ${simpleStorage.address}`);
  // ---------------------------------------------------------------------------------------------
  // console.log(hre.network.config)
  // console.log(process.env.ETHERSCAN_API);

  //this is to check if network is not default hardhat because there is no verification on local network
  if (
    hre.network.config.chainId === 5 &&
    process.env.ETHERSCAN_API != undefined
  ) {
    //this is to wait, 3 blocks to mine because after that etherscan will know about this block
    await simpleStorage.deployTransaction.wait(6);
    //calling the verify function we created
    await verify(simpleStorage.address, []);
  }
  //----------------------------------------------------------------------------------------------

  //now we can interact with the deployed contract
  const currVal = await simpleStorage.retrive();
  console.log(`current value in deployed contract is: ${currVal}`);

  //update the current value
  const updateVal = await simpleStorage.store(7);
  await updateVal.wait(1);
  const updatedVal = await simpleStorage.retrive();
  console.log(`updated value: ${updatedVal}`);
}

//this function is to verify the newly created contract with the help of etherscan api
const verify = async (contractAddress, args) => {
  console.log("verifying contract...");
  //if contract is already verified then this will throw an error (already verified) hence it is put into try catch block
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
          console.log("contract is alredy verified");
        } else {
          console.log(e);
        }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.js --network goerli    is the command to deploy on different networks
// hardhat supports many plugins one of em is etherscan to verify the deployed contract but first make an account on etherscan and get the api.

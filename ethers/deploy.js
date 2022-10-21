const fs = require("fs")
const ethers = require("ethers")
//dotenv file for secret keys
require("dotenv").config()

async function main() {
    //this is to connect with local ganache blockchain or node from which we get access to the etherium blockchain, for interacting with blockchain we need a node and to connect with node we need its api.
    // const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const provider = new ethers.providers.JsonRpcProvider(process.env.GORELLI_RPC_URL);
    //transaction done by wallets: so to connect with wallet we need two parameters private key and the provider. ethers gave a wallet function to connect with wallet
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const wallet = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, provider);

    // to deploye a contract we need its abi and bytecode
    const abi = fs.readFileSync(`${__dirname}/simpleStorage_sol_SimpleStorage.abi`, "utf8");
    const binary = fs.readFileSync(`${__dirname}/simpleStorage_sol_SimpleStorage.bin`, "utf8");

    // contract object does not contain everything hence contractFactory is used.
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    //now with the help of contractFactory we can deploye the contract it take some time to deploye hence wait until it completed so await is used here.
    console.log("Deploying, Please wait...")
    const contract = await contractFactory.deploy()
    console.log(contract.address)
    // console.log(contract)
    //this deploy returns object which contains methods to interact with our contract
    let favNum = await contract.retrive()
    console.log(favNum.toString())
    const storeNum = await contract.store("7")
    await storeNum.wait(1)
    favNum = await contract.retrive();
    console.log(`stored num is: ${favNum.toString()}`)
}

main().then(() => process.exit(0)).catch(err => {
    console.error(err)
    process.exit(1)
})
const { ethers } = require("hardhat");
//const { TransactionResponse } = require("ethers");
const { sendShieldedTransaction } = require("../utils");

require("dotenv").config( );

async function main() {
  const [signer] = await ethers.getSigners();
  const SWTRProxy = await ethers.getContractAt("SWTRProxy", process.env.PROXY_ADDR);

  const SWTRSimpleImpl2 = await ethers.deployContract("SWTRSimpleImpl2");
  await SWTRSimpleImpl2.waitForDeployment();
  console.log(`SWTRSimpleImpl2 deployed to ${SWTRSimpleImpl2.target}`);

  const proxyAdmin = await ethers.getContractAt("ProxyAdmin", process.env.PROXY_ADMIN_ADDR);

  let tx = await sendShieldedTransaction(
    signer,
    proxyAdmin.target,
    proxyAdmin.interface.encodeFunctionData("upgradeTo", [
      SWTRProxy.target, //proxy address
      SWTRSimpleImpl2.target, // implementation address
    ]),
    "0"
  );

  await tx.wait();
  console.log(`Contract upgraded hash: ${tx.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
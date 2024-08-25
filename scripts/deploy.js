const { ethers } = require("hardhat");

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("\nDeploying SWTRSimpleImpl with the account:", signer.address);

  const SWTRSimpleImpl = await ethers.deployContract("SWTRSimpleImpl");
  await SWTRSimpleImpl.waitForDeployment();
  console.log(`SWTRSimpleImpl deployed to ${SWTRSimpleImpl.target}`);

  const ProxyAdmin = await ethers.deployContract("ProxyAdmin", [signer.address]);
  await ProxyAdmin.waitForDeployment();
  console.log(`ProxyAdmin deployed to ${ProxyAdmin.target}`);

  const SWTRProxy = await ethers.deployContract("SWTRProxy", [
    SWTRSimpleImpl.target, // implementation address
    ProxyAdmin.target, // admin address
    SWTRSimpleImpl.interface.encodeFunctionData("initialize", [signer.address, 100]), // data
  ]);
  await SWTRProxy.waitForDeployment();
  console.log(`SWTRProxy deployed to ${SWTRProxy.target}\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
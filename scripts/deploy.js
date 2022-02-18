const hre = require("hardhat");

async function main() {
    const LykeIsland = await hre.ethers.getContractFactory("LykeIslandNFT");
    const lykeisland = await LykeIsland.deploy();
    await lykeisland.deployed();
    console.log("LykeIsland deployed to:", lykeisland.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
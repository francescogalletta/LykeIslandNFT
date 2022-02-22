mkdir contracts
mkdir scripts
mkdir utilities

npm init

# install openzeppelin dev
npm install @openzeppelin/contracts --save-dev

# install hardhat
npm install hardhat --save-dev
# create empty hardhat config
npx hardhat

# install dotenv and create file
npm install dotenv --save
touch .env

# install ethers.js
npm install @nomiclabs/hardhat-ethers ethers --save-dev

# install remix
npm install @remix-project/remixd --save-dev

# install web3
npm install @alch/alchemy-web3

# install hardhat etherscan to verify
npm install @nomiclabs/hardhat-etherscan --save-dev

require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/LykeIsland.sol/LykeIslandNFT.json")
const contractAddress = CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function addToAllowlist(_listArray) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        // [TODO] add allowlist data param
        'data': nftContract.methods.addToAllowlist(_listArray).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}

// [TODO] loop through allowlist file and send
// [TODO] test if I can whitelist 110 in one call
addToAllowlist(["0xa4c47f2D4630f7CAB8111b39B99F9F25aaB1c632", "0x6c911809740c53C519371d765096433c68d6d074"
    , "0x0aEFAe7e8929Cf561C35f8D0477f9E3501dbD5b7", "0xD8c706cC890Db93C7865633A1875b1FbFE1b35Da"
    , "0x785891c5EeE6E92AA473cb3C9bA1A20831FdBaD2", "0xa4c47f2D4630f7CAB8111b39B99F9F25aaB1c632"])
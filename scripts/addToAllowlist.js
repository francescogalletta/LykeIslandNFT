require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
console.log(CONTRACT_ADDRESS);
console.log(typeof CONTRACT_ADDRESS);
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

const allowlistArray = ["0x2e8a2712b3c159aa4fa4d64a22cdfe8f4579f5f0",
    "0x4b2db67426557f647460be5960c5ffc3ce001df4",
    "0x54950d84b2ed8f40493b25c7eb7521918446bbe8",
    "0x5b685bc1c4f075350fa816d35e771986c999c9ef",
    "0x7f757dacf82239662a8a81c43bb1efe37d141989",
    "0xed3fe5aae40be62dbcbf61ebc6bbe83acea223f2",
    "0xa5043f73b63a4f4d23325df49478a4c2c7f50c99",
    "0x45071a9247f9b34d2ad1e3ef6ddf2a63e97f51a3",
    "0xbe8c58f2579eeb5d3c3143c77aeb8b87632a296d",
    "0x1462e51d0042b9ee4a6a622fae5effba45f3af1e",
    "0x85eb62f5748e50aad4584b2bc9e0176fbe247b49",
    "0x5c41be79c5af91cc019d94e6cf0c999f746136db",
    "0x23b96dd54f126fd03918207a19c85e878a8f7c87",
    "0x07d8961a00d7aac8308160756e01fa11e33716b9",
    "0x3acf405b83922a815d8fa2c6977e45cf4b7deb23",
    "0x1fabfd128d498fef7da0190ef416a502375bf59a",
    "0x9255ef7868f48157105ca9aa18c131e0879b47e2",
    "0x36d2f66fe1b51e6c5ca02210f06843f480f30964",
    "0xf7364c4f2ad2b792df6212e338d799bcbb11a1cb",
    "0x04f46b78df9c9275e9d43f1beaf2dbb39f8c7f49",
    "0xff9cfb8ed63ffb4a15e1bdf0451f073155fd0aa0",
    "0x3d0c604630d8586ff56fdae407fcbf33190e28d6",
    "0x8669972ff19016f9c06acb68ead5528b6a1832d9",
    "0x67e5a7a9add16b359718e11e2e5d03f53ac8b6dd",
    "0x8e5e8fc79da77ec70186436a00e45db523bb3fee",
    "0x44c21f04012495fd29a7cac41bf33a540856309d",
    "0x23da856b31f486a6c39da1e12c3cb49dc33231b7",
    "0x685408262d49784be403455ae749ab0b81d5e110",
    "0x6136d771a5f227ad36b12b1b5cc2e7c85861a16d",
    "0x02ceaa409bf672854530ddab7ed9d132a719be5a",
    "0x2840d19379625cb226147e8f10d8bd54227bcb41",
    "0x3b2d0708f3975f237340fb7e8acc3c435e8fde07",
    "0x0d3767a28196ab9850d04303db61aa69eed69324",
    "0x67b9a49bab1aed81b54be26b6a335325f492bb86",
    "0x25dfe94f20d26b14b76a564c660f939282ad5720",
    "0xa3db5499b4288f8cbed144f50e625656186372b0",
    "0x2e6d80c8b59c13aef40af3d66bbb4cc857ba9f46",
    "0xa5ef58ad056db4f6feb71efe7fb21b988473125d",
    "0x950e8a27aa6cd2db2ea253d01e110f45b1c63405",
    "0x3927af597c09774f91ef84bf765ded4109e9f8ea",
    "0xa16977865ab1e2eeab1068e71890b36de4bf95f3",
    "0x0ecb0f4f0cc7f78b109d5ef748021d799351d57b",
    "0x80e940fb0f5bf5f7cc75d04bf153024e646250a3",
    "0x827f160fea5b13a52cc1faea42d5cef00ca62715",
    "0x2cf8f6648d2ce39fbb12a17c9ead04bc92d678a4",
    "0x18d85c22d0ec5485b25bda64c1ff0aaa1cfb17c7",
    "0x4b3b0a6c0bacb088b6b0b0ba31bab77282068117",
    "0xe440b9d02ae99c1bfe68027ce3bdcbdd1e298aca",
    "0x86cb821b4ac1d820981c07867f199d539e715546",
    "0x74c28b35813be55d8e23957c95778c47bd6d143c",
    "0x01ec241d861e188f211124f2886738389a44e160",
    "0xae71d942f256d0e1480c75be3386298cde20b00b",
    "0xe0715f8687e70c39adfc3b986edf6a12e8eb54b0",
    "0xd50a805a547ed4f8da3602615e77ab9281a0560a",
    "0x551947d2ae42aa562f1e36bcfc0134af0375cea7",
    "0x04681aacf56bda136095ab0bbe54f350d7653954",
    "0xe6dd972a2002b6b5ab74697631e6f328569ff67a",
    "0xfdd7f387f979e56ee80e66f5eb1fa919e9fcabdf",
    "0xd3ebdc83aee1141595646d32b1012d0cfb53bbb8",
    "0xb0396201bd41229e6fa16712c8ced2be5f9152bb",
    "0xd12bf6b7d7f4d8f8bde032cd6cdd06af298a8f7f",
    "0x0de0bc116c52ada767af100b7ef451402714083d",
    "0xd9ea5b738c8733ee799992cf065ebf45a08156a4",
    "0x22f3366ba9887e3cec1ef09c8fb8608e24c9ddd3",
    "0x30c8c238449bf493e133c3ea24cc200fd28b4cc3",
    "0x0918ca7e812afdfd63b2136c9b3cb8bd9a1247f4",
    "0xe4baab6fa134e71ac6e20c92f6c84496de684054",
    "0x87a97f710fe9af823addf8af30b6f2a67ba3f39a",
    "0x57de4f0ce1401377dfee575e4765fecca6f6286a",
    "0xecebe253a72f25ca65b2354a5531da95a4c66edd",
    "0x0613c7a80b62c9af09287541a6fea247a0c0e5b0",
    "0x5f7d2f25238c7d3e0338b632f4bafd75ad066361",
    "0x0983b2f461defbd9f6b98bc10c621cc7e8ca79b2",
    "0xb22edb1522515460acf0ea5b9494007ace9a8e32",
    "0xf486480f99e2291caa816bd6b7dba41fcaa02a95",
    "0x8cf3c465ae2777f29b4df92b368d1a1a5cdf8b3f",
    "0x03a4518ff4872850d82dc41450e153ab0c37e6bb",
    "0x06e19d5b569c57b332cbe8b5dc55421072420462",
    "0x73b2d8c707f56cc66de9deb8d4a0ae76b555b73a",
    "0x4802df37a6b97565c760caaa2e49af0cf204726e",
    "0x2709d94efca7dcfcc25bb5f7ff744cb7f481dfef",
    "0xf8bf1128f870e39800eec9e27fba75ceb23a25f9",
    "0xd3a012edfd45cfac625ae146931dccccc5afbfd9",
    "0x7f16a43033e73109755e1f87b263e0b3a0dedcea",
    "0x4d43b234b645972785f11c56bd5bf078aa9468cd",
    "0x52e95a2b8746ba00573728ead9ab8ac9f4ad3cf0",
    "0x84c08e5de4e1298617d028df4f25724445ba63fb",
    "0x9482e7044574e056db57de122e8c1db358403d89",
    "0xc69480a12ac088cf450e291bbf1a7772f01ef845",
    "0xf72a45d8b4aa06699ac4d1396f7d452fa3d923fe",
    "0x2e8e5927721f8cdc156c842ae66f4acd7f3c5268",
    "0xdcf90739a6995112c88e92f412378ad88cac75ae",
    "0x189b8e57e0ff947159a16d7cf21cb6c9c28c8e2a",
    "0x44ec08f1eca729d28ae9c75644143a55da0fe260",
    "0x67757c6f93d45cb797f29d4be349a62b7b0b0079",
    "0xad6c5e5bca5f03f1d47285c42e59f4e63c7729e4",
    "0xa686a1f7c77dfd8880094f4c1d3909290df8b9a0",
    "0xfe2e3e999bc785bb053c85688da6daa4a19eb0f4",
    "0x90fe78ad52c0bedf861c97beef3e8266b4e67a70",
    "0x70c34d656f25da5a0478c5775654500e189d8901",
    "0xe7bf954096508f883aaa8c4c9bdd616d8ce881e4",
    "0xe73d0696b127B448Fc8B380cEbA3Ab47996e1C83",
    "0xA4A6c4Cc9D09F6C9A56732bA61C833427416039b",
    "0x5797d5a7668bb71061db93c2c6c5b744c6b07040",
    "0x44337438ff5ae8860d590551d855a9368dfd0083",
    "0x911277aef7be6c33878b101ec6b739bd51483842",
    "0xaaa5084635e1dda9ca023d64495b00469fa15f9f",
    "0x7548e62ef251a26a9777f231364db4bfc226c576",
    "0xf96e01123d6ecb492b5151c80f8ee3ab15c8cae5",
    "0x54259D2EabBDEA24d4c39C1F12D26e9dAC70d6a1",
    "0xc883842a5d961ca747c1dbc71da207da9715cfea",
    "0xb31f41ccee92ac853a6ffd33ec44d240bcdd0d73"];

const indexToStart = 40; // increment this manually and keep running transactions in sequence
// increment it by 10 every time
// 0 done
// 10 done
// 20 done
// 30 done
// 40 done
// 50 done
// 60 done
// 70 done
// 80 done
// 90 done
// 100 done
// 110 done

function main() {
    let _subarray = allowlistArray.slice(indexToStart, indexToStart + 5);
    console.log(`Adding to whitelist: ${_subarray}`);
    addToAllowlist(_subarray);
}

main();

var rawAddresses = '"0x2e8a2712b3c159aa4fa4d64a22cdfe8f4579f5f0", "0x4b2db67426557f647460be5960c5ffc3ce001df4"'
var arr = rawAddresses.split(",");

console.log(arr)
console.log(typeof arr[0])

var fs = require('fs');

const filename = "lyke-list.txt"
const path = "/Users/fran/IdeaProjects/lykeisland_nft/utilities/allowlist/"

console.log(path+filename);

fs.readFile(path+filename, function (err, data) {
    if (err) throw err;

    console.log("Holis", toString(data));

    const stringFromBytes = String.fromCharCode(data)

    console.log("Bytes to String: ", stringFromBytes)
});


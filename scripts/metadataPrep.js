const fs = require('fs')

const source = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/_metadataplaceholder.json';
const targetDir = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/metadataplaceholders/';
const amountOfCopies = 120;

function jsonReader(source_, _cb) {
    fs.readFile(source_, (err, fileData) => {
        if (err) {
            return _cb && _cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return _cb && _cb(null, object)
        } catch(err) {
            return _cb && _cb(err)
        }
    })
}

function populateMetadataPlaceholders(_source, _targetDir, _amount) {

    jsonReader(_source, (err, fileContent) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }

        let _templateImageValue = {};
        _templateImageValue = JSON.parse(JSON.stringify(fileContent.image)) ;
        console.log("Expanding image template value from: " + _templateImageValue);

    for(let i = 1; i <= _amount; i++) {
        // copy

        let _targ = _targetDir + i.toString();

        fs.copyFile(_source, _targ, (err) => {
            if (err) throw err;
        });

        // modify

        fileContent.image = _templateImageValue + i.toString() + '.gif';

        fs.writeFile(_targ, JSON.stringify(fileContent, null, 2), (err) => {
            if (err) console.log('Error writing file: ', err)
        })
    }})

}

populateMetadataPlaceholders(source, targetDir, amountOfCopies);



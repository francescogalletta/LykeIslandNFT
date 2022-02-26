const fs = require('fs')

const source = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/metadata/generatedmetadata/';
const targetDir = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/metadata/shuffledmetadata/';
const unformattedTarget = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/metadata/generatedDataWithoutFormat/';

const imageSourceDir = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/images/generatedimages/'
const imageTargetDir = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/images/shuffledimages/'
// change internal references

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

function populateMetadataPlaceholders(_source, _targetDir, _reference) {

    jsonReader(_source, (err, fileContent) => {
        if (err) {
            console.log('Error reading file:', err)
            return
        }

        let _templateImageValue = {};
        _templateImageValue = JSON.parse(JSON.stringify(fileContent.image)) ;
        _templateImageValue = _templateImageValue.substr(0, _templateImageValue.lastIndexOf("/") + 1);
        console.log("Expanding image template value from: " + _templateImageValue);

        // copy
        let _targ = _targetDir + _reference;
        fs.copyFile(_source, _targ, (err) => {
            if (err) throw err;
        });
        // modify
        fileContent.image = _templateImageValue + _reference + '.gif';
        fs.writeFile(_targ, JSON.stringify(fileContent, null, 2), (err) => {
            if (err) console.log('Error writing file: ', err)
        })
})

}

// shuffle Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    console.log("Shuffling array")
    console.log(array);
    return array;
}

// since shuffle will happen before and define the numbers, the copy and population shoulnd't be a problem
function obtainFilesToShuffle(_targetDir) {

    fs.readdir(_targetDir, (err, files) => {
        console.log(files)
        return files;
    });

}

let temparray = [
    '1',   '10',  '100', '101', '102', '103', '104', '105', '106',
    '107', '108', '109', '11',  '110', '111', '112', '113', '114',
    '115', '116', '117', '118', '119', '12',  '120', '13',  '14',
    '15',  '16',  '17',  '18',  '19',  '2',   '20',  '21',  '22',
    '23',  '24',  '25',  '26',  '27',  '28',  '29',  '3',   '30',
    '31',  '32',  '33',  '34',  '35',  '36',  '37',  '38',  '39',
    '4',   '40',  '41',  '42',  '43',  '44',  '45',  '46',  '47',
    '48',  '49',  '5',   '50',  '51',  '52',  '53',  '54',  '55',
    '56',  '57',  '58',  '59',  '6',   '60',  '61',  '62',  '63',
    '64',  '65',  '66',  '67',  '68',  '69',  '7',   '70',  '71',
    '72',  '73',  '74',  '75',  '76',  '77',  '78',  '79',  '8',
    '80',  '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
    '91', '92', '93', '94', '95', '96', '97', '98', '99', '9'
]

function makeCopy(_source, _target) {
// destination will be created or overwritten by default.
    fs.copyFile(_source, _target, (err) => {
        if (err) throw err;
    });
}

//for(let i = 1; i <= 120; i++) {
//    let _tempSource = source + i + '.json'
//    let _tempTarget = unformattedTarget + i
//    makeCopy(_tempSource, _tempTarget);
//}

_newArray = shuffle(temparray);
console.log(_newArray.length);

for(let i = 1; i <= _newArray.length; i++) {

    let _newRef = _newArray[i];
    let _currentSource = unformattedTarget + i;

    // images

    populateMetadataPlaceholders(_currentSource, targetDir, _newRef);
    makeCopy(imageSourceDir + i + '.gif', imageTargetDir + _newRef + '.gif');

}
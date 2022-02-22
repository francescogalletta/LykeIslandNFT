// ----- DECLARE FILE TO COPY


// ----- COPY PLACEHOLDER FILE 120 TIMES AND CHANGE NAME TO SEND TO IPFS
const placeholderSourceFileName = '_placeholder';
const placeholderExtension = '.gif'
const placeholderSourceDirectory = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/';
const placeholderTargetDirectory = '/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/placeholders/';
const numberOfCopies = 120;

const fullSource = composeFullFile(placeholderSourceDirectory, placeholderSourceFileName, placeholderExtension);

//copyfile.js
const fs = require('fs');

function makeCopy(_source, _target) {
// destination will be created or overwritten by default.
    fs.copyFile(_source, _target, (err) => {
        if (err) throw err;
    });
}

function composeFullFile(_dir, _fn, _ext) {
    return _dir + _fn + _ext;
}

function iterateCopies(_source, _targetDir, _ext, _copies) {
    for (let i = 1; i <= _copies; i++) {
        let _objId = i.toString()
        let _target = composeFullFile(_targetDir, _objId, _ext);

        makeCopy(_source, _target);
    }
    // validate
    fs.readdir(_targetDir, (err, files) => {
        if (files.length != _copies) throw err;
        console.log(`👍 Success copying ${_copies} files`);
    });

}

iterateCopies(fullSource, placeholderTargetDirectory, placeholderExtension, numberOfCopies);




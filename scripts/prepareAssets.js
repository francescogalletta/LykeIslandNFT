// [TODO] function to take a metadata file, take a new name argument, rename it and point the URI to the new asset absolute

let fileName = "01";
let newFileName = "02";
let sourceDir = "/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/metadata/generatedmetadata/";
let targetDir = "/Users/fran/IdeaProjects/lykeisland_nft/utilities/assets/metadata/shuffledmetadata/";

let fullSource = sourceDir + fileName;
let fullTarget = targetDir + newFileName;

function jsonReader(source_, _cb) {
    const _src = require(source_);

    _src.readFile(source_, (err, fileData) => {
        if (err) {
            console.log(`Reading ${_cb}`);
            return _cb && _cb(err);
        }
        try {
            const object = JSON.parse(fileData)
            return _cb && _cb(null, object)
        } catch(err) {
            return _cb && _cb(err)
        }
    })
}

function copyAndRename(_source, _target) {
    const fs = require('fs');

    fs.copyFile(_source, _target, (err) => {
        if (err) throw err;
    });
}

function changeInternalReference(_target, _newReference) {
    const _tg = require(_target);

    jsonReader(_tg, (err, fileContent) => {
            if (err) {
                console.log('Error reading file:', err)
                return
            }

            let _oldImageRef = fileContent.image.toString();
            fileContent.image = _oldImageRef.substr(0, _oldImageRef.lastIndexOf("/")) + _newReference + ".gif"

            _tg.writeFile(_target, JSON.stringify(fileContent, null, 2), (err) => {
                if (err) console.log('Error writing file: ', err)
            })
        }
    )


}

copyAndRename(fullSource, fullTarget);

changeInternalReference(fullTarget, newFileName);


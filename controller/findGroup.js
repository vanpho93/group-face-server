const rename = require('../api/rename');
const getFaceIds = require('../api/getFaceFromImage');

// const getFaceByImageUrl = require('./api/uploadFace');
const getAllSimilarFaceId = require('../api/getAllSimilar');
const { findNamesFromFaceIds } = require('../api/db');

const findGroupByUploadFile = async (req, res) => {
    const { path } = req.files.avatar;
    try {
        const filename = await rename(path);
        const faceIds = await getFaceIds(`https://groupkhoapham.herokuapp.com/${filename}`);
        const similarFaceIds = await getAllSimilarFaceId(faceIds);
        const names = await findNamesFromFaceIds(similarFaceIds);
        res.send(names);
    } catch (e) {
        res.send(`${e} `);
    }
};

module.exports = findGroupByUploadFile;

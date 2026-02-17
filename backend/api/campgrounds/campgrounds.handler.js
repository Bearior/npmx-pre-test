const getCampgrounds = require('./crud/getCampgrounds.v1');
const getCampground = require('./crud/getCampground.v1');
const createCampground = require('./crud/createCampground.v1');
const updateCampground = require('./crud/updateCampground.v1');
const deleteCampground = require('./crud/deleteCampground.v1');

exports.getCampgrounds = getCampgrounds;
exports.getCampground = getCampground;
exports.createCampground = createCampground;
exports.updateCampground = updateCampground;
exports.deleteCampground = deleteCampground;

const register = require('./crud/register.v1');
const login = require('./crud/login.v1');
const getMe = require('./crud/getMe.v1');
const logout = require('./crud/logout.v1');
const updateProfile = require('./crud/updateProfile.v1');
const deleteProfile = require('./crud/deleteProfile.v1');

exports.register = register;
exports.login = login;
exports.getMe = getMe;
exports.logout = logout;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;

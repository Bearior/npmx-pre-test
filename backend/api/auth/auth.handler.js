const register = require('./register.v1');
const login = require('./login.v1');
const getMe = require('./getMe.v1');
const logout = require('./logout.v1');
const updateProfile = require('./updateProfile.v1');
const deleteProfile = require('./deleteProfile.v1');

exports.register = register;
exports.login = login;
exports.getMe = getMe;
exports.logout = logout;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;

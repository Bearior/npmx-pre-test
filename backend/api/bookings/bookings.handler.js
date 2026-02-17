const getBookings = require('./getBookings.v1');
const getBooking = require('./getBooking.v1');
const addBooking = require('./addBooking.v1');
const updateBooking = require('./updateBooking.v1');
const deleteBooking = require('./deleteBooking.v1');

exports.getBookings = getBookings;
exports.getBooking = getBooking;
exports.addBooking = addBooking;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;

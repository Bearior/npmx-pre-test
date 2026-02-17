const getBookings = require('./crud/getBookings.v1');
const getBooking = require('./crud/getBooking.v1');
const addBooking = require('./crud/addBooking.v1');
const updateBooking = require('./crud/updateBooking.v1');
const deleteBooking = require('./crud/deleteBooking.v1');

exports.getBookings = getBookings;
exports.getBooking = getBooking;
exports.addBooking = addBooking;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;

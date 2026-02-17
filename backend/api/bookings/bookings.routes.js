const express = require('express');
const bookingsRoute = express.Router({ mergeParams: true });
const { protect } = require('../../middleware/auth');

// Handlers
const bookings = require('./bookings.handler');

bookingsRoute
    .route('/')
    .get(protect, bookings.getBookings)
    .post(protect, bookings.addBooking);

bookingsRoute
    .route('/:id')
    .get(protect, bookings.getBooking)
    .put(protect, bookings.updateBooking)
    .delete(protect, bookings.deleteBooking);

module.exports = bookingsRoute;

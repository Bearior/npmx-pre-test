const express = require('express');
const router = express.Router();
const api = require('./api');

// Mount API modules
router.use('/api/v1/auth', api.auth);
router.use('/api/v1/bookings', api.bookings);
router.use('/api/v1/campgrounds', api.campgrounds);
router.use('/api/v1/favorites', api.favorites);

module.exports = router;

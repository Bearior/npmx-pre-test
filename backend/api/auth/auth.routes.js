const express = require('express');
const authRoute = express.Router();
const { protect } = require('../../middleware/auth');

// Handlers
const auth = require('./auth.handler');

// Public routes
authRoute.post('/register', auth.register);
authRoute.post('/login', auth.login);
authRoute.get('/logout', auth.logout);

// Protected routes
authRoute.get('/me', protect, auth.getMe);
authRoute.put('/me', protect, auth.updateProfile);
authRoute.delete('/me', protect, auth.deleteProfile);

module.exports = authRoute;

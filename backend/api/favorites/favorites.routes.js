const express = require('express');
const favoritesRoute = express.Router();
const { protect } = require('../../middleware/auth');

// Handlers
const favorites = require('./favorites.handler');

favoritesRoute.route('/')
    .get(protect, favorites.getFavorites)
    .post(protect, favorites.addFavorite);

favoritesRoute.route('/:id')
    .put(protect, favorites.updateFavorite)
    .delete(protect, favorites.deleteFavorite);

module.exports = favoritesRoute;

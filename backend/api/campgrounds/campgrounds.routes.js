const express = require('express');
const campgroundsRoute = express.Router();
const { protect, authorize } = require('../../middleware/auth');

// Handlers
const campgrounds = require('./campgrounds.handler');

// Nested route - bookings under campground
const bookingsRoute = require('../bookings');
campgroundsRoute.use('/:campgroundId/bookings', bookingsRoute);

// Public routes
campgroundsRoute
    .route('/')
    .get(campgrounds.getCampgrounds)
    .post(protect, campgrounds.createCampground);

campgroundsRoute
    .route('/:id')
    .get(campgrounds.getCampground)
    .put(protect, authorize('admin'), campgrounds.updateCampground)
    .delete(protect, authorize('admin'), campgrounds.deleteCampground);

module.exports = campgroundsRoute;

/** 
 * @swagger 
 * components:
 *   schemas:     
 *     Campground:
 *       type: object 
 *       required:
 *         - name
 *         - address 
 *       properties:
 *         id:
 *           type: string 
 *           description: The auto-generated id of the campground
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           description: Campground name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         tel:
 *           type: string
 *           description: telephone number
 *       example:
 *         id: 609bda561452242d88d36e37
 *         name: Happy Campground
 *         address: 121 Main St
 *         tel: 123-456-7890
 */

/** 
 * @swagger 
 * tags: 
 *   name: Campgrounds 
 *   description: The campgrounds managing API 
 */

/**
 * @swagger
 * /campgrounds:
 *   get:
 *     summary: Returns the list of all the campgrounds
 *     tags: [Campgrounds]
 *     responses:
 *       200:
 *         description: The list of the campgrounds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campground'
 */

/**
 * @swagger
 * /campgrounds/{id}:
 *   get:
 *     summary: Get the campground by id
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     responses:
 *       200:
 *         description: The campground description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campground'
 *       404:
 *         description: The campground was not found
 */

/**
 * @swagger
 * /campgrounds:
 *   post:
 *     summary: Create a new campground
 *     tags: [Campgrounds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campground'
 *     responses:
 *       201:
 *         description: The campground was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campground'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /campgrounds/{id}:
 *   put:
 *     summary: Update the campground by the id
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Campground"
 *     responses:
 *       200:
 *         description: The campground was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Campground"
 *       404:
 *         description: The campground was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /campgrounds/{id}:
 *   delete:
 *     summary: Remove the campground by id
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The campground id
 *     responses:
 *       200:
 *         description: The campground was deleted
 *       404:
 *         description: The campground was not found
 */

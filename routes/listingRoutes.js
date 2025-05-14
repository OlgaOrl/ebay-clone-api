// routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

// Создать объявление
router.post('/', listingController.createListing);

// Получить все объявления
router.get('/', listingController.getAllListings);

// Получить конкретное объявление по id
router.get('/:id', listingController.getListingById);

module.exports = router;

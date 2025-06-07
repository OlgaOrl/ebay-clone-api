// routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const authMiddleware = require('../middleware/authMiddleware');

// Создать объявление (защищено токеном)
router.post('/', authMiddleware, listingController.createListing);

// Обновить объявление (защищено токеном)
router.patch('/:id', authMiddleware, listingController.updateListing);

// Удалить объявление (защищено токеном)
router.delete('/:id', authMiddleware, listingController.deleteListing);

// Получить все объявления (публичный доступ)
router.get('/', listingController.getAllListings);

// Получить конкретное объявление по id (публичный доступ)
router.get('/:id', listingController.getListingById);

module.exports = router;
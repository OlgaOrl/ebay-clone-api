// routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadImages, handleUploadError } = require('../middleware/uploadMiddleware');

// Get all listings (public access)
router.get('/', listingController.getAllListings);

// Get specific listing by id (public access)
router.get('/:id', listingController.getListingById);

// Create listing (protected with token + file upload)
router.post('/',
    authMiddleware,
    uploadImages,
    handleUploadError,
    listingController.createListing
);

// Update listing (protected with token + file upload)
router.patch('/:id',
    authMiddleware,
    uploadImages,
    handleUploadError,
    listingController.updateListing
);

// Delete listing (protected with token)
router.delete('/:id', authMiddleware, listingController.deleteListing);

module.exports = router;
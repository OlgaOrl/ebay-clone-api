const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.createUser);        // User registration
router.get('/:id', userController.getUser);         // Get user
router.patch('/:id', authMiddleware, userController.updateUser);    // Update user (PATCH instead of PUT)
router.put('/:id', authMiddleware, userController.updateUser);      // Duplicate for compatibility
router.delete('/:id', authMiddleware, userController.deleteUser);   // Delete user

module.exports = router;

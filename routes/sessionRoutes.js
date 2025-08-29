const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.login);     // Login
router.delete('/', authMiddleware, userController.logout);  // Logout with authentication check

module.exports = router;

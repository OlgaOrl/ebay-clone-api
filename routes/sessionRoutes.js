const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.login);     // Вход
router.delete('/', authMiddleware, userController.logout);  // Выход с проверкой аутентификации

module.exports = router;
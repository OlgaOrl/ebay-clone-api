const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.login);     // Вход
router.delete('/', userController.logout);  // Выход

module.exports = router;
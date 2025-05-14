const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);        // Регистрация
router.get('/:id', userController.getUser);         // Получение пользователя
router.put('/:id', userController.updateUser);      // Обновление пользователя
router.delete('/:id', userController.deleteUser);   // Удаление пользователя

module.exports = router;
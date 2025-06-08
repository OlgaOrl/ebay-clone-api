const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.createUser);        // Регистрация
router.get('/:id', userController.getUser);         // Получение пользователя
router.patch('/:id', authMiddleware, userController.updateUser);    // Обновление пользователя (PATCH вместо PUT)
router.put('/:id', authMiddleware, userController.updateUser);      // Дублируем для совместимости
router.delete('/:id', authMiddleware, userController.deleteUser);   // Удаление пользователя

module.exports = router;
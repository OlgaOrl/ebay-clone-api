// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Получить все заказы пользователя (защищено токеном)
router.get('/', authMiddleware, orderController.getAllOrders);

// Создать заказ (защищено токеном)
router.post('/', authMiddleware, orderController.createOrder);

// Обновить заказ (защищено токеном)
router.patch('/:id', authMiddleware, orderController.updateOrder);

// Удалить заказ - отменить (защищено токеном)
router.delete('/:id', authMiddleware, orderController.deleteOrder);

// Получить заказ по id (защищено токеном)
router.get('/:id', authMiddleware, orderController.getOrderById);

module.exports = router;
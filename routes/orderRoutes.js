// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Получить все заказы
router.get('/', orderController.getAllOrders);

// Создать заказ
router.post('/', orderController.createOrder);

// Получить заказ по id
router.get('/:id', orderController.getOrderById);

module.exports = router;

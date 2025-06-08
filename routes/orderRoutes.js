// routes/orderRoutes.js - Production Version
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// GET /orders - Get all user orders (with filtering & pagination)
// Query params: ?status=pending&page=1&limit=10
router.get('/', orderController.getAllOrders);

// POST /orders - Create new order
router.post('/', orderController.createOrder);

// GET /orders/:id - Get specific order by ID
router.get('/:id', orderController.getOrderById);

// PATCH /orders/:id - Update order (limited conditions - only pending orders)
router.patch('/:id', orderController.updateOrder);

// PATCH /orders/:id/cancel - Cancel order (instead of delete)
router.patch('/:id/cancel', orderController.cancelOrder);

// PATCH /orders/:id/status - Update order status (for sellers)
router.patch('/:id/status', orderController.updateOrderStatus);

// DELETE route completely removed for production safety
// Orders should never be deleted, only cancelled

module.exports = router;
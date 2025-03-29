// controllers/orderController.js

// Получить все заказы
exports.getAllOrders = (req, res) => {
    const orders = [
        { id: 1, userId: 1, listingId: 2, quantity: 1, totalPrice: 1200 },
        { id: 2, userId: 1, listingId: 1, quantity: 2, totalPrice: 300 }
    ];
    return res.status(200).json(orders);
};

// Создать заказ
exports.createOrder = (req, res) => {
    const newOrder = {
        id: 3,
        userId: req.body.userId,
        listingId: req.body.listingId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
    };
    return res.status(201).json(newOrder);
};

// Получить заказ по id
exports.getOrderById = (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    if (orderId === 1) {
        return res.status(200).json({
            id: 1,
            userId: 1,
            listingId: 2,
            quantity: 1,
            totalPrice: 1200
        });
    } else {
        return res.status(404).json({ message: "Order not found" });
    }
};

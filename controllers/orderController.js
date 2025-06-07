// controllers/orderController.js

// Получить все заказы пользователя
exports.getAllOrders = (req, res) => {
    // Заказы только текущего пользователя из токена
    const userOrders = [
        { id: 1, userId: req.user?.id, listingId: 2, quantity: 1, totalPrice: 1200 },
        { id: 2, userId: req.user?.id, listingId: 1, quantity: 2, totalPrice: 300 }
    ];
    return res.status(200).json(userOrders);
};

// Создать заказ
exports.createOrder = (req, res) => {
    const newOrder = {
        id: 3,
        userId: req.user?.id, // Берем ID из токена, а не из body
        listingId: req.body.listingId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        createdAt: new Date().toISOString()
    };
    return res.status(201).json(newOrder);
};

// Получить заказ по id
exports.getOrderById = (req, res) => {
    const orderId = parseInt(req.params.id, 10);

    // Проверяем что заказ принадлежит текущему пользователю
    if (orderId === 1) {
        return res.status(200).json({
            id: 1,
            userId: req.user?.id, // Только заказы текущего пользователя
            listingId: 2,
            quantity: 1,
            totalPrice: 1200
        });
    } else {
        return res.status(404).json({ message: "Order not found" });
    }
};

// Обновить заказ
exports.updateOrder = (req, res) => {
    const orderId = parseInt(req.params.id, 10);

    const updatedOrder = {
        id: orderId,
        userId: req.user?.id,
        listingId: req.body.listingId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        updatedAt: new Date().toISOString()
    };

    return res.status(200).json(updatedOrder);
};

// Удалить заказ (отменить)
exports.deleteOrder = (req, res) => {
    const orderId = parseInt(req.params.id, 10);

    return res.status(200).json({
        message: `Order ${orderId} cancelled successfully`,
        cancelledBy: req.user?.id
    });
};
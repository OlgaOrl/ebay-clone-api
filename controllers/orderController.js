// controllers/orderController.js - Complete Fixed Version
const orders = []; // In-memory storage for orders
let orderIdCounter = 100; // Start from 100

// Get all user orders with filtering and pagination
const getAllOrders = (req, res) => {
    console.log('📋 Getting orders for user:', req.user?.id || 'not authenticated');

    const userId = req.user?.id || 1;
    const { status, page = 1, limit = 10 } = req.query;

    // Filter orders by current user
    let userOrders = orders.filter(order => order.userId === userId);

    // Add status filter if provided
    if (status) {
        userOrders = userOrders.filter(order => order.status === status);
    }

    // Sort by creation date (newest first)
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const skip = (page - 1) * limit;
    const paginatedOrders = userOrders.slice(skip, skip + parseInt(limit));
    const total = userOrders.length;

    console.log('✅ Found orders:', paginatedOrders.length, 'of', total);

    return res.status(200).json({
        orders: paginatedOrders,
        pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            hasNext: skip + parseInt(limit) < total,
            hasPrev: page > 1
        }
    });
};

// Create a new order
const createOrder = (req, res) => {
    console.log('🛒 Creating order:', req.body);

    const { listingId, quantity, shippingAddress } = req.body;

    // Validation
    if (!listingId || !quantity || !shippingAddress) {
        return res.status(400).json({
            error: 'Listing ID, quantity, and shipping address are required'
        });
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.country) {
        return res.status(400).json({
            error: 'Shipping address must include street, city, and country'
        });
    }

    if (quantity < 1) {
        return res.status(400).json({
            error: 'Quantity must be at least 1'
        });
    }

    // Mock price calculation (in real app, get from database)
    const mockPrices = { 1: 150, 2: 1200, 3: 1450 };
    const unitPrice = mockPrices[listingId] || 100;
    const totalPrice = unitPrice * quantity;

    const newOrder = {
        id: orderIdCounter++,
        userId: req.user?.id || 1,
        listingId: parseInt(listingId),
        quantity: parseInt(quantity),
        totalPrice: totalPrice,
        status: 'pending',
        shippingAddress: {
            street: shippingAddress.street,
            city: shippingAddress.city,
            state: shippingAddress.state || '',
            zipCode: shippingAddress.zipCode || '',
            country: shippingAddress.country || 'Estonia'
        },
        buyerNotes: req.body.buyerNotes || '',
        createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    console.log('✅ Order created:', newOrder);

    return res.status(201).json(newOrder);
};

// Get order by ID
const getOrderById = (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    console.log('🔍 Looking for order with ID:', orderId);

    const userId = req.user?.id || 1;

    // Check in created orders first
    const order = orders.find(o => o.id === orderId && o.userId === userId);

    if (order) {
        return res.status(200).json(order);
    }

    console.log('❌ Order not found:', orderId);
    return res.status(404).json({ error: "Order not found" });
};

// Update order (limited conditions)
const updateOrder = (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const { quantity, shippingAddress, buyerNotes } = req.body;

    console.log('📝 Updating order:', orderId, req.body);

    const userId = req.user?.id || 1;
    const orderIndex = orders.findIndex(o => o.id === orderId && o.userId === userId);

    if (orderIndex !== -1) {
        const order = orders[orderIndex];

        // Only allow updates for pending orders
        if (order.status !== 'pending') {
            return res.status(400).json({
                error: `Cannot update ${order.status} order. Only pending orders can be modified.`
            });
        }

        // Update allowed fields
        if (quantity && quantity >= 1) {
            const mockPrices = { 1: 150, 2: 1200, 3: 1450 };
            const unitPrice = mockPrices[order.listingId] || 100;
            order.quantity = parseInt(quantity);
            order.totalPrice = unitPrice * order.quantity;
        }

        if (shippingAddress) {
            order.shippingAddress = {
                ...order.shippingAddress,
                ...shippingAddress
            };
        }

        if (buyerNotes !== undefined) {
            order.buyerNotes = buyerNotes;
        }

        order.updatedAt = new Date().toISOString();

        console.log('✅ Order updated:', order);
        return res.status(200).json(order);
    }

    console.log('❌ Order not found for update:', orderId);
    return res.status(404).json({ error: 'Order not found' });
};

// Cancel order
const cancelOrder = (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const { cancelReason } = req.body;

    console.log('❌ Cancelling order:', orderId, 'Reason:', cancelReason);

    const userId = req.user?.id || 1;

    // Check in created orders first
    const orderIndex = orders.findIndex(o => o.id === orderId && o.userId === userId);

    if (orderIndex !== -1) {
        const order = orders[orderIndex];

        // Check if order can be cancelled
        if (['delivered', 'cancelled'].includes(order.status)) {
            return res.status(400).json({
                error: `Cannot cancel ${order.status} order`
            });
        }

        // Check time limit for confirmed orders (24 hours)
        if (order.status === 'confirmed') {
            const hoursSinceCreation = (Date.now() - new Date(order.createdAt)) / (1000 * 60 * 60);
            if (hoursSinceCreation > 24) {
                return res.status(400).json({
                    error: 'Cannot cancel confirmed order after 24 hours'
                });
            }
        }

        // Cancel the order
        order.status = 'cancelled';
        order.cancelledAt = new Date().toISOString();
        order.cancelReason = cancelReason || 'Customer request';
        order.updatedAt = new Date().toISOString();

        console.log('✅ Order cancelled:', order);

        return res.status(200).json({
            message: `Order ${orderId} cancelled successfully`,
            order: order
        });
    }

    console.log('❌ Order not found for cancellation:', orderId);
    return res.status(404).json({ error: 'Order not found' });
};

// Update order status (for sellers - bonus feature)
const updateOrderStatus = (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const { status } = req.body;

    console.log('🔄 Updating order status:', orderId, 'to', status);

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            error: 'Invalid status. Must be: pending, confirmed, shipped, or delivered'
        });
    }

    const userId = req.user?.id || 1;
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex !== -1) {
        const order = orders[orderIndex];
        
        // In a real app, check if user is seller of the listing
        
        order.status = status;
        order.updatedAt = new Date().toISOString();

        // Add timestamps for specific statuses
        if (status === 'confirmed') {
            order.confirmedAt = new Date().toISOString();
        } else if (status === 'shipped') {
            order.shippedAt = new Date().toISOString();
        } else if (status === 'delivered') {
            order.deliveredAt = new Date().toISOString();
        }

        console.log('✅ Order status updated:', order);
        return res.status(200).json(order);
    }

    console.log('❌ Order not found for status update:', orderId);
    return res.status(404).json({ error: 'Order not found' });
};

// CORRECT MODULE EXPORTS
module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    cancelOrder,
    updateOrderStatus
};


const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
    try {
        console.log("ORDER BODY:", req.body);
        console.log("REQ USER:", req.user);

        const order = await Order.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);

        res.status(500).json({
            message: "Failed to create order",
            error: error.message,
        });
    }
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

// Get all orders (Admin)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Processing",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.status = status;

        // Keep the existing delivery fields in sync
        if (status === "Delivered") {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        } else {
            order.isDelivered = false;
            order.deliveredAt = undefined;
        }

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);

    } catch (error) {
        console.error("UPDATE ORDER STATUS ERROR:", error);

        res.status(500).json({
            message: "Failed to update order status",
            error: error.message,
        });
    }
};

// Mark order as paid
const payOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "order not found",
            });
        }

        order.isPaid = true;
        order.paidAt = Date.now();

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);

    } catch (error) {
        res.status(500).json({
            message: "Payment failed",
            error: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    payOrder,
};


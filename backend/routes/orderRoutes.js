
const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
    payOrder,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");


// Get all orders
router.get("/", protect, getOrders);

// Create a new order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getMyOrders);

// Update order status
router.put("/:id/status", protect, updateOrderStatus);

// Mark order as paid
router.put("/:id/pay", protect, payOrder);


module.exports = router;

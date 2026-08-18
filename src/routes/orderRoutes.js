const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus); // Durum güncelleme için özel endpoint
router.delete('/:id', deleteOrder);

module.exports = router;
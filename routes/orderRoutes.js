const express = require('express');
const router = express.Router();
const orderServices = require('../services/orderServices');
const authenticateToken = require('../middleware/authMiddleware');


router.post('/place', authenticateToken, async (req, res) => {
    console.log('Middleware Attached req.user:', req.user); // Debugging log

    const { product_id, total_amount, Quantity } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const user_id = req.user.id; // Extract user ID from token
        console.log('Authenticated User ID:', user_id);

        const result = await orderServices.placeOrder({ user_id, product_id, total_amount, Quantity });
        res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Error placing order', error: err.message });
    }
});



module.exports = router; 
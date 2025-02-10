const mysql = require('mysql'); 
const connection = require('../config/db'); 
const { search } = require('../routes/userRoutes');
const executeQuery=require('./executequery');

module.exports = {
    
    placeOrder: async (orderData) => {
        const { user_id,  product_id, total_amount, Quantity } = orderData;
        console.log('Order data received:', { user_id, total_amount, product_id, Quantity });
        const query = 'INSERT INTO orders (user_id, product_id, total_amount, Quantity) VALUES (?, ?, ?, ?)';
        return await executeQuery(query, [user_id, product_id, total_amount, Quantity]);
    } ,
    
    getOrdersByUserId: async (userId) => {
        const query = 'SELECT * FROM orders WHERE user_id = ?';
        return await executeQuery(query, [userId]);
    },

    
    getOrderById: async (orderId) => {
        const query = 'SELECT * FROM orders WHERE order_id = ?';
        const [order] = await executeQuery(query, [orderId]);
        return order;
    }
};
const bcrypt = require('bcryptjs'); 
const connection = require('../config/db');
const executeQuery=require('./executequery');

module.exports = {
    addUser: async (userData) => {
        const { username, password, email, mobile, address, pincode } = userData;
        
        const hashedPassword = await bcrypt.hash(password, 2);
        const query = 'INSERT INTO users (username, password, email, mobile, address, pincode) VALUES (?, ?, ?, ?, ?, ?)';
        return await executeQuery(query, [username, hashedPassword, email, mobile, address, pincode]); 
    },
    
    getAllUsers: async () => {
        const query = 'SELECT * FROM users';
        return await executeQuery(query);
    },
    
    // TO display Ordered list of the users
    getAccount: async (user_id) => {
        const query = 'SELECT  orders.order_id, products.name AS product_name, products.image_url, orders.total_amount AS amount FROM orders join products on orders.product_id = products.product_id WHERE orders.user_id = ?';
          return await executeQuery(query, [user_id]); 
       
    },

      // TO display cart list of the users
      getcartitem: async (user_id) => {
        const query = 'SELECT cart.product_id, products.name AS product_name, products.image_url, products.description FROM cart JOIN products ON cart.product_id = products.product_id  WHERE cart.user_id = ? ';
         return await executeQuery(query, [user_id]); 
       
    },

    validateUser: async (username, password) => {
        const query = 'SELECT * FROM users WHERE username = ?'; 
        const [user] = await executeQuery(query, [username]);
    
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password); 
            return isMatch ? user : null; 
        }
        return null; 
    } ,
    addcart: async (user_id, product_id) => {
        const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
        return await executeQuery(query, [user_id, product_id]);
    } ,
    getuserdetails: async (user_id) => {
        const query = 'SELECT username, email, mobile, address, pincode  FROM users where user_id = ?';
        return await executeQuery(query,[user_id]);
    },

    // Edit profile of users
    updateUserDetails: async (user_id, username, email, mobile, address, pincode) => {
        const query = `
            UPDATE users 
            SET 
                username = ?, 
                email = ?, 
                mobile = ?, 
                address = ?, 
                pincode = ? 
            WHERE user_id = ?`;
        return await executeQuery(query, [username, email, mobile, address, pincode, user_id]);
    },

    deletecart: async(user_id,product_id)=>{
        const query = 'DELETE FROM cart where user_id=? AND product_id=?'
        return await executeQuery(query,[user_id, product_id]);
    }
};

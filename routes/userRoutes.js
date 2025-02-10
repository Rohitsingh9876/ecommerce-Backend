const express = require('express');
const router = express.Router();
const User = require('../services/userServices');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authenticateToken = require('../middleware/authMiddleware');
dotenv.config();

router.post('/register', async (req, res) => {
    const { username, password, email, mobile, address, pincode } = req.body;
    try {
        const newUser = await User.addUser({ username, password, email, mobile, address, pincode });
        res.status(201).json({ id: newUser.insertId, username, email, mobile, address, pincode });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.validateUser(username, password);
        if (user) {
            const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.JWT_SECRET, {   // Create a token which hold user_id & username
                expiresIn: '1h',
            });
            return res.json({ token, username }); // Return after sending response token and username
        } else {
            return res.status(401).json({ message: 'Invalid username or password' }); 
        }
    } catch (err) {
        console.error('Login error:', err); 
        return res.status(400).json({ message: err.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Route for Diplay Orders list
router.get('/account', authenticateToken, async (req, res) => {
    const user_id = req.user.id; // Get user ID from authenticated token

    try {
        const user = await User.getAccount(user_id); // Use the user ID from the token
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error retrieving account:', err);
        res.status(500).json({ message: err.message });
    }
});
//  ROOT FOR Display cart Items 

router.get('/getcartitems', authenticateToken, async (req, res) => {
    const user_id = req.user.id; // Get user ID from authenticated token

    try {
        const user = await User.getcartitem(user_id); // get  user ID from the token
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'product not found' });
        }
    } catch (err) {
        console.error('Error retrieving account:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/addcart', authenticateToken, async (req, res) => {
    const { product_id } = req.body; // Get product_id from the request body

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }
    const user_id = req.user.id; //Get user_id from token
    try {
        const user = await User.addcart(user_id, product_id);

        if (user) {
            res.status(201).json({ message: 'Product added to cart successfully' });
        } else {
            res.status(500).json({ message: 'Error adding product to cart' });
        }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
    
});

router.get('/userdeatils', authenticateToken, async (req, res) => {
    const user_id = req.user.id; // Get user ID from authenticated token

    try {
        const user = await User.getuserdetails(user_id); // Use the user ID from the token
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error retrieving account:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/update', authenticateToken, async (req, res) => {
    const user_id = req.user.id; // Get user ID from authenticated token
    const { username, email, mobile, address, pincode } = req.body;

    try {
        const user = await User.updateUserDetails(user_id, username, email, mobile, address, pincode); // Use the user ID from the token
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error retrieving account:', err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/deletecart', authenticateToken, async (req, res) => {
    const user_id = req.user.id; // Get user ID from the authenticated token
    const { product_id } = req.body; // Get product ID from the request body

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const result = await User.deletecart(user_id, product_id);
        if (result.affectedRows > 0) {
            res.json({ message: 'Product removed from cart successfully' });
        } else {
            res.status(404).json({ message: 'No product found for the given user and product ID' });
        }
    } catch (err) {
        console.error('Error deleting cart item:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;

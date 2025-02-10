const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log the authorization header

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err); // Log verification error
            return res.status(403).json({ message: 'Invalid token' });
        }

        console.log('Decoded Token:', user); // Log decoded token payload
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;

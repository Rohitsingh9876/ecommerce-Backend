const mysql = require('mysql'); 
const connection = require('../config/db'); 
const { search } = require('../routes/userRoutes');
const executeQuery=require('./executequery');

module.exports = {
    addProduct: async (productData) => {
        const { name, description, price, image_url, stock } = productData;
        const query = 'INSERT INTO products (name, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)';
        return await executeQuery(query, [name, description, price, image_url, stock]);
    },
    searchProducts: async (searchTerm) => {
        const query = 'SELECT * FROM products WHERE name LIKE ? OR Productname LIKE ?';
        return await executeQuery(query, [`%${searchTerm}%`, `%${searchTerm}%`]);
    },
    
    getAllProducts: async () => {
        const query = 'SELECT * FROM products';
        return await executeQuery(query); 
    },
    getProductById: async (id) => {
        console.log(`Fetching product with ID: ${id}`);
        const query = 'SELECT * FROM products WHERE product_id = ?'; 
        const [product] = await executeQuery(query, [id]);
        console.log('Fetched product:', product);
        return product; 
    },
    getRelatedProductsByName: async (productname) => {
        const query = 'SELECT * FROM products WHERE Productname LIKE ? LIMIT 3'; 
        const relatedProducts = await executeQuery(query, [`%${productname}%`]);
        return relatedProducts; 
    },
    getMobiles: async () => {
        const query = 'SELECT * FROM products WHERE Productname = ?';  
        return await executeQuery(query,['Mobile']);
    },
    getLaptop: async () => {
        const query = 'SELECT * FROM products WHERE Productname = ?'; 
        return await executeQuery(query, ['Laptop']);
    },
    getElectronic: async () => {
        const query = 'SELECT * FROM products WHERE Items = ?'; 
        return await executeQuery(query, ['Electronic']);
    },
    getToys: async () => {
        const query = 'SELECT * FROM products WHERE Productname = ?'; 
        return await executeQuery(query, ['Toys']);
    }
};

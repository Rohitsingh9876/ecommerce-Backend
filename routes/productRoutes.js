const express = require('express');
const router = express.Router();
const Product = require('../services/productServices'); 

// ALl Routes FOR Product
// Add a new product
router.post('/product', async (req, res) => {
    const { name, description, price, image_url, stock } = req.body;
    try {
        const newProduct = await Product.addProduct({ name, description, price, image_url, stock });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
 // get all product list
router.get('/getproduct', async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/getproduct/:id', async (req, res) => {
    console.log('Incoming request:', req.url);  // Log when request hit 
    const id = req.params.id; 
    try {
        const product = await Product.getProductById(id); 
        if (product) {
            res.json(product); 
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: err.message });
    }
});
router.get('/getrelatedproducts/:productname', async (req, res) => {
    const productName = req.params.productname;  
    try {
        const relatedProducts = await Product.getRelatedProductsByName(productName); 
        if (relatedProducts.length > 0) {
            res.json(relatedProducts); 
        } else {
            res.status(404).json({ message: 'No related products found' });
        }
    } catch (err) {
        console.error('Error fetching related products:', err);
        res.status(500).json({ message: err.message });
    }
});
router.get('/mobiles', async (req, res) => {
    try {
        const Mobiles = await Product.getMobiles();
        res.json(Mobiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/Laptop', async (req, res) => {
    try {
        const Laptop = await Product.getLaptop();
        res.json(Laptop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/Toys', async (req, res) => {
    try {
        const Toys = await Product.getToys();
        res.json(Toys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/Electronic', async (req, res) => {
    try {
        const Toys = await Product.getElectronic();
        res.json(Toys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/search', async (req, res) => {
    const { query } = req; 
    const searchTerm = query.q; 

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        const products = await Product.searchProducts(searchTerm);
        res.json(products);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

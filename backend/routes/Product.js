const express = require('express')
const router = express.Router()
const Product = require('../models/ProductSchema');
const upload = require('../middleware/multerMiddleware');

router.get('/getallproducts', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

router.post('/create', upload.single('productImage'), async (req, res) => {
    const { title, description, price, category, sizes } = req.body;
    const image = req.file.filename;
    
    var newProduct = new Product({title,price,description,category,image,sizes});
    newProduct = await newProduct.save();
    res.json(newProduct);
})

module.exports = router
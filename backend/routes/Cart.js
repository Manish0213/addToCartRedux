const express = require('express')
const router = express.Router()
const Cart = require('../models/CartSchema');


router.get('/fetchcartitems', async (req, res) => {
   var cartItems = await Cart.find({}).populate('productId');
   res.send(cartItems);
})

router.post('/additemtocart/:id', async (req, res) => {
    const id = req.params.id;
   const { price } = req.body;

   const cartItem = await Cart.findOne({productId: id});
   if(!cartItem) {
    var newItem = new Cart({ productId: id, quantity: 1, subtotal: price });
    newItem = await newItem.save();
    res.send(newItem);
   } else {
    var quantity = cartItem.quantity;
    var subtotal = cartItem.subtotal;
    quantity = quantity + 1;
    subtotal = subtotal + price;
    const updatedItem = await Cart.findByIdAndUpdate(cartItem._id, {quantity,subtotal} , { overwriteDiscriminatorKey: true, new: true });
    res.send(updatedItem);
   }
})

router.put('/updateitembyquantityincrease/:id', async (req, res) => {
   const cartItemId = req.params.id;
   var { productId, subtotal, quantity } = req.body;
   quantity = quantity + 1;
   subtotal = subtotal + productId.price;
   const updatedItem = await Cart.findByIdAndUpdate(cartItemId, {quantity,subtotal} , { overwriteDiscriminatorKey: true, new: true });
   res.send(updatedItem);
})

router.put('/updateitembyquantitydecrease/:id', async (req, res) => {
   const cartItemId = req.params.id;
   var { productId, subtotal, quantity } = req.body;
   quantity = quantity - 1;
   subtotal = subtotal - productId.price;
   const updatedItem = await Cart.findByIdAndUpdate(cartItemId, {quantity,subtotal} , { overwriteDiscriminatorKey: true, new: true });
   res.send(updatedItem);
})

router.delete('/removecartitem/:id', async (req, res) => {
   const id = req.params.id;
   const deletedItem = await Cart.findByIdAndDelete(id);
   res.send(deletedItem);
})

module.exports = router
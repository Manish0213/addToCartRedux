const express = require('express')
const router = express.Router()
const Cart = require('../models/CartSchema');


router.get('/fetchcartitems', async (req, res) => {
   var cartItems = await Cart.find({}).populate('productId');
   res.send(cartItems);
})

router.post('/additemtocart/:id', async (req, res) => {
    const id = req.params.id;
    const { price, size } = req.body;

   try {
   const cartItems = await Cart.find({productId: id});

   if(cartItems.length === 0) {
    var newItem = new Cart({ productId: id, quantity: 1, subtotal: price, size });
    newItem = await newItem.save();
    return res.send(newItem);
   }
    
   var itemFound = false;

   for(let cartItem of cartItems) {
      if(size === cartItem.size) {
         var quantity = cartItem.quantity;
         var subtotal = cartItem.subtotal;
         quantity = quantity + 1;
         subtotal = subtotal + price;
         const updatedItem = await Cart.findByIdAndUpdate(cartItem._id, {quantity,subtotal} , { overwriteDiscriminatorKey: true, new: true });
         itemFound = true;
         return res.send(updatedItem);
      } 
   };

   if(!itemFound){
      var newItem = new Cart({ productId: id, quantity: 1, subtotal: price, size });
      newItem = await newItem.save();
      return res.send(newItem);
   }
   } catch (error) {
      res.status(500).send({ error: 'Failed to add item to cart' });
  }
});

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

router.put('/updateitembysize/:id', async (req, res) => {
   const cartItemId = req.params.id;
   var { productId, size } = req.body;
   await Cart.findOneAndDelete({ productId: productId._id, size });
   const updatedItem = await Cart.findByIdAndUpdate(cartItemId, {size} , { overwriteDiscriminatorKey: true, new: true });
   res.send(updatedItem);

   // const items = await Cart.find({});
   // res.send(items);
})

router.delete('/removecartitem/:id', async (req, res) => {
   const id = req.params.id;
   const deletedItem = await Cart.findByIdAndDelete(id);
   res.send(deletedItem);
})

module.exports = router
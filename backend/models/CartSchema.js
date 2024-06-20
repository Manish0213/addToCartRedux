const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('../models/ProductSchema');

const cartSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    quantity: {
        type: Number,
    },
    subtotal: {
        type: Number,
    }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
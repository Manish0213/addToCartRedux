const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
    },
    price: {
        type: Number
    },
    description: {
        type: String,
    },
    category: {
        type: String
    },
    image: {
        type: String
    }
})

const Product = mongoose.model('Proudct', productSchema);
module.exports = Product;
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
    },
    sizes: {
        type: [String],
    }
})

const Product = mongoose.model('Proudct', productSchema);
module.exports = Product;
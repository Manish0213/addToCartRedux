const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://ratnawatmanish031:l4nYosaMY5aqBveL@cluster0.5svif5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToDatabase = () => {
    mongoose.connect(mongoURL).then(() => console.log('connected!')).catch((err) => console.error('connection error:', err));
};

module.exports = connectToDatabase;
const express = require('express')
const app = express()
const port = 5000;
var cors = require('cors')
const connectToDatabase = require('./db');
const path = require('path');
const uploadsPath = path.join(__dirname, 'uploads');

// Use express.static to serve the files
app.use('/uploads', express.static(uploadsPath));

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use('/product', require('./routes/Product'));
app.use('/cart', require('./routes/Cart'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
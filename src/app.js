const express = require('express');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users/', userRoutes);
app.use('/products/', productRoutes);

module.exports = app;
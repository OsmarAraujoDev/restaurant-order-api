require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const expressWinston = require('express-winston');
const { format, transports } = require('winston');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(helmet());

app.use(cors({
  origin: [process.env.ORIGIN_1, process.env.ORIGIN_2],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(expressWinston.logger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/requests.log' })
  ],
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users/', userRoutes);
app.use('/products/', productRoutes);
app.use('/orders/', orderRoutes);

module.exports = app;